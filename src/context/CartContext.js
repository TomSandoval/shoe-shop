"use client";

import { useLocalStorage } from "@/Hooks/UseLocalStorage";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage("cart", [])


  useEffect(()=>{
    window.localStorage.setItem("cart",JSON.stringify(cartItems))
  },[cartItems])

  const addProduct = (data) => {
    setCartItems([...cartItems, data]);
  };

  const deleteProduct = (indexData) => {
    const newProducts = cartItems.filter((item, index) => index !== indexData);

    setCartItems(newProducts);
  };

  const setCart = (cart) => {
    setCartItems(cart)
  }


  const getTotalCart = () => {
    let amount = 0;


    for (let i = 0; i < cartItems.length; i++) {
      for (let j = 0; j < cartItems[i].total; j++) {
        if (cartItems[i].product.in_discount) {
          amount = amount + cartItems[i].product.discount_price;
        } else {
          amount = amount + cartItems[i].product.original_price;
        }
      }
    }

    return amount.toFixed(2)
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addProduct,
        deleteProduct,
        setCart,
        getTotalCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
