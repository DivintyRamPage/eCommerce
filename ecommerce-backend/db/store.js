// Просте файлове сховище даних у JSON — без нативних залежностей,
// тому працює однаково на будь-якій версії Node.js та ОС без компіляторів.

const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'db.json');

function emptyData() {
  return {
    categories: [],
    products: [],
    reviews: [],
    users: [],
    cartItems: [],
    orders: [],
    orderItems: [],
  };
}

function loadDb() {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify(emptyData(), null, 2));
  }
  const raw = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(raw);
}

const data = loadDb();

function save() {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// Наступний вільний id для колекції (масиву об'єктів з полем id)
function nextId(collectionName) {
  const items = data[collectionName];
  const max = items.reduce((m, it) => Math.max(m, it.id || 0), 0);
  return max + 1;
}

module.exports = { data, save, nextId, DB_PATH };
