import { Product } from "./Product"

export function ProductGrid({ products, isLoggedIn, onLoginRequired, loadCart }) {
    return (
        <div className="products-grid">
            {products.map((product) => (
                <Product
                loadCart={loadCart}
                    key={product.id}
                    product={product}
                    isLoggedIn={isLoggedIn}
                    onLoginRequired={onLoginRequired}
                />
            ))}
        </div>
    )
}