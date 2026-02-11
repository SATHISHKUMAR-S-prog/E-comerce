import { Button } from '@mui/material'
import React, { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch } from '../../../State/Store'
import { paymentSuccess } from '../../../State/Customer/OrderSlice'

const PaymentSuccess = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const location = useLocation()

    const getQueryParams = (keys:any) => {
        const query =new URLSearchParams(location.search)
        return query.get(keys)
    }

    useEffect(()=>{
        const paymentId = ( getQueryParams("cod_payment_id") || getQueryParams("razorpay_payment_id") || getQueryParams("Stripe_payment_id") )
        const paymentLinkId = ( getQueryParams("cod_payment_link_id") || getQueryParams("razorpay_payment_link_id") || getQueryParams("stripe_payment_link_id") )
       if(paymentId && paymentLinkId){
        dispatch(paymentSuccess({
            paymentId:paymentId,
            jwt:(localStorage.getItem("jwt") || ""),
            paymentLinkId:paymentLinkId
        }))
        console.log(paymentId,"- - - -",paymentLinkId)
       }
    },[])
  return (
    <div className='min-h-[90vh] flex justify-center items-center'>
        <div className="bg-primary-color text-white p-8 w-[90%] lg:w-[25%] border rounded-md h-[40vh] flex flex-col justify-center items-center gap-7">
            <h1 className="text-3xl font-semibold">Congratulations!</h1>
            <h1 className="text-2xl font-semibold">Your Order Got Success</h1>
            <div>
                <Button color='secondary' variant='contained' onClick={() =>navigate("/")}>Shopping more</Button>
            </div>
        </div>
    </div>
  )
}

export default PaymentSuccess