import { Divider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../../State/Store'

const PricingCart = () => {
  const {cart} = useAppSelector(store => store)
  const [mrpPrice,setMrpPrice] = useState(0)
  const [discount,setDiscount] = useState(0)
  const [selleingPrice,setSellingprice] = useState(0)

  useEffect(() => {
    // sumMrpPrice()
    sumDiscountPrice()
    // sumSelPrice()
  },[cart])

  // const sumMrpPrice = async () => {
  //   let price = 0
  //   cart.cart?.cartItem.forEach((item) => {
  //     price += item.mrpPrice
  //   })
  //   setMrpPrice(price)
  // }

  const sumDiscountPrice = async () => {
    let price = (((cart.cart?.totalMrpPrice || 0) - (cart.cart?.totalSellingPrice || 0)) ) || 0
    
    setDiscount(price)
  }

  // const sumSelPrice = async () => {
  //   let price = 0
  //   cart.cart?.cartItem.forEach((item) => {
  //     price += item.sellingPrice
  //   })
  //   setSellingprice(price)
  // }
  return (
    <>
      <div className='space-y-3 p-5'>
        <div className='flex justify-between items-center'>
          <span>Subtotal</span>
          <span> ₹ {cart.cart?.totalMrpPrice}</span>
        </div>

        <div className='flex justify-between items-center'>
          <span>Discount</span>
          <span> ₹ {discount}</span>
        </div>

        <div className='flex justify-between items-center'>
          <span>Shipping charge</span>
          <span>Free</span>
        </div>

        <div className='flex justify-between items-center'>
          <span>Platform Fee</span>
          <span> Free</span>
        </div>

      </div>
      
      <Divider />

      <div className='flex justify-between items-center p-5 text-primary-color'>
        <span>Total</span>
        <span> ₹ {cart.cart?.totalSellingPrice}</span>
      </div>
    </>
  )
}

export default PricingCart