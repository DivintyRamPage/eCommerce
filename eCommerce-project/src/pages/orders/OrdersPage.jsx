import { Header } from "../../components/Header";
import { formatMoney } from "../../utils/money";
import "./OrdersPage.css";

export function OrdersPage({ isLoggedIn, userName, onLoginClick, onLogoutClick, cart }) {


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

                <>
                    <h1 className="orders-title">Мої замовлення</h1>

                    <div className="orders-list">

                        <div className="order-card">
                            <div className="order-card-header">
                                <div>
                                    <p className="order-card-id">Замовлення №</p>
                                    <p className="order-card-date"></p>
                                </div>
                                <span className="order-status order-status--pending">
                                    
                                </span>
                            </div>

                            <div className="order-card-items">
                                
                                <div className="order-item-row">
                                    <span className="order-item-name">
                                         <span className="order-item-qty">× </span>
                                    </span>
                                    <span className="order-item-price">
                                        
                                    </span>
                                </div>
                               
                            </div>

                            <div className="order-card-total">
                                <span>Разом</span>
                                <span></span>
                            </div>
                        </div>
                        
                    </div>
                </>
            </div>
        </>
    );
}