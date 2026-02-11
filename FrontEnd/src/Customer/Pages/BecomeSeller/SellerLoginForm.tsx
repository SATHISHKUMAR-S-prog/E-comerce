import { Alert, Button, CircularProgress, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../State/Store'
import { sentLoginSignUpOtp, signin } from '../../../State/AuthSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { fetchSellerProfile, sellerLogin } from '../../../State/Seller/SellerSlice'
import { Userrole } from '../../../Types/UserType'
import { useSnackbar } from 'notistack'



const SellerLoginForm = () => {

    const dispatch = useAppDispatch()
    const { enqueueSnackbar } = useSnackbar();
    const {auth,seller} = useAppSelector(store => store)
    const navigate = useNavigate()


  const formik = useFormik({
        initialValues : {
            otp:"",
            email:"",
            role:Userrole.ROLE_SELLER
        },
       
        onSubmit: (values) => {
            console.log(values)
            dispatch(sellerLogin(values))
            .catch ((error) => {
                enqueueSnackbar('Something went wrong or wrong otp.', {
                    variant: 'error',
                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                });
            })
        },}
    )

        useEffect(()=>{
        if(seller.isLoggedIn){
            navigate("/")
            dispatch(fetchSellerProfile(localStorage.getItem("jwt") || ""))
        }
        },[seller.isLoggedIn,navigate])

        const handleSentOtp = async (email: string) => {
            try {
                await dispatch(
                    sentLoginSignUpOtp({
                        email: `signing_${formik.values.email}`,
                        role: formik.values.role,
                    })
                ).unwrap().then(() => {
                    enqueueSnackbar("otp send to your email.", {
                        variant: "success",
                        anchorOrigin: { vertical: 'top', horizontal: 'right' },
                    });
                })
            } catch (error) {
                enqueueSnackbar('Seller not found. Please check your email.', {
                    variant: 'error',
                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                });
            }
        };        

  return (
    <div>
        <h1 className='text-center font-bold text-xl pb-5 text-primary-color'>Login As Seller</h1>
        <div className='space-y-5'>
            <TextField
                fullWidth
                name='email'
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
            />
            { auth.otpSent && <div className='space-y-3'>
                <p className="font-medium text-sm opacity-60">Enter Otp sent to your email</p>
                <TextField
                    fullWidth
                    name='otp'
                    label="Otp"
                    value={formik.values.otp}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.otp && Boolean(formik.errors.otp)}
                    helperText={formik.touched.otp && formik.errors.otp}
                />
            </div>}
               
             {auth.otpSent? 
                <Button onClick={() => formik.handleSubmit()} fullWidth variant='contained' sx={{py:"11px"}}>
                    {seller.loading ? <CircularProgress sx={{color:"white"}}/> :"Login"}
                </Button> :
                <Button onClick={() => handleSentOtp(formik.values.email)} fullWidth variant='contained' sx={{py:"11px"}}>
                    {auth.loading? <CircularProgress sx={{color:"white"}}/> : "Sent Otp"}
                </Button>}
        </div>
    </div>
  )
}

export default SellerLoginForm