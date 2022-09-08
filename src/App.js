import './App.css';
import Shop from './components/Shop/Shop';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Homepage from './components/Homepage/HomePage.jsx';
import Productpage from './components/Productpage/Productpage';
import Cart from './components/Cart/Cart.jsx';
import Checkout from './components/Checkout/Checkout';
import PaymentSuccess from './components/PaymentSuccess/PaymentSuccess';
import PaymentFail from './components/PaymentFail/PaymentFail';
import Payment from './components/Payment/Payment';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import UserPage from './components/UserPage/UserPage';
import EditUser from './components/EditUser/EditUser';
import {useState} from 'react'
function App() {

  return (
    <Router>
      <Routes>
        <Route exact path = "/" element={<Homepage />}/>
        <Route path = "/store" element = {<Shop/>}/>
        <Route path = "/store/product/:id" element = {<Productpage/>}/>
        <Route path = "/register" element = {<Register/>}/>
        <Route path = "/login" element = {<Login/>}/>
        <Route path = "/cart" element = {<Cart/>}/>
        <Route path = "/checkout" element = {<Checkout/>}/>
        <Route path = "/payment" element = {<Payment/>}/>
        <Route path = "/paymentsuccess" element = {<PaymentSuccess/>}/>
        <Route path = "/paymentfail" element = {<PaymentFail/>}/>
        <Route path = "/user" element = {<UserPage/>}/>
        <Route path = "/edituser" element = {<EditUser/>}/>
      </Routes>
    </Router>
  );
}

export default App;
