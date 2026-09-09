import { Product } from "./Product"

export function ProductGrid({ products, isLoggedIn, onLoginRequired }) {
    return (
        <div className="products-grid">
            {products.map((product) => (
                <Product
                    key={product.id}
                    product={product}
                    isLoggedIn={isLoggedIn}
                    onLoginRequired={onLoginRequired}
                />
            ))}
        </div>
    )
}