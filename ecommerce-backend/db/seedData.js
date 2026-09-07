// Тестові дані для наповнення бази.
// Фото — плейсхолдери з picsum.photos (детерміновані за "seed", безкоштовні для будь-якого використання).
// Для "бойового" проєкту заміни на власні фото товарів або фото з unsplash.com (безкоштовна ліцензія).

const categories = [
  { id: 1, name: 'Електроніка', slug: 'electronics' },
  { id: 2, name: 'Одяг', slug: 'clothing' },
  { id: 3, name: 'Дім і побут', slug: 'home' },
  { id: 4, name: 'Спорт', slug: 'sport' },
  { id: 5, name: 'Краса та здоров\'я', slug: 'beauty' },
];

function img(seed, w = 600, h = 600) {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}

const products = [
  {
    id: 1, name: 'Бездротові навушники SoundX Pro', categoryId: 1, brand: 'SoundX',
    price: 2499, discountPrice: 1999, stock: 34, rating: 4.6, reviewsCount: 128,
    description: 'Навушники з активним шумозаглушенням, до 30 годин роботи від акумулятора та швидкою зарядкою.',
    tags: ['audio', 'bluetooth', 'anc'],
    images: [img('headphones1'), img('headphones1b')]
  },
  {
    id: 2, name: 'Смарт-годинник PulseWatch 5', categoryId: 1, brand: 'PulseTech',
    price: 3299, discountPrice: null, stock: 21, rating: 4.3, reviewsCount: 87,
    description: 'Моніторинг пульсу, сну та тренувань, водозахист 5 ATM, до 7 днів роботи.',
    tags: ['wearable', 'fitness'],
    images: [img('smartwatch1'), img('smartwatch1b')]
  },
  {
    id: 3, name: 'Портативна колонка BoomBox Mini', categoryId: 1, brand: 'BoomBox',
    price: 1199, discountPrice: 899, stock: 50, rating: 4.1, reviewsCount: 54,
    description: 'Компактна Bluetooth-колонка з захистом від бризок IPX6 та басом, що вражає для свого розміру.',
    tags: ['audio', 'portable'],
    images: [img('speaker1')]
  },
  {
    id: 4, name: 'Механічна клавіатура KeyForge TKL', categoryId: 1, brand: 'KeyForge',
    price: 2799, discountPrice: null, stock: 15, rating: 4.8, reviewsCount: 201,
    description: 'Клавіатура на hot-swap перемикачах, RGB-підсвітка, алюмінієвий корпус.',
    tags: ['gaming', 'peripherals'],
    images: [img('keyboard1')]
  },
  {
    id: 5, name: 'Бездротова миша GlideMouse X', categoryId: 1, brand: 'GlideTech',
    price: 899, discountPrice: null, stock: 60, rating: 4.4, reviewsCount: 76,
    description: 'Ергономічна миша з сенсором 16000 DPI та безшумними кліками.',
    tags: ['peripherals'],
    images: [img('mouse1')]
  },
  {
    id: 6, name: 'Повербанк ChargeCore 20000mAh', categoryId: 1, brand: 'ChargeCore',
    price: 999, discountPrice: 749, stock: 45, rating: 4.5, reviewsCount: 143,
    description: 'Швидка зарядка PD 20W, два виходи USB-C/USB-A, вистачить на кілька повних зарядок телефону.',
    tags: ['accessories'],
    images: [img('powerbank1')]
  },
  {
    id: 7, name: 'Чоловіча куртка StormShield', categoryId: 2, brand: 'StormShield',
    price: 2199, discountPrice: 1699, stock: 18, rating: 4.2, reviewsCount: 39,
    description: 'Водовідштовхувальна куртка з мембраною для міста та легких походів.',
    tags: ['jacket', 'outdoor'],
    images: [img('jacket1')]
  },
  {
    id: 8, name: 'Жіноча сукня Aurora Midi', categoryId: 2, brand: 'Aurora',
    price: 1450, discountPrice: null, stock: 27, rating: 4.7, reviewsCount: 62,
    description: 'Легка сукня-міді з натуральної тканини, вільний крій.',
    tags: ['dress', 'summer'],
    images: [img('dress1')]
  },
  {
    id: 9, name: 'Кросівки Runlite Air', categoryId: 2, brand: 'Runlite',
    price: 1899, discountPrice: 1599, stock: 40, rating: 4.5, reviewsCount: 174,
    description: 'Легкі бігові кросівки з амортизуючою підошвою.',
    tags: ['shoes', 'running'],
    images: [img('sneakers1'), img('sneakers1b')]
  },
  {
    id: 10, name: 'Джинси Classic Denim Slim', categoryId: 2, brand: 'DenimCo',
    price: 1199, discountPrice: null, stock: 55, rating: 4.0, reviewsCount: 48,
    description: 'Класичні джинси зі стрейчем для комфортної посадки.',
    tags: ['jeans'],
    images: [img('jeans1')]
  },
  {
    id: 11, name: 'Набір каструль CookMaster Pro', categoryId: 3, brand: 'CookMaster',
    price: 3599, discountPrice: 2999, stock: 12, rating: 4.6, reviewsCount: 91,
    description: 'Набір з 5 каструль з антипригарним покриттям та скляними кришками.',
    tags: ['kitchen'],
    images: [img('pots1')]
  },
  {
    id: 12, name: 'Робот-пилосос CleanBot 300', categoryId: 3, brand: 'CleanBot',
    price: 5999, discountPrice: 4999, stock: 9, rating: 4.3, reviewsCount: 66,
    description: 'Автоматичне прибирання з мапуванням приміщення та підтримкою застосунку.',
    tags: ['smart-home'],
    images: [img('vacuum1')]
  },
  {
    id: 13, name: 'Настільна лампа LumiDesk', categoryId: 3, brand: 'Lumi',
    price: 599, discountPrice: null, stock: 70, rating: 4.4, reviewsCount: 35,
    description: 'LED-лампа з регулюванням яскравості та температури світла.',
    tags: ['lighting'],
    images: [img('lamp1')]
  },
  {
    id: 14, name: 'Плед Soft Cloud 150x200', categoryId: 3, brand: 'SoftHome',
    price: 749, discountPrice: 599, stock: 80, rating: 4.8, reviewsCount: 112,
    description: 'М\'який плед з мікрофібри, приємний до тіла та легкий у догляді.',
    tags: ['textile'],
    images: [img('blanket1')]
  },
  {
    id: 15, name: 'Йога-мат FlexFit Pro', categoryId: 4, brand: 'FlexFit',
    price: 899, discountPrice: null, stock: 44, rating: 4.5, reviewsCount: 58,
    description: 'Нековзний мат товщиною 6 мм для йоги та фітнесу.',
    tags: ['yoga', 'fitness'],
    images: [img('yogamat1')]
  },
  {
    id: 16, name: 'Гантелі розбірні PowerSet 20кг', categoryId: 4, brand: 'PowerSet',
    price: 1799, discountPrice: 1499, stock: 22, rating: 4.6, reviewsCount: 47,
    description: 'Комплект розбірних гантель для домашніх тренувань, пара по 10 кг.',
    tags: ['strength'],
    images: [img('dumbbells1')]
  },
  {
    id: 17, name: 'Велосипедний шолом SafeRide', categoryId: 4, brand: 'SafeRide',
    price: 1099, discountPrice: null, stock: 30, rating: 4.2, reviewsCount: 29,
    description: 'Легкий вентильований шолом із регулюванням розміру.',
    tags: ['cycling', 'safety'],
    images: [img('helmet1')]
  },
  {
    id: 18, name: 'Набір для догляду за шкірою GlowRitual', categoryId: 5, brand: 'GlowRitual',
    price: 1299, discountPrice: 999, stock: 38, rating: 4.7, reviewsCount: 156,
    description: 'Очищення, тонік та зволожуючий крем для щоденного ритуалу догляду.',
    tags: ['skincare'],
    images: [img('skincare1')]
  },
  {
    id: 19, name: 'Електрична зубна щітка BrightSmile', categoryId: 5, brand: 'BrightSmile',
    price: 1399, discountPrice: null, stock: 41, rating: 4.4, reviewsCount: 83,
    description: 'Звукова щітка з 3 режимами чищення та таймером 2 хвилини.',
    tags: ['oral-care'],
    images: [img('toothbrush1')]
  },
  {
    id: 20, name: 'Фен для волосся AeroStyle 2200W', categoryId: 5, brand: 'AeroStyle',
    price: 1599, discountPrice: 1299, stock: 26, rating: 4.3, reviewsCount: 71,
    description: 'Потужний фен з іонізацією для швидкого сушіння без пошкодження волосся.',
    tags: ['haircare'],
    images: [img('hairdryer1')]
  },
];

const reviewTexts = [
  { name: 'Олена К.', comment: 'Дуже задоволена покупкою, якість перевищила очікування!' },
  { name: 'Максим П.', comment: 'Все як в описі, доставили швидко.' },
  { name: 'Ірина В.', comment: 'Непогано, але очікувала трохи кращої якості за такі гроші.' },
  { name: 'Андрій С.', comment: 'Рекомендую, користуюсь вже місяць — жодних нарікань.' },
  { name: 'Наталія Д.', comment: 'Хороше співвідношення ціна/якість.' },
];

// Генеруємо по 2-4 відгуки на кожен товар
const reviews = [];
let reviewId = 1;
products.forEach((p) => {
  const count = 2 + (p.id % 3);
  for (let i = 0; i < count; i++) {
    const base = reviewTexts[(p.id + i) % reviewTexts.length];
    reviews.push({
      id: reviewId++,
      productId: p.id,
      userName: base.name,
      rating: Math.max(3, Math.min(5, Math.round(p.rating) + (i % 2 === 0 ? 0 : -1))),
      comment: base.comment,
    });
  }
});

module.exports = { categories, products, reviews };
