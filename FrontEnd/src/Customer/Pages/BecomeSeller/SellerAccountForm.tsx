import { Button, Step, StepLabel, Stepper, Box, TextField, Grid, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import BecomeSellerFormStep1 from './BecomeSellerFormStep1';
import BecomeSellerFormStep2 from './BecomeSellerFormStep2';
import BecomeSellerFormStep3 from './BecomeSellerFormStep3';
import BecomeSellerFormStep4 from './BecomeSellerFormStep4';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { createSeller } from '../../../State/Seller/SellerSlice';
import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

const steps = [
  "Tax Details & Mobile",
  "Pickup Address",
  "Bank Details",
  "Supplier Details",
];

const validationSchemas = [
  Yup.object().shape({
    mobile: Yup.string()
      .matches(/^\d{10}$/, "Mobile number must be 10 digits")
      .required("Mobile number is required"),
    otp: Yup.string()
      .matches(/^\d{6}$/, "OTP must be 6 digits")
      .required("OTP is required"),
    gstin: Yup.string()
      .matches(/^\d{15}$/, "GSTIN must be 15 characters")
      .required("GSTIN is required"),
  }),
  Yup.object().shape({
    pickUpAddress: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      mobile: Yup.string()
        .matches(/^\d{10}$/, "Mobile number must be 10 digits")
        .required("Mobile number is required"),
      pincode: Yup.string()
        .matches(/^\d{6}$/, "Pincode must be 6 digits")
        .required("Pincode is required"),
      address: Yup.string().required("Address is required"),
      locality: Yup.string().required("Locality is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
    }),
  }),
  Yup.object().shape({
    bankDetails: Yup.object().shape({
      accountNumber: Yup.string().required("Account number is required"),
      ifscCode: Yup.string()
        .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Enter a valid IFSC code")
        .required("IFSC code is required"),
      accountHolderName: Yup.string().required("Account holder name is required"),
    }),
  }),
  Yup.object().shape({
    sellerName: Yup.string().required("Seller name is required"),
    email: Yup.string().email("Enter a valid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    businessDetails: Yup.object().shape({
      businessName: Yup.string().required("Business name is required"),
      businessEmail: Yup.string()
        .email("Enter a valid email")
        .required("Business email is required"),
      businessMobile: Yup.string()
        .matches(/^\d{10}$/, "Mobile number must be 10 digits")
        .required("Business mobile number is required"),
      logo: Yup.string().required("Business logo is required"),
      banner: Yup.string().required("Business banner is required"),
      businessAddress: Yup.string().required("Business address is required"),
    }),
  }),
];

const SellerAccountForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const {seller} = useAppSelector(store => store)

  const handleStep = (value: number) => {
    if ((activeStep < steps.length - 1) || (activeStep > 0 && value === -1)) {
      setActiveStep(activeStep + value);
    }
    if (activeStep === steps.length - 1) {
      handleCreateAccount();
    }
  };

  const handleCreateAccount = () => {
    console.log("Submitted Values:", formik.values);
    dispatch(createSeller({ seller: formik.values }))
    .unwrap()
    .then(() => {
        enqueueSnackbar("Seller created successfully", {
            variant: "success",
            anchorOrigin: { vertical: "top", horizontal: "right" },
        });
        navigate("/verify-seller")
    })
    .catch(() => {
      enqueueSnackbar("Failed to create Seller", {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    });
  };

  const formik = useFormik({
    initialValues: {
      mobile: "",
      otp: "",
      gstin: "",
      pickUpAddress: {
        name: "",
        mobile: "",
        pincode: "",
        address: "",
        locality: "",
        city: "",
        state: "",
      },
      bankDetails: {
        accountNumber: "",
        ifscCode: "",
        accountHolderName: "",
      },
      sellerName: "",
      email: "",
      password: "",
      businessDetails: {
        businessName: "",
        businessEmail: "",
        businessMobile: "",
        logo: "",
        banner: "",
        businessAddress: "",
      },
    },
    validationSchema: validationSchemas[activeStep],
    onSubmit: (values) => {
  
        // console.log("values",values)
    },
  });

  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <section className="mt-20 space-y-10">
        <div>
          {activeStep === 0 && <BecomeSellerFormStep1 formik={formik} />}
          {activeStep === 1 && <BecomeSellerFormStep2 formik={formik} />}
          {activeStep === 2 && <BecomeSellerFormStep3 formik={formik} />}
          {activeStep === 3 && <BecomeSellerFormStep4 formik={formik} />}
        </div>
        <div className="flex justify-between items-center">
          <Button onClick={() => handleStep(-1)} variant="contained" disabled={activeStep === 0}>
            Back
          </Button>
            <Button sx={{minWidth:"150px"}} onClick={() =>{
                    handleStep(+1);
                      }} variant='contained' >
                    {seller.loading? <CircularProgress sx={{color:"white"}} size={24}/> : activeStep == ( steps.length - 1) ? "Create Account" : "Continue"}
                </Button>
        </div>
      </section>
    </div>
  );
};

export default SellerAccountForm;
