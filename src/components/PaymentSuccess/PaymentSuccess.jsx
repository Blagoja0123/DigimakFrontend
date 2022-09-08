import React from 'react'
import { Link } from 'react-router-dom'
function PaymentSuccess() {
    const handleReturn = () =>{
        sessionStorage.removeItem('cart');
        sessionStorage.removeItem('checkoutCart');
    }
  return (
    <>
    <div>Payment successful</div>
    <Link to='/'><button onClick={handleReturn}>return to homepage</button></Link>
    </>
  )
}

export default PaymentSuccess