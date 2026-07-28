import React from 'react';
import HeadBanner from '../Components/HeadBanner';
import Footer from '../Components/Footer';
import { motion } from "motion/react"
import BestSellers from '../Components/BestSellers';
import { ShieldCheck, TruckElectric, Undo2, UserSearch } from 'lucide-react';
import SecondBanner from '../Components/SecondBanner';
import vid from '../assets/football.mp4'


const Home = () => {
    return (
        <div>
            {/* Marqueee */}
            <div className='bg-base-content overflow-hidden'>
                <motion.div
                    animate={{ x: ["100%", "-100%",] }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="flex gap-10 w-max whitespace-nowrap bg-base-content text-base-200 overflow-hidden lg:text-xl"
                >
                    <span>
                        Best Deals With Best Comfort | 
                    </span>
                    <span>
                        SUBLIMATION JERSEY | 
                    </span>
                    <span>
                        TROUSER | 
                    </span>
                    <span>
                        SHORTS | 
                    </span>
                    <span>
                        SPORTS ITEMS
                    </span>

                </motion.div>
            </div>

            <HeadBanner></HeadBanner>

            {/* services */}
             <div className='grid md:pl-10 lg:grid-cols-4 grid-cols-1 pl-4 gap-4 my-16 mx-2 
               items-start  text-base-content'>


                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                className=' lg:text-xl  mb-6 justify-center items-center '>
                    <p className='lg:text-2xl flex font-semibold items-center gap-2 mb-2'><TruckElectric className='text-orange-500' /><span>Fast Delivery </span></p>
                    <p className='text-start'>3-4 shipping time in all over Bangladesh </p>
                </motion.div>

                <motion.div
                   initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2 }}
                    viewport={{ once: true }}
                className=' lg:text-xl mb-6 justify-start items-center '>
                    <p className='lg:text-2xl flex font-semibold items-center gap-2  mb-2'><Undo2 className='text-orange-500' /><span>Easy Return </span></p>
                    <p className='text-start'>Simply return it within 7 days for an exchange</p>
                </motion.div>

                <motion.div 
                   initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.6 }}
                    viewport={{ once: true }}
                className=' lg:text-xl mb-6 justify-start items-center '>
                    <p className='lg:text-2xl flex font-semibold items-center gap-2  mb-2'><ShieldCheck className='text-orange-500' /><span>Good Quality </span></p>
                    <p className='text-start'>We ensure secure good quality product</p>
                </motion.div>

                <motion.div
                   initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 2.0 }}
                    viewport={{ once: true }}
                className=' lg:text-xl mb-6 justify-start items-center '>
                    <p className='lg:text-2xl flex font-semibold items-center gap-2  mb-2'><UserSearch className='text-orange-500' /><span>24/7 Support </span></p>
                    <p className='text-start'>Contact us 24 hours a day, 7 days a week</p>
                </motion.div>

            </div>

            <BestSellers></BestSellers>
            
            
            

            <SecondBanner></SecondBanner>
              {/* <video
        className=" w-full lg:h-150 object-cover"
        src={vid}
        autoPlay
        muted
        loop
        playsInline
      /> */}
            
            

            <h1 className='lg:text-4xl text-2xl  text-center mb-4 lg:mb-10'>WHY CHOOSE US??</h1>
            <hr className=" border-t-2 mb-8 lg:mb-16 w-4/12 mx-auto mt-2 border-gray-800" />

    
        </div>
  
    );
};

export default Home;