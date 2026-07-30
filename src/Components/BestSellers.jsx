import React from 'react';
import snekaer1 from '../assets/brazil_home.jpg'
import snekaer2 from '../assets/brazil_fan.jpg'
import snekaer3 from '../assets/argentina_home.jpg'
import snekaer4 from '../assets/argentina_away.jpg'
import snekaer5 from '../assets/argentina_fan.jpg'
import snekaer6 from '../assets/england_home.jpeg'
import snekaer7 from '../assets/germany_home.jpg'
import snekaer8 from '../assets/portugal_home.jpg'
import { motion } from "motion/react"
import { Link, useNavigate } from 'react-router';

const BestSellers = () => {
    const Navigate = useNavigate()
    const products =[
        {
            id:1,
            name: 'Brazil 2026 World Cup Home Jersey - Player Edition',
            price:'1050',
            img: snekaer1
        },
        {
            id:2,
            name: 'Brazil 2026 World Cup Home Jersey - Fan Edition',
            price:'1050',
            img: snekaer2
        },
        {
            id:3,
            name: 'Argentina 2026 World Cup Home Jersey - Player Edition',
            price:'1050',
            img: snekaer3
        },
        {
            id:4,
            name: 'Argentina 2026 World Cup Away Jersey - Player Edition',
            price:'7650',
            img: snekaer4
        },
        {
            id:5,
            name: 'Argentina 2026 World Cup Home Jersey - Fan Edition',
            price:'1050',
            img: snekaer5
        },
        {
            id:6,
            name: 'England 2026 World Cup Home Jersey - Fan Edition',
            price:'1050',
            img:snekaer6
        },
        {
            id:7,
            name: 'Germany 2026 World Cup Home Jersey - Fan Edition',
            price:'1050',
            img: snekaer7
        },
        {
            id:8,
            name: 'Portugal 2026 World Cup Home Jersey - Player Edition',
            price:'1050',
            img: snekaer8
        },
    ]
    return (
        <div className='my-16 w-11/12 mx-auto'>
            <div className='  mx-auto items-center'> 
               <h1 className='text-2xl text-start'>Most Popular</h1>  
               <hr className=" border-t-2 w-4/12 mx-start mt-2 border-gray-800" />
            </div>
            <div>
  <div className=' mx-auto my-8'>
        {/* Grid of Best Sellers */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {products.map((boot) => (
    <motion.div
      key={boot._id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      onClick={() => Navigate(`/productDetails/${boot._id}`)}
      className="bg-white rounded-lg overflow-hidden shadow-lg cursor-pointer transition-transform hover:scale-105 w-full"
    >
      <img
        src={boot.img}
        alt={boot.name}
        loading="lazy"
        className="w-full aspect-square object-cover"
      />

      <div className="p-3">
        <p className="text-black font-semibold text-sm md:text-base line-clamp-2 min-h-[48px]">
          {boot.name}
        </p>

        <p className="text-base md:text-lg font-bold mt-2">
          ৳{boot.price}
        </p>
      </div>
    </motion.div>
  ))}
</div>
        <div className="flex items-center mt-6 text-center justify-center">
          {/* <Link to="/allCollection">
            <button className="lg:px-8 px-4 py-4 mb-6 cursor-pointer lg:text-xl border border-white text-base-content bg-base-100 backdrop-blur-sm hover:bg-black hover:text-white ease-linear transition">
              Explore More
            </button>
          </Link> */}
        </div>
    </div>
            </div>

        
           
        </div>
    );
};

export default BestSellers;