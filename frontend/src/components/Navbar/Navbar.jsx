import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext.jsx'
import './Navbar.css'

function Navbar() {
  const { token, user, logout, getTotalCartCount } = useContext(StoreContext)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const cartCount = getTotalCartCount()

  const handleLogout = () => {
    logout()
    navigate('/')
    setMenuOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">🍕</span>
          <span className="brand-name">FoodDash</span>
        </Link>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink></li>
          <li><NavLink to="/menu" onClick={() => setMenuOpen(false)}>Menu</NavLink></li>
          {token && <li><NavLink to="/my-orders" onClick={() => setMenuOpen(false)}>My Orders</NavLink></li>}
          {user?.isAdmin && <li><NavLink to="/admin" onClick={() => setMenuOpen(false)}>Admin</NavLink></li>}
        </ul>

        <div className="nav-actions">
          <Link to="/cart" className="cart-btn">
            <span className="cart-icon">🛒</span>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
          {token ? (
            <div className="user-menu">
              <span className="user-greeting">Hi, {user?.name?.split(' ')[0]}!</span>
              <button className="btn-logout" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div className="auth-btns">
              <Link to="/login" className="btn-login">Login</Link>
              <Link to="/register" className="btn-signup">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
