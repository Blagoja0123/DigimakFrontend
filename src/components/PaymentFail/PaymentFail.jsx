import React from 'react'
import { Link } from 'react-router-dom'
function PaymentFail() {

    const handleCancel = () =>{
        sessionStorage.removeItem('cart');
        sessionStorage.removeItem('checkoutCart');
    }
  return (
    <>
    <div>Payment failed</div>
    <div><Link to='/checkout'><button>Re-enter order information</button></Link></div>
    <div><Link to='/'><button onClick={handleCancel}>Cancel</button></Link></div>
    </>
  )
}

export default PaymentFail