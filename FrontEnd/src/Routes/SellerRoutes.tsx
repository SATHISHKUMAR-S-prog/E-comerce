import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DashBoard from '../Seller/Pages/SellerDashboard/DashBoard'
import Products from '../Seller/Pages/Products/Products'
import AddProduct from '../Seller/Pages/Products/AddProduct'
import Orders from '../Seller/Pages/Orders/Orders'
import Transaction from '../Seller/Pages/Payments/Transaction'
import Profile from '../Seller/Pages/Account/Profile'
import Payment from '../Seller/Pages/Payments/Payment'

const SellerRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<DashBoard />}/>
            <Route path='/products' element={<Products />}/>
            <Route path='/add-product' element={<AddProduct />}/>
            <Route path='/orders' element={<Orders />}/>
            <Route path='/payment' element={<Payment />}/>
            <Route path='/transaction' element={<Transaction />}/>
            <Route path='/account' element={<Profile />}/>
        </Routes>
    </div>
  )
}

export default SellerRoutes