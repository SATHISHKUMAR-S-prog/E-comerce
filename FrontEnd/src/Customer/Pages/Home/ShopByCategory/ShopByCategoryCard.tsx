import React from 'react'
import "./ShopBycategory.css"
import { HomeCategory } from '../../../../Types/HomeCategoryType'
import { useNavigate } from 'react-router-dom'

const ShopByCategoryCard = ({item}:{item:HomeCategory}) => {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(`/products/${item.categoryId}/${item.name}`)
}
  return (
  <div className='flex gap-3 flex-col justify-center items-center group cursor-pointer' onClick={handleNavigate}>
    <div className='custome-border w-[150px] h-[150px] lg:h-[249px] lg:w-[249px] rounded-full bg-primary-color '>
      <img className='rounded-full group-hover:scale-95 transition-transform transform-duriation-700 object-cover h-full w-full  '
      src={item.images} alt="" />
    
    </div>
    <h1>{item.name}</h1>
  </div>
  )
}

export default ShopByCategoryCard