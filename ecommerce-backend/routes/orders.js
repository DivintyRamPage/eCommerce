const express = require('express');
const { data, save, nextId } = require('../db/store');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();
router.use(requireAuth);

router.post('/', (req, res) => {
  const cartItems = data.cartItems
    .filter((ci) => ci.userId === req.user.id)
    .map((ci) => ({ ...ci, product: data.products.find((p) => p.id === ci.productId) }));

  if (cartItems.length === 0) {
    return res.status(400).json({ error: 'Кошик порожній' });
  }

  for (const item of cartItems) {
    if (item.quantity > item.product.stock) {
      return res.status(400).json({
        error: `Недостатньо товару "${item.product.name}" на складі (доступно: ${item.product.stock})`,
      });
    }
  }

  const total = cartItems.reduce(
    (sum, i) => sum + (i.product.discountPrice ?? i.product.price) * i.quantity,
    0
  );

  const order = {
    id: nextId('orders'),
    userId: req.user.id,
    total,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  data.orders.push(order);

  cartItems.forEach((item) => {
    data.orderItems.push({
      id: nextId('orderItems'),
      orderId: order.id,
      productId: item.productId,
      quantity: item.quantity,
      price: item.product.discountPrice ?? item.product.price,
    });
    item.product.stock -= item.quantity;
  });

  data.cartItems = data.cartItems.filter((ci) => ci.userId !== req.user.id);
  save();

  res.status(201).json({ orderId: order.id, total, message: 'Замовлення оформлено' });
});

router.get('/', (req, res) => {
  const orders = data.orders
    .filter((o) => o.userId === req.user.id)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .map((o) => ({
      id: o.id,
      total: o.total,
      status: o.status,
      createdAt: o.createdAt,
      items: data.orderItems
        .filter((oi) => oi.orderId === o.id)
        .map((oi) => ({
          quantity: oi.quantity,
          price: oi.price,
          name: data.products.find((p) => p.id === oi.productId)?.name,
        })),
    }));
  res.json(orders);
});

module.exports = router;
