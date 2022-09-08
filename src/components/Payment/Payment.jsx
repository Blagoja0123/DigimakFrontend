import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Payment() {
    let [paid, setPaid] = useState(false);
    const checkoutInfo = JSON.parse(sessionStorage.getItem('checkout'));
    const [user, setUser] = useState({});
    const [cart, setCart] = useState([]);
    let value = JSON.parse(sessionStorage.getItem('loggedInUser'));
    const navigate = useNavigate();
    const handleFail = () =>{
        setPaid(false);
        sessionStorage.setItem('paid', false);
    }
    useEffect(() => {
        if(value){
            setUser(JSON.parse(sessionStorage.getItem('loggedInUser')));
        }
      setCart(JSON.parse(sessionStorage.getItem('cart')));
    }, [])
    
    const loggedIn = () =>{
        if(value) {
            console.log('true');
            return true;
        }
        else {
            console.log('false');
            return false;
        }
    }
    const addOrder = async () =>{
        try{
            let bol = loggedIn();
            console.log(user);
            if(bol){
                console.log('yes');
                let test = [...user.order_history];
                let userHistory = [];
                console.log(test);
                for (let i = 0; i < test.length; i++) {
                    userHistory.push(test[i]);
                    console.log(test[i]);
                }
                if(userHistory.length === 0){
                    for(let i=0; i<cart.length;i++){
                        userHistory.push(cart[i]);
                    }
                    console.log(userHistory);
                    user.order_history = [...userHistory];
                }
                else{
                    for(let i=0; i<cart.length;i++){
                        userHistory.push(cart[i]);
                        console.log(cart[i]);
                    }
                    console.log(userHistory);
                    user.order_history = [...userHistory];
                    console.log(user.order_history);
                }
                
                try {
                    const result = await axios.put('http://localhost:3000/updateuser/'+ user._id, user);
                    sessionStorage.setItem('loggedInUser', JSON.stringify(user));
                    if(JSON.parse(localStorage.getItem('loggedInUser'))){
                        localStorage.setItem('loggedInUser', JSON.stringify(user));
                    }
                    console.log('updated user');
                    console.log(result.data);
                }catch (err) {
                    console.log(err)
                }
                sessionStorage.removeItem('cart');
            }
            const res = await axios.post('http://localhost:3000/orders', checkoutInfo);
            sessionStorage.removeItem('cart');
        }catch(err){
            console.log(err);
        }
    }
    const handleSuccess = () =>{
        setPaid(true);
        checkoutInfo.set_paid = true;
        console.log(checkoutInfo.set_paid);
        addOrder();
        sessionStorage.removeItem('checkout');
        sessionStorage.removeItem('paid');
        navigate('/paymentsuccess');
    }
  return (
    <>
    <div><button onClick={handleSuccess}>Payment successful</button></div>
    <div><Link to = '/paymentfail'><button onClick={handleFail}>Payment fail</button></Link></div>
    </>
  )
}

export default Payment