import { Box, Button, FormControlLabel, Modal, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useState } from 'react'
import AddressCart from './AddressCart'
import AddressForm from './AddressForm';
import PricingCart from '../Cart/PricingCart';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { createOrder } from '../../../State/Customer/OrderSlice';
import { enqueueSnackbar } from 'notistack';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const paymentGatewayList = [
    // {
    //     value:"RAZORPAY",
    //     image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSArN_cpGBFSgJRuWS0P32cNxuXriXTwAGxuQ&s",
    //     label:""
    // },
    // {
    //     value:"STRIPE",
    //     image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0AaztiWmGTUTLl0bJNvQE-HyOtqyWLY4I4g&s",
    //     label:""
    // },
    {
        value:"COD",
        image:"https://w7.pngwing.com/pngs/510/354/png-transparent-food-indian-cuisine-bangladeshi-cuisine-devops-dubai-cash-on-delivery-thumbnail.png",
        label:""
    }
]

const CheckOut = () => {
    const [open, setOpen] = React.useState(false);
    const dispatch = useAppDispatch()
    const { auth } = useAppSelector((store) => store);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [paymentGateway, setPaymentGateway] = useState("COD");
    const [currentAddress, setCurrentAddress] = useState<number>(0);

    const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentGateway(e.target.value);
    };

    const handleAddressChange = (index: number) => {
        setCurrentAddress(index);
    };

    const handleCheckOut = async () => {
        try {
            if(auth.user?.address){
                await dispatch(createOrder({
                    address:auth.user?.address[currentAddress],
                    jwt:localStorage.getItem("jwt") || "",
                    paymentGateway:paymentGateway
                })).unwrap()
                .then(() => {
                    enqueueSnackbar("order Placed",{
                        variant:"success",
                        anchorOrigin:{vertical:"top",horizontal:"right"}
                    })
                })
            }
        } catch (error) {
            enqueueSnackbar("Order not Placed",{
                variant:"error",
                anchorOrigin:{vertical:"top",horizontal:"right"}
            })
        }
    }

    return (
        <>
            <div className="pt-10 px-5 sm:px-10 md:px-44 lg:px-60 min-h-screen">
                <div className="space-y-5 lg:grid grid-cols-3 lg:gap-9">
                    <div className="col-span-2 space-y-5">
                        <div className="flex justify-between items-center">
                            <h1 className="font-semibold">Select Address</h1>
                            <Button onClick={handleOpen}>Add New Address</Button>
                        </div>

                        <div className="text-xs font-medium space-y-5">
                            <p>Saved Addresses</p>
                            <div className="space-y-3">
                                {auth.user?.address && auth.user.address.length > 0 ? (
                                    auth.user.address.map((item: any, index: number) => (
                                        <div className="p-5 border rounded-md flex" key={index}>
                                            <div>
                                                <Radio
                                                    checked={currentAddress === index}
                                                    onChange={() => handleAddressChange(index)}
                                                    value={index}
                                                    name="address-radio"
                                                />
                                            </div>

                                            <div className="space-y-3 pt-3">
                                                <h1>Name</h1>
                                                <p className="w-[320px]">
                                                    {item.address}, {item.city}, {item.state} -{" "}
                                                    {item.pincode}
                                                </p>
                                                <p>
                                                    <strong>Mobile: </strong>
                                                    {item.mobile}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No saved addresses found. Add a new address to proceed.</p>
                                )}
                            </div>
                        </div>

                        <div className="py-4 px-5 rounded-md border">
                            <Button onClick={handleOpen}>Add New Address</Button>
                        </div>
                    </div>
                    <div>
                        <div className="space-y-3 p-5 border rounded-md">
                            <h1 className="text-primary-color pb-2 font-medium text-center">
                                Choose Payment Gateway
                            </h1>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                className="flex justify-between pr-0"
                                onChange={handlePaymentChange}
                                value={paymentGateway}
                            >
                                {paymentGatewayList.map((item) => (
                                    <FormControlLabel
                                        key={item.value}
                                        className="border w-[45%] pr-2 rounded-md flex justify-center"
                                        value={item.value}
                                        control={<Radio />}
                                        label={
                                            <img
                                                className="object-cover"
                                                src={item.image}
                                                alt={item.value}
                                            />
                                        }
                                    />
                                ))}
                            </RadioGroup>
                        </div>
                        <div className="border rounded-md">
                            <PricingCart />
                            <div className="p-5">
                                <Button fullWidth variant="contained" sx={{ py: "11px" }} onClick={handleCheckOut}>
                                    CHECKOUT
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <AddressForm paymentGateway={paymentGateway} userId={auth.user?.id || 0} />
                </Box>
            </Modal>
        </>
    );
};

export default CheckOut;
