import React, { useContext,useState } from "react";
import { CartContext } from "../Store/CartProvider";

const FormList = (props) => {
  const {BuyHandler} = useContext(CartContext)
  const [itemQuantities, setItemQuantities] = useState({});

  const handleBuyClick = (item, size) => {
    BuyHandler(item, size);
    // Decrease the quantity for the selected size
    setItemQuantities((prevQuantities) => ({
      ...prevQuantities,
      [`${item.shoename}-${size}`]: (prevQuantities[`${item.shoename}-${size}`] || 0) + 1,
    }));
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
                <button className="btn btn-primary me-2" onClick={() => handleBuyClick(item, 'sizeL')}>Buy ({item.sizeL - (itemQuantities[`${item.shoename}-sizeL`] || 0)})</button>
                <button className="btn btn-primary me-2" onClick={() => handleBuyClick(item, 'sizeM')}>Buy({item.sizeM - (itemQuantities[`${item.shoename}-sizeM`] || 0)})</button>
                <button className="btn btn-primary" onClick={() => handleBuyClick(item, 'sizeS')}>Buy({item.sizeS - (itemQuantities[`${item.shoename}-sizeS`] || 0)})</button>
              </div>
            </div>
            <hr/>
          </li>
        ))}
      </ul>
    </>
  );
};

export default FormList;
