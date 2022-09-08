import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import NavBar from '../Navbar/NavBar'
import './userpage.css'
function UserPage() {
    const [user, setUser] = useState({});
    // const [logged, setLogged] = useState(false);
    const [billingInfo, setBillingInfo] = useState({});
    const [shippingInfo, setShippingInfo] = useState({});
    const [orderHistory, setOrderHistory] = useState([]);
    console.log('testing');
    const navigate = useNavigate();
    useEffect(() => {
        let temp 
        if(JSON.parse(localStorage.getItem('loggedInUser'))){
            temp = JSON.parse(localStorage.getItem('loggedInUser'));
        }else{
            temp = JSON.parse(sessionStorage.getItem('loggedInUser'));
        }
        console.log(temp);
        let id = temp._id;
        console.log(id);
        const getUser = async () =>{
            try {
                const res = await axios.get('http://localhost:3000/user/' + id);
                setUser(res.data);
                setBillingInfo(res.data.billing);
                setShippingInfo(res.data.shipping);
                if(res.data.order_history){
                    setOrderHistory(res.data.order_history);
                }
            } catch (err) {
                console.log(err);   
            }
        }
        getUser();
    }, [])
    const validate = (billing, shipping) =>{
        const billingValues = Object.values(billing);
        const shippingValues = Object.values(shipping);
        let emptyBillingCount = 0;
        let emptyShippingCount = 0;
        for(let i = 0; i< billingValues.length; i++){
            if(billingValues[i] === ""){
                emptyBillingCount++;
            }
        }
        for(let i = 0; i< shippingValues.length; i++){
            if(shippingValues[i] === ""){
                emptyShippingCount++;
            }
        }
        if(emptyBillingCount > 0 || emptyShippingCount > 0) return false;
        else return true;
    }

    const checkHistory = (orderHistory) =>{
        console.log(orderHistory.length);
        if(orderHistory.length !== 0){
            return true;
        }
        else{
            return false;
        }
    }
    let orders = [];
    const renderOrderHistory = () => {
        console.log(orderHistory.length);
        for(let i = 0;i<orderHistory.length;i+=1){
            orders.push(orderHistory[i]);   
        }
        console.log(orders);
        return (
            <div>
                <span>Your past purchases include: </span>
               {orders.map((item)=>(
                <ul>
                    <li>{item.name}</li>
                </ul>
               ))}
            </div>
        )
    }

    
    const handleLogOut = () =>{
        localStorage.removeItem('loggedInUser');
        sessionStorage.removeItem('loggedInUser');
        sessionStorage.setItem('loggedIn', false);
        navigate('/');
    }

    const renderEdit = () =>(
        <>
        <span>your billing and shipping values contain empty fields</span>
        <Link to='/edituser'><button>edit</button></Link>
        </>
    )
  return (
    <>
    <NavBar/>
    <div><h1>Welcome back {user.name}</h1></div>
    <div>{validate(billingInfo, shippingInfo) ? "" : renderEdit()}</div>
    <Link to='/edituser'><button className='btn'>edit user billing information</button></Link>
    <div>
    <button className='btn' onClick={handleLogOut}>Log out</button>
    </div>
    <div>{checkHistory(orderHistory) ? renderOrderHistory() : "you have no purchases"}</div>
    </>
  )
}

export default UserPage