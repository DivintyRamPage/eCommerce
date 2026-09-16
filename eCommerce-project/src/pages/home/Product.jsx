import { useState } from "react";
import axios from "axios";
import { formatMoney } from "../../utils/money";

export function Product({ product, isLoggedIn, onLoginRequired, loadCart }) {
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [favorite, setFavorite] = useState(false)

    async function addToCart() {
        if (!isLoggedIn) {
            onLoginRequired();
            return
        }

        setLoading(true)
        try {
            const token = localStorage.getItem('token');
            await axios.post('/api/cart', {
                productId: product.id,
                quantity
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            loadCart()
            setAdded(true);

            setTimeout(() => {
                setAdded(false)
            }, 2000);
        } catch (err) {
            alert(err.response?.data?.error || "Не вдалося додати товар")
        } finally {
            setLoading(false)
        }
    }

    const addToWishList = async() => {
        if (!isLoggedIn) {
            onLoginRequired();
            return
        }
        const token = localStorage.getItem('token')
        await axios.post('/api/wishlist', { productId: product.id }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setFavorite(!favorite)
    }

    const selectQuantity = (event) => {
        const quantitySelected = Number(event.target.value);
        setQuantity(quantitySelected);
    }

    return (
        <div className="product-container">
            <div className="product-image-container">
                <img className="product-image" src={product.images}
                />
            </div>

            <div className="product-name limit-text-to-2-lines">
                {product.name}
            </div>

            <div className="product-rating-container">
                <p>Rating: ★</p>
                <div className="product-rating-count link-primary">
                    {product.rating}
                </div>
            </div>

            <div className="product-price">
                {formatMoney(product.price)}
            </div>

            <div className="product-quantity-container" >
                <select value={quantity} onChange={selectQuantity}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
                <div className={`best-product-homepage ${favorite ? 'acti' : ''}`} onClick={addToWishList}>♥</div>
            </div>



            <div className="product-spacer"></div>

            <div className="added-to-cart" style={{ opacity: added ? 1 : 0 }} >
                Added
            </div>

            <button className="add-to-cart-button button-primary"
                onClick={addToCart}
                disabled={loading}>

                Add to Cart
            </button>
        </div>

    );
}