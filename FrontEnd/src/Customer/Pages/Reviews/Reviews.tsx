import React from 'react'
import ReviewCard from './ReviewCard'
import { Divider } from '@mui/material'

const Reviews = () => {
  return (
    <div className='p-5 lg:p-20 flex flex-col lg:flex-row gap-20'>

        <section className='w-full md:w-1/2 lg:w-[30%] space-y-2' >

            <img src="https://medias.utsavfashion.com/blog/wp-content/uploads/2024/05/woven-art-silk-saree-in-fuchsia-v1-sjra6671.webp" alt="" />

            <div>

                <div>
                    <p className='font-bold text-xl'>Branded</p>
                    <p className='text-gray-600 text-lg'>slik saree</p>
                </div>

                <div>
              
                    <div className='price flex items-center gap-3 mt-5 text-2xl'>
                    <span className='font-sans text-gray-800'>  ₹ 449</span>
                    <span className='line-through text-gray-400'>₹ 999</span>
                    <span className="text-primary-color font-semibold">60%</span>
                    </div>

                </div>

            </div>

        </section>

        <section className='space-y-5 w-full'>
            {[1,1,1,1,1,1,1].map( item => <div className='space-y-3'>
                <ReviewCard />
                <Divider />
            </div>)}
        </section>

    </div>
  )
}

export default Reviews