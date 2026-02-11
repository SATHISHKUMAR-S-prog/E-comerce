import { Divider } from '@mui/material'
import React from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Order from './Order'
import OrderDetails from './OrderDetails'
import UserDetails from './UserDetails'
import Address from './Address'
import { useAppDispatch, useAppSelector } from '../../../State/Store'
import { logout } from '../../../State/AuthSlice'
import OrdersTable from './Order'

const menu = [
  {name:"Orders",path:"/account/orders"},
  {name:"Profile",path:"/account/"},
  {name:"saved card",path:"/account/saved-cart"},
  {name:"Addresses",path:"/account/addresses"},
  {name:"Log out",path:"/"}
]

const Account = () => {

const navigate = useNavigate()
const location = useLocation()
const dispatch = useAppDispatch()
const {auth} = useAppSelector(store => store)

const handleClick = (item:any) => {
  if(item.path === "/"){
    dispatch(logout(navigate))
  }else{ navigate(item.path)}
}

  return (
    <div className='min-h-screen px-5 mt-10 lg:px-52'>
        <div>
          <h1 className='pb-5 text-xl font-bold'>{auth.user?.fullname}</h1>
        </div>
        <Divider />
        <div className='grid grid-cols-1 lg:grid-cols-3 min-h-[70vh]'>
          <section className=' hidden lg:block h-full col-span-1 py-5 lg:border-r lg:pr-5'> 
            { menu.map( (item) => (
              <div onClick={() => handleClick(item)} key={item.name}
              className={` py-3 cursor-pointer  hover:text-white hover:bg-primary-color  px-5 rounded-md border-b ${item.path == location.pathname ? "bg-primary-color text-white" : "hover:bg-opacity-75"}`}>
                <p>{item.name}</p>
              </div>
            ))}
          </section>

          <section className='right lg:col-span-2 lg:pl-5 py-5'>
            <Routes>
              <Route path='/' element={<UserDetails />}/>
              <Route path='/orders' element={<Order />} />
              <Route path='/order/:orderId/:orderItemId' element={<OrderDetails />} />
              <Route path='/addresses' element={<Address />} />
            </Routes>
            {/* <Order /> */}
            {/* <OrderDetails /> */}
            {/* <UserDetails /> */}
            {/* <Address /> */}
          </section>
        </div>
    </div>
  )
}

export default Account