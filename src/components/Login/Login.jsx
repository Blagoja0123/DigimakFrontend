import React from 'react'
import axios from 'axios'
import {useState} from 'react'
import './login.css'
import {useNavigate} from 'react-router-dom'
function Login() {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({});
    const [remember, setRemember] = useState(false);
    const [incorrectMessage, setIncorrectMessage] = useState(false);

    const handleChange = (e) =>{
        setUserInfo(prev=>{
            return{...prev, [e.target.name]:e.target.value}
          })
    }
    
    
    const handleCheck = () =>{
            setRemember(!remember);
    }

    const loginAsUser = async (e) =>{
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/login', userInfo);
            console.log('logged in successfully');
            setIncorrectMessage(false);
            sessionStorage.setItem('loggedIn', true);
            if(remember){
                localStorage.setItem('loggedInUser', JSON.stringify(res.data));
                sessionStorage.setItem('loggedInUser', JSON.stringify(res.data));
            }else{
                sessionStorage.setItem('loggedInUser', JSON.stringify(res.data));
            }
            Redirect();
        } catch (err) {
            sessionStorage.setItem('loggedIn', false);
            setIncorrectMessage(true);
        }
    }

    const Redirect = () =>{
        navigate('/user');
    }



  return (
    <>
    <div className="login">

<div className='Loginheader'>
    <h1>Welcome back</h1>
    <h4>Login into your account</h4>
</div>

    <form className='form' onSubmit={(e)=>loginAsUser(e)}>
        <input name='username' type='text' placeholder='Username' onChange={handleChange}></input>
        <input name='password' type='password' placeholder='Password' onChange={handleChange}></input>
        <p>{incorrectMessage ? "Incorrect Credentials" : ""}</p>
        <button type='submit'>Log in</button>
    <div className="remember">
        <input type="checkbox" onClick={handleCheck} id='a'></input>
        <label htmlFor="a">Remember me</label>          
    </div>
    </form>
</div>
    </>
  )
}

export default Login