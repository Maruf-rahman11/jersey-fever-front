import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import Swal from "sweetalert2";
import useAxio from "../hooks/UseAxios";

const ItemDetails = () => {
  const { id } = useParams();
  const axios = useAxio();
  const [shoe, setShoe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchShoe = async () => {
      try {
        const res = await axios.get(`/products/${id}`);
        setShoe(res.data);
      } catch (err) {
        Swal.fire("Error", "Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchShoe();
  }, [id, axios]);
  console.log(shoe)
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (!shoe) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Shoe not found
      </div>
    );
  }

  const finalPrice =
    shoe.discountPrice > 0 ? shoe.discountPrice : shoe.price;


  return (
    <div className="min-h-screen p-6  text-base-content">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

        {/* IMAGES */}
        <div>
          <img
            src={shoe.images?.[selectedImage]}
            alt={shoe.name}
            className="aspect-square object-cover rounded-2xl border border-white/20"
          />

          <div className="flex gap-3 mt-4 flex-wrap">
            {shoe.images?.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setSelectedImage(i)}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${selectedImage === i
                    ? "border-blue-500"
                    : "border-white/20"
                  }`}
                alt="thumb"
              />
            ))}
          </div>
        </div>

        {/* DETAILS */}
        <div className="">

          <h1 className="text-3xl font-bold">{shoe.name}</h1>

          {/* BADGES */}
          <div className="flex gap-3 mt-4">
            {shoe.popular && (
              <span className="px-3 py-1 bg-yellow-500 text-black rounded-full text-xs">
                Popular
              </span>
            )}
            {shoe.preOrder && (
              <span className="px-3 py-1 bg-purple-500 rounded-full text-xs">
                Pre Order
              </span>
            )}
            {shoe.isLive && (
              <span className="px-3 py-1 bg-green-500 rounded-full text-xs">
                Live
              </span>
            )}
          </div>


          <p className="text-lg text-base-content font-semibold mt-6">Category:  <span className=" text-orange-600">{shoe.category}</span> </p>



          {/* PRICE */}
          <div className="flex items-center mt-4 gap-3">
            {shoe.discountPrice > 0 && (
              <span className="line-through text-2xl font-semibold opacity-60">
                {shoe.price}৳
              </span>
            )}
            <span className="text-2xl font-bold  text-orange-600">
              {finalPrice}৳
            </span>
          </div>


          {/* DESCRIPTION */}
          <h1 className="font-semibold mt-4">Description :</h1>
          <p className="mt-2 text-orange-600">{shoe.description}</p>


          {shoe.edition &&
            <div className="flex font-semibold mt-4 gap-2">
              <h3 className="font-semibold ">Edition :</h3>
              <p className="text-orange-600">{shoe.edition}</p>

            </div>}

          {/* TOTAL STOCK */}
          <p className="font-semibold mt-2">
            Total Stock: <span className="text-orange-600">{shoe.totalStock}</span>
          </p>

           <div className="mt-4">
            <h1 className="font-semibold mb-2">Available Sizes :</h1>
            {Object.keys(shoe.sizes || {}).map(size => (
              <span
                key={size}
                className="px-3 mx-2 py-1 font-semibold border rounded"
              >
                {size} - <span className="text-orange-600">{shoe.sizes[size]}</span> 
              </span>
            ))}

          </div>

          {/* VIDEO */}
          {shoe.videoUrl && (
            <div className="mt-4">
              <iframe
                src={shoe.videoUrl}
                className="w-full h-64 rounded-xl border border-white/20"
                allowFullScreen
                title="Product Video"
              />
            </div>
          )}

          {/* ACTIONS */}
          <div className="flex gap-4 mt-6">
            <Link to={`/adminDashboard/updateItem/${shoe._id}`}>
              <button className="btn bg-orange-600 text-base-200">
                Update info
              </button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ItemDetails;