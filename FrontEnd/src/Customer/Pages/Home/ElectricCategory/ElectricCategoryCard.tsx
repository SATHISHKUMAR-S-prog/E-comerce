import React from 'react'
import { HomeCategory } from '../../../../Types/HomeCategoryType'
import { useNavigate } from 'react-router-dom'

const ElectricCategoryCard = ({item}:{item:HomeCategory}) => {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(`/products/${item.categoryId}/${item.name}`)
}
  return (
    <div className='flex flex-col items-center justify-center gap-2' onClick={handleNavigate}>
        <img className='object-contain h-10' src={item.images} alt='laptop' />
        <h1 className='font-semibold text-sm'>{item.name}</h1>
    </div>
  )
}

export default ElectricCategoryCard