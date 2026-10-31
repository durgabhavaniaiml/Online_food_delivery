import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext.jsx'
import './MyOrders.css'

const statusColors = {
  'Food Processing': '#f59e0b',
  'Out for Delivery': '#3b82f6',
  'Delivered': '#22c55e',
  'Cancelled': '#ef4444',
}

const statusIcons = {
  'Food Processing': '⏳',
  'Out for Delivery': '🚴',
  'Delivered': '✅',
  'Cancelled': '❌',
}

function MyOrders() {
  const { token, BASE_URL } = useContext(StoreContext)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const res = await axios.post(`${BASE_URL}/api/order/userorders`, {}, { headers: { token } })
      if (res.data.success) setOrders(res.data.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) fetchOrders()
  }, [token])

  if (loading) return <div className="loading-spinner" style={{height:'60vh'}}><div className="spinner"></div></div>

  return (
    <div className="orders-page">
      <div className="page-header">
        <h1>My Orders</h1>
        <p>{orders.length} order{orders.length !== 1 ? 's' : ''} placed</p>
      </div>

      <div className="orders-container container">
        {orders.length === 0 ? (
          <div className="no-orders">
            <div style={{fontSize:'64px', marginBottom:'16px'}}>📦</div>
            <h3>No orders yet</h3>
            <p>You haven't placed any orders. Start ordering delicious meals!</p>
            <Link to="/menu" className="btn-primary" style={{display:'inline-block',marginTop:'20px'}}>
              Order Now
            </Link>
          </div>
        ) : (
          orders.map(order => (
            <div key={order._id} className="order-card">
              <div className="order-card-header">
                <div className="order-id">
                  <span className="order-icon">📦</span>
                  <div>
                    <p className="order-num">Order #{order._id.slice(-8).toUpperCase()}</p>
                    <p className="order-date">{new Date(order.date).toLocaleDateString('en-IN', { year:'numeric', month:'long', day:'numeric' })}</p>
                  </div>
                </div>
                <div
                  className="order-status"
                  style={{ backgroundColor: `${statusColors[order.status] || '#f59e0b'}20`, color: statusColors[order.status] || '#f59e0b' }}
                >
                  {statusIcons[order.status] || '⏳'} {order.status}
                </div>
              </div>

              <div className="order-items-preview">
                {order.items.slice(0, 4).map((item, i) => (
                  <span key={i} className="item-tag">{item.name} × {item.quantity}</span>
                ))}
                {order.items.length > 4 && <span className="item-tag more">+{order.items.length - 4} more</span>}
              </div>

              <div className="order-card-footer">
                <div className="order-meta">
                  <span>{order.items.reduce((a,b) => a + (b.quantity || 1), 0)} items</span>
                  <span className="dot">•</span>
                  <span className="order-amount">₹{order.amount}</span>
                </div>
                <button className="track-btn" onClick={fetchOrders}>
                  🔄 Refresh Status
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default MyOrders
