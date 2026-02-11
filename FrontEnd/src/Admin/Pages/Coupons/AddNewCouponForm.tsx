import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import dayjs, { Dayjs} from 'dayjs'
import { useFormik } from 'formik'
import React from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Box, Button, Grid2, TextField } from '@mui/material'
import * as Yup from "yup"
import { useAppDispatch } from '../../../State/Store'
import { createCoupon } from '../../../State/Customer/CouponSlice'
import { enqueueSnackbar } from 'notistack'
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc)
interface couponFormValues {
  code:string,
  discountPercentage:number,
  validityStartDate:Dayjs|null,
  validityEndDate:Dayjs|null,
  minimumOrderValue:number
}

const validationSchema = Yup.object().shape({
  code: Yup.string()
    .required('Coupon code is required')
    .max(20, 'Coupon code cannot exceed 20 characters'),
  discountPercentage: Yup.number()
    .required('Discount percentage is required')
    .min(5, 'Discount percentage must be at least 0')
    .max(100, 'Discount percentage cannot exceed 100'),
  validityStartDate: Yup.date()
    .nullable()
    .required('Validity start date is required'),
  validityEndDate: Yup.date()
    .nullable()
    .required('Validity end date is required')
    .min(Yup.ref('validityStartDate'), 'End date must be after start date'),
  minimumOrderValue: Yup.number()
    .required('Minimum order value is required')
    .min(1, 'Minimum order value must be at least 1'),
});

const AddNewCouponForm = () => {

  const dispatch = useAppDispatch()

const formik = useFormik<couponFormValues>({
  initialValues:{
    code:"",
    discountPercentage:5,
    validityStartDate:null,
    validityEndDate:null,
    minimumOrderValue:1
  },
  validationSchema:validationSchema,
  onSubmit:(values)=> {
   
    const formatedValues={ ...values,
      validityStartDate:values.validityStartDate?.startOf('day').toISOString(),
      validityEndDate:values.validityEndDate?.startOf('day').toISOString()
  }
 try {
  dispatch(createCoupon({coupon:formatedValues,jwt:localStorage.getItem("jwt") || ""}))
  .unwrap()
  .then(() => {
    enqueueSnackbar("Coupon created.", {
      variant: "success",
      anchorOrigin: { vertical: 'top', horizontal: 'right' },
  });
  })
 } catch (error) {
  enqueueSnackbar("Coupon not created",{
    variant:"error",
    anchorOrigin:{vertical:"top",horizontal:"right"}
  })
 }
  
  console.log(formatedValues)
  }
})

  return (
    <div>    
      <h1 className="text-2xl font-bold text-primary-color p-5 text-center">Create New Coupon</h1>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        
        <Box component={"form"} onSubmit={formik.handleSubmit} sx={{mt:3}}>
          <Grid2 container spacing={2}>
            <Grid2 size={{xs:12, sm:6}}>
              <TextField
                  fullWidth
                  name='code'
                  label="Coupon Code"
                  value={formik.values.code}
                  onChange={formik.handleChange}
                  error={formik.touched.code && Boolean(formik.errors.code)}
                  helperText={formik.touched.code && formik.errors.code}
              />
            </Grid2>

            <Grid2 size={{xs:12, sm:6}}>
              <TextField
                  fullWidth
                  name='discountPercentage'
                  label="Discount Percentage"
                  value={formik.values.discountPercentage}
                  onChange={formik.handleChange}
                  error={formik.touched.discountPercentage && Boolean(formik.errors.discountPercentage)}
                  helperText={formik.touched.discountPercentage && formik.errors.discountPercentage}
              />
            </Grid2>

            <Grid2 size={{xs:12, sm:6}}>
              <DatePicker 
                sx={{width:"100%"}}
                name='validityStartDate'
                label="Validity Start Date"
                value={formik.values.validityStartDate}
                onChange={(value) => formik.setFieldValue('validityStartDate', value ? value.startOf('day') : null)}
                minDate={dayjs().utc()}
                slotProps={{
                  textField: {
                    error:
                      formik.touched.validityStartDate &&
                      Boolean(formik.errors.validityStartDate),
                    helperText:
                      formik.touched.validityStartDate &&
                      formik.errors.validityStartDate,
                  },
                }} />
            </Grid2>

            <Grid2 size={{xs:12, sm:6}}>
              <DatePicker 
                sx={{width:"100%"}}
                name='validityEndDate'
                label="Validity End Date"
                value={formik.values.validityEndDate}
                onChange={(value) => formik.setFieldValue('validityEndDate',value ? value.startOf('day') : null)}
                minDate={formik.values.validityStartDate || dayjs().utc()} 
                slotProps={{
                  textField: {
                    error:
                      formik.touched.validityEndDate &&
                      Boolean(formik.errors.validityEndDate),
                    helperText:
                      formik.touched.validityEndDate &&
                      formik.errors.validityEndDate,
                  },
                }} />
            </Grid2>

            <Grid2 size={{xs:12}}>
              <TextField
                  fullWidth
                  name='minimumOrderValue'
                  label="Minimum Order Value"
                  value={formik.values.minimumOrderValue}
                  onChange={formik.handleChange}
                  error={formik.touched.minimumOrderValue && Boolean(formik.errors.minimumOrderValue)}
                  helperText={formik.touched.minimumOrderValue && formik.errors.minimumOrderValue}
              />
            </Grid2>

            <Grid2 size={{xs:12}}>
              <Button variant='contained' type='submit' fullWidth sx={{py:".8rem"}}>
                Create Coupon
              </Button>
            </Grid2>
          </Grid2>
        </Box>
      </LocalizationProvider>
    </div>
  )
}

export default AddNewCouponForm