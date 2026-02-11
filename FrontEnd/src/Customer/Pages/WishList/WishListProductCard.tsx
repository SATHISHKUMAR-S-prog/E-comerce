import React from 'react'
import { Product } from '../../../Types/ProductType'
import { Button } from '@mui/material'
import { Close } from '@mui/icons-material'
import { useAppDispatch } from '../../../State/Store'
import { addProductToWishList } from '../../../State/Customer/WishListSlice'
import { teal } from '@mui/material/colors'

const WishListProductCard = ({item}:{item:Product}) => {

    const dispatch = useAppDispatch()

const handleWishlist = (event:any) => {
  event.stopPropagation()
  item.id && dispatch(addProductToWishList({productId:item.id}))
}

  return (
    <><div className='w-50 md:w-[12rem]  relative'>
    <div className="w-full">
        <img src={item.images[0]} className='object-cover w-full object-top h-[13rem] lg:h-[15rem]' alt="" />
    </div>
    <div className="pt-3 space-y-1">
        <h1>{item.title}</h1>
        <div className='price flex items-center gap-3 '>
            <span className='font-sans text-gray-800'>  ₹ {item.sellingPrice}</span>
            <span className='thin-line-through text-gray-400'>₹ {item.mrpPrice}</span>
            <span className="text-primary-color font-semibold">{item.discountPercent}%</span>
        </div>
    </div>
    <div className="absolute top-1 right-1">
        <button onClick={handleWishlist}>
            <Close className='bg-white cursor-pointer rounded-full p-1' sx={{color:teal[500],fontSize:"2rem"}}/>
        </button>
    </div>
</div></>
  )
}

export default WishListProductCard