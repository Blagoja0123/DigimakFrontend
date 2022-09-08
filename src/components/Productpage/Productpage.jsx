import React from 'react'
import './productpage.css'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import {useLocation} from 'react-router-dom'
import '../Homepage/homepage.css'
import Logo from '../../images/whitelogo.png'
import { NavLink } from 'react-router-dom'
import NavBar from '../Navbar/NavBar'

const initialState = {
    product_id: "",
    quantity: ""
};

// function loading(){
//   document.getElementById("preloader").style.opacity = "0";
//   document.getElementById("preloaderbg").style.width = "0"; 
// }
// setInterval(loading, 0);

function Productpage() {


    const location = useLocation();
    const id = location.pathname.split('/')[3];
    const [product, setProduct] = useState({});
    const [cart, setCart] = useState([]);
    const [checkoutCart, setCheckoutCart] = useState([]);
    const [tempProduct, setTempProduct] = useState({});
    let [quantity, setQuantity] = useState(1);
    //const [category, setCategory] = useState({});
    useEffect(() => {
      setQuantity(0);
      setTempProduct(initialState);
      let currentCart = sessionStorage.getItem('cart');
      let checkoutCart = sessionStorage.getItem('checkoutCart');
      checkoutCart = JSON.parse(checkoutCart);
      currentCart = JSON.parse(currentCart);
      if(currentCart) setCart(currentCart);
      if(checkoutCart) setCheckoutCart(checkoutCart);
    }, [])
     
    useEffect(() => {
        const getProduct = async ()=>{
          try{
            const response = await axios.get('http://localhost:3000/product/'+id)
            setProduct(response.data);
          }catch(err){
            console.log('error');
          }
        }
        getProduct();
    }, [])

    
    const addItem = () =>{
      tempProduct.product_id = product.id;
      tempProduct.quantity = quantity;
      console.log(tempProduct);
      let cartCopy = [...cart];
      let tempCartCopy = [...checkoutCart];
      cartCopy.push(product)
      tempCartCopy.push(tempProduct);
      setCheckoutCart(tempCartCopy);
      setCart(cartCopy)
      let tempStringCart = JSON.stringify(tempCartCopy);
      sessionStorage.setItem('checkoutCart', tempStringCart);
      let stringCart = JSON.stringify(cartCopy);
      sessionStorage.setItem('cart', stringCart);
    }

    const handleInc = () =>{
      setQuantity(quantity+1);
      }
    const handleDec = () =>{
      if(quantity === 1){
        setQuantity(1);
      }else{
        setQuantity(quantity-1);
      }
    }

  return (
    <div id='product-page'>

    <NavBar/>
      
      <div className="productHeader">
        <a href="/store"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H6M12 5l-7 7 7 7"/></svg></a>

        <div className="location"><a href="/">Home</a> <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg> <a href="/store">Store</a> </div>
      </div>

    
    <div className="productinfo">
      <div className="productImages">
        <div ><img src={product?.images?.[0]?.src }className="Image"></img></div>
        <div className="prodoductSlider">
          <img src="" alt="" />
          <img src="" alt="" />
          <img src="" alt="" />
          <img src="" alt="" />
        </div>
      </div>
      
      <div className='product-informations-right'>
      <div className='productmodel'>
        <div className="ProductBrand">Air Jordan 1</div>
        <div className="Title">{product.name}</div>
        <div className="Price">${product.price}</div>
      </div>

      <div className="productquantity">
        <button className='quantityBtn' onClick={handleInc}><i class="fa-regular fa-square-plus"></i></button>
        <p>{quantity}</p>
        <button className='quantityBtn' onClick={handleDec}><i class="fa-regular fa-square-minus"></i></button>
      </div>

      <div className='checkoutBtn'>
        <button onClick={addItem}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V6l-3-4H6zM3.8 6h16.4M16 10a4 4 0 1 1-8 0"/></svg> Add to Cart</button>
        <h3>Total: ${product.price}</h3>
      </div>
      </div>

    </div>

      
      
      
      
    </div>
  )
}

export default Productpage