import React, { useContext} from "react";
import Modal from '../Modal/Modal.js'
import { CartContext } from "../Store/CartProvider.js";

const Cart = (props) => {
    const { shoeList } = useContext(CartContext);

    const totalAmount = shoeList.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);
   

    return (
        <Modal onClose={props.onClose}>
            <div style={{
                backgroundImage: 'url("https://img.freepik.com/premium-photo/side-view-woman-heels-with-copy-space_23-2148450356.jpg?w=826")',  // Replace with the URL of your background image
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                padding: '20px',
                borderRadius: '15px',
            }}>

                <h1 className="text-center mb-4 text-primary">Your Cart</h1>
                
                <ul className="list-group" style={{ maxHeight: "10rem", overflow: "scroll" }}>
                    {shoeList.map((item, index) => (
                        <li key={index} className="list-group-item" style={{ backgroundColor: 'transparent' }}>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h2><strong className="text-white">{item.shoename}</strong></h2>
                                    <p>Size: <span className="text-info">{item.selectedSize}</span></p>
                                </div>
                                <div className="text-end">
                                    <p className="text-success">Price: ${item.price}</p>
                                </div>
                            </div>
                        </li>
                    ))}



                </ul>

                {/* Total amount section */}
                <div className="mt-4 text-end">
                    <h3>
                        <strong className="text-danger">Total Amount: ${totalAmount}</strong>
                    </h3>
                </div>
            </div>
        </Modal >
    );
}

export default Cart;
