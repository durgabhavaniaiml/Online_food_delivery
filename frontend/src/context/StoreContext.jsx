import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const StoreContext = createContext(null)

const BASE_URL = import.meta.env.VITE_API_URL || (typeof window !== 'undefined' && window.location.hostname !== 'localhost' ? '' : 'http://localhost:5000')

export const StoreProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({})
  const [token, setToken] = useState('')
  const [user, setUser] = useState(null)
  const [foodList, setFoodList] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchFoodList = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${BASE_URL}/api/food/list`)
      if (res.data.success) setFoodList(res.data.data)
    } catch (err) {
      console.error('Error fetching food:', err)
    } finally {
      setLoading(false)
    }
  }

  const addToCart = async (itemId) => {
    setCartItems(prev => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }))
    if (token) {
      await axios.post(`${BASE_URL}/api/cart/add`, { itemId }, { headers: { token } })
    }
  }

  const removeFromCart = async (itemId) => {
    setCartItems(prev => {
      const updated = { ...prev }
      if (updated[itemId] > 1) updated[itemId] -= 1
      else delete updated[itemId]
      return updated
    })
    if (token) {
      await axios.post(`${BASE_URL}/api/cart/remove`, { itemId }, { headers: { token } })
    }
  }

  const clearCart = () => setCartItems({})

  const getTotalCartAmount = () => {
    return Object.entries(cartItems).reduce((total, [id, qty]) => {
      const item = foodList.find(f => f._id === id)
      return item ? total + item.price * qty : total
    }, 0)
  }

  const getTotalCartCount = () => {
    return Object.values(cartItems).reduce((a, b) => a + b, 0)
  }

  const login = (data) => {
    setToken(data.token)
    setUser({ id: data.userId, name: data.name, isAdmin: data.isAdmin })
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify({ id: data.userId, name: data.name, isAdmin: data.isAdmin }))
  }

  const logout = () => {
    setToken('')
    setUser(null)
    setCartItems({})
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const loadCartData = async (tkn) => {
    try {
      const res = await axios.post(`${BASE_URL}/api/cart/get`, {}, { headers: { token: tkn } })
      if (res.data.success) setCartItems(res.data.cartData)
    } catch (err) {
      console.error('Error loading cart:', err)
    }
  }

  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    if (savedToken) {
      setToken(savedToken)
      if (savedUser) setUser(JSON.parse(savedUser))
      loadCartData(savedToken)
    }
    fetchFoodList()
  }, [])

  const value = {
    BASE_URL,
    foodList,
    loading,
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getTotalCartAmount,
    getTotalCartCount,
    token,
    user,
    login,
    logout,
    fetchFoodList,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
