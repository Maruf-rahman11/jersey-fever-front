import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { motion } from "motion/react"
import { Link, useLocation } from "react-router";


import useAxios from "../hooks/UseAxios";
import CartContext from "../Context/CartContext";
import { ShoppingBag } from "lucide-react";

const DeliveryPage = () => {
    const { myCart, clearCart } = useContext(CartContext);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [loading, setLoading] = useState(false);
    const axios = useAxios();
    const { state } = useLocation();

    const { name, quantity, size, price, shoeId, color, cost, preOrder } = state || {};

    const productsForOrder = state
        ? [
            {
                shoeId: shoeId,
                name: name,
                price: price,
                quantity: quantity,
                preOrder: preOrder,
                size: size || null,
                color: color,
                cost: cost,
            },
        ]
        : myCart.map((item) => ({
            shoeId: item._id,
            name: item.name,
            price: item.discountPrice > 0 ? item.discountPrice : item.price,
            quantity: item.quantity,
            size: item.size || null,
            color: item.color,
            cost: item.cost
        }));

        console.log(productsForOrder)





    const [form, setForm] = useState({
        customerName: "",
        email: "",
        customerNumber: "",
        district: "",
        address: "",
        deliveryZone: "other",

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };
    const productsValue = state
        ? price * quantity
        : myCart.reduce(
            (sum, item) =>
                sum +
                (item.discountPrice > 0 ? item.discountPrice : item.price) *
                item.quantity,
            0
        );
    const totalCost = state
        ? cost * quantity
        : myCart.reduce(
            (sum, item) =>
                sum +
                item.cost *
                item.quantity,
            0
        );


    // total price calculation
    const deliveryCharge =
        form.deliveryZone === "cumilla" ? 70 : form.deliveryZone === "other" ? 150 : 0;

    const totalAmount = productsValue + deliveryCharge;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        const orderData = {
            customer: form,
            products: productsForOrder,
            deliveryCharge,
            totalAmount,
            totalCost,
            due: 0,
            Cash: productsValue,
            productsValue,
            platform: "website"
        };

        try {
            console.log("Creating order...");
            const orderRes = await axios.post("/orders", orderData);



            const stockRes = await axios.patch("/items/update/update-stock", {
                products: orderData.products,
            });



            await axios.post("/send-confirmation-email", {
                email: orderData.customer.email,
                order: orderData,
            });

            clearCart();
            setOrderPlaced(true);
            setLoading(false)

        } catch (error) {
            console.error("FAILED STEP:", error.response?.data || error.message);
            setLoading(false)
            Swal.fire("Error", "Something went wrong", "error");
        }
    };

    if (loading) {
        return <div className="mx-auto min-h-60 my-auto text-center mt-10">
            <span className="loading loading-bars mb-6 text-orange-600 loading-xl"></span>
            <p className="text-base-content text-3xl font-semibold my-4">Processing Order...</p>
            <p className="text-orange-600">Wait till your order is processing</p>
        </div>
    }
    if (orderPlaced)
        return (
            <div className="text-base-content min-h-90 flex flex-col items-center text-center justify-center mx-auto mt-10">
               
                <p className="text-4xl mb-3">Order has been received</p>
                <p>We’ll contact you soon for confirmation</p>
                <Link to={'/'}>    
                <motion.button
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: .5 }}
        className=" px-8 mb-10 lg:mb-0 py-3 mt-8 bg-orange-500 lg:text-start rounded  text-white  flex gap-2 hover:scale-105 transition"
      >
        <ShoppingBag />
       Continue Shopping
      </motion.button>
                </Link>
               
            </div>
        );

    return (
        <div className="min-h-screen flex items-center justify-center lg:mx-10 lg:mt-10 mt-10">
            <div className="w-full rounded-2xl p-4 text-base-content">
                <h1 className="text-3xl font-bold mb-6 text-center">
                    Delivery Information
                </h1>
                <hr className=" border-t-4 w-8/12 mx-auto border-orange-600" />

                {/* Cart Summary */}
                {
                    state ?
                        <div className="mb-6 mt-6 pb-8 p-3 bg-orange-600 text-base-200 rounded border-b-2 border-white space-y-2">

                            <div className="flex gap-3 font-semibold justify-between mb-4 text-sm">
                                <span> 
                                    {name} × {quantity} (Size -{size}) color -  {color}

                                </span>

                                <span>
                                    -{price}৳
                                </span>
                            </div>

                            <div className="flex justify-between text-sm">
                                <span>Delivery Charge</span>
                                <span>-{deliveryCharge}৳</span>
                            </div>
                            <hr className="border-white border" />
                            <p className="font-bold text-right">Total: {totalAmount}৳</p>
                        </div>
                        :
                        <div className="mb-6 mt-16 pb-8 p-3 bg-orange-600 rounded text-base-200 border-b-2 border-white  space-y-2">
                            {myCart.map((item) => (
                                <div key={item._id} className="flex gap-6 font-semibold mb-4 justify-between lg:text-lg text-sm">
                                    <span >
                                        {item.name} × {item.quantity} (Size -{item.size}) 
                                    </span>
                                    <span>
                                         -{(item.discountPrice > 0 ? item.discountPrice : item.price) * item.quantity}৳
                                    </span>
                                </div>
                            ))}
                            <div className="flex font-semibold justify-between lg:text-lg text-sm ">
                                <span>Delivery Charge</span>
                                <span>-{deliveryCharge}৳</span>
                            </div>
                            <hr className="border-white border" />
                            <p className="font-bold text-right">Total: {totalAmount}৳</p>
                        </div>
                }

                <form onSubmit={handleSubmit} className="space-y-5">
                    <label className="block text-orange-600 font-semibold text-sm mb-2">Add your name</label>
                    <input
                        name="customerName"
                        value={form.customerName}
                        onChange={handleChange}
                        placeholder="Full Name"
                        className="w-full p-3 rounded-lg border border-orange-600 bg-white/20"
                        required
                    />

                    <label className="block text-orange-600 font-semibold text-sm mb-2">Add your number</label>
                    <input
                        name="customerNumber"
                        value={form.customerNumber}
                        onChange={handleChange}
                        placeholder="Contact Number"
                        className="w-full p-3 rounded-lg border border-orange-600 bg-white/20 "
                        required
                    />
                    <label className="block text-orange-600 font-semibold text-sm mb-2">Email address</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg bg-white/20 border border-orange-600 outline-none"
                        placeholder="your@email.com"
                        required
                    />

                    <label className="block text-orange-600 font-semibold text-sm mb-2">Add district name</label>
                    <input
                        name="district"
                        value={form.district}
                        onChange={handleChange}
                        placeholder="District"
                        className="w-full p-3 rounded-lg border border-orange-600 bg-white/20"
                        required
                    />
                    <label className="block text-orange-600  font-semibold text-sm mb-2">Add full address</label>
                    <textarea
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        placeholder="Full Address"
                        className="w-full p-3 rounded-lg border  border-orange-600 bg-white/20 h-24"
                        required
                    />
                    <label className="block text-orange-600 font-semibold text-sm mb-1">Select Delivery Zone</label>
                    <select
                        name="deliveryZone"
                        value={form.deliveryZone}
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg border border-black bg-black/40"
                        required
                    >
                        <option value="cumilla">Inside Cumilla</option>
                        <option value="other">Other</option>
                    </select>

                    <button

                        type="submit"
                        className="w-full py-3 bg-orange-600 text-base-200 cursor-pointer rounded-lg font-bold hover:text-base-content"
                    >
                        Confirm Order
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DeliveryPage;
