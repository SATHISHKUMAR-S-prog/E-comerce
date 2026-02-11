import React from 'react'
import { useAppSelector } from '../../../../State/Store'
import { useNavigate } from 'react-router-dom'

const GridCategory = () => {
    const {customer } = useAppSelector(store => store)
    const navigate = useNavigate()

    const handleNavigate = (index:number) => {
        navigate(`/products/${customer.homepageData?.gird[index].categoryId}/${customer.homepageData?.gird[index].name}`)
    }
  return (
    <div className='grid pt-3 lg:gap-4 gap-1 md:gap-2 grid-rows-12 grid-cols-12 lg:h-[600px] md:px-5 lg:px-20'>
        <div className='col-span-3 row-span-12 text-white sm:gap-5'>
            <img className='w-full h-full object-cover object-top rounded' 
            onClick={() => handleNavigate(0)}
            src={customer.homepageData?.gird[0].images} alt="" />
        </div>
        <div className='col-span-2 row-span-6 text-white'>
            <img className='w-full h-full object-cover object-top rounded' 
            onClick={() => handleNavigate(1)}
            src={customer.homepageData?.gird[1].images} alt="" />
        </div>
        <div className='col-span-4 row-span-6 text-white'>
            <img className='w-full h-full object-cover object-top rounded' 
            onClick={() => handleNavigate(2)}
            src={customer.homepageData?.gird[2].images} alt="" />
        </div>
        <div className='col-span-3 row-span-12 text-white'>
            <img className='w-full h-full object-cover object-top rounded' 
            onClick={() => handleNavigate(3)}
            src={customer.homepageData?.gird[3].images} alt="" />
        </div>
        <div className='col-span-4 row-span-6 text-white'>
            <img  className='w-full h-full object-cover object-top rounded' 
            onClick={() => handleNavigate(4)}
            src={customer.homepageData?.gird[4].images} alt="" />
        </div>
        <div className='col-span-2 row-span-6 text-white'>
            <img className='w-full h-full object-cover object-top rounded' 
            onClick={() => handleNavigate(5)}
            src={customer.homepageData?.gird[5].images} alt="" />
        </div>
      
    </div>
  )
}

export default GridCategory