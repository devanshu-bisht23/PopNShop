import React, { createContext, useEffect, useState } from "react";
// import all_product from '../Components/Assets/all_product'

export const ShopContext = createContext(null); // creates a context object named ShopContext

    const getDefaultCart = () =>{
        let cart = {}; //empty cart objet like a key:value pair 

        for (let index = 0; index < 300 + 1; index++){
            cart[index] = 0;
        }

        return cart;
    
    }

const ShopContextProvider = (props) => {

    const [all_product,setAll_Product] = useState([]); // fetch all product data and store it in all product state variable
    const [cartItems , setCartItem] = useState(getDefaultCart()); // state variable that holds cart , function to update this cart
    
    useEffect(()=>{
        fetch('http://localhost:4000/getproduct')
        .then((Response)=>Response.json()).then((data)=>setAll_Product(data));

        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/getcart', {
                method: 'POST',
                headers:{
                    Accept: 'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:"",
            }).then((response) => response.json()).then((data)=>setCartItem(data));
        }
    },[])

    const addToCart = (itemId) => {
        setCartItem((prev)=>({...prev, [itemId]:prev[itemId]+1})) 
        // console.log(cartItems);

        if(localStorage.getItem('auth-token')){ // local storage has auth token // logged in
            fetch('http://localhost:4000/addtocart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            }).then((response)=>response.json()).then((data)=>console.log(data));
        }

    } //prev will get the state before the update — the current state at that moment, just before React applies your change.

    const removeFromCart = (itemId) => {
        setCartItem((prev)=>({...prev,[itemId]:prev[itemId]-1}))

        if(localStorage.getItem('auth-token')){
            if(localStorage.getItem('auth-token')){ // local storage has auth token // logged in
            fetch('http://localhost:4000/removefromcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            }).then((response)=>response.json()).then((data)=>console.log(data));
        }
        }
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