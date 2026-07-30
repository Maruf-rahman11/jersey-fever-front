import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import useAxios from "../hooks/UseAxios";
import LoadingCompo from "../Components/LoadingCompo";

const Accessory = () => {
    const [category, setCategory] = useState("accessory");
    const [sort, setSort] = useState("");
    const [searchName, setSearchName] = useState("");
    const [discount, setDiscount] = useState(false);
    const [page, setPage] = useState(1);
    const limit = 16;
    const axios = useAxios();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [page]);

    const { data, isLoading } = useQuery({
        queryKey: ["getShoes", page, category, sort, discount, searchName],
        queryFn: async () => {
            const res = await axios.get(
                `/products?page=${page}&limit=${limit}&category=${category}&sort=${sort}&discount=${discount}&search=${searchName}`
            );
            return res.data;
        },
        placeholderData: keepPreviousData,
    });

    console.log(data)

    if (isLoading) return <LoadingCompo />;

    const { shoes, total } = data;
    const totalPages = Math.ceil(total / limit);

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


            {/* Filters */}
            <div className="flex flex-row sm:flex-wrap items-center gap-4 mb-4">
                {/* Category */}
                {/* <select
                    value={category}
                    onChange={(e) => {
                        setCategory(e.target.value);
                        setPage(1);
                    }}
                    className="w-full sm:w-auto border border-gray-700 bg-black text-white rounded-lg px-4 py-2"
                >
                    <option value="">All</option>
                    <option value="jersey">Jersey</option>
                    <option value="trouser">Trouser</option>
                    <option value="sneaker">Sneaker</option>
                    <option value="accessory">Accessory</option>
                </select> */}

                {/* Sort */}
                <select
                    value={sort}
                    onChange={(e) => {
                        setSort(e.target.value);
                        setPage(1);
                    }}
                    className="w-full sm:w-auto border border-gray-700 bg-black text-white rounded-lg px-4 py-2"
                >
                    <option value="">Sort by Price</option>
                    <option value="low-high">Low → High</option>
                    <option value="high-low">High → Low</option>
                </select>


            </div>
            {/* Discount
        <label className="flex mb-6 items-center gap-2 text-base-content cursor-pointer">
          <input
            type="checkbox"
            checked={discount}
            onChange={() => {
              setDiscount(!discount);
              setPage(1);
            }}
            className="w-4 h-4"
          />
          Discount Only
        </label> */}
            {/* Search input */}
            <div className="mb-4 flex items-center gap-2">
                {/* <p className='text-base-content'><Search size={36} strokeWidth={2.5} /></p> */}
                <input
                    type="text"
                    placeholder="Search by product name..."
                    value={searchName}
                    onChange={(e) => {
                        setSearchName(e.target.value);
                        setPage(1); // 🔥 reset to first page
                    }}
                    className="input input-bordered w-full max-w-xs"
                />
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

            {/* Pagination */}
            <div className="flex flex-wrap w-10/12 mx-auto text-sm justify-center items-center gap-2 mt-10">
                <button
                    disabled={page === 1}
                    onClick={() => setPage((prev) => prev - 1)}
                    className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={`px-4 py-2 rounded-lg transition ${page === i + 1
                                ? "bg-black text-white"
                                : "bg-gray-200 hover:bg-gray-300"
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    disabled={page === totalPages}
                    onClick={() => setPage((prev) => prev + 1)}
                    className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>
        </div>
    );
};
export default Accessory;