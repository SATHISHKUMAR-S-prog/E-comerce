import { Deal } from "./DealType";

export interface HomeCategory{
    id?:number;
    categoryId:string;
    section?:string;
    name?:string;
    images:string;
    parentCategoryId?:string;
}

export interface HomeData{
    id:number;
    gird:HomeCategory[];
    shopByCategory:HomeCategory[];
    electricCategory:HomeCategory[];
    dealsCategory:HomeCategory[];
    deals:Deal[]
}