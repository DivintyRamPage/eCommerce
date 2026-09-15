const express = require('express');
const { data, save, nextId } = require('../db/store');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();
router.use(requireAuth);

function mapProduct(row) {
  return {
    id: row.id,
    name: row.name,
    price: row.price,
    discountPrice: row.discountPrice,
    images: row.images,
    rating: row.rating,
    reviewsCount: row.reviewsCount,
    stock: row.stock,
  };
}

// GET /api/wishlist — список обраних товарів поточного юзера
router.get('/', (req, res) => {
  const items = data.wishlistItems
    .filter((wi) => wi.userId === req.user.id)
    .map((wi) => {
      const product = data.products.find((p) => p.id === wi.productId);
      return {
        wishlistItemId: wi.id,
        addedAt: wi.addedAt,
        product: product ? mapProduct(product) : null,
      };
    })
    .filter((wi) => wi.product !== null); // на випадок якщо товар видалили з каталогу

  res.json({ items });
});

// POST /api/wishlist — додати товар у обране { productId }
router.post('/', (req, res) => {
  const { productId } = req.body;
  if (!productId) {
    return res.status(400).json({ error: "productId обов'язковий" });
  }

  const product = data.products.find((p) => p.id === Number(productId));
  if (!product) {
    return res.status(404).json({ error: 'Товар не знайдено' });
  }

  const existing = data.wishlistItems.find(
    (wi) => wi.userId === req.user.id && wi.productId === Number(productId)
  );
  if (existing) {
    // Товар уже в обраному — просто повертаємо поточний стан без дублювання
    return res.status(200).json({ message: 'Товар уже в обраному' });
  }

  data.wishlistItems.push({
    id: nextId('wishlistItems'),
    userId: req.user.id,
    productId: Number(productId),
    addedAt: new Date().toISOString(),
  });
  save();

  res.status(201).json({ message: 'Додано в обране' });
});

// DELETE /api/wishlist/:productId — прибрати товар з обраного
router.delete('/:productId', (req, res) => {
  const productId = Number(req.params.productId);

  const idx = data.wishlistItems.findIndex(
    (wi) => wi.userId === req.user.id && wi.productId === productId
  );
  if (idx === -1) {
    return res.status(404).json({ error: 'Товару немає в обраному' });
  }

  data.wishlistItems.splice(idx, 1);
  save();

  res.json({ message: 'Видалено з обраного' });
});

module.exports = router;
