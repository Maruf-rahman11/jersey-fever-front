import React from 'react';
import logo from '../assets/Jersey.png'

import { Link, NavLink, } from 'react-router';
import { MessageCircle } from 'lucide-react';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  const phoneNumber = "8801316356274";
  const message = `Hello, I want to order something `;

  return (
    <footer className="footer sm:footer-horizontal text-base-200 bg-base-content p-6 lg:pl-10">
      <aside>
        {/* <img 
   className='w-60'
   src={logo} 
   alt="" /> */}
        <div className=' flex mb-6 items-center justify-center  gap-2'>
          <img src={logo} alt="jerseyFever" className="lg:w-70 w-60 mx-auto" />

        </div>
        <p className='pl-2 lg:text-lg'>

          SHOP ADDRESS : <br /> <br /> PLANET SR SHOPPING MALL,3rd Floor <br /> [Lift-2], Shop NO: H-12,Zilla school road,KANDIRPAR,CUMILLA
        </p>
      </aside>
      <nav className='pl-2'>
        <h6 className="footer-title">CHECKOUT </h6>
        {/* <NavLink to="/"><p className="hover:scale-110 ease-linear transform transition-all">HOME</p></NavLink> */}
        <NavLink to="/allProducts"><p className="hover:scale-110 ease-linear transform transition-all">COLLECTION</p></NavLink>
        <NavLink to="/allJerseys"><p className="hover:scale-110 ease-linear transform transition-all">JERSEY</p></NavLink>
        <NavLink to="/allTrousers"><p className="hover:scale-110 ease-linear transform transition-all">TROUSER</p></NavLink>
        <NavLink to="/allAccessories"><p className="hover:scale-110 ease-linear transform transition-all">ACCESSORY</p></NavLink>
        <NavLink to="/allSneakers"><p className="hover:scale-110 ease-linear transform transition-all">SNEAKERS</p></NavLink>
        <Link to={'/adminDashboard'} ><button className="link link-hover">Admin Panel</button></Link>
      </nav>
      <nav className='pl-2'>
        <h6 className="footer-title">JERSEY FEVER</h6>
        {/* <button className="link link-hover">About us</button> */}
        <button className="link link-hover">Contact</button>
        <button className="link link-hover">8801316356274</button>
      </nav>
      <nav className='pl-2'>
        <h6 className="footer-title">Social</h6>
        <div className="grid grid-flow-col gap-4">
          <Link to={'https://www.facebook.com/jerseyfever2.0'} className='text-3xl '><FaFacebook></FaFacebook></Link>
          <Link to={'https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.instagram.com%2F_u%2Fjerseyfever.bd%3Figsh%3DaGlnc3d2NmdwbXYz%26utm_source%3Dqr%26fbclid%3DIwcGRvZgVleHRuA2FlbQIxMABzcnRjBmFwcF9pZBAyMjIwMzkxNzg4MjAwODkyAAEexE9Uyof9vEZEYEemzaR4RnxZcI6u1ItUEguEoPnVFgMZPIyqK4N78X9SflQ_aem_hjeG_XlI0rWSzWit2Mm9ZA&h=AUBI_tjDyDYtghtmKvoH02b_L_QoXhM-h_czV1l5STI0-iWAs5QVDoFOWDTdz3ypq7rFDNWlOApzkU92vR4Y5eV8oCBaZoLA0CtmU5bkoBWszYlKmiozAImzZYuN8dFd'} className='text-3xl'><FaInstagram /></Link>
          <Link to={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`} className='text-3xl'><FaWhatsapp /></Link>

        </div>
      </nav>
    </footer>
  );
};

export default Footer;