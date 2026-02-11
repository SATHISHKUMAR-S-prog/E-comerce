import React from 'react'
import { useAppSelector } from '../../../../State/Store'
import ShopByCategoryCard from './ShopByCategoryCard'

const ShopByCategory = () => {
   const {customer} = useAppSelector(store => store)
  return (
    <div className='py-5 md:py-20 mx-10 sm:mx-2'>
      <h1 className='text-lg lg:text-4xl font-bold text-primary-color p-5 lg:pb-10 text-center'>SHOP BY CATEGORY</h1>
   <div className='flex flex-wrap justify-between gap-3 lg:px-20 lg:gap-7'>
    {customer.homepageData?.shopByCategory.map( (item, index) => <ShopByCategoryCard key={index} item={item} />)}
   </div>
   </div>
  )
}

export default ShopByCategory