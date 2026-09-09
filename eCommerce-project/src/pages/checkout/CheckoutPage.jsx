import { Header } from "../../components/Header";
import { formatMoney } from "../../utils/money";
import { useState, useEffect } from "react";
import axios from "axios";
import "./CheckoutPage.css";



export function CheckoutPage({ isLoggedIn, userName, onLoginClick, onLogoutClick }) {
    const [cart, setCart] = useState(null)




    useEffect(() => {
        const getCartData = async () => {
            const token = localStorage.getItem('token')
            const response = await axios.get('/api/cart', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setCart(response.data)
        }
        getCartData()
    }, [])

    useEffect(() => {
        const postCart = async () => {
            const response = await axios.put(`/api/cart${cartItemId}`, {
                
            })
            setCart(response.data)
        }
        postCart()
    }, [])

    return (
        <>
            <Header
                isLoggedIn={isLoggedIn}
                userName={userName}
                onLoginClick={onLoginClick}
                onLogoutClick={onLogoutClick}
            />

            <div className="cart-page">
                <h1 className="cart-title">
                    Кошик <span className="cart-title-count">({mockCart.items.length} товари)</span>
                </h1>

                <div className="cart-layout">
                    <div className="cart-items">
                        {mockCart.items.map((item) => (
                            <div className="cart-item" key={item.cartItemId}>
                                <img
                                    className="cart-item-image"
                                    src={item.product.images[0]}
                                    alt={item.product.name}
                                />
                                <div className="cart-item-info">
                                    <p className="cart-item-name">{item.product.name}</p>
                                    <p className="cart-item-price">
                                        {formatMoney(item.product.discountPrice ?? item.product.price)} за шт.
                                    </p>
                                </div>
                                <div className="cart-item-quantity">
                                    <button>−</button>
                                    <span>{item.quantity}</span>
                                    <button>+</button>
                                </div>
                                <div className="cart-item-total">
                                    {formatMoney((item.product.discountPrice ?? item.product.price) * item.quantity)}
                                </div>
                                <button className="cart-item-remove">🗑</button>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <p className="cart-summary-title">Разом до сплати</p>
                        <div className="cart-summary-row">
                            <span>Товари ({mockCart.items.length})</span>
                            <span>{formatMoney(mockCart.total)}</span>
                        </div>
                        <div className="cart-summary-row">
                            <span>Доставка</span>
                            <span className="cart-summary-free">Безкоштовно</span>
                        </div>
                        <div className="cart-summary-divider"></div>
                        <div className="cart-summary-row cart-summary-row--total">
                            <span>До сплати</span>
                            <span>{formatMoney(mockCart.total)}</span>
                        </div>
                        <button className="cart-checkout-button button-primary">
                            Оформити замовлення
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}