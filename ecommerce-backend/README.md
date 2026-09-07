# eCommerce Backend (навчальний проєкт)

Node.js + Express + SQLite бекенд для практики фронтенд-розробки на React.
База наповнена 20 товарами (5 категорій), рейтингами та відгуками.

> Бекенд згенеровано з допомогою AI як навчальний інструмент для практики роботи з API.
> Фото товарів — плейсхолдери [picsum.photos](https://picsum.photos) (безкоштовні, без авторських прав).

## Стек
- Node.js + Express
- JSON-файл (`db.json`) як база — без нативних залежностей, працює на будь-якій версії Node.js
- JWT-авторизація (`jsonwebtoken`), хешування паролів (`bcryptjs`)

## Встановлення та запуск локально

1. Встанови [Node.js](https://nodejs.org/) версії 18+ (перевір: `node -v`).
2. Розпакуй архів і перейди в папку проєкту:
   ```bash
   cd ecommerce-backend
   ```
3. Встанови залежності:
   ```bash
   npm install
   ```
4. (Опціонально) скопіюй файл змінних середовища:
   ```bash
   cp .env.example .env
   ```
5. Наповни базу тестовими даними (створить файл `db.json` і засіє 20 товарів):
   ```bash
   npm run seed
   ```
6. Запусти сервер:
   ```bash
   npm start
   ```
   Або в режимі розробки з автоперезапуском:
   ```bash
   npm run dev
   ```
7. Перевір, що все працює: відкрий у браузері
   ```
   http://localhost:4000/api/health
   ```
   Має повернутись `{"status":"ok", ...}`.

Якщо захочеш почати "з чистого аркуша" — просто видали файл `db.json` і запусти `npm run seed` знову.

## Базовий URL
```
http://localhost:4000/api
```

## Ендпоінти

### Товари
| Метод | URL | Опис |
|---|---|---|
| GET | `/products` | Список товарів. Параметри query: `category` (slug), `search`, `sort` (`price_asc`\|`price_desc`\|`rating_desc`\|`newest`), `minPrice`, `maxPrice`, `page`, `limit` |
| GET | `/products/:id` | Один товар |
| GET | `/products/:id/reviews` | Відгуки товару |
| POST | `/products/:id/reviews` 🔒 | Додати відгук `{ rating, comment }` |

### Категорії
| Метод | URL | Опис |
|---|---|---|
| GET | `/categories` | Список категорій |

### Авторизація
| Метод | URL | Опис |
|---|---|---|
| POST | `/auth/register` | `{ name, email, password }` → `{ user, token }` |
| POST | `/auth/login` | `{ email, password }` → `{ user, token }` |

### Кошик 🔒 (потрібен токен)
| Метод | URL | Опис |
|---|---|---|
| GET | `/cart` | Отримати кошик |
| POST | `/cart` | Додати товар `{ productId, quantity }` |
| PUT | `/cart/:cartItemId` | Змінити кількість `{ quantity }` |
| DELETE | `/cart/:cartItemId` | Видалити з кошика |

### Замовлення 🔒 (потрібен токен)
| Метод | URL | Опис |
|---|---|---|
| POST | `/orders` | Оформити замовлення з поточного кошика |
| GET | `/orders` | Історія замовлень користувача |

🔒 — потрібен заголовок `Authorization: Bearer <token>`, який повертається при реєстрації/логіні.

## Приклад запиту (fetch у React)

```js
// Логін
const res = await fetch('http://localhost:4000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'test1@example.com', password: '123456' }),
});
const { user, token } = await res.json();

// Запит до захищеного маршруту
const cartRes = await fetch('http://localhost:4000/api/cart', {
  headers: { Authorization: `Bearer ${token}` },
});
const cart = await cartRes.json();
```

## Структура проєкту
```
ecommerce-backend/
├── db/
│   ├── store.js      # просте файлове сховище (db.json)
│   ├── seedData.js    # дані для наповнення (20 товарів)
│   └── seed.js        # скрипт наповнення бази
├── middleware/
│   └── auth.js        # перевірка JWT
├── routes/
│   ├── auth.js
│   ├── products.js
│   ├── categories.js
│   ├── cart.js
│   └── orders.js
├── server.js
├── package.json
└── .env.example
```

## Що можна практикувати на фронтенді
- Каталог товарів з фільтрами, пошуком, сортуванням і пагінацією
- Сторінка товару з рейтингом і відгуками (+ форма додавання відгуку)
- Реєстрація/логін, збереження токена (localStorage/context), захищені сторінки
- Кошик з оптимістичними оновленнями кількості
- Оформлення замовлення та історія замовлень
- Обробка станів loading/error/empty на кожному запиті
