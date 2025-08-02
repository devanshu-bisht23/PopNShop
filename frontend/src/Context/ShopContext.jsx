import React, { createContext, useState } from "react";
import all_product from '../Components/Assets/all_product'

export const ShopContext = createContext(null); // creates a context object named ShopContext

    const getDefaultCart = () =>{
        let cart = {}; //empty cart objet like a key:value pair 

        for (let index = 0; index < all_product.length + 1; index++){
            cart[index] = 0;
        }

        return cart;
    
    }

const ShopContextProvider = (props) => { 
    
    const [cartItems , setCartItem] = useState(getDefaultCart()); // state variable that holds cart , function to update this cart
   
    const addToCart = (itemId) => {
        setCartItem((prev)=>({...prev, [itemId]:prev[itemId]+1})) 
        console.log(cartItems);
    } //prev will get the state before the update — the current state at that moment, just before React applies your change.

    const removeFromCart = (itemId) => {
        setCartItem((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }

    const getTotalCartAmount = () =>{
        let totalAmount = 0;

        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo = all_product.find((product)=>product.id === Number(item));
                totalAmount += itemInfo.new_price*cartItems[item]*10;
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () => {
        let totalItems = 0;

        for(const item in cartItems){
            if(cartItems[item]>0){
                totalItems+= cartItems[item];
            }
        }
        return totalItems;
    }

    const contextValue = {all_product, cartItems, addToCart, removeFromCart,getTotalCartAmount,getTotalCartItems}; // passing cartItem as context value

    return ( // what we wanna provide is in value = {contextValue}
        <ShopContext.Provider value = {contextValue}> 
            {props.children} 
        </ShopContext.Provider>
    )

}

export default ShopContextProvider;