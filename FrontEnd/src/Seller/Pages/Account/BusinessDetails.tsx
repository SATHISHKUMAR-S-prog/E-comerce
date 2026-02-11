import { Box, Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import { updateSellerProfile } from '../../../State/Seller/SellerSlice'
import { useAppDispatch, useAppSelector } from '../../../State/Store'
import * as Yup from 'yup';

const getBusinessDetailsValidationSchema = () =>
  Yup.object().shape({
    businessDetails: Yup.object().shape({
      businessName: Yup.string()
        .required('Business Name is required')
        .min(3, 'Business Name must be at least 3 characters')
        .max(50, 'Business Name cannot exceed 50 characters'),
    }),
    gstin: Yup.string()
      .required('GSTIN is required')
      .matches(
        /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
        'Invalid GSTIN format'
      ),
  });


const BusinessDetails = () => {
  const dispatch = useAppDispatch()
  const {seller} = useAppSelector(store => store)

  const formik = useFormik({
        initialValues : {
                businessDetails:{businessName:seller.profile?.businessDetails?.businessName || "",},
                gstin: seller.profile?.gstin ||""
        },
        validationSchema: getBusinessDetailsValidationSchema,
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
    <Box>
        <p className='text-xl font-bold pb-9 text-center'>Business Details</p>
        <div className='space-y-9'>
             <TextField
                fullWidth
                name='businessDetails.businessName'
                label="Business Name" 
                value={formik.values.businessDetails?.businessName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.businessDetails?.businessName && Boolean(formik.errors.businessDetails?.businessName)}
                helperText={formik.touched.businessDetails?.businessName && formik.errors.businessDetails?.businessName}
            />

            <TextField
                fullWidth
                name='gstin'
                label="GSTIN"
                value={formik.values.gstin}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.gstin && Boolean(formik.errors.gstin)}
                helperText={formik.touched.gstin && formik.errors.gstin}
            />
 
            <Button onClick={()=>formik.handleSubmit()} sx={{py:"12px"}} fullWidth variant='contained' type='submit'>Submit</Button>
        </div>
    </Box>
  )
}

export default BusinessDetails