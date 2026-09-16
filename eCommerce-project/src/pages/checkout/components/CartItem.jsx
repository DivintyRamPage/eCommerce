import { formatMoney } from "../../../utils/money";

export function CartItem({ item, onIncrease, onDecrease, onRemove }) {
    const price = item.product.discountPrice ?? item.product.price;

    return (
        <div className="cart-item">
            <img
                className="cart-item-image"
                src={item.product.images[0]}
                alt={item.product.name}
            />
            <div className="cart-item-info">
                <p className="cart-item-name">{item.product.name}</p>
                <p className="cart-item-price">{formatMoney(price)} за шт.</p>
            </div>
            <div className="cart-item-quantity">
                <button onClick={() => onDecrease(item.cartItemId, item.quantity - 1)} disabled={item.quantity <= 1}>−</button>
                <span>{item.quantity}</span>
                <button onClick={() => onIncrease(item.cartItemId, item.quantity + 1)}>+</button>
            </div>
            <div className="cart-item-total">
                {formatMoney(price * item.quantity)}
            </div>
            <button className="cart-item-remove" onClick={() => onRemove(item.cartItemId)}>🗑</button>
        </div>
    );
}