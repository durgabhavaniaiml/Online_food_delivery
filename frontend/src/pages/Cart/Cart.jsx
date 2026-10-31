import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext.jsx'
import './Cart.css'

function Cart() {
  const { cartItems, foodList, removeFromCart, addToCart, getTotalCartAmount, token } = useContext(StoreContext)
  const navigate = useNavigate()
  const DELIVERY_FEE = 40
  const subtotal = getTotalCartAmount()
  const cartFoods = foodList.filter(f => cartItems[f._id] > 0)

  const handleCheckout = () => {
    if (!token) navigate('/login')
    else navigate('/order')
  }

  if (cartFoods.length === 0) {
    return (
      <div className="cart-empty">
        <div className="empty-cart-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/menu" className="btn-primary">Browse Menu</Link>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="page-header">
        <h1>Your Cart</h1>
        <p>{cartFoods.length} item{cartFoods.length > 1 ? 's' : ''} in your cart</p>
      </div>

      <div className="cart-layout container">
        <div className="cart-items">
          <div className="cart-table-header">
            <span>Item</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Total</span>
          </div>

          {cartFoods.map(food => (
            <div key={food._id} className="cart-row">
              <div className="cart-item-info">
                <div className="cart-item-img">
                  <span>🍽️</span>
                </div>
                <div>
                  <h4>{food.name}</h4>
                  <span className="cart-item-category">{food.category}</span>
                </div>
              </div>
              <div className="cart-price">₹{food.price}</div>
              <div className="cart-qty">
                <button onClick={() => removeFromCart(food._id)}>−</button>
                <span>{cartItems[food._id]}</span>
                <button onClick={() => addToCart(food._id)}>+</button>
              </div>
              <div className="cart-total">₹{food.price * cartItems[food._id]}</div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="summary-row">
            <span>Delivery Fee</span>
            <span>₹{subtotal === 0 ? 0 : DELIVERY_FEE}</span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-row total-row">
            <span>Total</span>
            <span>₹{subtotal === 0 ? 0 : subtotal + DELIVERY_FEE}</span>
          </div>
          <button className="btn-checkout" onClick={handleCheckout}>
            Proceed to Checkout →
          </button>
          <Link to="/menu" className="continue-shopping">← Continue Shopping</Link>
        </div>
      </div>
    </div>
  )
}

export default Cart
