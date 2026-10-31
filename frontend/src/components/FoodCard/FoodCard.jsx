import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext.jsx'
import './FoodCard.css'

function FoodCard({ food }) {
  const { cartItems, addToCart, removeFromCart, BASE_URL } = useContext(StoreContext)
  const quantity = cartItems[food._id] || 0

  return (
    <div className="food-card">
      <div className="food-img-wrap">
        <img
          src={food.image?.startsWith('http') ? food.image : `${BASE_URL}/images/${food.image}`}
          alt={food.name}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60'
          }}
        />
        <span className="food-category-badge">{food.category}</span>
        {quantity === 0 ? (
          <button className="add-btn" onClick={() => addToCart(food._id)}>+</button>
        ) : (
          <div className="qty-controls">
            <button onClick={() => removeFromCart(food._id)}>−</button>
            <span>{quantity}</span>
            <button onClick={() => addToCart(food._id)}>+</button>
          </div>
        )}
      </div>
      <div className="food-info">
        <div className="food-header">
          <h3 className="food-name">{food.name}</h3>
          <div className="food-rating">⭐ 4.8</div>
        </div>
        <p className="food-desc">{food.description}</p>
        <div className="food-footer">
          <span className="food-price">₹{food.price}</span>
          <span className="food-time">🕒 30-40 min</span>
        </div>
      </div>
    </div>
  )
}

export default FoodCard
