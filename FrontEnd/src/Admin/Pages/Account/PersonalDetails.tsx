import { Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import * as yup from "yup"
import { useAppDispatch, useAppSelector } from '../../../State/Store'

const PersonalDetails = () => {
    const dispatch = useAppDispatch()
    const {auth} = useAppSelector(store => store)

    const validationSchema = yup.object().shape({
        fullname: yup.string().required("Seller name is required"),
        email: yup.string().email("Invalid email").required("Email is required"),
        mobile: yup.string()
          .matches(/^[0-9]{10}$/, "Invalid mobile number")
          .required("Mobile number is required"),
      });

  const formik = useFormik({
        initialValues : {
            fullname:auth.user?.fullname || "",
            email:auth.user?.email  || "",
            mobile:auth.user?.mobile  || "",
        },
        validationSchema,
        onSubmit: (values) => {
            const updatedAdmin = {
                ...auth.user,
                ...values,
              };
            // dispatch(updateSellerProfile({seller:updatedSeller,jwt:localStorage.getItem("jwt") || ""}))
            // console.log(values)
        },}
    )

  return (
    <div>
        <p className='text-xl font-bold pb-9 text-center'>Personal Details</p>
        <div className='space-y-9'>
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

            <TextField
                fullWidth
                name='mobile'
                label="Mobile Number" 
                value={formik.values.mobile}
                onChange={formik.handleChange}
                error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                helperText={formik.touched.mobile && formik.errors.mobile}
            />
            
            <Button onClick={() => formik.handleSubmit()} sx={{py:"12px"}} fullWidth variant='contained' type='submit'>Submit</Button>
        </div>
    </div>
  )
}

export default PersonalDetails