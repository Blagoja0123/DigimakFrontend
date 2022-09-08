import React from 'react'
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import NavBar from '../Navbar/NavBar';
import './cart.css'
function Cart() {
  
  const [cartItem, setCartItem] = useState([]);
  const [qtyCart, setQtyCart] = useState([]);
  useEffect(() => {
    const cart = JSON.parse(sessionStorage.getItem('cart'));
    const tempCart = JSON.parse(sessionStorage.getItem('checkoutCart'));
    setQtyCart(tempCart);
    console.log(tempCart);
    setCartItem(cart);
    console.log(cartItem);
  }, [])

  
  const handleDelete = (index) =>{
      let tempCart = JSON.parse(sessionStorage.getItem('cart'));
      let secondCart = JSON.parse(sessionStorage.getItem('checkoutCart'));
      secondCart.splice(index, 1);
      tempCart.splice(index, 1);
      sessionStorage.setItem('cart', JSON.stringify(tempCart));
      sessionStorage.setItem('checkoutCart', JSON.stringify(secondCart));
      setCartItem(JSON.parse(sessionStorage.getItem('cart')));
    }

  const clearCart = () =>{
    sessionStorage.removeItem('cart');
    sessionStorage.removeItem('checkoutCart');
  }

  const getTotal = () =>{
    let sum = 0;
    for(let i=0;i<cartItem.length;i++){
      sum+=(parseInt(cartItem?.[i].price)*qtyCart[i].quantity);
      console.log(qtyCart[i].quantity);
      console.log(sum);
    }
    return sum;
  }

  
  
  const renderItems = ()=>(
    <div className="cart">
      <div className='cartItemsMap'>
          {cartItem.map((item) =>(
            <div className="cartProducts">
            <div className="cartProduct">
                <div className='productInformations'>
                    <img src={item?.images?.[0]?.src} alt="" />
                    <div className='productText'>
                        <h3>Air Jordan 1</h3>
                        <h2>{item.name}</h2>
                    </div>
                  </div>
    
                    <div className="price">
                      <h3>${item.price}</h3>
                      <button className='noStyle'onClick={(index)=>handleDelete(index)}><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#222222" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
                    </div>
              </div>
            </div>
        ))}
        </div>
        <div className="subtotalinfo">
          <div className="checkoutinfo">
            <div className='summary'>
                <h3>Order Summary</h3>
                <div className="subtotalPricing">
                  <h3>Subtotal <span>{getTotal()}$</span> </h3>
                  <h3>Shipping <span>Free</span></h3>
                </div>
            </div>
            
            <div className='total'>
            <div><a href='/checkout'><button className='btn'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M7 15h0M2 9.5h20"/></svg>Proceed to checkout</button></a></div>
              <h2>Total <span>{getTotal()}$</span> </h2>
            </div>
            <div className='total'><button className='btn' onClick={clearCart}>Empty Cart</button></div>
          </div>

          <div className="goBackStore">
          <h3>Back to store</h3>
        </div>


        </div>
      </div>
  )
  return (
    <>
    <NavBar/>
    <div className="cartHeader"><h1>Shopping Cart</h1></div>
    <div>{cartItem 
          ? renderItems() 
          : <div className='error'>

          <div ><h1 className='errorText'>No items in cart</h1></div>
          <button className='btn' onClick={clearCart}>Empty Cart</button>
          </div>}</div>
    </>
    
  )
}

export default Cart