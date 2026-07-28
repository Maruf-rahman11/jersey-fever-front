import React, { use, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import useAxios from "../Hooks/UseAxios";
import BestSellers from "../Components/BestSellers";
import jersey1 from '../assets/argentina_home.jpg'
import { Helmet } from "react-helmet";
import LoadingCompo from "../Components/LoadingCompo";






const ProductDetails = () => {

//   const axios = useAxios();
//   const { id } = useParams();
  const navigate = useNavigate();

//   const [shoe, setShoe] = useState(null);
  const [loading, setLoading] = useState(false);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [sizeError, setSizeError] = useState(false);
  const [colorError, setColorError] = useState(false);

  // ================= FETCH =================
//   useEffect(() => {
//     const fetchShoe = async () => {
//       try {
//         const res = await axios.get(`/shoes/${id}`);
//         setShoe(res.data);
//       } catch {
//         Swal.fire("Error", "Failed to load product", "error");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchShoe();
//   }, [id, axios]);

 

  if (loading) return <LoadingCompo/>
//   if (!shoe) return null;

  const shoe =  {
  _id: "1",
  images: [jersey1,'sadadsd', 'asdadasd'],
  name: "Brazil 2026 World Cup Home Jersey",
  price: 1050,
  discountPrice: 950,
  variant: "Player Edition",
  category: "jersey",
  sizes: {
    L: 10,
    M: 2,
    S: 3,
  },
}

  const isAccessory =
    shoe.category === "Shoe care" ||
    shoe.category === "Shoe accessories";

  const variants = shoe.variants || [];

  // ================= COLORS =================
  const availableColors = isAccessory
    ? []
    : variants
        .filter(v => v.color)
        .map(v => v.color);

  const selectedVariant = variants.find(v => v.color === selectedColor);

  // ================= SIZES (DEPENDS ON COLOR) =================
  const availableSizes =
    selectedVariant?.sizes
      ? Object.keys(selectedVariant.sizes).filter(
          (s) => selectedVariant.sizes[s] > 0
        )
      : [];

  // ================= STOCK CHECK =================
  const getStock = () => {
    if (isAccessory) return shoe.totalStock || 0;

    if (selectedVariant?.stock !== undefined) {
      return selectedVariant.stock; // caps
    }

    if (selectedVariant?.sizes && selectedSize) {
      return selectedVariant.sizes[selectedSize] || 0;
    }

    return 0;
  };

  // ================= ADD TO CART =================
  const handleAddToCart = () => {
    if (!isAccessory) {
      if (!selectedColor) {
        setColorError(true);
        return;
      }
      if (!selectedSize && !selectedVariant?.stock) {
        setSizeError(true);
        return;
      }

      if (getStock() < quantity) {
        Swal.fire("Error", "Out of stock", "error");
        return;
      }
    }

    // const cartData = {
    //   _id: shoe._id,
    //   name: shoe.name,
    //   price: shoe.discountPrice > 0 ? shoe.discountPrice : shoe.price,
    //   image: shoe.images?.[0],
    //   size: selectedSize,
    //   color: selectedColor,
    //   quantity,
    //   cost : shoe.costPrice
    // };

    // const exists = cart.find(
    //   (item) =>
    //     item._id === cartData._id &&
    //     item.size === cartData.size &&
    //     item.color === cartData.color
    // );

    // if (exists) {
    //   return Swal.fire("Already in cart", "", "info");
    // }

    // addToCart(cartData);

    Swal.fire("Added to cart", "", "success");
  };

  // ================= CHECKOUT =================
  const handleCheckOut = () => {
    if (!isAccessory) {
      if (!selectedColor) return setColorError(true);
      if (!selectedSize && !selectedVariant?.stock) return setSizeError(true);

      if (getStock() < quantity) {
        return Swal.fire("Error", "Out of stock", "error");
      }
    }

    navigate("/deliveryInfo", {
      state: {
        shoeId: shoe._id,
        name: shoe.name,
        quantity,
        size: selectedSize,
        color: selectedColor,
        price: shoe.discountPrice > 0 ? shoe.discountPrice : shoe.price,
        cost: shoe.costPrice
      },
    });
  };

  // ================= UI =================
  return (
    <div className="w-11/12 mx-auto mt-10 mb-16">
       <div className=" grid grid-cols-1 lg:grid-cols-2 gap-10 px-6 text-black">

      <Helmet>
  <title>{`${shoe.name} | KickBox BD`}</title>

  <meta
    name="description"
    content={`Buy ${shoe.name} by ${shoe.brand} at Kickbox BD. 100% authentic ${shoe.category.toLowerCase()} with fast delivery across Bangladesh. Order online today.`}
  />

  <meta
    name="keywords"
    content={`${shoe.name}, ${shoe.category}, sneakers Bangladesh, shoes Bangladesh, Kickbox bd, kickbox, premium sneakers, authentic sneakers`}
  />

  <link
    rel="canonical"
    href={`https://kickboxbd.com/productDetails/${shoe._id}`}
  />

  {/* Facebook */}
  <meta property="og:type" content="product" />
  <meta
    property="og:title"
    content={`${shoe.name} | KickBox BD`}
  />
  <meta
    property="og:description"
    content={`Shop authentic ${shoe.brand} ${shoe.name} with nationwide delivery across Bangladesh.`}
  />
  <meta property="og:image" content={shoe.images?.[0]} />
  <meta
    property="og:url"
    content={`https://kickboxbd.com/productDetails/${shoe._id}`}
  />
</Helmet>

      {/* IMAGES */}
      <div>
        <img
          src={shoe.images?.[selectedImage]}
          className="aspect-square w-150 rounded-xl"
        />

        <div className="flex gap-3 mt-3">
          {shoe.images?.map((img, i) => (
            <img
              key={i}
              src={img}
              onClick={() => setSelectedImage(i)}
              className={`w-20 h-20 rounded-lg cursor-pointer border ${
                selectedImage === i
                  ? "border-white"
                  : "border-gray-500 opacity-50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* DETAILS */}
      <div className="space-y-4">

        <h1 className="text-3xl font-bold">{shoe.name}</h1>

        <p>
          {shoe.discountPrice > 0 ? (
            <>
              {shoe.discountPrice}৳
              <span className="line-through ml-3 text-red-700">
                {shoe.price}৳
              </span>
            </>
          ) : (
            `${shoe.price}৳`
          )}
        </p>

        <p>{shoe.description}</p>

        {/* COLORS */}
        {!isAccessory && (
          <div>
            <h2 className="font-semibold mb-4">Available Colors</h2>

            <div className="flex gap-2 flex-wrap mt-2">
              {availableColors.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setSelectedColor(c);
                    setSelectedSize(null);
                  }}
                  className={`px-4 py-2 rounded border ${
                    selectedColor === c
                      ? "bg-white text-black"
                      : "bg-black"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {colorError && (
              <p className="text-red-400 text-sm">Select color</p>
            )}
          </div>
        )}

        {/* SIZES */}
        {!isAccessory && selectedColor && selectedVariant?.sizes && (
          <div>
            <h2 className="font-semibold">Size</h2>

            <div className="flex gap-2 flex-wrap mt-2">
              {availableSizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`w-10 h-10 border rounded ${
                    selectedSize === s
                      ? "bg-white text-black"
                      : "bg-black"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            {sizeError && (
              <p className="text-red-400 text-sm">Select size</p>
            )}
          </div>
        )}

        {/* QUANTITY */}
         <h2 className="font-semibold mt-6 mb-4">Add Quantity</h2>
        <div className="flex items-center justify-between border px-3 py-1 w-3/12 rounded">
            <button onClick={() => quantity > 1 && setQuantity(quantity - 1)}>
              -
            </button>
            <span className="px-3">{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>


        <div className="flex-row justify-between  items-center gap-4 mt-10">
          

          <button
            onClick={handleAddToCart}
            className="px-6 py-3 border mb-3  rounded w-full hover:bg-white hover:text-black"
          >
            Add to Cart
          </button>

          <button
            onClick={handleCheckOut}
            className="px-6 py-3 border rounded w-full hover:bg-white hover:text-black"
          >
            Checkout
          </button>
        </div>

      </div>
    </div>
     <div className="flex items-center w-11/12 mx-auto my-8">
                <div className="flex-1 h-px bg-gray-400"></div>
                <h2 className="px-4 text-xl font-semibold text-amber-50">You may also like</h2>
                <div className="flex-1 h-px bg-gray-400"></div>
            </div>
    <BestSellers></BestSellers>
    </div>
   
  );
};

export default ProductDetails;