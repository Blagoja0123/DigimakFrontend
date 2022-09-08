import React from 'react'
import './shop.css'
import Products from '../Products/Products'
import { useState, useEffect } from 'react'
import '../Homepage/homepage.css'
import './shop.css'
import Logo from '../../images/whitelogo.png'
import { NavLink, Link } from 'react-router-dom'
import axios from 'axios'
import NavBar from '../Navbar/NavBar'

// function loading(){
//   document.getElementById("preloader").style.opacity = "0";
//   document.getElementById("preloaderbg").style.width = "0"; 
// }
// setInterval(loading, 0);


function Shop() {

  const [menuToggled, setmenuToggled] = useState(false);
  const [logged, setLogged] = useState(false);
    const toggleMenu = () =>{

        menuToggled ? setmenuToggled(false) : setmenuToggled(true);
    }
  const [category, setCategory] = useState("")
  const [search, setSearch] = useState("");
  let [pageNumber, setPageNumber] = useState(0);
  useEffect(() => {
    setLogged(JSON.parse(sessionStorage.getItem('loggedIn')));
    setCategory('none');
    setPageNumber(1);
  }, [])
  let test ="";
  const handleCat = (e) =>{
    const value = e.target.value;
    setCategory(value);
  }
  const handleChange = (e) =>{
    setSearch(e.target.value);
  }

  const handleInc = () =>{
    setPageNumber(pageNumber+1);
    }
  const handleDec = () =>{
    if(pageNumber === 1){
      setPageNumber(1);
    }else{
      setPageNumber(pageNumber-1);
    }
  }
  return (
    <>
          <div id='store'>  
          <NavBar/>
          <div className="store-header">
              <h1>Trainers & Shoes</h1>
    
              <div className='search'>
              <svg id='btn' xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <circle cx="10" cy="10" r="7" />
      <line x1="21" y1="21" x2="15" y2="15" />
    </svg>
                <input type="text" placeholder='Search' onChange={handleChange}/>
                <div className="filter">
                <select name = 'category' onChange={handleCat}>
        <option value='none'>Model</option>
          <option>Air Jordan I</option>
          <option>Air Jordan II</option>
        </select> 
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-adjustments-horizontal" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <circle cx="14" cy="6" r="2" />
      <line x1="4" y1="6" x2="12" y2="6" />
      <line x1="16" y1="6" x2="20" y2="6" />
      <circle cx="8" cy="12" r="2" />
      <line x1="4" y1="12" x2="6" y2="12" />
      <line x1="10" y1="12" x2="20" y2="12" />
      <circle cx="17" cy="18" r="2" />
      <line x1="4" y1="18" x2="15" y2="18" />
      <line x1="19" y1="18" x2="20" y2="18" />
    </svg>
                </div>
              </div>
          </div>
    
            <Products category={category} search = {search} pageNumber = {pageNumber}/>
    
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="footer-col">
                        <h4>SITEMAP</h4>
                        <div>
                            <a href="/">Home</a>
                            <a href="/about">About us</a>
                            <a href="/store">Store</a>
                            <a href="/contact">Contact</a>
                        </div>
                    </div>
    
                    <div className="footer-col">
                        <h4>SITE LINKS</h4>
                        <div>
                            <a href="/profile">Your Profile</a>
                            <a href="/cart">Your Cart</a>
                            <a href="/favourites">Favourites</a>
                            <a href="/">Contact Support</a>
                        </div>
                    </div>
    
                    <div class="footer-col">
                        <h4>SOCIALS</h4>
                        <div className="social-links" id='socials'>
                            <a href=""><i class="fa-brands fa-facebook-f"></i></a>
                            <a href=""><i class="fa-brands fa-instagram"></i></a>
                            <a href=""><i class="fa-brands fa-twitter"></i></a>
                            <a href=""><i class="fa-brands fa-linkedin"></i></a>
                        </div>
                    </div>
    
                    <div class="footer-col">
                        <h4>SUBSCRIBE</h4>
                        <div  id='subscribe'>
                            <input type="text" placeholder='Enter email here'/>
                            <button>Send</button>
                        </div>
                    </div>
                </div>
    
                
    
                <div className="copyright">
                    <span>2022 © All rights reserved. Jordan.</span>
                </div>
            </div>
        </footer>
        
          </div>
    
                 </>
  )

}

export default Shop