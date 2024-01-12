import React,{useState} from 'react';
import Form from './Components/From/Form';
import Cart from './Components/Cart/Cart';
import { CartProvider } from './Components/Store/CartProvider';

function App() {
  const [cartIsShown,setCartIsShown] = useState(false);

  const showCartHandler=()=>{
    setCartIsShown(true)
  }
  const hideCartHandler=()=>{
    setCartIsShown(false)
  }

  return (
    <CartProvider>
{cartIsShown && <Cart onClose={hideCartHandler}/>}
    
      <Form onShowCart={showCartHandler} />

    </CartProvider>
  );
}

export default App;
