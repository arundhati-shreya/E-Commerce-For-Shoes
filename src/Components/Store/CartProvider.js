import React, { useState } from "react";


const CartContext = React.createContext();

const CartProvider=(props)=>{
    const [shoeList,setShoeList] = useState([])

    const BuyHandler=(item,size)=>{
      setShoeList([...shoeList,{ ...item, selectedSize: size }])
    }

    
    return(
        <CartContext.Provider value={{BuyHandler,shoeList}}>
        {props.children}
        </CartContext.Provider>
    )
}
export {CartContext,CartProvider}