import React, { useState, useEffect } from "react";
import axios from "axios";

const CartContext = React.createContext();

const CartProvider=(props)=>{
    const [shoeList,setShoeList] = useState([])

    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      try {
        const response = await axios.get("https://crudcrud.com/api/941eb07dceaf4b23b7ff33249adc8f86/carts");
        setShoeList(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const BuyHandler = async (item, size) => {
      console.log("BuyHandler called with:", item, size);
      try {
        const { _id, ...itemWithoutId } = item;
        await axios.post("https://crudcrud.com/api/941eb07dceaf4b23b7ff33249adc8f86/carts", { ...itemWithoutId, selectedSize: size });
  
        fetchData();
      } catch (error) {
        console.error("Error posting data:", error);
      }
    };

    const removeFromCart = async (shoeSize) => {
      try {
        const itemToRemove = shoeList.find(item => item.selectedSize === shoeSize);
        // Check if itemToRemove is found before trying to delete
        if (itemToRemove) {
          await axios.delete(`https://crudcrud.com/api/941eb07dceaf4b23b7ff33249adc8f86/carts/${itemToRemove._id}`);
          fetchData();
        } else {
          console.error("Item not found in the cart.");
        }
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    };
  
    

    return(
        <CartContext.Provider value={{BuyHandler,shoeList,removeFromCart}}>
        {props.children}
        </CartContext.Provider>
    )
}
export {CartContext,CartProvider}