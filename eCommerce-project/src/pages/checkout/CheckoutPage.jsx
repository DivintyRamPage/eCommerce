import { Header } from "../../components/Header";
import { CartSummary } from "./components/CartSummary";
import { CartItem } from "./components/CartItem";
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
        } catch (error) {
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
                                    <CartItem
                                        key={item.cartItemId}
                                        item={item}
                                        onIncrease={updateQuantity}
                                        onDecrease={updateQuantity}
                                        onRemove={deleteProduct}
                                    />
                                ))}
                            </div>

                            <CartSummary
                                itemsCount={cart.items.length}
                                total={cart.total}
                                onCheckout={createOrder}
                            />

                        </div>

                    </>
                )}
            </div>
        </>
    );
}