export interface Seller{
    id:number;
    mobile:string;
    otp:string;
    gstin:string;
    pickUpAddress:PickupAddress;
    bankDetails:BankDetails;
    sellerName:string;
    email:string;
    businessDetails:BusinessDetails;
    password?: string;
    accountStatus?:AccountStatus;
}

export interface PickupAddress{
    // id?:number;
    name:string;
    locality:string;
    address:string;
    city: string;
    state: string;
    pincode: string;
    mobile:string;
}

export interface BankDetails{
    accountNumber:string;
    accountHolderName: string;
    ifscCode: string;
}

export interface BusinessDetails{
    businessName:string;
}

export interface SellerReport{
    id:number;
	seller:Seller;
	totalEarnings:number;
	totalSales :number;
	totalRefunds :number;
	totalTax :number;
	netearning :number;
	totalOrders:number;
	cancelledOrders:number;
	totalTransactions:number;
}

export enum AccountStatus {
    PENDING_VERFICATION = "PENDING_VERFICATION",
	ACTIVE = "ACTIVE",		
	SUSPENDED = "SUSPENDED",			
	DEACTIVATED = "DEACTIVATED"	,
	BANNED = "BANNED",
	CLOSED = "CLOSED"
}