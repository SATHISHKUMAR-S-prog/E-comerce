import { Divider, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { string } from 'yup'
import { useAppDispatch, useAppSelector } from '../State/Store'
import { logout } from '../State/AuthSlice'
import { sellerLogout } from '../State/Seller/SellerSlice'

interface menuItem {
    name: string,
    path: string,
    icon: any,
    activeIcon: any
} 

interface DrawerListProps  {
  menu:menuItem[],
  menu2:menuItem[],
}

const DrawerList = ({menu,menu2}:DrawerListProps) => {

const location = useLocation()
const navigate = useNavigate()
const dispatch = useAppDispatch()
const {auth,seller} = useAppSelector(store => store)

const handleLogout = () => {
  if(auth.isLoggedIn){
    dispatch(logout(navigate))
  }
  if(seller.isLoggedIn){
    dispatch(sellerLogout(navigate))
  }
}

  return (
    <div className='h-full'>
        <div className="flex flex-col h-full justify-between border-r w-[300px] py-5">
           
            <div className="space-y-2">
              {menu.map( (item,index) => (
                <div onClick={() => { navigate(item.path) }} className='pr-9 cursor-pointer' key={index}>
                  <span className={`${item.path == location.pathname ? "bg-primary-color text-white" : "text-primary-color"} flex items-center px-5 py-3 rounded-r-full`}>
                    <ListItemIcon>
                      {item.path == location.pathname ? item.activeIcon : item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                  </span>
                </div>
              ))}
            </div>

            <Divider />

            <div className="space-y-2">
              {menu2.map( (item,index) => (
                <div onClick={() => {
                  if(item.path == "/") handleLogout() 
                  navigate(item.path)}
                } className='pr-9 cursor-pointer' key={index}>
                  <span className={`${item.path == location.pathname ? "bg-primary-color text-white" : "text-primary-color"} flex items-center px-5 py-3 rounded-r-full`}>
                    <ListItemIcon>
                      {item.path == location.pathname ? item.activeIcon : item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                  </span>
                </div>
              ))}
            </div>
        </div>
    </div>
  )
}

export default DrawerList