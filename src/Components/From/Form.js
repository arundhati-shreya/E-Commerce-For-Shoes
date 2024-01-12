import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import FormList from "./FormList";
import "bootstrap/dist/css/bootstrap.min.css"; 
import { CartContext} from "../Store/CartProvider";

const Form = (props) => {
  const [shoeData, setShoeData] = useState({
    shoename: "",
    des: "",
    price: "",
    sizeL: "",
    sizeM: "",
    sizeS: ""
  });

  const [itemList, setItemList] = useState([]);
  const { shoeList } = useContext(CartContext)

  useEffect(() => {
    fetchDataList();
  }, []);

  const fetchDataList = async () => {
    try {
      const response = await axios.get("https://crudcrud.com/api/941eb07dceaf4b23b7ff33249adc8f86/shoeList");
      setItemList(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setShoeData((prevShoeData) => ({
      ...prevShoeData,
      [name]: value
    }));
  };

  const submitHandler = async(e) => {
    e.preventDefault();
    try {
      
      await axios.post("https://crudcrud.com/api/941eb07dceaf4b23b7ff33249adc8f86/shoeList", shoeData);
      
      fetchDataList();
    } catch (error) {
      console.error("Error posting data:", error);
    }

    setItemList([...itemList, shoeData]);
    setShoeData({
      shoename: "",
      des: "",
      price: "",
      sizeL: "",
      sizeM: "",
      sizeS: ""
    });
  };


  return (
    <>
      <div className="container mt-4 border rounded p-4" style={{ maxWidth: "600px" }}>
        <h1 className="text-center text-white fw-bold " style={{ fontFamily: 'cursive' ,textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>Faishon Footwear</h1>
      <h3 className="text-center text-primary " style={{ fontFamily: 'italic' }}>Walking in Comfort</h3>

      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="shoename" className="form-label text-white">
            Name:
          </label>
          <input
            id="shoename"
            name="shoename"
            value={shoeData.shoename}
            onChange={changeHandler}
            type="text"
            className="form-control"
            placeholder="Shoe Name"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="des" className="form-label text-white">
            Description:
          </label>
          <input
            id="des"
            name="des"
            value={shoeData.des}
            onChange={changeHandler}
            type="text"
            className="form-control"
            placeholder="Description"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label text-white">
            Price:
          </label>
          <input
            id="price"
            name="price"
            value={shoeData.price}
            onChange={changeHandler}
            type="number"
            className="form-control"
            placeholder="Price"
          />
        </div>

        <div className="mb-3 d-flex">
          <div className="me-2">
            <input
              type="number"
              name="sizeL"
              value={shoeData.sizeL}
              onChange={changeHandler}
              className="form-control"
              placeholder="Size L"
            />
          </div>
          <div className="me-2">
            <input
              type="number"
              name="sizeM"
              value={shoeData.sizeM}
              onChange={changeHandler}
              className="form-control"
              placeholder="Size M"
            />
          </div>
          <div>
            <input
              type="number"
              name="sizeS"
              value={shoeData.sizeS}
              onChange={changeHandler}
              className="form-control"
              placeholder="Size S"
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>

    </div >
      <button onClick={props.onShowCart} className="btn btn-info position-absolute top-0 end-0 mt-3">
        Cart ({shoeList.length})
      </button>

  <div className="container mt-4 border rounded p-4" style={{ maxWidth: "600px", background: "#f8f9fa" }}>

    <FormList onList={itemList} fetchDataList={fetchDataList} />
  </div>
    </>
  );
};

export default Form;
