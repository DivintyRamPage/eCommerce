import { Header } from "../../components/Header";
import { useState, useEffect } from "react";
import { formatMoney } from "../../utils/money";
import axios from "axios";
import "./WishlistPage.css";

export function WishlistPage({ isLoggedIn, userName, onLoginClick, onLogoutClick, cart, loadCart }) {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const getWishList = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/wishlist', {
                headers:
                {
                    Authorization: `Bearer ${token}`
                }
            })
            setWishlist(response.data.items)
        } catch {
            setError('Не вдалось отримати ')
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (isLoggedIn) {
            getWishList()
        } else {
            setLoading(false)
        }
    }, [isLoggedIn])

    const removeFromWishlist = async (productId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`/api/wishlist/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            getWishList();
        } catch {
            alert('Не вдалося видалити товар з обраного');
        }
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

            <div className="wishlist-page">
                {!isLoggedIn && (
                    <div className="wishlist-page--centered">
                        <p>Увійдіть, щоб побачити обране</p>
                        <button className="button-primary" onClick={onLoginClick}>Увійти</button>
                    </div>
                )}
                {isLoggedIn && loading && (
                    <div className="wishlist-page--centered">Завантаження обраного...</div>
                )}
                {isLoggedIn && !loading && error && (
                    <div className="wishlist-page--centered">
                        <p className="wishlist-error">{error}</p>
                        <button className="button-primary" onClick={getWishList}>Спробувати ще раз</button>
                    </div>
                )}
                {isLoggedIn && !loading && !error && wishlist.length === 0 && (
                    <div className="wishlist-page--centered">
                        <div className="wishlist-empty-icon">🤍</div>
                        <p>У вас ще немає обраних товарів</p>
                        <a href="/" className="button-primary">До каталогу</a>
                    </div>
                )}


                {isLoggedIn && !loading && !error && wishlist.length > 0 && (
                    <>
                        <h1 className="wishlist-title">Обране</h1>

                        <div className="wishlist-grid">
                            {wishlist.map((item) => {
                                return (
                                    <div className="wishlist-card">
                                        <button className="wishlist-card-remove" onClick={() => removeFromWishlist(item.product.id)}>
                                            🗑  
                                        </button>

                                        <img
                                            className="wishlist-card-image"
                                            src={item.product.images[0]}
                                            alt={item.product.name}
                                        />

                                        <div className="wishlist-card-info">
                                            <p className="wishlist-card-name">
                                                {item.product.name}
                                            </p>

                                            <div className="wishlist-card-rating">
                                                ★ {item.product.rating}
                                                <span className="wishlist-card-reviews">
                                                    ({item.product.reviewsCount})
                                                </span>
                                            </div>

                                            <div className="wishlist-card-price">
                                                <span className="wishlist-card-price-main">
                                                    {formatMoney(item.product.discountPrice ?? item.product.price)}
                                                </span>
                                                {item.product.discountPrice && (
                                                    <span className="wishlist-card-price-old">
                                                        {formatMoney(item.product.price)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <button className="wishlist-card-add-btn button-primary">
                                            Додати в кошик
                                        </button>
                                    </div>
                                )

                            })}


                        </div>
                    </>
                )}

            </div>
        </>
    );
}