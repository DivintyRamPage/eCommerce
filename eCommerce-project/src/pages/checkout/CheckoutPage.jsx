import { Header } from "../../components/Header";
import { formatMoney } from "../../utils/money";
import { useNavigate } from "react-router";
import axios from "axios";
import "./CheckoutPage.css";



export function CheckoutPage({ isLoggedIn, userName, onLoginClick, onLogoutClick, cart, loadCart }) {
    const updateQuantity = async (cartItemId, quantity) => {
        try {
            const token = localStorage.getItem('token')
            await axios.put(`/api/cart/${cartItemId}`, { quantity }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            loadCart()
        } catch {
            alert('Не вдалося оновити кількість')
        }
    }

    const deleteProduct = async (cartItemId) => {
        try {
            const token = localStorage.getItem('token')
            await axios.delete(`/api/cart/${cartItemId}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            loadCart()
        } catch {
            alert('Не вдалося видалити товар')
        }
    }

    const navigate = useNavigate()

    const createOrder = async () => {
        try {
            const token = localStorage.getItem('token')
            await axios.post(`/api/orders`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            await loadCart();

            navigate('/orders')
        } catch (error){
            alert(error.response?.data?.error || 'Не вдалося оформити замовлення')
        }
    }

    /*useEffect(() => {
        const putCart = async () => {
            const response = await axios.put(`/api/cart${cartItemId}`, {
                
            })
            setCart(response.data)
        }
        putCart()
    }, [])*/

    return (
        <>
            <Header
                isLoggedIn={isLoggedIn}
                userName={userName}
                onLoginClick={onLoginClick}
                onLogoutClick={onLogoutClick}
                cart={cart?.items || []}
            />

            <div className="cart-page">
                {!isLoggedIn && (
                    <div className="cart-page--centered">
                        <p>Увійдіть, щоб побачити кошик</p>
                        <button className="button-primary" onClick={onLoginClick}>Увійти</button>
                    </div>
                )}





                {isLoggedIn && (!cart?.items || cart.items.length === 0) && (
                    <div className="cart-page--centered">
                        <p>Кошик порожній</p>
                    </div>
                )}

                {isLoggedIn && cart?.items?.length > 0 && (
                    <>
                        <h1 className="cart-title">
                            Кошик <span className="cart-title-count">( {cart.items.length} товари)</span>
                        </h1>

                        <div className="cart-layout">
                            <div className="cart-items">
                                {cart.items.map((item) => (
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
                                            <button
                                                onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                                                disabled={item.quantity <= 1}
                                            >−</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => {
                                                updateQuantity(item.cartItemId, item.quantity + 1)

                                            }}>+</button>
                                        </div>
                                        <div className="cart-item-total">
                                            {formatMoney((item.product.discountPrice ?? item.product.price) * item.quantity)}
                                        </div>
                                        <button className="cart-item-remove" onClick={() => {
                                            deleteProduct(item.cartItemId)
                                        }}>🗑</button>
                                    </div>
                                ))}
                            </div>

                            <div className="cart-summary">
                                <p className="cart-summary-title">Разом до сплати</p>
                                <div className="cart-summary-row">
                                    <span>Товари ({cart.items.length})</span>
                                    <span>{formatMoney(cart.total)}</span>
                                </div>
                                <div className="cart-summary-row">
                                    <span>Доставка</span>
                                    <span className="cart-summary-free">Безкоштовно</span>
                                </div>
                                <div className="cart-summary-divider"></div>
                                <div className="cart-summary-row cart-summary-row--total">
                                    <span>До сплати</span>
                                    <span>{formatMoney(cart.total)}</span>
                                </div>
                                <button className="cart-checkout-button button-primary" onClick={createOrder}>
                                    Оформити замовлення
                                </button>
                            </div>
                        </div>

                    </>
                )}
            </div>
        </>
    );
}