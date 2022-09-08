import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'
function EditUser() {
    const [fullUserInfo, setFullUserInfo] = useState({});
    const [billingInfo, setBillingInfo] = useState({});
    const [shippingInfo, setShippingInfo] = useState({});
    let temp = JSON.parse(localStorage.getItem('loggedInUser'));
    console.log(temp);
    let id = temp._id;
    useEffect(() => {
      setFullUserInfo(JSON.parse(localStorage.getItem('loggedInUser')));
    }, [])
    
    const handleBilling = (e) =>{
        setBillingInfo(prev=>{
          return{...prev, [e.target.name]:e.target.value}
        })
      }
      
      const handleShipping = (e) =>{
        setShippingInfo(prev=>{
          return{...prev, [e.target.name]:e.target.value}
        })
      }

    const updateUser = async (e) =>{
        e.preventDefault();
        fullUserInfo.billing = {...billingInfo};
        fullUserInfo.shipping = {...shippingInfo};
        try {
            const res = await axios.put('http://localhost:3000/updateuser/'+id, fullUserInfo);
            sessionStorage.setItem('loggedInUser', fullUserInfo);
            console.log(res.data);
        } catch (err) {
            console.log(err)
        }
    }
  return (
    <>
    <span>Billing Info</span>
    <form onSubmit={(e)=>updateUser(e)}>
      <input name = 'first_name' type="text" placeholder='first name' onChange={handleBilling}/>
      <input name = 'last_name' type="text" placeholder='last name' onChange={handleBilling}/>
      <input name = 'address_1' type="text" placeholder='address' onChange={handleBilling}/>
      <input name = 'city' type="text" placeholder='city' onChange={handleBilling}/>
      <input name = 'state' type="text" placeholder='state' onChange={handleBilling}/>
      <input name = 'postcode' type="text" placeholder='postcode' onChange={handleBilling}/>
      <input name = 'country' type="text" placeholder='country' onChange={handleBilling}/>
      <input name = 'email' type="text" placeholder='email' onChange={handleBilling}/>
      <input name = 'phone' type="text" placeholder='phone' onChange={handleBilling}/>
      <span>Shipping Info</span>
      <input name = 'first_name' type="text" placeholder='first name' onChange={handleShipping}/>
      <input name = 'last_name' type="text" placeholder='last name' onChange={handleShipping}/>
      <input name = 'address_1' type="text" placeholder='address' onChange={handleShipping}/>
      <input name = 'city' type="text" placeholder='city' onChange={handleShipping}/>
      <input name = 'state' type="text" placeholder='state' onChange={handleShipping}/>
      <input name = 'postcode' type="text" placeholder='postcode' onChange={handleShipping}/>
      <input name = 'country' type="text" placeholder='country' onChange={handleShipping}/>
      <button type='submit'>submit</button>
  </form>

  </>
  )
}

export default EditUser