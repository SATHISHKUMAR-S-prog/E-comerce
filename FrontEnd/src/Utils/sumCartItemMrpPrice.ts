import { CartItem } from "../Types/CartType";

export const sumCartItemMrpPrice = (cartItem:CartItem[]) => {
    return cartItem.reduce((acc,item) => acc + item.product.mrpPrice * item.quantity,0)
}

export const sumCartItemSellingPrice = (cartItem:CartItem[]) => {
    return cartItem.reduce((acc,item) => acc + item.product.sellingPrice * item.quantity,0)
}