import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            <span>🍕</span>
            <span>FoodDash</span>
          </div>
          <p>Your favourite food, delivered fast &amp; fresh right to your doorstep. Order now and taste the difference.</p>
          <div className="social-links">
            <a href="#" aria-label="Facebook">📘</a>
            <a href="#" aria-label="Twitter">🐦</a>
            <a href="#" aria-label="Instagram">📷</a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/my-orders">My Orders</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Categories</h4>
          <ul>
            <li><Link to="/menu">Burgers</Link></li>
            <li><Link to="/menu">Pizza</Link></li>
            <li><Link to="/menu">Chinese</Link></li>
            <li><Link to="/menu">Desserts</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact Us</h4>
          <ul>
            <li>📍 123 Food Street, Mumbai</li>
            <li>📞 +91 98765 43210</li>
            <li>✉️ hello@fooddash.com</li>
            <li>🕒 Open: 10 AM – 11 PM</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 FoodDash. Made with ❤️ for food lovers.</p>
      </div>
    </footer>
  )
}

export default Footer
