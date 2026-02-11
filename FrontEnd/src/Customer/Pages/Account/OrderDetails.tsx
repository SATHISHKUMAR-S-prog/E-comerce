import { Box, Button, Divider } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OrderSteper from "./OrderSteper";
import { Payments } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchOrderById, fetchOrderItemById } from "../../../State/Customer/OrderSlice";
import { OrderStatus } from "../../../Types/OrderType";

const OrderDetails = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { orderId, orderItemId } = useParams();
    const { order } = useAppSelector((store) => store);

    useEffect(() => {
        dispatch(
            fetchOrderById({
                orderId: Number(orderId),
                jwt: localStorage.getItem("jwt") || "",
            })
        );
        dispatch(
            fetchOrderItemById({
                orderItemId: Number(orderItemId),
                jwt: localStorage.getItem("jwt") || "",
            })
        );
    }, [dispatch, orderId, orderItemId]);

    const handleCancelOrder = () => {
      
    };

    return (
        <Box className="space-y-5">
            {/* Order Item */}
            <section className="flex flex-col items-center space-y-2">
                <img
                    className="w-[180px]"
                    src={order.orderItem?.product.images[0]}
                    alt={order.orderItem?.product.title || "Product"}
                />
                <div className="text-center space-y-1">
                    <h1 className="font-bold">
                        {order.orderItem?.product.seller?.businessDetails.businessName}
                    </h1>
                    <p>{order.orderItem?.product.title}</p>
                    <p>
                        <strong>Size: </strong>
                        {order.orderItem?.sizes}
                    </p>
                </div>
                <Button onClick={() => navigate("/review/create")}>Write Review</Button>
            </section>

            
            <section className="border p-5">
                <OrderSteper
                    orderStatus={order.currentOrder?.orderstatus || OrderStatus.PLACED}
                    order={order.currentOrder}
                />
            </section>

            {/* Delivery Address */}
            <section className="border p-5">
                <h1 className="font-bold pb-3">Delivery Address</h1>
                <div className="text-sm space-y-2">
                    <div className="flex font-medium gap-5">
                        <p>{order.currentOrder?.shippingAddress.name}</p>
                        <Divider />
                        <p>{order.currentOrder?.shippingAddress.mobile}</p>
                    </div>
                    <p>
                        {order.currentOrder?.shippingAddress.address},{" "}
                        {order.currentOrder?.shippingAddress.city},{" "}
                        {order.currentOrder?.shippingAddress.state} -{" "}
                        {order.currentOrder?.shippingAddress.pincode}
                    </p>
                </div>
            </section>

            {/* Pricing */}
            <section className="border space-y-4 p-5">
                <div className="flex justify-between text-sm">
                    <div className='space-y-1'>
                        <p className='font-bold'>Total Item Price</p>
                        <p>You Saved <span className='text-green-500 text-sm font-medium'>₹{(order.orderItem?.mrpPrice || 0) - (order.orderItem?.sellingPrice || 0)} on this item</span></p>
                    </div>
                    <p className="font-medium">
                        ₹{order.orderItem?.sellingPrice || 0}
                    </p>
                </div>
                <Divider />
                <p className="text-sm">
                    <strong>Sold By: </strong>
                    {order.orderItem?.product.seller?.businessDetails.businessName}
                </p>
                <Button
                    disabled={order.orderCancelled}
                    onClick={handleCancelOrder}
                    color="error"
                    variant="outlined"
                    fullWidth
                >
                    {order.orderCancelled ? "Order Cancelled" : "Cancel Order"}
                </Button>
            </section>
        </Box>
    );
};

export default OrderDetails;
