import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { mainCategory } from '../../../Data/Category/MainCategory'
import { useAppDispatch, useAppSelector } from '../../../State/Store'
import { createDeals } from '../../../State/Admin/DealsSlice'
import { Category } from '@mui/icons-material'
import { enqueueSnackbar } from 'notistack'

const CreateDealForm = () => {

    const dispatch = useAppDispatch()
    const {customer} = useAppSelector(store => store)


const formik = useFormik({
    initialValues:{
        discount:0,
        category:""
    },
    onSubmit:(values) => {
        console.log(values)
        const reqData ={
            discount:values.discount,
            category:{id:values.category}
        }
        dispatch(createDeals(reqData)).unwrap().then(() => {
            enqueueSnackbar('Created successfully.', {
                variant: 'success',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
            });
        })
        .catch ((error) => {
                enqueueSnackbar('Something went wrong.', {
                    variant: 'error',
                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                });
            })
    }
})

  return (
    <Box component={"form"} onSubmit={formik.handleSubmit} className='space-y-6' >
        <Typography variant='h4' className='text-center'>Create Deal</Typography>
        
        <TextField fullWidth
            name='discount'
            label="Discount"
            value={formik.values.discount}
            onChange={formik.handleChange}
            error={formik.touched.discount && Boolean(formik.errors.discount)}
            helperText={formik.touched.discount && formik.errors.discount}
        />

        <FormControl fullWidth
            error={formik.touched.category && Boolean(formik.errors.category)}
            required >
            <InputLabel id="category-label">Category</InputLabel>
            <Select
                labelId="category-label"
                id='category'
                name='category'
                value={formik.values.category}
                onChange={formik.handleChange}
                label="Second Category">

                {customer.homepageData?.dealsCategory.map((item) => (<MenuItem  key={item.id} value={item.id}>
                        {item.name}
                    </MenuItem>))}
                </Select>
        </FormControl>

        <Button fullWidth sx={{py:".9rem"}} type='submit' variant='contained'>Create Deal</Button>
    </Box>
  )
}

export default CreateDealForm