
import { CheckCircle, FiberManualRecord } from "@mui/icons-material";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Order, OrderStatus } from "../../../Types/OrderType";

const steps = [
    { name: "Order Placed", description: "Order placed successfully.", value: "PLACED" },
    { name: "Confirmed", description: "Order confirmed by seller.", value: "CONFIRMED" },
    { name: "Shipped", description: "Order has been shipped.", value: "SHIPPED" },
    { name: "Arriving", description: "Order is on its way.", value: "ARRIVING" },
    { name: "Delivered", description: "Order has been delivered.", value: "DELIVERED" },
];

const canceledStep = [
    { name: "Order Placed", description: "Order placed successfully.", value: "PLACED" },
    { name: "Order Cancelled", description: "Order has been cancelled.", value: "CANCELLED" },
];

const OrderSteper = ({
    orderStatus ,
    order,
}: {
    orderStatus: OrderStatus;
    order: Order | null;
}) => {
    const [statusStep, setStatusStep] = useState(steps);

    useEffect(() => {
        if (orderStatus === "CANCELLED") {
            setStatusStep(canceledStep);
        } else {
            setStatusStep(steps);
        }
    }, [orderStatus]);

    const currentStep = statusStep.findIndex((item) => item.value === orderStatus);

    return (
        <Box className="my-10">
            {statusStep.map((step, index) => (
                <div key={index} className="flex px-4">
                    {/* Step Indicator */}
                    <div className="flex flex-col items-center">
                        <Box
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                index <= currentStep ? "bg-teal-500 text-white" : "bg-gray-300"
                            }`}
                        >
                            {index === currentStep ? <CheckCircle /> : <FiberManualRecord />}
                        </Box>
                        {index < statusStep.length - 1 && (
                            <div
                                className={`border h-20 w-[2px] ${
                                    index < currentStep ? "bg-teal-500" : "bg-gray-300"
                                }`}
                            ></div>
                        )}
                    </div>

                    {/* Step Details */}
                    <div className="ml-2 w-full">
                        <div
                            className={`p-2 ${
                                step.value === orderStatus
                                    ? "bg-teal-500 text-white font-medium rounded-md"
                                    : ""
                            }`}
                        >
                            <p>{step.name}</p>
                            <p
                                className={`text-xs ${
                                    step.value === orderStatus ? "text-gray-200" : "text-gray-500"
                                }`}
                            >
                                {step.description}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </Box>
    );
};

export default OrderSteper;
