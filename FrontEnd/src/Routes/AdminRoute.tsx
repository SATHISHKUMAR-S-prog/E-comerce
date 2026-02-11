import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SellersTable from '../Admin/Pages/Sellers/SellersTable'
import Coupons from '../Admin/Pages/Coupons/Coupons'
import AddNewCouponForm from '../Admin/Pages/Coupons/AddNewCouponForm'
import Deals from '../Admin/Pages/HomePages/Deals.'
import ShopByCategory from '../Admin/Pages/HomePages/ShopByCategory'
import ElectronicsCategory from '../Admin/Pages/HomePages/ElectronicsCategory'
import GridCategory from '../Admin/Pages/HomePages/GridCategory'
import Account from '../Admin/Pages/Account/Account'

const AdminRoute = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<SellersTable />} />
            <Route path='/coupon' element={<Coupons />} />
            <Route path='/add-coupon' element={<AddNewCouponForm />} />
            <Route path='/home-grid' element={<GridCategory />} />
            <Route path='/electronics-category' element={<ElectronicsCategory />} />
            <Route path='/shop-by-category' element={<ShopByCategory />} />
            <Route path='/deals' element={<Deals />} />
            <Route path='/account' element={<Account />} />
        </Routes>
    </div>
  )
}

export default AdminRoute