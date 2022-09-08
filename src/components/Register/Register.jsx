import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import './register.css'
import NavBar from '../Navbar/NavBar'
function Register() {
    const [userCredentials, setUserCredentials] = useState({})
    let temp = JSON.parse(sessionStorage.getItem('loggedInUser'));
    const navigate = useNavigate();
    const handleChange = (e) =>{
        setUserCredentials(prev=>{
            return{...prev, [e.target.name]:e.target.value}
          })
    }

    useEffect(() => {
     if(temp){
      navigate('/user');
     }
    }, [])
    

    const registerUser = async (e) =>{
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/register', userCredentials);
            console.log('registered successfully');
        } catch (err) {
            console.log(err);
        }
    }
  return (
    <>


    <NavBar/>
    <div className='Register'>
      <div className='Regheader'>
        <h1>Create New Account</h1>
        <h4>Already have an account? <Link to='/login'>Login</Link></h4>
      </div>
      
      <form className='form' onSubmit = {(e)=> registerUser(e)} autoComplete="off">
        <div className='formName'>
          <input name='name' type='text' placeholder='First Name' onChange={handleChange} autoComplete="off"></input>
          <input name='last_name' type='text' placeholder='Last Name' onChange={handleChange} autoComplete="off"></input>
        </div>
        <input name='email' type='text' placeholder='Email' onChange={handleChange} autoComplete="off"></input>
      <input name='username' type='text' placeholder='Username' onChange={handleChange} autoComplete="off"></input>
      <input name='password' type='password' placeholder='Password' onChange={handleChange} autoComplete="off"></input>
      
  
      <button type='submit'>Create Account</button>
      </form>
    </div>
    </>
  )
}

export default Register