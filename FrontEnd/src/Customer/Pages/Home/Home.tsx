import React from 'react'
import ElectricCategory from './ElectricCategory/ElectricCategory'
import GridCategory from './GridCategory/GridCategory'
import Deals from './Deals/Deals'
import ShopByCategory from './ShopByCategory/ShopByCategory'
import { Button } from '@mui/material'
import { Storefront } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const Home = () => {

   const navigate = useNavigate()

  return (
    <>
        <div className='space-y-2 md:space-y-5 lg:space-y-10 relative pb-20 no-scrollbar overflow-y-scroll' >
            <ElectricCategory />
            <GridCategory />
            <Deals />
            <ShopByCategory />

            <section className='pt-3 lg:px-20 h-[200px] lg:h-[450px] object-cover relative text-center'>
              <img className='w-full h-full'
              src="https://plus.unsplash.com/premium_photo-1670934158407-d2009128cb02?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGJhbm5lcnxlbnwwfHwwfHx8MA%3D%3D" alt="" />

              <div className='absolute top-1/3 left-4 lg:left-[15rem] transform-transulate-y-1/2 font-semibold lg:text-4xl space-y-3'>
            
              <h1> Sell your products</h1>
              <p className='text-lg md:text-2xl'>with <span className='logo'>Eccomerce</span></p>

              <div className='flex justify-center pt-3'>
                <Button onClick={() => navigate("/become-seller")} startIcon={<Storefront />} variant='contained' size='large' >
                  Become Seller
                </Button>
              </div>

              </div>
            </section>
        </div>
    </>
  )
}

export default Home