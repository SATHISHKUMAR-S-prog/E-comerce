import { Seller } from "./SellerType";

export interface Product{
    id?: number;
    title: string;
    description: string;
    mrpPrice: number;
    sellingPrice: number;
    discountPercent?: number;
    quantity:number;
    color: string;
    images: string[];
    numRating?: number;
    category?:Category ;
    seller?: Seller;
    createAt?:Date ;
    sizes:string;
    // in_stock:boolean;
}

interface Category{
    id?:number;
    name:string;
    categoryId:string;
    parentCateogry?:Category;
    level:number;
}

