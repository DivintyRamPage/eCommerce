const { data, save } = require('./store');
const { categories, products, reviews } = require('./seedData');

data.categories = categories.map((c) => ({ ...c }));
data.products = products.map((p) => ({ ...p }));
data.reviews = reviews.map((r) => ({
  ...r,
  userId: null,
  createdAt: new Date().toISOString(),
}));
data.users = [];
data.cartItems = [];
data.orders = [];
data.orderItems = [];

save();
console.log(`Готово: ${categories.length} категорій, ${products.length} товарів, ${reviews.length} відгуків.`);
