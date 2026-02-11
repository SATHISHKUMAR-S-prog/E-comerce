export interface Address{
    id?:number;
    name:string;
    locality:string;
    address:string;
    city: string;
    state: string;
    pincode: string;
    mobile:string;
}

export enum Userrole{
    ROLE_CUSTOMER = "ROLE_CUSTOMER",
    ROLE_ADMIN = "ROLE_ADMIN",
    ROLE_SELLER = "ROLE_SELLER"
}

export interface User{
    id:number;
    password?: string;
    email:string;
    fullname:string;
    mobile?:string;
    role:Userrole;
    address?:Address[]
}

