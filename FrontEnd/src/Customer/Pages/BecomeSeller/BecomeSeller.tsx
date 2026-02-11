import React, { useState } from 'react'
import SellerAccountForm from './SellerAccountForm'
import SellerLoginForm from './SellerLoginForm'
import { Button } from '@mui/material'

const BecomeSeller = () => {

const [isLogin,setIsLogin] = useState(false)

const handleShowPage =() => {
    setIsLogin(!isLogin)
}

  return (
    <div className='grid grid-cols-3 md:gap-10 min-h-screen'>
        <section className='lg:col-span-1 md:col-span-2 col-span-3 p-10 shadow-lg rounded-b-md'>
            {isLogin? <SellerAccountForm /> : <SellerLoginForm />}

            <div className='mt-10 space-y-2'>
                <h1 className='text-center text-sm font-medium'>{isLogin?  "Do You Have Account?" : "Don't Have Account?"}</h1>
                <Button fullWidth sx={{py:"11px"}} variant='outlined' onClick={handleShowPage}>
                    {isLogin? "Login" : "Register"}
                </Button>
            </div>
        </section>
        <section className='hidden md:col-span-1 lg:col-span-2 md:flex justify-center items-center'>
            <div className='lg:w-[70%] px-5 space-y-10'>
                <div className="space-y-2 font-bold text-center">
                    <p className="text-2xl">Join the MarketPlace Revolution</p>
                    <p className='text-lg text-primary-color'>Boost Your Sales Today</p>
                </div>
                <img src="https://cdn.sellerapp.com/img/secondary-page/amazon-message-center.svg" alt="" />
            </div>
        </section>
    </div>
  )
}

export default BecomeSeller