import { Header } from "../../components/Header"
import { useEffect, useState } from "react"
import { ProductGrid } from "./ProductGrid";
import { Category } from "./Categori";
import './HomePage.css'
import axios from 'axios'

export function HomePage({ isLoggedIn, userName, onLoginClick, onLogoutClick, cart, loadCart }) {
    const [products, setProduct] = useState([]);
    const [category, setCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null)

    useEffect(() => {
        const fetchCategory = async () => {
            const response = await axios.get('/api/categories')
            setCategory(response.data);
        }
        fetchCategory();
    }, [])

    useEffect(() => {
        const getHomeData = async () => {
            const response = await axios.get('/api/products', {
                params: {
                    category: selectedCategory || undefined
                }
            });
            setProduct(response.data.items)
        }
        getHomeData()
    }, [selectedCategory]);



    return (
        <>
            <Header isLoggedIn={isLoggedIn} onLoginClick={onLoginClick} userName={userName} onLogoutClick={onLogoutClick} cart={cart?.items || []} />

            <Category category={category} selected={selectedCategory} onSelect={setSelectedCategory} />

            <div className="home-page">
                <ProductGrid
                    loadCart={loadCart}
                    products={products}
                    isLoggedIn={isLoggedIn}
                    onLoginRequired={onLoginClick}
                />
            </div>
        </>
    )
}