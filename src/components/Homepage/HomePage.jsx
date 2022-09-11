import React from 'react'
import axios from 'axios'
import { useRef, useEffect, useState } from 'react'
import './homepage.css'
import Logo from '../../images/whitelogo.png'
import sliderImgOne from '../../images/home.png'
import { NavLink } from 'react-router-dom'
import patki from '../../images/patki2.jpg'
import { gsap, Power3 } from "gsap";
import img12 from '../../images/img1.png'
import NavBar from '../Navbar/NavBar'
function Homepage() {

  if(JSON.parse(localStorage.getItem('loggedInUser'))){
    let temp = JSON.parse(localStorage.getItem('loggedInUser'));
    sessionStorage.setItem('loggedInUser', JSON.stringify(temp));
  }
  useEffect(() => {
    const saveProducts = async () =>{
      try {
        const result = await axios.get('https://digimak-backend-q62kyv0oo-blagoja0123.vercel.app/');
        console.log(result)
        sessionStorage.setItem('preloadedItems', JSON.stringify(result.data)); 
      } catch (err) {
        console.log('err');
      }
    }
    saveProducts();
  }, [])
  
  const boxRef = useRef();
    const homepageP = useRef();
    const homepageB = useRef();
    const homepageI = useRef();
    const homepageC = useRef();

    
    useEffect(() => {
        gsap.to(boxRef.current, {opacity: 1, y: -60, ease:Power3.easeOut,  dration:0.7, delay:0.2});
        gsap.to(homepageP.current, {opacity: 1, y: -40, delay:0.4,  dration:0.6, ease:Power3.easeOut});
        gsap.to(homepageB.current, {opacity: 1, y: -30, delay:0.5,  dration:0.6, ease:Power3.easeOut});
        gsap.to(homepageI.current, {opacity: 1, y: 60, delay:.6,  dration:0.5, ease:Power3.easeOut});
        gsap.to(homepageC.current, {scale: 1, delay:0.7,  dration:0.5, ease:Power3.easeOut});
      });

  return (
    <div id='home'>
    <NavBar/>
    <div className="homepage">
    <div className='circle1'></div>
        <div className="homepage-left">
            <h1 ref={boxRef} > Rise to the occasion</h1>
            <p ref={homepageP}>The styles of shoe available to consumers are endless</p>
            <button ref={homepageB}><a href="/store">Order now <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg></a></button>
        </div>

        <div ref={homepageC} className='circle3'></div>
        <div className='circle2'></div>
        <div className="imageSlider">
            <img ref={homepageI} src={sliderImgOne} alt="" />

            <div className='slider'>
                <div className='img1'></div>
                <div className='dot'></div>
                <div className='dot'></div>
                <div className='dot'></div>
            </div>

            <div className="homepagesliderarrows">
                <button><i class="fa-solid fa-chevron-up"></i></button>
                <button><i class="fa-solid fa-chevron-down"></i></button>
            </div>

        </div>
    </div>


    <div className="new-products">
        <div className='circle4'></div>
        <h3>TRENDING COLLECTION</h3>
        <h2>See some of our trending models right now </h2>

        <div className="product-slider">

            <div className="product-slider-box">
                <img src={img12} alt="" />
                <div className="productdesc">
                    <h1>Air Jordan 1</h1>
                    <p>$200</p>
                </div>
            </div>
            
            <div className="product-slider-box">
                <img src={img12} alt="" />
                <div className="productdesc">
                    <h1>Air Jordan 1</h1>
                    <p>$200</p>
                </div>
            </div>

            <div className="product-slider-box">
                <img src={img12} alt="" />
                <div className="productdesc">
                    <h1>Air Jordan 1</h1>
                    <p>$200</p>
                </div>
            </div>
            
            <div className="product-slider-box">
                <img src={img12} alt="" />
                <div className="productdesc">
                    <h1>Air Jordan 1</h1>
                    <p>$200</p>
                </div>
            </div>
    
        </div>

        <div className="slider-indicator">
                <div></div>
                <div className='sliderTwo' ></div>
                <div></div>
        </div>

        
        </div>

            
        <div className="sliderarrows2">
            <button><i class="fa-solid fa-chevron-left"></i></button>
            <button><i class="fa-solid fa-chevron-right"></i></button>
        </div>


        <div className="whatwedo">
            <div className='circle5'></div>
            <div className="whatwedoLeft">
                <img src={patki} alt="" />
            </div>

            <div className="whatwedoR">
                <div className='rightText'>
                    <h3>WHAT WE DO</h3>
                    <h2>Get to know us better</h2>
                    <p>Air Jordan is a line of basketball shoes and athletic clothing produced by American corporation Nike, and released to the public on April 1, 1985.</p>
                </div>

                <div className='counter'>
                    <div className='counterBox'>
                        <h1>30</h1>
                        <h3>Years of experience</h3>
                    </div>
                    <div className='counterBox'>
                        <h1>25</h1>
                        <h3>Projects done</h3>
                    </div>
                    <div className='counterBox'>
                        <h1>12</h1>
                        <h3>Partnerships acquired</h3>
                    </div>
                </div>
            </div>
        </div>

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
                        <i class="fa-brands fa-facebook-f"></i>
                        <i class="fa-brands fa-instagram"></i>
                        <i class="fa-brands fa-twitter"></i>
                        <i class="fa-brands fa-linkedin"></i>
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


  )
}

export default Homepage