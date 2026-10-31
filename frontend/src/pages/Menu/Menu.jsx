import React, { useContext, useState } from 'react'
import FoodCard from '../../components/FoodCard/FoodCard'
import { StoreContext } from '../../context/StoreContext.jsx'
import './Menu.css'

const categories = ['All', 'Burgers', 'Pizza', 'Chinese', 'Sushi', 'Desserts', 'Drinks', 'Salads']

function Menu() {
  const { foodList, loading } = useContext(StoreContext)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('default')

  let filtered = foodList
  if (category !== 'All') filtered = filtered.filter(f => f.category?.toLowerCase() === category.toLowerCase())
  if (search) filtered = filtered.filter(f => f.name?.toLowerCase().includes(search.toLowerCase()))
  if (sort === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price)
  if (sort === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price)

  return (
    <div className="menu-page">
      <div className="page-header">
        <h1>Our Menu</h1>
        <p>Explore all our fresh and tasty dishes</p>
      </div>

      <div className="menu-controls container">
        <div className="search-wrap">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search dishes..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="search-input"
          />
          {search && <button className="clear-search" onClick={() => setSearch('')}>✕</button>}
        </div>
        <select value={sort} onChange={e => setSort(e.target.value)} className="sort-select">
          <option value="default">Sort by: Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      <div className="menu-layout container">
        <aside className="menu-sidebar">
          <h3>Categories</h3>
          <ul>
            {categories.map(cat => (
              <li key={cat}>
                <button
                  className={`cat-btn ${category === cat ? 'active' : ''}`}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div className="menu-main">
          <p className="result-count">{filtered.length} items found</p>
          {loading ? (
            <div className="loading-spinner"><div className="spinner"></div></div>
          ) : filtered.length > 0 ? (
            <div className="food-grid">
              {filtered.map(food => <FoodCard key={food._id} food={food} />)}
            </div>
          ) : (
            <div className="empty-state">
              <div style={{fontSize:'60px', marginBottom:'16px'}}>🍽️</div>
              <h3>No dishes found</h3>
              <p>Try adjusting your search or category filter</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Menu
