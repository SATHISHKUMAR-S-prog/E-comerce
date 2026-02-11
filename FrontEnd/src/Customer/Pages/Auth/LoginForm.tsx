import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../State/Store'
import { useFormik } from 'formik'
import { sentLoginSignUpOtp, signin } from '../../../State/AuthSlice'
import { Alert, Button, CircularProgress, TextField } from '@mui/material'
import { redirect, useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { Userrole } from '../../../Types/UserType'

const LoginForm = () => {

    const dispatch = useAppDispatch()
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()
    const {auth} = useAppSelector(store => store)

    const formik = useFormik({
          initialValues : {
            otp:"",
            email:"",
            role:Userrole.ROLE_CUSTOMER
          },
         
          onSubmit: (values) => {
              console.log(values)
            dispatch(signin(values))
            .unwrap()
            .catch ((error) => {
                enqueueSnackbar('Something went wrong or wrong otp.', {
                    variant: 'error',
                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                });
            })
          },
        })

      useEffect(()=>{
        if(auth.isLoggedIn){
            navigate("/")
        }
      },[auth.isLoggedIn,navigate])


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
                enqueueSnackbar('User not found. Please check your email.', {
                    variant: 'error',
                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                });
            }
        };   

  return (
    <div>
        <h1 className="text-center font-bold text-xl pb-8 text-primary-color">Login</h1>
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
                <Button onClick={() => formik.handleSubmit()} fullWidth variant='contained' sx={{py:"11px"}}>{auth.loading? <CircularProgress sx={{color:"white"}}/> : "Login"}</Button> :
            <Button onClick={() => handleSentOtp(formik.values.email)} fullWidth variant='contained' sx={{py:"11px"}}>
                {auth.loading? <CircularProgress sx={{color:"white"}}/> : "Sent Otp"}
            </Button>}
         </div>
    </div>
  )
}

export default LoginForm