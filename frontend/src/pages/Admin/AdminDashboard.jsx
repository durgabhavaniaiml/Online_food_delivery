import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { StoreContext } from '../../context/StoreContext.jsx'
import './AdminDashboard.css'

const STATUS_OPTIONS = ['Food Processing', 'Out for Delivery', 'Delivered', 'Cancelled']
const CATEGORIES = ['Burgers', 'Pizza', 'Chinese', 'Sushi', 'Desserts', 'Drinks', 'Salads']

function AdminDashboard() {
  const { BASE_URL, fetchFoodList, foodList } = useContext(StoreContext)
  const [orders, setOrders] = useState([])
  const [activeTab, setActiveTab] = useState('orders')
  const [newFood, setNewFood] = useState({ name: '', description: '', price: '', category: 'Burgers' })
  const [image, setImage] = useState(null)

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/order/list`)
      if (res.data.success) setOrders(res.data.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchOrders()
    fetchFoodList()
  }, [])

  const handleStatusChange = async (orderId, status) => {
    try {
      const res = await axios.post(`${BASE_URL}/api/order/status`, { orderId, status })
      if (res.data.success) {
        toast.success('Status updated!')
        fetchOrders()
      }
    } catch (err) {
      toast.error('Failed to update status')
    }
  }

  const handleAddFood = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', newFood.name)
    formData.append('description', newFood.description)
    formData.append('price', newFood.price)
    formData.append('category', newFood.category)
    if (image) formData.append('image', image)

    try {
      const res = await axios.post(`${BASE_URL}/api/food/add`, formData)
      if (res.data.success) {
        toast.success('Food item added successfully! 🎉')
        setNewFood({ name: '', description: '', price: '', category: 'Burgers' })
        setImage(null)
        fetchFoodList()
      } else {
        toast.error(res.data.message)
      }
    } catch (err) {
      toast.error('Failed to add food')
    }
  }

  const handleRemoveFood = async (id) => {
    if (!window.confirm('Are you sure you want to remove this item?')) return
    try {
      const res = await axios.delete(`${BASE_URL}/api/food/remove/${id}`)
      if (res.data.success) {
        toast.success('Item removed!')
        fetchFoodList()
      }
    } catch (err) {
      toast.error('Failed to delete item')
    }
  }

  return (
    <div className="admin-page">
      <div className="page-header">
        <h1>Admin Dashboard</h1>
        <p>Manage orders, menu items, and store operations</p>
      </div>

      <div className="admin-container container">
        <div className="admin-tabs">
          <button className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>
            📦 Orders ({orders.length})
          </button>
          <button className={`tab-btn ${activeTab === 'food' ? 'active' : ''}`} onClick={() => setActiveTab('food')}>
            🍽️ Menu Items ({foodList.length})
          </button>
          <button className={`tab-btn ${activeTab === 'add' ? 'active' : ''}`} onClick={() => setActiveTab('add')}>
            ➕ Add Food Item
          </button>
        </div>

        {activeTab === 'orders' && (
          <div className="orders-list">
            {orders.length === 0 ? <p className="no-data">No orders yet.</p> : orders.map(order => (
              <div key={order._id} className="admin-order-card">
                <div className="admin-order-info">
                  <strong>#{order._id.slice(-8).toUpperCase()}</strong>
                  <span>{order.items?.map(i => `${i.name} x${i.quantity || 1}`).join(', ')}</span>
                  <span className="admin-amount">₹{order.amount}</span>
                  <span className="admin-addr">{order.address?.city || ''}, {order.address?.state || ''}</span>
                </div>
                <select
                  value={order.status}
                  onChange={e => handleStatusChange(order._id, e.target.value)}
                  className="status-select"
                >
                  {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'food' && (
          <div className="food-list-admin">
            {foodList.length === 0 ? <p className="no-data">No food items added yet.</p> : foodList.map(food => (
              <div key={food._id} className="admin-food-row">
                <span className="food-emoji">🍽️</span>
                <div className="food-info-admin">
                  <strong>{food.name}</strong>
                  <span>{food.category}</span>
                </div>
                <span className="food-price-admin">₹{food.price}</span>
                <button className="remove-btn" onClick={() => handleRemoveFood(food._id)}>🗑️ Remove</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'add' && (
          <form className="add-food-form" onSubmit={handleAddFood}>
            <h3>Add New Food Item</h3>
            <div className="form-group">
              <label>Food Name</label>
              <input value={newFood.name} onChange={e => setNewFood(p => ({...p, name: e.target.value}))} placeholder="e.g., Crispy Chicken Burger" required />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea value={newFood.description} onChange={e => setNewFood(p => ({...p, description: e.target.value}))} placeholder="Juicy patty with fresh lettuce, cheddar cheese and signature sauce" required rows={3} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Price (₹)</label>
                <input type="number" value={newFood.price} onChange={e => setNewFood(p => ({...p, price: e.target.value}))} placeholder="199" required min="1" />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select value={newFood.category} onChange={e => setNewFood(p => ({...p, category: e.target.value}))}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Food Image</label>
              <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} />
            </div>
            <button type="submit" className="btn-add-food">Add Food Item</button>
          </form>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
