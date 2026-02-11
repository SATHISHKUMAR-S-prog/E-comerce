import React, { useState } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import { Button } from '@mui/material'

const Auth = () => {

const [isLogin, setIsLogin] = useState(true)

  return (
    <div className='flex justify-center h-[90vh] items-center'>
        <div className="max-w-md h-[85vh] rounded-md shadow-lg">
            <img className='w-full rounded-t-md' src="https://static.vecteezy.com/system/resources/thumbnails/004/299/835/small/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-free-vector.jpg" alt="" />

           <div className="mt-8 px-10">
            {isLogin? <LoginForm/>: <RegisterForm />}

            <div className='flex justify-center items-center gap-1 mt-5'>
                <p>{isLogin && "Don't"} Have Account?</p>
                <Button size='small' onClick={() => setIsLogin(!isLogin)}>{isLogin? "Create Acccount" : "Login"}</Button>
            </div>
           </div>
        </div>
    </div>
  )
}

export default Auth