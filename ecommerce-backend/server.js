require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const productsRouter = require('./routes/products');
const categoriesRouter = require('./routes/categories');
const authRouter = require('./routes/auth');
const cartRouter = require('./routes/cart');
const ordersRouter = require('./routes/orders');
const wishlistRouter = require('./routes/wishlist');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/auth', authRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/wishlist', wishlistRouter);

// 404
app.use((req, res) => {
  res.status(404).json({ error: `Маршрут ${req.method} ${req.originalUrl} не знайдено` });
});

// Обробник помилок
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Внутрішня помилка сервера' });
});

app.listen(PORT, () => {
  console.log(`✅ Сервер запущено: http://localhost:${PORT}`);
  console.log(`   Перевірка: http://localhost:${PORT}/api/health`);
});