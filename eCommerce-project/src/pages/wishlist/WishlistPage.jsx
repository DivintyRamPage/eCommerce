import { Header } from "../../components/Header";
import { WishlistCard } from "./components/WishlistCard";
import { useState, useEffect } from "react";
import axios from "axios";
import "./WishlistPage.css";

export function WishlistPage({ isLoggedIn, userName, onLoginClick, onLogoutClick, cart }) {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const getWishList = async () => {
        setLoading(true);
        setError(false);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/wishlist', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setWishlist(response.data.items);
        } catch {
            setError('Не вдалось отримати обране');
        } finally {
            setLoading(false);
        }
    };

    const removeFromWishlist = async (productId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`/api/wishlist/${productId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            getWishList();
        } catch {
            alert('Не вдалося видалити товар з обраного');
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            getWishList();
        } else {
            setLoading(false);
        }
    }, [isLoggedIn]);

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
                            {wishlist.map((item) => (
                                <WishlistCard
                                    key={item.wishlistItemId}
                                    item={item}
                                    onRemove={removeFromWishlist}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}