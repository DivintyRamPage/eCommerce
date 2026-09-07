const express = require('express');
const { data, save, nextId } = require('../db/store');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

function getCategorySlug(categoryId) {
  const c = data.categories.find((cat) => cat.id === categoryId);
  return c ? c.slug : null;
}

router.get('/', (req, res) => {
  const { category, search, sort, page = 1, limit = 12, minPrice, maxPrice } = req.query;

  let items = [...data.products];

  if (category) {
    items = items.filter((p) => getCategorySlug(p.categoryId) === category);
  }
  if (search) {
    const q = String(search).toLowerCase();
    items = items.filter(
      (p) => p.name.toLowerCase().includes(q) || (p.description || '').toLowerCase().includes(q)
    );
  }
  if (minPrice) {
    items = items.filter((p) => (p.discountPrice ?? p.price) >= Number(minPrice));
  }
  if (maxPrice) {
    items = items.filter((p) => (p.discountPrice ?? p.price) <= Number(maxPrice));
  }

  const sorters = {
    price_asc: (a, b) => (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price),
    price_desc: (a, b) => (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price),
    rating_desc: (a, b) => b.rating - a.rating,
    newest: (a, b) => b.id - a.id,
  };
  items.sort(sorters[sort] || ((a, b) => a.id - b.id));

  const total = items.length;
  const pageNum = Math.max(1, Number(page));
  const limitNum = Math.max(1, Number(limit));
  const start = (pageNum - 1) * limitNum;
  const pageItems = items.slice(start, start + limitNum);

  res.json({
    items: pageItems,
    total,
    page: pageNum,
    totalPages: Math.ceil(total / limitNum),
  });
});

router.get('/:id', (req, res) => {
  const product = data.products.find((p) => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ error: 'Товар не знайдено' });
  res.json(product);
});

router.get('/:id/reviews', (req, res) => {
  const productId = Number(req.params.id);
  const reviews = data.reviews
    .filter((r) => r.productId === productId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json(reviews);
});

router.post('/:id/reviews', requireAuth, (req, res) => {
  const { rating, comment } = req.body;
  const productId = Number(req.params.id);

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'rating має бути числом від 1 до 5' });
  }

  const product = data.products.find((p) => p.id === productId);
  if (!product) return res.status(404).json({ error: 'Товар не знайдено' });

  const review = {
    id: nextId('reviews'),
    productId,
    userId: req.user.id,
    userName: req.user.name,
    rating,
    comment: comment || '',
    createdAt: new Date().toISOString(),
  };
  data.reviews.push(review);

  const productReviews = data.reviews.filter((r) => r.productId === productId);
  const avg = productReviews.reduce((s, r) => s + r.rating, 0) / productReviews.length;
  product.rating = Math.round(avg * 10) / 10;
  product.reviewsCount = productReviews.length;

  save();
  res.status(201).json({ id: review.id, message: 'Відгук додано' });
});

module.exports = router;
