import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../State/Store'
import { useFormik } from 'formik'
import { sentLoginSignUpOtp, signUp } from '../../../State/AuthSlice'
import { Alert, Button, CircularProgress, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import * as yup from "yup"
import { Userrole } from '../../../Types/UserType'

const validationSchema = yup.object().shape({
        fullname: yup.string().required("Full name is required"),
        email: yup.string().email("Invalid email").required("Email is required"),
        otp: yup.string()
          .required("Otp is required"),
      });

const RegisterForm = () => {

    const [isLogin,setIsLogin] = useState(false) 
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {auth} = useAppSelector(store => store)

    const formik = useFormik({
          initialValues : {
            otp:"",
            email:"",
            fullname:"",
            role:Userrole.ROLE_CUSTOMER
          },
         validationSchema,
          onSubmit: (values) => {
            //   console.log(values)
              dispatch(signUp(values))
              setIsLogin(true)
          },}
      )

          useEffect(()=>{
              if(auth.isLoggedIn){
                  navigate("/")
              }
            },[auth.isLoggedIn,navigate])

    const handleSentOtp = async(email:string) => [
        dispatch(sentLoginSignUpOtp({email:formik.values.email,role:formik.values.role}))
    ]

  return (
    <div>
        <h1 className="text-center font-bold text-xl pb-8 text-primary-color">SignUp</h1>
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
               <div className="space-y-2"> <p className="font-medium text-sm opacity-60">Enter Otp sent to your email</p>
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
                </div>

                <TextField
                    fullWidth
                    name='fullname'
                    label="Full Name"
                    value={formik.values.fullname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.fullname && Boolean(formik.errors.fullname)}
                    helperText={formik.touched.fullname && formik.errors.fullname}
                />
            </div>}

               {isLogin && (auth.error? <Alert severity="error">Wrong otp</Alert> :"" )}
              {auth.otpSent? 
                  <Button onClick={() => formik.handleSubmit()} fullWidth variant='contained' sx={{py:"11px"}}>{auth.loading? <CircularProgress sx={{color:"white"}} /> : "SignUp"}</Button> :
              <Button onClick={() => handleSentOtp(formik.values.email)} fullWidth variant='contained' sx={{py:"11px"}}>
                  {auth.loading? <CircularProgress sx={{color:"white"}} /> : "Sent Otp"}
              </Button>}

        </div>
    </div>
  )
}

export default RegisterForm