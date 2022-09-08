import React from 'react'
import {useState, useEffect} from 'react'
import Logo from '../../images/whitelogo.png'
import { NavLink, Link } from 'react-router-dom'
import './navbar.css'
function NavBar() {
    const [menuToggled, setmenuToggled] = useState(false);
    const [logged, setLogged] = useState(false);
    const toggleMenu = () =>{

        menuToggled ? setmenuToggled(false) : setmenuToggled(true);
    }

  return (
    <header className="Header">
            <a href="/"><img className='logo' src={Logo} alt="" /></a>
            
            <nav className={menuToggled ? "Nav" : "activeNav"}>
                <div className="mobileNavHeader">
                    <img src={Logo} alt="" />
                    <svg onClick={toggleMenu} xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                </div>
    
                <ul>
                    <NavLink exact='true' to='/'>Home</NavLink>
                    <NavLink exact='true' to='/about'>About</NavLink>
                    <NavLink exact='true' to='/store'>Store</NavLink>
                    <NavLink exact='true' to='/contact'>Contact</NavLink>
                    <span></span>
    
                    <div className="navicons">
                        <a href='/cart'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V6l-3-4H6zM3.8 6h16.4M16 10a4 4 0 1 1-8 0"/></svg><div className='cartNumber'>2</div></a> 
                        {logged 
                    ? <a href='/user'><svg className='usericon' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></a>
                    : <a href='/register'><svg className='usericon' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></a>
                  }
                    </div>
                </ul>
            </nav>
            <svg onClick={toggleMenu} className='burgericon' xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </header>
  )
}

export default NavBar