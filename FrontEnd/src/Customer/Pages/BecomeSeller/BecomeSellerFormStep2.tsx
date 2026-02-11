import { Box, Button, Grid2, TextField } from '@mui/material'
import React from 'react'

const BecomeSellerFormStep2 = ({formik}:any) => {
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
                </Grid2>
            </>
        </Box>
      )
}

export default BecomeSellerFormStep2