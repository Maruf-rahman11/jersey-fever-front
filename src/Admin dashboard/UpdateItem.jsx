import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";

import useAxios from "../hooks/UseAxios";
import useAxiosSecure from "../hooks/UseAxiosSecure";

const UpdateItem = () => {
    const { id } = useParams();

    const axios = useAxios();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [form, setForm] = useState({
        name: "",
        description: "",
        category: "",
        edition: "",
        season: "",
        variant: "",
        price: "",
        discountPrice: "",
        costPrice: "",
        preOrder: false,
        popular: false,
        isLive: false,
        images: "",
    });

    const [sizes, setSizes] = useState({});
    const [newSize, setNewSize] = useState("");
    const [previewImages, setPreviewImages] = useState([]);

    // ==========================
    // FETCH PRODUCT
    // ==========================

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`/products/${id}`);
                const product = res.data;

                setForm({
                    name: product.name || "",
                    description: product.description || "",
                    category: product.category || "",
                    edition: product.edition || "",
                    season: product.season || "",
                    source: product.source || "",
                    variant: product.variant || "",
                    price: product.price || "",
                    discountPrice: product.discountPrice || "",
                    costPrice:  '00',
                    preOrder: product.preOrder || false,
                    popular: product.popular || false,
                    isLive: product.isLive || false,
                    images: (product.images || []).join(","),
                });

                setSizes(product.sizes || {});
                setPreviewImages(product.images || []);

                setLoading(false);
            } catch (err) {
                console.log(err);

                Swal.fire({
                    icon: "error",
                    title: "Failed to load product",
                });

                setLoading(false);
            }
        };

        fetchProduct();
    }, [id, axios]);

    // ==========================
    // INPUT CHANGE
    // ==========================

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? checked
                    : type === "number"
                        ? Number(value)
                        : value,
        }));
    };

    // ==========================
    // SIZE FUNCTIONS
    // ==========================

    const handleAddSize = () => {
        const size = newSize.trim();

        if (!size) return;

        if (sizes[size]) {
            setNewSize("");
            return;
        }

        setSizes((prev) => ({
            ...prev,
            [size]: 0,
        }));

        setNewSize("");
    };

    const handleRemoveSize = (size) => {
        setSizes((prev) => {
            const updated = { ...prev };
            delete updated[size];
            return updated;
        });
    };

    const handleSizeChange = (size, value) => {
        const number = Number(value);

        setSizes((prev) => ({
            ...prev,
            [size]: isNaN(number) ? 0 : number,
        }));
    };

    // ==========================
    // KEYBOARD NAVIGATION
    // ==========================

    const handleNavigation = (e) => {
        const keys = [
            "Enter",
            "ArrowDown",
            "ArrowUp",
            "ArrowLeft",
            "ArrowRight",
        ];

        if (!keys.includes(e.key)) return;

        if (e.target.tagName === "TEXTAREA" && e.key === "Enter") return;

        e.preventDefault();

        const form = e.target.form;

        const elements = Array.from(form.elements).filter(
            (el) =>
                !el.disabled &&
                el.tabIndex !== -1 &&
                ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName)
        );

        const index = elements.indexOf(e.target);

        if (e.key === "Enter" || e.key === "ArrowDown") {
            elements[index + 1]?.focus();
        }

        if (e.key === "ArrowUp") {
            elements[index - 1]?.focus();
        }
    };

       // ==========================
    // IMAGE UPLOAD
    // ==========================

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        setLoading(true);

        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        try {
            const res = await fetch(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await res.json();

            if (!data.success) {
                throw new Error("Upload failed");
            }

            const imageUrl = data.data.url;

            setPreviewImages((prev) => [...prev, imageUrl]);

            setForm((prev) => ({
                ...prev,
                images: prev.images
                    ? `${prev.images},${imageUrl}`
                    : imageUrl,
            }));
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);

            Swal.fire({
                icon: "error",
                title: "Image upload failed",
            });
        }
    };

    // ==========================
    // REMOVE IMAGE
    // ==========================

    const removeImage = (image) => {
        setPreviewImages((prev) =>
            prev.filter((img) => img !== image)
        );

        setForm((prev) => ({
            ...prev,
            images: prev.images
                .split(",")
                .map((i) => i.trim())
                .filter((i) => i && i !== image)
                .join(","),
        }));
    };

    // ==========================
    // UPDATE PRODUCT
    // ==========================

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedProduct = {
            ...form,
            totalStock: Object.values(sizes).reduce((total, stock) => total + stock, 0),
            price: Number(form.price),
            discountPrice: Number(form.discountPrice),
            costPrice: Number(form.costPrice),

            sizes,

            images: form.images
                .split(",")
                .map((i) => i.trim())
                .filter(Boolean),
        };

        try {
            await axiosSecure.patch(
                `/products/${id}`,
                updatedProduct
            );

            await Swal.fire({
                icon: "success",
                title: "Product Updated",
                timer: 1500,
                showConfirmButton: false,
            });

            // navigate("/adminLayout/allProducts");
        } catch (err) {
            console.log(err);

            Swal.fire({
                icon: "error",
                title: "Update Failed",
                text: err.message,
            });
        }
    };

    // ==========================
    // LOADING
    // ==========================

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-bars loading-xl"></span>
            </div>
        );
    }

    // ==========================
    // JSX
    // ==========================

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="w-full rounded-2xl p-8">

                <h1 className="text-3xl font-bold text-center mb-8">
                    Update Product
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                                     {/* PRODUCT NAME */}

                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        onKeyDown={handleNavigation}
                        placeholder="Product Name"
                        className="w-full p-3 rounded bg-black/10"
                        required
                    />

                    {/* DESCRIPTION */}

                    <textarea
                        rows={6}
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        onKeyDown={handleNavigation}
                        placeholder="Product Description"
                        className="w-full p-3 rounded bg-black/10"
                        required
                    />

                    {/* CATEGORY */}

                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        onKeyDown={handleNavigation}
                        className="w-full p-3 rounded bg-black/10"
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="jersey">Jersey</option>
                        <option value="trouser">Trouser</option>
                        <option value="sneaker">Sneaker</option>
                        <option value="accessory">Accessory</option>
                        <option value="tshirt">T-shirt</option>
                    </select>

                    {/* JERSEY EDITION */}

                    {form.category === "jersey" && (
                        <select
                            name="edition"
                            value={form.edition}
                            onChange={handleChange}
                            onKeyDown={handleNavigation}
                            className="w-full p-3 rounded bg-black/10"
                        >
                            <option value="">Select Edition</option>
                            <option value="FAN">Fan Edition</option>
                            <option value="Player">
                                Player Edition
                            </option>
                            <option value="Retro">
                                Retro
                            </option>
                        </select>
                    )}

                     {form.category === "jersey" && (
                        <select
                            name="source"
                            value={form.source}
                            onChange={handleChange}
                            onKeyDown={handleNavigation}
                            className="w-full p-3 rounded bg-black/10"
                        >
                            <option value="national">
                               National
                            </option>
                            <option value="club">
                                Club
                            </option>
                        </select>
                    )}

                    {/* JERSEY SEASON */}

                    {form.category === "jersey" && (
                        <input
                            type="text"
                            name="season"
                            value={form.season}
                            onChange={handleChange}
                            onKeyDown={handleNavigation}
                            placeholder="Season (Example: 24/25)"
                            className="w-full p-3 rounded bg-black/10"
                            required
                        />
                    )}

                    {/* SNEAKER VARIANT */}

                    {form.category === "sneaker" && (
                        <select
                            name="edition"
                            value={form.edition}
                            onChange={handleChange}
                            onKeyDown={handleNavigation}
                            className="w-full p-3 rounded bg-black/10"
                        >
                            <option value="">Select Variant</option>
                            <option value="1:1Grade">
                                1:1 Grade
                            </option>
                            <option value="OEM">
                                OEM
                            </option>
                        </select>
                    )}

                    {/* CHECKBOXES */}

                    <div className="space-y-3">

                        <label className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                name="popular"
                                checked={form.popular}
                                onChange={handleChange}
                            />
                            Popular Product
                        </label>

                        {/* <label className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                name="isLive"
                                checked={form.isLive}
                                onChange={handleChange}
                            />
                            Website Visibility
                        </label> */}

                        <label className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                name="preOrder"
                                checked={form.preOrder}
                                onChange={handleChange}
                            />
                            Pre Order Only
                        </label>

                    </div>

                    {/* PRICE */}

                    <div className="grid md:grid-cols-2 gap-4">

                        <input
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            onKeyDown={handleNavigation}
                            placeholder="Selling Price"
                            min={0}
                            className="p-3 rounded bg-black/10"
                            required
                        />

                        <input
                            type="number"
                            name="discountPrice"
                            value={form.discountPrice}
                            onChange={handleChange}
                            onKeyDown={handleNavigation}
                            placeholder="Discount Price"
                            min={0}
                            className="p-3 rounded bg-black/10"
                        />

                    </div>

                    {/* <input
                        type="number"
                        name="costPrice"
                        value={form.costPrice}
                        onChange={handleChange}
                        onKeyDown={handleNavigation}
                        placeholder="Cost Price"
                        min={0}
                        className="w-full p-3 rounded bg-black/10"
                        required
                    /> */}

                                       {/* SIZES */}

                    <div>

                        <h2 className="font-bold mb-3">
                            Sizes & Stock
                        </h2>

                        <div className="flex gap-2">

                            <input
                                type="text"
                                value={newSize}
                                onChange={(e) =>
                                    setNewSize(e.target.value)
                                }
                                onKeyDown={handleNavigation}
                                placeholder="S, M, XL, XXL..."
                                className="flex-1 p-3 rounded bg-black/10"
                            />

                            <button
                                type="button"
                                onClick={handleAddSize}
                                className="px-5 bg-green-600 text-white rounded"
                            >
                                Add
                            </button>

                        </div>

                        <div className="flex flex-wrap gap-3 mt-4">

                            {Object.keys(sizes).map((size) => (
                                <div
                                    key={size}
                                    className="px-3 py-1 rounded bg-black/20 flex items-center gap-2"
                                >
                                    <span>{size}</span>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleRemoveSize(size)
                                        }
                                        className="text-red-500"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}

                        </div>

                        <div className="grid grid-cols-2  md:grid-cols-4 gap-4 mt-5">

                            {Object.keys(sizes).map((size) => (

                                <div className="flex items-center " key={size}>

                                    <label className="font-medium pr-3">
                                        {size}-
                                    </label>

                                    <input
                                        type="number"
                                        min="0"
                                        value={sizes[size]}
                                        onChange={(e) =>
                                            handleSizeChange(
                                                size,
                                                e.target.value
                                            )
                                        }
                                        className="w-full p-2 rounded bg-black/10"
                                    />

                                </div>

                            ))}

                        </div>

                    </div>

                    {/* IMAGE UPLOAD */}

                    <div>

                        <label className="block mb-2 font-bold">
                            Upload Images
                        </label>

                        <input
                            type="file"
                            onChange={handleImageUpload}
                            className="file-input file-input-bordered w-full"
                        />

                    </div>

                    {/* IMAGE PREVIEW */}

                    <div className="flex flex-wrap gap-4">

                        {previewImages.map((img, index) => (

                            <div
                                key={index}
                                className="relative"
                            >

                                <img
                                    src={img}
                                    alt="preview"
                                    className="w-28 h-28 rounded-lg object-cover border"
                                />

                                <button
                                    type="button"
                                    onClick={() => removeImage(img)}
                                    className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-red-600 text-white"
                                >
                                    ✕
                                </button>

                            </div>

                        ))}

                    </div>

                    {/* SUBMIT */}

                    <button
                        type="submit"
                        className="btn btn-neutral w-full mt-6"
                    >
                        Update Product
                    </button>

                </form>

            </div>

        </div>
    );
};

export default UpdateItem;