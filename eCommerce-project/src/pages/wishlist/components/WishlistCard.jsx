import { formatMoney } from "../../../utils/money";

export function WishlistCard({ item, onRemove }) {
    return (
        <div className="wishlist-card">
            <button className="wishlist-card-remove" onClick={() => onRemove(item.product.id)}>
                🗑
            </button>

            <img
                className="wishlist-card-image"
                src={item.product.images[0]}
                alt={item.product.name}
            />

            <div className="wishlist-card-info">
                <p className="wishlist-card-name">{item.product.name}</p>

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
    );
}