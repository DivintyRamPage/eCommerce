import { Header } from "../../components/Header";
import { useState, useEffect } from "react";
import axios from 'axios'
import { formatMoney } from "../../utils/money";
import "./OrdersPage.css";

export function OrdersPage({ isLoggedIn, userName, onLoginClick, onLogoutClick, cart }) {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const getOrders = async () => {
        setLoading(true)
        setError(false)
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get('/api/orders', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setOrders(response.data)
        } catch {
            setError('Не вдалося завантажити замовлення');
        } finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        if (isLoggedIn) {
            getOrders()
        } else {
            setLoading(false)
        }
    }, [isLoggedIn])

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

                {isLoggedIn && loading && (
                    <div className="orders-page--centered">Завантаження замовлень...</div>
                )}

                {isLoggedIn && !loading && error && (
                    <div className="orders-page--centered">
                        <p className="orders-error">{error}</p>
                        <button className="button-primary" onClick={getOrders}>Спробувати ще раз</button>
                    </div>
                )}

                {isLoggedIn && !loading && !error && orders.length === 0 && (
                    <div className="orders-page--centered">
                        <div className="orders-empty-icon">📦</div>
                        <p>У вас ще немає замовлень</p>
                        <a href="/" className="button-primary">До каталогу</a>
                    </div>
                )}
                {isLoggedIn && !loading && !error && orders.length > 0 && (
                    <>
                        <h1 className="orders-title">Мої замовлення</h1>

                        <div className="orders-list">
                            {orders.map((order) => {
                                return (
                                    < div className="order-card" key={order.id} >
                                        <div className="order-card-header">
                                            <div>
                                                <p className="order-card-id">Замовлення №{order.id}</p>
                                                <p className="order-card-date">{new Date(order.createdAt).toLocaleDateString('uk-UA', {
                                                    day: 'numeric', month: 'long', year: 'numeric'
                                                })}</p>
                                            </div>
                                            <span className={`order-status order-status--${order.status}`}>
                                                {statusLabels[order.status] || order.status}
                                            </span>
                                        </div>

                                        <div className="order-card-items">
                                            {order.items.map((item, i) => (
                                                <div className="order-item-row" key={i}>
                                                    <span className="order-item-name">
                                                        {item.name} <span className="order-item-qty">× {item.quantity}</span>
                                                    </span>
                                                    <span className="order-item-price">
                                                        {formatMoney(item.price * item.quantity)}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="order-card-total">
                                            <span>Разом</span>
                                            <span>{formatMoney(order.total)}</span>
                                        </div>
                                    </div>
                                )
                            })}


                        </div>
                    </>
                )}

            </div >
        </>
    );
}