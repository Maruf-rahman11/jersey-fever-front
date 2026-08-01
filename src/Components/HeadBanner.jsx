
import banner1 from '../assets/fever.jpg'
import {ShoppingBag } from 'lucide-react';
import { motion } from "motion/react"
import image from'../assets/3players.png'
import { Link } from 'react-router';

const HeadBanner = () => {
  return (
    <div
  className=" bg-cover bg-center overflow-hidden"
  style={{ backgroundImage: `url(${banner1})` }}
>
  <div className=" flex lg:flex-row-reverse flex-col gap-3 w-full justify-between bg-cover bg-center">

    {/* LEFT */}
    <div className="text-base-200 lg:pl-10 lg:my-auto lg:w-[50%] lg:order-1 order-2 flex-row items-center">
  <div>
     <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .8 }}
        className="lg:text-start text-lg text-center text-orange-600 lg:text-3xl font-semibold"
      >
        WEAR YOUR PASSION 
      </motion.h1>
     <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .8 }}
        className="text-6xl header lg:text-start text-center lg:text-9xl text-black"
      >
        BEYOND<br/>THE PITCH 
      </motion.h1>
      <div className='flex lg:justify-start justify-center items-center gap-2'>
         <hr className=" border-t-8  w-4/12  mt-2 border-black" />
      </div>
     

      <motion.p
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: .3 }}
        className="text-xl font-semibold py-7 lg:text-start text-center lg:text-2xl text-base-content"
      >
        PREMIUM JERSEY. ICONIC STYLE <br /> BUILT FOR <span className="text-orange-600">TRUE FANS</span>     </motion.p>
       
      <div className='flex lg:justify-start justify-center  items-center'>
         <Link to={'/allProducts'}>
        <motion.button
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: .5 }}
        className=" px-8 mb-10 lg:mb-0 py-4 bg-orange-500 cursor-pointer lg:text-start text-white  flex gap-2 hover:scale-105 transition"
      >
        <ShoppingBag />
        Shop Now
      </motion.button>
    </Link>
        
      </div>
      
  </div>
    </div>

    {/* RIGHT
    <div className='relative w-full h-full flex items-center justify-center'>

    <motion.img 
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        src={ronaldo}
        alt="Ronaldo"
        className="
        absolute 
        w-40 sm:w-52 md:w-64 lg:w-80
        lg:top-20
        lg:right-3/12
        -translate-x-1/2
        z-20
        object-contain
        "
    />

    <motion.img
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        src={neymar}
        alt="Neymar"
        className="
        absolute
        w-44 sm:w-60 md:w-72 lg:w-90
        bottom-15
        lg:left-5/12
        md:left-1/3
        z-10
        object-contain
        "
    />


    <motion.img
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        src={messi}
        alt="Messi"
        className="
        absolute
        w-55 md:w-85 lg:w-110
        bottom-0
        lg:left-2/12
        md:right-2/12
        z-30
        object-contain
        "
    />

</div> */}
<div>
   <motion.img 
        initial={{ opacity: 0, scale: 1 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
   src={image}  className='object-contain  mx-auto ' alt="" />
</div>

  </div>
</div>
  );
};

export default HeadBanner;