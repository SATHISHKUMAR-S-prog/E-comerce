import React from 'react'
import { Deal } from '../../../../Types/DealType'
import { useNavigate } from 'react-router-dom'

const DealsCard = ({item}:{item:Deal}) => {

  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(`/products/${item.category.categoryId}/${item.category.name}`)
}
  return (
    <div className='w-[12rem] md:[13rem] lg:w-[14rem] h-[15rem] md:h-[20rem] cursor-pointer ' onClick={handleNavigate}>
        <div className="h-[9rem] md:h-[13rem]">
        <img className='border-x-[7px] border-t-[7px] border-pink-600 h-[100%] object-cover w-full ' src={item.category.images} alt="" />
        </div>
        <div className='border-4 border-black bg-black text-white p-2 text-center'>
            <p className='text-md md:text-lg font-semibold'>{item.category.name}</p>
            <p className='md:text-2xl font-bold text-xl'>{item.discount}% OFF</p>
            <p className='text-balance text-md md:text-lg'>Shop now</p>
        </div>
    </div>
  )
}

export default DealsCard