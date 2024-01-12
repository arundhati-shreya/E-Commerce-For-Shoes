import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { CartContext } from "../Store/CartProvider";

const FormList = (props) => {
  const { BuyHandler } = useContext(CartContext)
  const [itemQuantities, setItemQuantities] = useState({});
  // const [formList, setFormList] = useState([]);


  const handleBuyClick = async (item, size) => {
    try {
      const quantity = parseInt(item[size], 10);


      if (quantity > 0) {
        const newSizeValue = size === 'sizeL' ? item.sizeL - 1 : size === 'sizeM' ? item.sizeM - 1 : item.sizeS - 1;

        await axios.put(`https://crudcrud.com/api/941eb07dceaf4b23b7ff33249adc8f86/shoeList/${item._id}`, {
          des: item.des,
          price: item.price,
          shoename: item.shoename,
          sizeL: size === 'sizeL' ? newSizeValue : item.sizeL,
          sizeM: size === 'sizeM' ? newSizeValue : item.sizeM,
          sizeS: size === 'sizeS' ? newSizeValue : item.sizeS,
        });


        props.fetchDataList();

        BuyHandler(item, size);

        setItemQuantities((prevQuantities) => ({
          ...prevQuantities,
          [`${item.shoename}-${size}`]: (prevQuantities[`${item.shoename}-${size}`] || 0) + 1,
        }));
      } else {
        console.warn("Item is out of stock.");
      }
    } catch (error) {
      console.error("Error putting data:", error);
    }
  };



  return (
    <>
      <h3 className="text-center text-dark" style={{ fontFamily: 'cursive' }}>Shoes List</h3>

      <ul className="list-group">

        {props.onList.map((item, index) => (
          <li key={index} className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <strong>{item.shoename}</strong>
                <p>{item.des}</p>
                <p>Price: ${item.price}</p>
              </div>

              <div>
                <div className="container text-center">
                  <p>Sizes: <div>L , M , S</div></p>
                </div>
                <button className="btn btn-primary me-2" onClick={() => handleBuyClick(item, 'sizeL')}>Buy ({item.sizeL - (itemQuantities[`${item.shoename}-sizeL`] || 0)})</button>
                <button className="btn btn-primary me-2" onClick={() => handleBuyClick(item, 'sizeM')}>Buy({item.sizeM - (itemQuantities[`${item.shoename}-sizeM`] || 0)})</button>
                <button className="btn btn-primary" onClick={() => handleBuyClick(item, 'sizeS')}>Buy({item.sizeS - (itemQuantities[`${item.shoename}-sizeS`] || 0)})</button>
              </div>
            </div>
            <hr />
          </li>
        ))}
      </ul>

    </>
  );
};

export default FormList;

//  des: item.des,
// price: item.price,
// shoename: item.shoename,
// sizeL: item.sizeL,
// sizeM: item.sizeM,
// sizeS: item.sizeS,
// _id:item._id,