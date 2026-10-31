import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import FoodCard from '../../components/FoodCard/FoodCard'
import { StoreContext } from '../../context/StoreContext.jsx'
import './Home.css'

const categories = [
  { name: 'All', icon: '🍽️' },
  { name: 'Burgers', icon: '🍔' },
  { name: 'Pizza', icon: '🍕' },
  { name: 'Chinese', icon: '🍜' },
  { name: 'Sushi', icon: '🍱' },
  { name: 'Desserts', icon: '🍰' },
  { name: 'Drinks', icon: '🥤' },
  { name: 'Salads', icon: '🥗' },
]

function Home() {
  const { foodList, loading } = useContext(StoreContext)
  const [activeCategory, setActiveCategory] = useState('All')

  const featured = activeCategory === 'All'
    ? foodList.slice(0, 8)
    : foodList.filter(f => f.category?.toLowerCase() === activeCategory.toLowerCase()).slice(0, 8)

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">🔥 Fast & Fresh Delivery</div>
          <h1 className="hero-title">
            Craving something <span>delicious?</span>
          </h1>
          <p className="hero-subtitle">
            Order from the best restaurants near you. Fresh, hot food delivered right to your door in 30 minutes or less.
          </p>
          <div className="hero-actions">
            <Link to="/menu" className="btn-hero-primary">Order Now</Link>
            <Link to="/menu" className="btn-hero-outline">Explore Menu</Link>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-num">50+</span>
              <span className="stat-label">Restaurants</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-num">10K+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-num">30 min</span>
              <span className="stat-label">Avg Delivery</span>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-img-circle">
            <span className="hero-emoji">🍕</span>
          </div>
          <div className="floating-card card-1">🍔 Burger <br/><small>Just ordered!</small></div>
          <div className="floating-card card-2">⭐ 4.9 <br/><small>Rating</small></div>
          <div className="floating-card card-3">🚴 On the way <br/><small>~15 min</small></div>
        </div>
      </section>

      {/* How it works */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title" style={{textAlign:'center'}}>How It Works</h2>
          <p className="section-subtitle" style={{textAlign:'center'}}>Order food in 3 simple steps</p>
          <div className="steps">
            <div className="step">
              <div className="step-icon">🔍</div>
              <h3>Browse Menu</h3>
              <p>Explore dishes from top restaurants near you</p>
            </div>
            <div className="step-arrow">→</div>
            <div className="step">
              <div className="step-icon">🛒</div>
              <h3>Add to Cart</h3>
              <p>Select your favourites and customize your meal</p>
            </div>
            <div className="step-arrow">→</div>
            <div className="step">
              <div className="step-icon">🚀</div>
              <h3>Fast Delivery</h3>
              <p>Your food arrives hot and fresh at your doorstep</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">What are you craving?</h2>
          <p className="section-subtitle">Choose from our wide range of categories</p>
          <div className="categories-grid">
            {categories.map(cat => (
              <button
                key={cat.name}
                className={`category-chip ${activeCategory === cat.name ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.name)}
              >
                <span className="cat-icon">{cat.icon}</span>
                <span className="cat-name">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Foods */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header-row">
            <div>
              <h2 className="section-title">
                {activeCategory === 'All' ? 'Featured Dishes' : activeCategory}
              </h2>
              <p className="section-subtitle">Handpicked favourites from our menu</p>
            </div>
            <Link to="/menu" className="view-all-btn">View All →</Link>
          </div>
          {loading ? (
            <div className="loading-spinner"><div className="spinner"></div></div>
          ) : featured.length > 0 ? (
            <div className="food-grid">
              {featured.map(food => <FoodCard key={food._id} food={food} />)}
            </div>
          ) : (
            <div className="empty-state">
              <p>No items in this category yet. Check back soon!</p>
              <Link to="/menu" className="btn-primary">Browse All</Link>
            </div>
          )}
        </div>
      </section>

      {/* Banner */}
      <section className="promo-banner">
        <div className="container">
          <div className="promo-content">
            <div>
              <h2>Get 20% off your first order!</h2>
              <p>Use code <strong>WELCOME20</strong> at checkout. Fresh food delivered hot.</p>
            </div>
            <Link to="/menu" className="btn-promo">Order Now →</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
