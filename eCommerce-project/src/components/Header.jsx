import { NavLink } from "react-router"
import './Header.css'

export function Header() {
    return (
        <div className="header">
            <div className="left-section">
                <NavLink to='/' className='header-link'>
                    <img className='logo' src="images/Logo.png" alt="" />
                    <img className="mobile-logo" src="" alt="" />
                </NavLink>
            </div>

            <div className="middle-section">
                <input className='search-bar' type="text" name="" id="" />

                <button className="search-button">
                    <img className='search-icon' src="images/icon/search-icon.png" alt="" />
                </button>
            </div>

            <div className="right-section">
                <NavLink className='orders-link header-link' to='/orders'>
                    <span className="orders-text">Orders</span>
                </NavLink>

                <NavLink className='cart-link'>
                    <img className="cart-icon" src="images/icons/cart-icon.png" />
                    <div className="cart-quantity">3</div>
                    <div className="cart-text">Cart</div>
                </NavLink>
                <NavLink className='best-link'>
                    <div className="best-product">♥</div>
                </NavLink>

                <div className="forms">
                    <div className="sign-in-form"> <a href="">Sign in/</a></div>
                    <div className="log-in-form"> <a href="">Log in</a></div>
                </div>
            </div>
        </div>
    )
}