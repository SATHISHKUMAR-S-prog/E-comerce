import { Box, Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import { updateSellerProfile } from '../../../State/Seller/SellerSlice'
import { useAppDispatch, useAppSelector } from '../../../State/Store'
import * as Yup from 'yup';

export const getBankDetailsValidationSchema = () =>
  Yup.object().shape({
    bankDetails: Yup.object().shape({
      accountNumber: Yup.string()
        .required('Account Number is required')
        .matches(/^\d{9,18}$/, 'Account Number must be 9-18 digits long'),
      ifscCode: Yup.string()
        .required('IFSC Code is required')
        .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC Code format'),
      accountHolderName: Yup.string()
        .required('Account Holder Name is required')
        .min(3, 'Account Holder Name must be at least 3 characters')
        .max(50, 'Account Holder Name cannot exceed 50 characters'),
    }),
  });

const BankDetails = () => {
    const dispatch = useAppDispatch()
    const {seller} = useAppSelector(store => store)

  const formik = useFormik({
        initialValues : {
            bankDetails:{
                accountNumber:seller.profile?.bankDetails?.accountNumber || "",
                ifscCode:seller.profile?.bankDetails?.ifscCode ||"",
                accountHolderName: seller.profile?.bankDetails?.accountHolderName ||""
            }
        },
        validationSchema: getBankDetailsValidationSchema,
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
    <p className='text-xl font-bold pb-9 text-center'>Bank Details</p>
    <div className='space-y-9'>
         <TextField
            fullWidth
            name='bankDetails.accountNumber'
            label="Account Number" 
            value={formik.values.bankDetails?.accountNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.bankDetails?.accountNumber && Boolean(formik.errors.bankDetails?.accountNumber)}
            helperText={formik.touched.bankDetails?.accountNumber && formik.errors.bankDetails?.accountNumber}
        />

        <TextField
            fullWidth
            name='bankDetails.ifscCode'
            label="IFSC Code"
            value={formik.values.bankDetails?.ifscCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.bankDetails?.ifscCode && Boolean(formik.errors.bankDetails?.ifscCode)}
            helperText={formik.touched.bankDetails?.ifscCode && formik.errors.bankDetails?.ifscCode}
        />

        <TextField
            fullWidth
            name='bankDetails.accountHolderName'
            label="Account Holder Name"
            value={formik.values.bankDetails?.accountHolderName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.bankDetails?.accountHolderName && Boolean(formik.errors.bankDetails?.accountHolderName)}
            helperText={formik.touched.bankDetails?.accountHolderName && formik.errors.bankDetails?.accountHolderName}
        />

        <Button  onClick={()=> formik.handleSubmit()} sx={{py:"12px"}} fullWidth variant='contained' type='submit'>Submit</Button>
    </div>
</Box>
  )
}

export default BankDetails