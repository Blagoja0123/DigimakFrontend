import axios from 'axios';
import React from 'react'
import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import NavBar from '../Navbar/NavBar';
import './checkout.css'
const initialState = {
    payment_method: "bacs",
    payment_method_title: "Direct Bank Transfer",
    set_paid: false,
    billing: {
      first_name: "",
      last_name: "",
      address_1: "",
      city: "",
      state: "",
      postcode: "",
      country: "",
      email: "",
      phone: ""
    },
    shipping: {
      first_name: "",
      last_name: "",
      address_1: "",
      city: "",
      state: "",
      postcode: "",
      country: ""
    },
    line_items: [],
    shipping_lines: [
      {
        method_id: "flat_rate",
        method_title: "Flat Rate",
        total: "10.00"
      }
    ]
  };
  
  function Temp() {
    const [checkoutInfo, setCheckoutInfo] = useState({});
    const [cartItem, setCartItem] = useState([]);
    const [billingInfo, setBillingInfo] = useState({});
    const [shippingInfo, setShippingInfo] = useState({});
    const [lineItem, setLineItem] = useState([]);
    const [userBilling, setUserBilling] = useState({});
    const [userShipping, setUserShipping] = useState({});
    // let validated;
    const [hasInfo, setHasInfo] = useState(false);
    //page load funkcii
    const validate = (bill, ship) =>{
    console.log(bill);
    const billingValues = Object.values(bill);
    const shippingValues = Object.values(ship);
    console.log(billingValues);
    console.log(shippingValues);
    let billingCount = 0;
    let shippingCount = 0;
    
    for (let i = 0; i < billingValues.length; i++) {
      if(billingValues[i] !== ''){
        billingCount++;
      }
    }
    for (let i = 0; i < shippingValues.length; i++) {
      if(shippingValues[i] !== ''){
        shippingCount++;
        console.log(shippingValues[i]);
      }
    }
    if(billingCount === billingValues.length && shippingCount === shippingValues.length){
      return true;
    }else{
      return false;
    }
  }
  useEffect(() => {
    setBillingInfo(initialState.billing);
    setShippingInfo(initialState.shipping);
    setCheckoutInfo(initialState);
    let temporaryObject = JSON.parse(sessionStorage.getItem('loggedInUser'));
    console.log(temporaryObject);
    if(temporaryObject){
      setUserBilling(temporaryObject.billing);
      setUserShipping(temporaryObject.shipping);
      console.log(userBilling);
      console.log(userShipping);
        setHasInfo(validate(temporaryObject.billing, temporaryObject.shipping));
      }
      setCartItem(JSON.parse(sessionStorage.getItem('checkoutCart')));
      setLineItem(JSON.parse(sessionStorage.getItem('cart')));
    }, [])
    console.log(hasInfo);
    
    //validacija
  
  // input funkcii
  const handleBilling = (e) =>{
    setBillingInfo(prev=>{
      return{...prev, [e.target.name]:e.target.value}
    })
  }
  
  const handleExistingInfo = () =>{
    checkoutInfo.billing = userBilling;
    checkoutInfo.shipping = userShipping;
    console.log(checkoutInfo);
    sessionStorage.setItem('checkout', JSON.stringify(checkoutInfo));
    return (
      <>
      <p>Your billing and shipping information is filled in</p>
      <Link to = '/payment'><div><button>payment</button></div></Link>
      </>
    )
  }

  const handleShipping = (e) =>{
    setShippingInfo(prev=>{
      return{...prev, [e.target.name]:e.target.value}
    })
  }
 /*  const handleButton = async (e) =>{
    validated = validate(billingInfo, shippingInfo);
  }
  */ 
  //kombinirane na site input fields u eden objekt
  checkoutInfo.billing = {...billingInfo};
  checkoutInfo.shipping = {...shippingInfo};
  if(cartItem){checkoutInfo.line_items = [...cartItem];}
  sessionStorage.setItem('checkout', JSON.stringify(checkoutInfo));
  

  //render funkcii
  const renderCartItems = () =>(
    <div>{lineItem.map((item) =>(
      <ul className='itemBlock'>
        <div>
          <div><h3>{item.name}</h3></div>
          <div className='imageBlock'><li><img src={item?.images?.[0]?.src} className='itemImage'/></li></div>
          <li className='itemPrice'><h3>${item.price}</h3></li>
        </div>
      </ul>
    ))}</div>
    )
  const renderForm = () =>(
      <>
    <div className="checkout">
      <div className="billingForm">  
        <h3>Billing Info</h3>
        <form>
          <input name = 'first_name' type="text" placeholder='first name' onChange={handleBilling}/>
          <input name = 'last_name' type="text" placeholder='last name' onChange={handleBilling}/>
          <input name = 'address_1' type="text" placeholder='address' onChange={handleBilling}/>
          <input name = 'city' type="text" placeholder='city' onChange={handleBilling}/>
          <input name = 'state' type="text" placeholder='state' onChange={handleBilling}/>
          <input name = 'postcode' type="text" placeholder='postcode' onChange={handleBilling}/>
          <input name = 'country' type="text" placeholder='country' onChange={handleBilling}/>
          <input name = 'email' type="text" placeholder='email' onChange={handleBilling}/>
          <input name = 'phone' type="text" placeholder='phone' onChange={handleBilling}/>
        </form>
      </div>
    <div className="shippingForm">
        <h3>Shipping Info</h3>
        <form>
        <input name = 'first_name' type="text" placeholder='first name' onChange={handleShipping}/>
        <input name = 'last_name' type="text" placeholder='last name' onChange={handleShipping}/>
        <input name = 'address_1' type="text" placeholder='address' onChange={handleShipping}/>
        <input name = 'city' type="text" placeholder='city' onChange={handleShipping}/>
        <input name = 'state' type="text" placeholder='state' onChange={handleShipping}/>
        <input name = 'postcode' type="text" placeholder='postcode' onChange={handleShipping}/>
        <input name = 'country' type="text" placeholder='country' onChange={handleShipping}/>
      </form>
    </div>
    <div className='cartBlock'>{renderCartItems()}</div>
    </div>
    <div className='payment'>{validate(billingInfo, shippingInfo) 
          ? <Link to = '/payment'><div><button className='btn'>payment</button></div></Link>
          : <h4>All input fields are required</h4>
        }</div>
  </>
  )
  const renderItems = () => (
    <div>{hasInfo ? handleExistingInfo() : renderForm()}</div>
  )
  //   console.log(Object.keys(billingInfo));
  //   console.log(Object.keys(shippingInfo));
  return (
    <>
    <NavBar/>
    <div>{cartItem ? renderItems() : 'No items in cart, cannot check out'}
    </div>
    </>
  )
}

export default Temp