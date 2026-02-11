import React, { useEffect } from 'react'
import WishListProductCard from './WishListProductCard'
import { useAppDispatch, useAppSelector } from '../../../State/Store'
import { getWishListByUserId } from '../../../State/Customer/WishListSlice'

const WishList = () => {

const dispatch = useAppDispatch()
const {wishlist} = useAppSelector(store => store)

useEffect(()=>{
  dispatch(getWishListByUserId())
},[])

  return (
    <div className='h-[85vh] p-5 lg:p-20'>
      <section>
        <h1 className=""><strong>My Wishlist </strong>{wishlist.wishList?.products.length || 0} items</h1>
        <div className="pt-10 gap-5 grid grid-cols-2 md:grid-cols-6 justify-between">
        {wishlist.wishList?.products.map((item) => <WishListProductCard item={item}/>)}
        </div>
      </section>
    </div>
  )
}

export default WishList