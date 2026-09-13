import { Header } from "../../components/Header";
import { formatMoney } from "../../utils/money";
import "./OrdersPage.css";

export function OrdersPage({ isLoggedIn, userName, onLoginClick, onLogoutClick, cart }) {
    // тут будуть твої useState: orders, loading, error

    // тут буде функція loadOrders (GET /api/orders)

    // тут буде useEffect, який викликає loadOrders при isLoggedIn

    const statusLabels = {
        pending: 'В обробці',
        completed: 'Виконано',
        cancelled: 'Скасовано',
    };

    return (
        <>
            <Header
                isLoggedIn={isLoggedIn}
                userName={userName}
                onLoginClick={onLoginClick}
                onLogoutClick={onLogoutClick}
                cart={cart?.items || []}
            />

            <div className="orders-page">
                {!isLoggedIn && (
                    <div className="orders-page--centered">
                        <p>Увійдіть, щоб побачити свої замовлення</p>
                        <button className="button-primary" onClick={onLoginClick}>Увійти</button>
                    </div>
                )}

                {/* тут: стан loading — "Завантаження замовлень..." */}

                {/* тут: стан error — текст помилки + кнопка "Спробувати ще раз" */}

                {/* тут: orders.length === 0 — "У вас ще немає замовлень" */}

                {/* тут: orders.length > 0 — список нижче */}
                <>
                    <h1 className="orders-title">Мої замовлення</h1>

                    <div className="orders-list">
                        {/* orders.map(order => ( */}
                        <div className="order-card">
                            <div className="order-card-header">
                                <div>
                                    <p className="order-card-id">Замовлення №{/* order.id */}</p>
                                    <p className="order-card-date">{/* дата order.createdAt */}</p>
                                </div>
                                <span className="order-status order-status--pending">
                                    {/* statusLabels[order.status] */}
                                </span>
                            </div>

                            <div className="order-card-items">
                                {/* order.items.map(item => ( */}
                                <div className="order-item-row">
                                    <span className="order-item-name">
                                        {/* item.name */} <span className="order-item-qty">× {/* item.quantity */}</span>
                                    </span>
                                    <span className="order-item-price">
                                        {/* formatMoney(item.price * item.quantity) */}
                                    </span>
                                </div>
                                {/* )) */}
                            </div>

                            <div className="order-card-total">
                                <span>Разом</span>
                                <span>{/* formatMoney(order.total) */}</span>
                            </div>
                        </div>
                        {/* )) */}
                    </div>
                </>
            </div>
        </>
    );
}