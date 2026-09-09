import { useState, useEffect, } from 'react'
import { HomePage } from './pages/home/HomePage'
import { CheckoutPage } from './pages/checkout/CheckoutPage'
import { LoginForm } from './forms/LoginForm'
import { SignUpForm } from './forms/SignUpForm'
import { Routes, Route } from 'react-router'
import './index.css'

function App() {
    const [authMode, setAuthMode] = useState(null)
    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user')
        if (savedToken && savedUser) {
            setUser(JSON.parse(savedUser))
        }
    }, []);

    function handleLoginSuccess(LoggedIn) {
        setUser(LoggedIn);
        setAuthMode(null);
    }

    function handleLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    }
    return (
        <>
            <Routes>
                <Route
                    path='/'
                    element={
                        <HomePage
                            isLoggedIn={!!user}
                            userName={user?.name}
                            onLoginClick={() => setAuthMode('login')}
                            onLogoutClick={handleLogout}
                        />
                    }
                >

                </Route>
                <Route
                    path='/cart'
                    element={
                        <CheckoutPage
                            isLoggedIn={!!user}
                            userName={user?.name}
                            onLoginClick={() => setAuthMode('login')}
                            onLogoutClick={handleLogout}
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
        </>

    )
}

export default App


/*import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import { HomePage } from "./pages/home/HomePage";
import { CartPage } from "./pages/cart/CartPage";
import { LoginForm } from "./forms/LoginForm";
import { SignUpForm } from "./forms/SignUpForm";
import "./index.css";

function App() {
    const [user, setUser] = useState(null);
    const [authView, setAuthView] = useState(null); // null | 'login' | 'signup'

    // При завантаженні сторінки перевіряємо, чи юзер вже логінений раніше
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        const savedToken = localStorage.getItem("token");
        if (savedUser && savedToken) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    function handleLoginSuccess(loggedInUser) {
        setUser(loggedInUser);
        setAuthView(null);
    }

    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    }

    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                        <HomePage
                            isLoggedIn={!!user}
                            userName={user?.name}
                            onLoginClick={() => setAuthView("login")}
                            onLogoutClick={handleLogout}
                        />
                    }
                />
                <Route
                    path="/cart"
                    element={
                        <CartPage
                            isLoggedIn={!!user}
                            userName={user?.name}
                            onLoginClick={() => setAuthView("login")}
                            onLogoutClick={handleLogout}
                        />
                    }
                />
            </Routes>

            {/* Модалки авторизації рендеряться ПОЗА Routes — не прив'язані до конкретної сторінки }
            {authView === "login" && (
                <LoginForm
                    onClose={() => setAuthView(null)}
                    onSwitchToSignUp={() => setAuthView("signup")}
                    onLoginSuccess={handleLoginSuccess}
                />
            )}

            {authView === "signup" && (
                <SignUpForm
                    onClose={() => setAuthView(null)}
                    onSwitchToLogin={() => setAuthView("login")}
                    onLoginSuccess={handleLoginSuccess}
                />
            )}
        </>
    );
}

export default App*/