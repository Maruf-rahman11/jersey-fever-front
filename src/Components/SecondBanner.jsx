import React from 'react';
import banner2 from '../assets/second.png'
import folded from '../assets/second.png'
import logo from '../assets/logo2.png'
import { motion } from "motion/react"
import { Check } from 'lucide-react';

const SecondBanner = () => {
    return (
        <div className='grid lg:grid-cols-2  grid-cols-1 gap-5 mx-auto items-center my-10'>
            <motion.div 
             initial={{ opacity: 0, x: -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2 }}
                    viewport={{ once: true }}
            className='lg:pl-6 mb-6 order-1 px-4 mx-auto'>
                {/* <div className='lg:pl-16 flex mx-auto  items-center justify-center gap-1'>
                    <img src={logo} alt="jerseyFever" srcset="" className="lg:w-15 w-10 mx-auto" />
                    <h1 className="lg:text-5xl text-2xl font-semibold  mx-auto">JERSEY PALACE</h1>
                    
                </div> */}
                {/* <hr className=" border-t-2 mb-8 lg:mb-16 w-4/12 mx-auto mt-2 border-gray-800" /> */}
                <img src={logo} alt="jerseyFever" srcset="" className="lg:w-140 lg:mb-0 mb-6  w-85 mx-auto" />
                <div className='my-8'>
                    <p className='flex gap-2 items-center text-2xl lg:text-3xl'><span className='text-green-500'><Check size={50}/> </span>Comfortable Fabric</p> 
                    <p className='flex gap-2 items-center text-2xl lg:text-3xl'><span className='text-green-500'><Check size={50}/> </span>Top notch quality</p> 
                    <p className='flex gap-2 items-center text-2xl lg:text-3xl'><span className='text-green-500'><Check size={50}/> </span>Affordable price</p> 
                </div>
               
            </motion.div>
            <motion.div
               initial={{ opacity: 0, x: 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2 }}
                    viewport={{ once: true }}
                     className='order-1'> 
                 <img src={folded} alt="Second Banner" loading='lazy' className="lg:w-120 w-80  mx-auto object-fit" />
            </motion.div>
           
        </div>
    );
};

export default SecondBanner;