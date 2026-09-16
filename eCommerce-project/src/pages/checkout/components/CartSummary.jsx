import { formatMoney } from "../../../utils/money";

export function CartSummary({ itemsCount, total, onCheckout }) {
    return (
        <div className="cart-summary">
            <p className="cart-summary-title">Разом до сплати</p>
            <div className="cart-summary-row">
                <span>Товари ({itemsCount})</span>
                <span>{formatMoney(total)}</span>
            </div>
            <div className="cart-summary-row">
                <span>Доставка</span>
                <span className="cart-summary-free">Безкоштовно</span>
            </div>
            <div className="cart-summary-divider"></div>
            <div className="cart-summary-row cart-summary-row--total">
                <span>До сплати</span>
                <span>{formatMoney(total)}</span>
            </div>
            <button className="cart-checkout-button button-primary" onClick={onCheckout}>
                Оформити замовлення
            </button>
        </div>
    );
}