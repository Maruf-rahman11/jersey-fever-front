import React, { use, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import useAxios from "../hooks/UseAxios";
import BestSellers from "../Components/BestSellers";
import { Helmet } from "react-helmet";
import LoadingCompo from "../Components/LoadingCompo";
import CartContext  from "../Context/CartContext";


const ProductDetails = () => {

  const axios = useAxios()
  const { id } = useParams();
  const navigate = useNavigate();
   const { addToCart, myCart } = use(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);

  // ================= FETCH =================
  useEffect(() => {
    const fetchShoe = async () => {
      try {
        const res = await axios.get(`/products/${id}`);
        setProduct(res.data);
      } catch {
        Swal.fire("Error", "Failed to load product", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchShoe();
  }, [id, axios]);

 

  if (loading) return <LoadingCompo/>
//   if (!product) return null;

   // ================= STOCK CHECK =================
  const getStock = () => {
  if (!selectedSize) return 0;

  return product.sizes?.[selectedSize] || 0;
};

console.log(getStock())
  // ================= SIZES (DEPENDS ON COLOR) =================
  const availableSizes =
    product.sizes
      ? Object.keys(product.sizes).filter(
          (s) => product.sizes[s] > 0
        )
      : [];
  // ================= ADD TO CART =================
  console.log(availableSizes)
  const handleAddToCart = () => {

    if (!selectedSize) {
      setSizeError(true);
      Swal.fire("Select a size", "No size selected", "warning");
      return
    }

     const stock = getStock();

  if (quantity > stock) {
    return Swal.fire({
      icon: "error",
      title: "Insufficient Stock",
      text: `Only ${stock} item${stock !== 1 ? "s" : ""} available in size ${selectedSize}.`,
    });
  }
   
    const cartData = {
      _id: product._id,
      name: product.name,
      price: product.discountPrice > 0 ? product.discountPrice : product.price,
      image: product.images?.[0],
      size: selectedSize,
      quantity,
      edition: product.edition,
      season: product.season,
      cost : product.costPrice
    };

    const exists = myCart.find(
      (item) =>
        item._id === cartData._id &&
        item.size === cartData.size &&
        item.color === cartData.color
    );

    if (exists) {
      return Swal.fire("Already in cart", "", "info");
    }

    addToCart(cartData);

    Swal.fire("Added to cart", "", "success");
  };

  // ================= CHECKOUT =================
  const handleCheckOut = () => {
 
       if (!selectedSize) {
      setSizeError(true);
      Swal.fire("Select a size", "No size selected", "warning");
      return
    }
      const stock = getStock();

if (quantity > stock) {
  return Swal.fire({
    icon: "error",
    title: "Insufficient Stock",
    text: `Only ${stock} item${stock !== 1 ? "s" : ""} available in size ${selectedSize}.`,
  });
}

    navigate("/deliveryPage", {
      state: {
        shoeId: product._id,
        name: product.name,
        quantity,
        size: selectedSize,
        edition: product.edition,
        season: product.season,
        price: product.discountPrice > 0 ? product.discountPrice : product.price,
        cost: product.costPrice
      },
    });
  };

  // ================= UI =================
  return (
    <div className="w-11/12 mx-auto mt-10 mb-16">
       <div className=" grid grid-cols-1 lg:grid-cols-2 gap-6 px-6 text-black">

      <Helmet>
  <title>{`${product.name} | KickBox BD`}</title>

  <meta
    name="description"
    content={`Buy ${product.name} by ${product.brand} at Kickbox BD. 100% authentic ${product.category.toLowerCase()} with fast delivery across Bangladesh. Order online today.`}
  />

  <meta
    name="keywords"
    content={`${product.name}, ${product.category}, sneakers Bangladesh, shoes Bangladesh, Kickbox bd, kickbox, premium sneakers, authentic sneakers`}
  />

  <link
    rel="canonical"
    href={`https://kickboxbd.com/productDetails/${product._id}`}
  />

  {/* Facebook */}
  <meta property="og:type" content="product" />
  <meta
    property="og:title"
    content={`${product.name} | KickBox BD`}
  />
  <meta
    property="og:description"
    content={`Shop authentic ${product.brand} ${product.name} with nationwide delivery across Bangladesh.`}
  />
  <meta property="og:image" content={product.images?.[0]} />
  <meta
    property="og:url"
    content={`https://kickboxbd.com/productDetails/${product._id}`}
  />
</Helmet>

      {/* IMAGES */}
      <div>
        <img
          src={product.images?.[selectedImage]}
          className="aspect-square lg:w-11/12 mx-auto rounded-xl"
        />

        <div className="flex gap-3 mt-3">
          {product.images?.map((img, i) => (
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

        <h1 className="text-3xl font-bold">{product.name}</h1>

        <p>
          {product.discountPrice > 0 ? (
            <>
              {product.discountPrice}৳
              <span className="line-through ml-3 text-red-700">
                {product.price}৳
              </span>
            </>
          ) : (
            `${product.price}৳`
          )}
        </p>

        <p>{product.description}</p>

        

        {/* SIZES */}
       
          <div>
            <h2 className="font-semibold">Size</h2>

            <div className="flex gap-2 flex-wrap mt-2">
              {availableSizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`w-10 h-10 border rounded ${
                    selectedSize === s
                      ? " bg-orange-600 text-base-200 border border-base-content"
                      : "bg-orange-600 text-base-200"
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