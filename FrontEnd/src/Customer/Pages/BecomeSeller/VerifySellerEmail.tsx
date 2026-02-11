import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { useFormik } from 'formik';
import { VerifySeller } from '../../../State/Seller/SellerSlice';
import { Alert, Button, CircularProgress, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

const VerifySellerEmail = () => {

  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { seller } = useAppSelector(store => store);

  const formik = useFormik({
    initialValues: {
      otp: "",
      email: seller.selectedSeller?.email,
    },
    onSubmit: (values) => {
      try {
        dispatch(VerifySeller({ otp: values.otp })).unwrap().then(() => {
          enqueueSnackbar("Your email is verified", {
            variant: "success",
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
          });
          navigate("/become-seller");
        });
      } catch (error) {
        enqueueSnackbar('Email is not verified.', {
          variant: 'error',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
        });
      }
    },
  });

  const handleSentOtp = async (email: string) => {
    try {
      await dispatch(VerifySeller({ otp: formik.values.otp })).unwrap().then(() => {
        enqueueSnackbar("OTP sent to your email.", {
          variant: "success",
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
        });
        navigate("/become-seller");
      });
    } catch (error) {
      enqueueSnackbar('User not found. Please check your email.', {
        variant: 'error',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 py-10">
      <div className="w-full sm:w-96 bg-white shadow-lg rounded-lg p-6 space-y-6">
        <h1 className="text-center font-bold text-xl text-primary-color">Login</h1>
        
        <div className="space-y-4">
          <TextField
            fullWidth
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            className="rounded-md"
          />
          
          <div className="space-y-3">
            <p className="font-medium text-sm opacity-60">Enter OTP sent to your email</p>
            <TextField
              fullWidth
              name="otp"
              label="OTP"
              value={formik.values.otp}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.otp && Boolean(formik.errors.otp)}
              helperText={formik.touched.otp && formik.errors.otp}
              className="rounded-md"
            />
          </div>

          <div className="flex justify-between items-center">
            <Button
              onClick={() => formik.handleSubmit()}
              fullWidth
              variant="contained"
              color="primary"
              sx={{ py: "11px" }}
              className="rounded-md"
            >
              {seller.loading ? <CircularProgress sx={{ color: "white" }} size={24} /> : "Login"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifySellerEmail;
