import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { StoreContext } from '../../context/StoreContext.jsx'
import './PlaceOrder.css'

function PlaceOrder() {
  const { cartItems, foodList, getTotalCartAmount, token, BASE_URL, clearCart } = useContext(StoreContext)
  const navigate = useNavigate()
  const DELIVERY_FEE = 40
  const subtotal = getTotalCartAmount()

  const [address, setAddress] = useState({
    firstName: '', lastName: '', email: '', street: '',
    city: '', state: '', zipcode: '', phone: '',
  })

  const handleChange = (e) => {
    setAddress(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const orderItems = foodList
      .filter(f => cartItems[f._id] > 0)
      .map(f => ({ ...f, quantity: cartItems[f._id] }))

    if (orderItems.length === 0) {
      toast.error('Cart is empty!')
      return
    }

    try {
      const res = await axios.post(
        `${BASE_URL}/api/order/place`,
        { items: orderItems, amount: subtotal + DELIVERY_FEE, address },
        { headers: { token } }
      )
      if (res.data.success) {
        // Simulate immediate confirmation
        await axios.post(`${BASE_URL}/api/order/verify`, { orderId: res.data.orderId })
        clearCart()
        toast.success('Order placed successfully! 🎉')
        navigate('/my-orders')
      } else {
        toast.error(res.data.message)
      }
    } catch (err) {
      toast.error('Something went wrong. Please check your connection.')
    }
  }

  return (
    <div className="place-order-page">
      <div className="page-header">
        <h1>Checkout</h1>
        <p>Complete your delivery details</p>
      </div>

      <form onSubmit={handleSubmit} className="order-form container">
        <div className="delivery-section">
          <h2>Delivery Information</h2>
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input name="firstName" value={address.firstName} onChange={handleChange} placeholder="John" required />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input name="lastName" value={address.lastName} onChange={handleChange} placeholder="Doe" required />
            </div>
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" name="email" value={address.email} onChange={handleChange} placeholder="john@example.com" required />
          </div>
          <div className="form-group">
            <label>Street Address</label>
            <input name="street" value={address.street} onChange={handleChange} placeholder="123 Main Street, Apt 4" required />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>City</label>
              <input name="city" value={address.city} onChange={handleChange} placeholder="Mumbai" required />
            </div>
            <div className="form-group">
              <label>State</label>
              <input name="state" value={address.state} onChange={handleChange} placeholder="Maharashtra" required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Zip Code</label>
              <input name="zipcode" value={address.zipcode} onChange={handleChange} placeholder="400001" required />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input name="phone" value={address.phone} onChange={handleChange} placeholder="+91 98765 43210" required />
            </div>
          </div>
        </div>

        <div className="order-summary-section">
          <h2>Order Summary</h2>
          <div className="order-items-list">
            {foodList
              .filter(f => cartItems[f._id] > 0)
              .map(food => (
                <div key={food._id} className="order-item">
                  <span className="order-item-name">{food.name} × {cartItems[food._id]}</span>
                  <span className="order-item-price">₹{food.price * cartItems[food._id]}</span>
                </div>
              ))}
          </div>
          <div className="order-totals">
            <div className="total-line">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="total-line">
              <span>Delivery Fee</span>
              <span>₹{DELIVERY_FEE}</span>
            </div>
            <div className="total-line grand">
              <span>Total</span>
              <span>₹{subtotal + DELIVERY_FEE}</span>
            </div>
          </div>

          <div className="payment-method">
            <h3>Payment Method</h3>
            <label className="payment-option active">
              <input type="radio" name="payment" defaultChecked />
              <span>💵 Cash on Delivery</span>
            </label>
          </div>

          <button type="submit" className="btn-place-order">
            Place Order →
          </button>
        </div>
      </form>
    </div>
  )
}

export default PlaceOrder
