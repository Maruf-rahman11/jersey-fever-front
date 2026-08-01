import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import useAxios from "../hooks/UseAxios";
import LoadingCompo from "../Components/LoadingCompo";


const BestSellers = () => {
    
  
    
    const [discount, setDiscount] = useState(false);
    const [limit, setLimit] = useState(8);
    const axios = useAxios();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);

    const { data, isLoading } = useQuery({
        queryKey: ["getShoes", "bestSellers", limit, discount],
        queryFn: async () => {
            const res = await axios.get(
                `/products?&limit=${limit}&popular=${true}&discount=${discount}`
            );
            return res.data;
        },
        placeholderData: keepPreviousData,
    });

    if (isLoading) return <LoadingCompo />;

    const { shoes, total } = data;

    return (
        <div className=" mx-auto px-4 mt-8 sm:px-6 lg:px-8 py-12">
            {/* <Helmet>
        <title>All Products | KickBox BD</title>

        <meta
          name="description"
          content="Browse our latest sneakers, apparel, and accessories."
        />

        <meta
          name="keywords"
          content="sneakers Bangladesh, shoes Bangladesh, Kickbox bd, kickbox, premium sneakers, authentic sneakers"
        />

        <meta property="og:title" content="Products | KickBox BD" />
        <meta
          property="og:url"
          content="https://kickboxbd.com/allCollection"
        />
      </Helmet> */}


              <h1 className='lg:text-2xl text-2xl font-semibold text-start mb-2'>Best Sellers</h1>
            <hr className=" border-t-2 mb-4 lg:mb-6 w-4/12 mx-start mt-1 border-orange-600" />
            <div className="flex flex-row sm:flex-wrap items-center gap-4 mb-4">
           
            </div>

            {/* Products */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {shoes.map((shoe) => (
                    <motion.div
                        key={shoe._id}
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.4 }}
                        viewport={{ once: true }}
                        onClick={() => navigate(`/productDetails/${shoe._id}`)}
                        className="relative bg-white/10 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
                    >
                        {shoe.season && (
                            <div className="absolute top-3 right-3 z-10">
                                <span className="bg-red-600 text-white text-xs sm:text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                                    {shoe.season}
                                </span>
                            </div>
                        )}

                        <img
                            src={shoe.images[0]}
                            alt={shoe.name}
                            className="w-full aspect-square object-fill"
                        />

                        <div className="p-3 flex flex-col flex-grow">
                            <h3 className="lg:text-xl text-base-content sm:text-base font-semibold line-clamp-2">
                                {shoe.name}
                            </h3>
                            <hr className=" border-t-2 mb-lg:mb-16 w-12/12 mx-auto my-1 border-gray-800" />

                            <div className="flex lg:flex-row flex-col lg:items-center lg:justify-between lg:gap-2 mt-1">
                                {shoe.edition && (
                                    <h3 className="text-sm  rounded text-base-content sm:text-base font-semibold line-clamp-2">
                                        Edition : <span className="text-orange-600 p-1 rounded-sm">{shoe.edition}</span>
                                    </h3>
                                )}

                                <div>
                                    {shoe.discountPrice > 0 ? (
                                        <div className=" flex flex-wrap items-center gap-2">
                                            <span className="text-base sm:text-lg font-bold text-base-content">
                                                ৳{shoe.discountPrice}
                                            </span>

                                            <span className="text-sm font-bold sm:text-base text-orange-600 line-through">
                                                ৳{shoe.price}
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="mt-2">
                                            <span className="text-base sm:text-lg font-bold text-base-200">
                                                ৳{shoe.price}
                                            </span>
                                        </div>
                                    )}
                                </div>

                            </div>





                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default BestSellers;