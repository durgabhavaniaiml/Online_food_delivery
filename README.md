# 🍔 FoodDash — Online Food Delivery System (MERN Stack)

A complete full-stack online food delivery web application built with JavaScript across MongoDB Atlas, Express.js, React.js, and Node.js.

---

## ✨ Features

- **User Authentication:** Sign up & Login with secure password hashing (`bcryptjs`) and JWT token authentication.
- **Dynamic Food Menu:** Browse by category (Burgers, Pizza, Chinese, Sushi, Desserts, Drinks, Salads) with live search and price sorting.
- **Cart Management:** Add, remove, and manage quantities stored persistently both locally and in user cart database.
- **Checkout & Order Placement:** Delivery address capture, order calculation, delivery fee, and cash-on-delivery payment flow.
- **Order Tracking:** Track past orders with status badges (*Food Processing*, *Out for Delivery*, *Delivered*).
- **Admin Dashboard:** Admin view to update order status live and add new food items with images.

---

## 📁 Project Structure

```
Online_food_delivery/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB Atlas Mongoose connection
│   ├── controllers/
│   │   ├── authController.js     # User registration & login
│   │   ├── cartController.js     # User cart management
│   │   ├── foodController.js     # Food CRUD operations
│   │   └── orderController.js    # Order placing & admin status updates
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT token verification
│   ├── models/
│   │   ├── Food.js               # Food schema
│   │   ├── Order.js              # Order schema
│   │   └── User.js               # User schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── foodRoutes.js
│   │   └── orderRoutes.js
│   ├── uploads/                  # Uploaded food images
│   ├── .env                      # Database URI & JWT secret
│   ├── seed.js                   # Seed script for initial menu items
│   └── server.js                 # Express app entrypoint
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── FoodCard/         # Food item card with quantity controls
    │   │   ├── Footer/           # Human-crafted footer with links
    │   │   └── Navbar/           # Responsive navigation bar with cart badge
    │   ├── context/
    │   │   └── StoreContext.jsx  # Global cart, auth, and food store
    │   ├── pages/
    │   │   ├── Admin/            # Admin dashboard for orders & food items
    │   │   ├── Cart/             # Cart review & order summary
    │   │   ├── Home/             # Landing page with hero & categories
    │   │   ├── Login/            # User login
    │   │   ├── Menu/             # Full menu with filter & search
    │   │   ├── MyOrders/         # Order history & status
    │   │   ├── PlaceOrder/       # Delivery address & checkout
    │   │   └── Register/         # Account creation
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    └── package.json
```

---

## 🚀 How to Run

### 1. Start the Backend (Terminal 1)
```powershell
cd d:\projects\Online_food_delivery\backend
npm start
```
*Backend runs on:* `http://localhost:5000`

### 2. Start the Frontend (Terminal 2)
```powershell
cd d:\projects\Online_food_delivery\frontend
npm run dev
```
*Frontend runs on:* `http://localhost:5173`

---

## 🍽️ Database Management
The database is connected to your **MongoDB Atlas** cluster. To re-seed default dishes at any time:
```powershell
cd d:\projects\Online_food_delivery\backend
npm run seed
```
