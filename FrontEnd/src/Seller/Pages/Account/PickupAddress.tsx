import { Box, Button, Grid2, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import * as yup from "yup"
import { useAppDispatch, useAppSelector } from '../../../State/Store'
import { updateSellerProfile } from '../../../State/Seller/SellerSlice'

const AddressFromSchema = yup.object().shape({
    pickUpAddress: yup.object().shape({
      name: yup
        .string()
        .required("Name is required")
        .max(50, "Name cannot exceed 50 characters"),
      mobile: yup
        .string()
        .required("Mobile number is required")
        .matches(/^[6-9]\d{9}$/, "Mobile number must be valid"),
      pincode: yup
        .string()
        .required("Pincode is required")
        .matches(/^\d{6}$/, "Pincode must be 6 digits"),
      address: yup
        .string()
        .required("Address is required")
        .max(200, "Address cannot exceed 200 characters"),
      locality: yup
        .string()
        .required("Locality is required")
        .max(100, "Locality cannot exceed 100 characters"),
      city: yup
        .string()
        .required("City is required")
        .max(50, "City cannot exceed 50 characters"),
      state: yup
        .string()
        .required("State is required")
        .max(50, "State cannot exceed 50 characters"),
    }),
  });

const PickupAddress = () => {
      const dispatch = useAppDispatch()
      const {seller} = useAppSelector(store => store)

      const formik = useFormik({
            initialValues : {
                pickUpAddress:{
                    name: seller.profile?.pickUpAddress?.name || "",
                    mobile:seller.profile?.pickUpAddress?.mobile ||"",
                    pincode:seller.profile?.pickUpAddress?.pincode || "",
                    address:seller.profile?.pickUpAddress?.address || "",
                    locality:seller.profile?.pickUpAddress?.locality || "",
                    city:seller.profile?.pickUpAddress?.city || "",
                    state:seller.profile?.pickUpAddress?.state ||"",
                }
            },
            validationSchema: AddressFromSchema,
            onSubmit: (values) => {
                const updatedSeller = {
                    ...seller.profile,
                    ...values,
                };
                dispatch(updateSellerProfile({seller:updatedSeller,jwt:localStorage.getItem("jwt") || ""}))
                console.log(values)
            }}
        )

    return (
        <Box sx={{ max:"auto"}}>
            <p className='text-xl font-bold text-center pb-5'>Pickup Address</p>
    
            <>
                <Grid2 container spacing={3}>
                    <Grid2 size={{xs:12}}>
                        <TextField
                            fullWidth
                            name='pickUpAddress.name'
                            label="Name"
                            value={formik.values.pickUpAddress?.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.pickUpAddress?.name && Boolean(formik.errors.pickUpAddress?.name)}
                            helperText={formik.touched.pickUpAddress?.name && formik.errors.pickUpAddress?.name}
                        />
                    </Grid2>
               
                    <Grid2 size={{xs:6}}>
                        <TextField
                            fullWidth
                            name='pickUpAddress.mobile'
                            label="Mobile Number" 
                            value={formik.values.pickUpAddress?.mobile}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.pickUpAddress?.mobile && Boolean(formik.errors.pickUpAddress?.mobile)}
                            helperText={formik.touched.pickUpAddress?.mobile && formik.errors.pickUpAddress?.mobile}
                        />
                    </Grid2>
               
                    <Grid2 size={{xs:6}}>
                        <TextField
                            fullWidth
                            name='pickUpAddress.pincode'
                            label="Pin code"
                            value={formik.values.pickUpAddress?.pincode}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.pickUpAddress?.pincode && Boolean(formik.errors.pickUpAddress?.pincode)}
                            helperText={formik.touched.pickUpAddress?.pincode && formik.errors.pickUpAddress?.pincode}
                        />
                    </Grid2>
                
                    <Grid2 size={{xs:12}}>
                        <TextField
                            fullWidth
                            name='pickUpAddress.address'
                            label="address"
                            value={formik.values.pickUpAddress?.address}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.pickUpAddress?.address && Boolean(formik.errors.pickUpAddress?.address)}
                            helperText={formik.touched.pickUpAddress?.address && formik.errors.pickUpAddress?.address}
                        />
                    </Grid2>
               
                    <Grid2 size={{xs:12}}>
                        <TextField
                            fullWidth
                            name='pickUpAddress.locality'
                            label="Locality"
                            value={formik.values.pickUpAddress?.locality}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.pickUpAddress?.locality && Boolean(formik.errors.pickUpAddress?.locality)}
                            helperText={formik.touched.pickUpAddress?.locality && formik.errors.pickUpAddress?.locality}
                        />
                    </Grid2>
                
                    <Grid2 size={{xs:6}}>
                        <TextField
                            fullWidth
                            name='pickUpAddress.city'
                            label="City"
                            value={formik.values.pickUpAddress.city}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.pickUpAddress?.city && Boolean(formik.errors.pickUpAddress?.city)}
                            helperText={formik.touched.pickUpAddress?.city && formik.errors.pickUpAddress?.city}
                        />
                    </Grid2>
               
                    <Grid2 size={{xs:6}}>
                        <TextField
                            fullWidth
                            name='pickUpAddress.state'
                            label="State"
                            value={formik.values.pickUpAddress.state}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.pickUpAddress?.state && Boolean(formik.errors.pickUpAddress?.state)}
                            helperText={formik.touched.pickUpAddress?.state && formik.errors.pickUpAddress?.state}
                        />
                    </Grid2>

                    <Grid2 size={{xs:12}}>
                        <Button onClick={()=> formik.handleSubmit()} sx={{py:"12px"}} fullWidth variant='contained' type='submit'>Submit</Button>
                    </Grid2>

                </Grid2>
            </>
        </Box>
      )
}

export default PickupAddress
