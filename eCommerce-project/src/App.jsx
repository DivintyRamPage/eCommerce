import { useState, useEffect, } from 'react'
import { HomePage } from './pages/home/HomePage'
import { CheckoutPage } from './pages/checkout/CheckoutPage'
import { LoginForm } from './forms/LoginForm'
import { SignUpForm } from './forms/SignUpForm'
import { Routes, Route } from 'react-router'
import { OrdersPage } from './pages/orders/OrdersPage'
import { WishlistPage } from './pages/wishlist/WishlistPage'
import { LogoutModal } from './forms/LogOutForm'
import axios from 'axios'
import './index.css'

function App() {
    const [authMode, setAuthMode] = useState(null)
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState(null)
    const [loggedOut, setLoggedOut] = useState(false)

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user')
        if (savedToken && savedUser) {
            setUser(JSON.parse(savedUser))
        }
    }, []);

    const loadCart = async () => {
        if (!user) return;
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("/api/cart", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCart(response.data);
        } catch (err) {
            console.error("Не вдалося завантажити кошик", err);
        }
    };

    useEffect(() => {
        if (user) {
            loadCart();
        } else {
            setCart(null);
        }
    }, [user]);

    function handleLoginSuccess(LoggedIn) {
        setUser(LoggedIn);
        setAuthMode(null);
    }

    function handleLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setLoggedOut(false)
    }
    return (
        <>
            <Routes>
                <Route
                    path='/'
                    element={
                        <HomePage
                            cart={cart}
                            loadCart={loadCart}
                            isLoggedIn={!!user}
                            userName={user?.name}
                            onLoginClick={() => setAuthMode('login')}
                            onLogoutClick={() => setLoggedOut(true)}
                        />
                    }
                >

                </Route>
                <Route
                    path='/cart'
                    element={
                        <CheckoutPage
                            cart={cart}
                            loadCart={loadCart}
                            isLoggedIn={!!user}
                            userName={user?.name}
                            onLoginClick={() => setAuthMode('login')}
                            onLogoutClick={() => setLoggedOut(true)}
                        />
                    }
                />
                <Route
                    path='/orders'
                    element={
                        <OrdersPage
                            cart={cart}
                            loadCart={loadCart}
                            isLoggedIn={!!user}
                            userName={user?.name}
                            onLoginClick={() => setAuthMode('login')}
                            onLogoutClick={() => setLoggedOut(true)}
                        />
                    }
                /><Route
                    path='/wishlist'
                    element={
                        <WishlistPage
                            cart={cart}
                            loadCart={loadCart}
                            isLoggedIn={!!user}
                            userName={user?.name}
                            onLoginClick={() => setAuthMode('login')}
                            onLogoutClick={() => setLoggedOut(true)}
                        />
                    }
                />

            </Routes>

            {authMode === 'login' && (
                <LoginForm
                    onSwitchToSignUp={() => setAuthMode('signup')}
                    onSuccess={handleLoginSuccess}
                    onClose={() => setAuthMode(null)}
                />
            )}

            {authMode === 'signup' && (
                <SignUpForm
                    onSuccess={handleLoginSuccess}
                    onSwitchToLogIn={() => setAuthMode('login')}
                    onClose={() => setAuthMode(null)}
                />
            )}
            {loggedOut && (
                <LogoutModal
                    onConfirm={handleLogout} onCancel={() => setLoggedOut(false)}
                />
            )}
        </>

    )
}

export default App
