const express = require('express');
const { data, save, nextId } = require('../db/store');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();
router.use(requireAuth);

function getCart(userId) {
  const items = data.cartItems
    .filter((ci) => ci.userId === userId)
    .map((ci) => {
      const product = data.products.find((p) => p.id === ci.productId);
      return {
        cartItemId: ci.id,
        quantity: ci.quantity,
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          discountPrice: product.discountPrice,
          images: product.images,
          stock: product.stock,
        },
      };
    });

  const total = items.reduce((sum, i) => sum + (i.product.discountPrice ?? i.product.price) * i.quantity, 0);
  return { items, total };
}

router.get('/', (req, res) => {
  res.json(getCart(req.user.id));
});

router.post('/', (req, res) => {
  const { productId, quantity = 1 } = req.body;
  if (!productId) return res.status(400).json({ error: "productId обов'язковий" });

  const product = data.products.find((p) => p.id === Number(productId));
  if (!product) return res.status(404).json({ error: 'Товар не знайдено' });

  const existing = data.cartItems.find(
    (ci) => ci.userId === req.user.id && ci.productId === Number(productId)
  );
  if (existing) {
    existing.quantity += quantity;
  } else {
    data.cartItems.push({ id: nextId('cartItems'), userId: req.user.id, productId: Number(productId), quantity });
  }

  save();
  res.status(201).json(getCart(req.user.id));
});

router.put('/:cartItemId', (req, res) => {
  const { quantity } = req.body;
  if (!quantity || quantity < 1) return res.status(400).json({ error: 'quantity має бути >= 1' });

  const item = data.cartItems.find(
    (ci) => ci.id === Number(req.params.cartItemId) && ci.userId === req.user.id
  );
  if (!item) return res.status(404).json({ error: 'Елемент кошика не знайдено' });

  item.quantity = quantity;
  save();
  res.json(getCart(req.user.id));
});

router.delete('/:cartItemId', (req, res) => {
  const idx = data.cartItems.findIndex(
    (ci) => ci.id === Number(req.params.cartItemId) && ci.userId === req.user.id
  );
  if (idx === -1) return res.status(404).json({ error: 'Елемент кошика не знайдено' });

  data.cartItems.splice(idx, 1);
  save();
  res.json(getCart(req.user.id));
});

module.exports = router;
