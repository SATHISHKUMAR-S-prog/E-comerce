import React, { useEffect, useState } from 'react'
import { Close, LocalOffer } from '@mui/icons-material'
import { teal } from '@mui/material/colors'
import { Button, IconButton, TextField } from '@mui/material'
import PricingCart from './PricingCart'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../State/Store'
import { fetchUserCart } from '../../../State/Customer/CartSlice'
import CartItemCard from './CartItemCard'
import { applyCoupon } from '../../../State/Customer/CouponSlice'
import { enqueueSnackbar } from 'notistack'


const Cart = () => {

const [couponCode, setCouponCode] = useState("")
const navigate = useNavigate()
const dispatch = useAppDispatch()
const {cart,coupon} = useAppSelector(store => store)

const handleChange = (e:any) => {
  setCouponCode(e.target.value)
}

const handleCoupon = async (apply:string) => {
  let orderValue = cart.cart?.totalItem || 0
  try {
    await dispatch(applyCoupon({apply:apply,code:couponCode,orderValue:orderValue,jwt:localStorage.getItem("jwt") || ""}))
    .unwrap().then(()=>{
      getCart()
      enqueueSnackbar(apply === "true"? "Coupon Appiled":"Coupon Removed",{
        variant:"success",
        anchorOrigin:{vertical:"top",horizontal:"right"}
      })
    })
  } catch (error) {
    enqueueSnackbar(apply === "true" ? "Failed to apply coupon" : "Failed to remove Coupon",{
      variant:"error",
      anchorOrigin:{vertical:"top",horizontal:"right"}
    })
  }
}

useEffect(() => {
 getCart()
},[dispatch])

const getCart = async () => {
  await dispatch(fetchUserCart(localStorage.getItem("jwt"))).unwrap()
  .catch((error) => {
    enqueueSnackbar("Failed to load cart",{
      variant:"error",
      anchorOrigin:{vertical:"top",horizontal:"right"}
    })
  })
  // console.log("cart fetched")
}
  
  return (
    <div className='pt-10 px-5 md:px-10 lg:px-60 min-h-screen'>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
        <div className='cartitemSection lg:col-span-2 space-y-3'>
          {cart.cart?.cartItem.map( item => <CartItemCard item={item}/>)}
        </div>

        <div className='col-span-1 space-y-3 text-sm'>
          <div className='border rounded-md px-5 py-3 space-y-5'>
              
              <div className='flex gap-3 text-sm items-center'>
                <div className='flex gap-3 text-sm items-center'>
                  <LocalOffer sx={{color:teal[600],fontSize:'17px'}} />
                </div>
                <span className=''>Apply Coupons</span>
              </div>
              
             {!coupon.couponApplied ? <div className='flex justify-between items-center'>
                <TextField id="outlined-basic" 
                  onChange={handleChange}
                  placeholder='Coupon code'
                  value={couponCode}
                  size='small'
                  variant="outlined" />
                <Button size='small' onClick={() => handleCoupon("true")}>
                  Apply
                </Button>
              </div> :
              <div className='flex'>
                <div className='p-1 pl-5 pr-3 flex border rounded-md gap-2 items-center'>
                  <span className=''>Coupon Appiled</span>  
                  <IconButton size='small' onClick={() => handleCoupon("false")}>
                    <Close className='text-red-600'/>
                  </IconButton>
                </div>
              </div>}
          </div>
          
          <div className='border rounded-md'>

            <PricingCart />
            
            <div className='p-5'>
              <Button 
                onClick={() => navigate("/checkout")}
                fullWidth 
                variant='contained' 
                sx={{py:"11px"}} >
                  Buy Now
                </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Cart