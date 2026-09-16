import { formatMoney } from "../../../utils/money";

const statusLabels = {
    pending: 'В обробці',
    completed: 'Виконано',
    cancelled: 'Скасовано',
};

export function OrderCard({ order }) {
    return (
        <div className="order-card">
            <div className="order-card-header">
                <div>
                    <p className="order-card-id">Замовлення №{order.id}</p>
                    <p className="order-card-date">
                        {new Date(order.createdAt).toLocaleDateString('uk-UA', {
                            day: 'numeric', month: 'long', year: 'numeric'
                        })}
                    </p>
                </div>
                <span className={`order-status order-status--${order.status}`}>
                    {statusLabels[order.status] || order.status}
                </span>
            </div>

            <div className="order-card-items">
                {order.items.map((item, i) => (
                    <div className="order-item-row" key={i}>
                        <span className="order-item-name">
                            {item.name} <span className="order-item-qty">× {item.quantity}</span>
                        </span>
                        <span className="order-item-price">
                            {formatMoney(item.price * item.quantity)}
                        </span>
                    </div>
                ))}
            </div>

            <div className="order-card-total">
                <span>Разом</span>
                <span>{formatMoney(order.total)}</span>
            </div>
        </div>
    );
}