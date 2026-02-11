import { FourteenMp } from '@mui/icons-material'
import { Box, Button, Grid2, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import * as yup from "yup"
import { useAppDispatch } from '../../../State/Store'
import { createOrder } from '../../../State/Customer/OrderSlice'
import { enqueueSnackbar } from 'notistack'

const AddressFromSchema =yup.object().shape({
    name:yup.string().required("Name is required"),
    mobile:yup.string().required("Mobile number is required").matches(/^[6-9]\d{9}$/,"Invalid Mobile Number"),
    pincode:yup.string().required("Pin code is required").matches(/^[1-9][0-9]{5}$/,"Invlid Pin code"),
    address:yup.string().required("Address is required"),
    locality:yup.string().required("Locality is required"),
    city:yup.string().required("City is required"),
    state:yup.string().required("State is required")
})

const AddressForm = ({paymentGateway,userId}:{paymentGateway: string,userId:number}) => {

    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues : {
            name:"",
            mobile:"",
            pincode:"",
            address:"",
            locality:"",
            city:"",
            state:"",
        },
        validationSchema: AddressFromSchema,
        onSubmit: (values) => {
            console.log(values)
            dispatch(createOrder({
                address:values,
                jwt:localStorage.getItem("jwt") || "",
                paymentGateway:paymentGateway
            })).unwrap()
            .then(() => {
                enqueueSnackbar("Order Placed",{
                    variant:"success",
                    anchorOrigin:{vertical:"top",horizontal:"right"}
                })
            })
            .catch((error) => {
                enqueueSnackbar("Order not Placed",{
                    variant:"error",
                    anchorOrigin:{vertical:"top",horizontal:"right"}
                })
            })
        },}
    )
  return (
    <Box sx={{ max:"auto"}}>
        <p className='text-xl font-bold text-center pb-5'>Contact Details</p>

        <form onSubmit={formik.handleSubmit}>
            <Grid2 container spacing={3}>
                <Grid2 size={{xs:12}}>
                    <TextField
                        fullWidth
                        name='name'
                        label="Name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                </Grid2>
           
                <Grid2 size={{xs:6}}>
                    <TextField
                        fullWidth
                        name='mobile'
                        label="Mobile Number" 
                        value={formik.values.mobile}
                        onChange={formik.handleChange}
                        error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                        helperText={formik.touched.mobile && formik.errors.mobile}
                    />
                </Grid2>
           
                <Grid2 size={{xs:6}}>
                    <TextField
                        fullWidth
                        name='pincode'
                        label="Pin code"
                        value={formik.values.pincode}
                        onChange={formik.handleChange}
                        error={formik.touched.pincode && Boolean(formik.errors.pincode)}
                        helperText={formik.touched.pincode && formik.errors.pincode}
                    />
                </Grid2>
            
                <Grid2 size={{xs:12}}>
                    <TextField
                        fullWidth
                        name='address'
                        label="address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        error={formik.touched.address && Boolean(formik.errors.address)}
                        helperText={formik.touched.address && formik.errors.address}
                    />
                </Grid2>
           
                <Grid2 size={{xs:12}}>
                    <TextField
                        fullWidth
                        name='locality'
                        label="Locality"
                        value={formik.values.locality}
                        onChange={formik.handleChange}
                        error={formik.touched.locality && Boolean(formik.errors.locality)}
                        helperText={formik.touched.locality && formik.errors.locality}
                    />
                </Grid2>
            
                <Grid2 size={{xs:6}}>
                    <TextField
                        fullWidth
                        name='city'
                        label="City"
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        error={formik.touched.city && Boolean(formik.errors.city)}
                        helperText={formik.touched.city && formik.errors.city}
                    />
                </Grid2>
           
                <Grid2 size={{xs:6}}>
                    <TextField
                        fullWidth
                        name='state'
                        label="State"
                        value={formik.values.state}
                        onChange={formik.handleChange}
                        error={formik.touched.state && Boolean(formik.errors.state)}
                        helperText={formik.touched.state && formik.errors.state}
                    />
                </Grid2>
                <Grid2 size={{xs:12}}>
                    <Button fullWidth type='submit' sx={{py:"14px"}} variant='contained'>
                        Add Address
                    </Button>
                </Grid2>
            </Grid2>
        </form>
    </Box>
  )
}

export default AddressForm