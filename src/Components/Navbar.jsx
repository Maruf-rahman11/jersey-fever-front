import React, { use } from "react";
import { Camera, Menu, ShoppingBag } from 'lucide-react';
import { Link, NavLink, useNavigate } from "react-router";
import logo from '../assets/Jersey.png'
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import CartContext from "../Context/CartContext";



const Navbar = () => {
  const { myCart } = use(CartContext);
  const navigate = useNavigate();
  const count = myCart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (value) navigate(value);
  };

//   const count = cart.reduce((sum, item) => sum + item.quantity, 0);


  return (
    <div className="navbar z-100 bg-orange-500 px-4">

      {/* LEFT SECTION */}
      <div className="navbar-start flex  items-center gap-2">

        {/* HAMBURGER (mobile only) */}
        <div className="drawer lg:hidden">
          <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label
              htmlFor="my-drawer-1"
              className="btn btn-ghost btn-square text-xl text-base-200"
            >
              <Menu />
            </label>
          </div>

          <div className="drawer-side">
            <label htmlFor="my-drawer-1" className="drawer-overlay"></label>
            
            <ul className="menu bg-base-200/95 text-orange-500 min-h-full w-70 p-4">
            <p className="text-2xl text-base-content font-semibold mb-6">JERSEY FEVER </p>
              <Link to="/"><li className="mb-3 font-semibold" >HOME</li></Link>
              <Link to="/allProducts"><li className="mb-3 font-semibold">COLLECTION</li></Link>
              <Link to="/allJerseys"><li className="mb-3 font-semibold">JERSEY</li></Link>
              <Link to="/allTrousers"><li className="mb-3 font-semibold">TROUSER</li></Link>
              <Link to="/allAccessories"><li className="mb-3 font-semibold">ACCESSORY</li></Link>
              <Link to="/allSneakers"><li className="mb-3 font-semibold">SNEAKERS</li></Link>

              <div className=" h-px bg-gray-400"></div>
                <p className="my-3 text-base-content font-semibold">FOLLOW US ON</p>
                <div className='flex items-center text-base-content justify-start gap-4 mt-2'>
                       <Link to={'https://www.facebook.com/share/1GwG4zRGVH/'} className='text-3xl '><FaFacebook></FaFacebook></Link>
                       <Link className='text-3xl'><FaInstagram /></Link>
                       <Link className='text-3xl'><FaWhatsapp /></Link>
                     </div>
            </ul>
          </div>
        </div>

        {/* LOGO — left on lg screens */}
        <Link to="/" className="hidden lg:flex items-center gap-2">
          <img src={logo} alt="KickBox" className="w-50" />
         
        </Link>
      </div>

      {/* CENTER LOGO — mobile only */}
      <Link
        to="/"
        className="absolute left-1/2 -translate-x-1/2 lg:hidden"
      >
        <img src={logo} alt="KickBox" className="w-50" />
        
      </Link>

      {/* CENTER MENU (desktop only) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-6 font-semibold text-base-200">
          <NavLink to="/"><li className="hover:scale-110 ease-linear transform transition-all">HOME</li></NavLink>
          <NavLink to="/allJerseys"><li className="hover:scale-110 ease-linear transform transition-all">JERSEY</li></NavLink>
          <NavLink to="/allTrousers"><li className="hover:scale-110 ease-linear transform transition-all">TROUSER</li></NavLink>
          <NavLink to="/allAccessories"><li className="hover:scale-110 ease-linear transform transition-all">ACCESSORY</li></NavLink>
          <NavLink to="/allSneakers"><li className="hover:scale-110 ease-linear transform transition-all">SNEAKERS</li></NavLink>
        </ul>
      </div>

      {/* RIGHT SECTION */}
      <div className="navbar-end flex items-center gap-4">

        {/* CART */}
        <Link to="/cart" className="relative">
          <ShoppingBag size={24} className="text-base-200" />
          {count > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {count}
            </span>
          )}
        </Link>

        {/* AVATAR */}
        {/* <button className="text-amber-50 text-3xl">
          <RxAvatar />
        </button> */}
      </div>
    </div>
  );
};

export default Navbar;
