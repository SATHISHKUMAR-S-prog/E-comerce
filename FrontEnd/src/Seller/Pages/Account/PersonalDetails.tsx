import { Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import * as yup from "yup"
import { Seller } from '../../../Types/SellerType'
import { useAppDispatch, useAppSelector } from '../../../State/Store'
import { updateSellerProfile } from '../../../State/Seller/SellerSlice'

const PersonalDetails = () => {
    const dispatch = useAppDispatch()
    const {seller} = useAppSelector(store => store)

    const validationSchema = yup.object().shape({
        sellerName: yup.string().required("Seller name is required"),
        email: yup.string().email("Invalid email").required("Email is required"),
        mobile: yup.string()
          .matches(/^[0-9]{10}$/, "Invalid mobile number")
          .required("Mobile number is required"),
      });

  const formik = useFormik({
        initialValues : {
            sellerName: seller.profile?.sellerName || "",
            email: seller.profile?.email || "",
            mobile: seller.profile?.mobile || "",
        },
        validationSchema,
        onSubmit: (values) => {
            const updatedSeller = {
                ...seller.profile,
                ...values,
              };
            dispatch(updateSellerProfile({seller:updatedSeller,jwt:localStorage.getItem("jwt") || ""}))
            console.log(values)
        },}
    )

  return (
    <div>
        <p className='text-xl font-bold pb-9 text-center'>Personal Details</p>
        <div className='space-y-9'>
            <TextField
                fullWidth
                name='sellerName'
                label="Seller Name"
                value={formik.values.sellerName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.sellerName && Boolean(formik.errors.sellerName)}
                helperText={formik.touched.sellerName && formik.errors.sellerName}
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