import { NavLink } from "react-router"
import './Header.css'

export function Header({ isLoggedIn, userName, onLoginClick, onLogoutClick, cart }) {

    let totalQuantity = 0;

    cart.forEach((cartItem) => {
        totalQuantity += cartItem.quantity
    })

    return (
        <div className="header">
            <div className="left-section">
                <NavLink to='/' className='header-link'>
                    <img className='logo' src="images/Logo.png" alt="ShopEasy" />
                </NavLink>
            </div>

            <div className="middle-section">
                <input className='search-bar' type="text" name="" id="" />
                <button className="search-button">
                    <img className='search-icon' src="images/icons/search-icon.png" alt="" />
                </button>
            </div>

            <div className="right-section">
                {isLoggedIn ? (
                    <div className='two-tier header-link' onClick={onLogoutClick}>
                        <span className="two-tier__label">Привіт, {userName}</span>
                        <span className="two-tier__value">Вийти</span>
                    </div>
                ) : (
                    <div className='two-tier header-link' onClick={onLoginClick}>
                        <span className="two-tier__label">Привіт, гостю</span>
                        <span className="two-tier__value">Увійти</span>
                    </div>
                )}

                <NavLink className='two-tier header-link orders-link' to='/orders'>
                    <span className="two-tier__label">Мої</span>
                    <span className="two-tier__value">Замовлення</span>
                </NavLink>

                <NavLink className='best-link' to='/wishlist'>
                    <div className="best-product">♥</div>
                </NavLink>

                <NavLink className='cart-link' to='/cart'>
                    <span className="cart-icon-wrapper">
                        <img className="cart-icon" src="images/icons/cart-icon.png" alt="Кошик" />
                        <div className="cart-quantity">{totalQuantity}</div>
                    </span>
                    <span className="cart-text">Кошик</span>
                </NavLink>
            </div>
        </div>
    )
}