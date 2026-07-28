import React from 'react';
import logo from '../assets/Jersey.png'

import { Link,  } from 'react-router';
import { MessageCircle } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="footer sm:footer-horizontal text-base-200 bg-base-content p-6 lg:pl-10">
  <aside>
   {/* <img 
   className='w-60'
   src={logo} 
   alt="" /> */}
   <div className=' flex mb-6 items-center justify-center  gap-2'>
                       <img src={logo} alt="jerseyFever" srcset="" className="lg:w-70 w-60 mx-auto" />
                  
                   </div>
    <p className='pl-2'>
     
     IMPORTED JERSEY | SUBLIMATION JERSEY | <br /> TROUSER | SHORTS | SPORTS ITEMS
    </p> 
  </aside>
  <nav className='pl-2'>
    <h6 className="footer-title">Categories</h6>
    <button className="link link-hover">International</button>
    <button className="link link-hover">Club</button>
    <button className="link link-hover">Trousers</button>
    <button className="link link-hover">Sports</button>
    <Link to={'/adminDashboard'} ><button className="link link-hover">Admin Panel</button></Link>
  </nav>
  <nav className='pl-2'>
    <h6 className="footer-title">Company</h6>
    <button className="link link-hover">About us</button>
    <button className="link link-hover">Contact</button>
    <button className="link link-hover">000000000000</button>
  </nav>
  <nav className='pl-2'>
    <h6 className="footer-title">Social</h6>
    <div className="grid grid-flow-col gap-4">
      <button
      onClick={() => window.open("https://www.instagram.com/areyz.bd")} 
      className='text-4xl hover:scale-120 transition-all ease-in'><MessageCircle />
      </button>
      <button
      onClick={() => window.open("https://www.facebook.com/AreyzBD")} 
      className='text-4xl hover:scale-120 transition-all ease-in'><MessageCircle />
      </button>

    </div>
  </nav>
</footer>
    );
};

export default Footer;