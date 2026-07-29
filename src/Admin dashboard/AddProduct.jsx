import { useState } from "react";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import useAxios from "../hooks/UseAxios";
import Swal from "sweetalert2";

const AddProduct = () => {
    const [loading, setLoading] = useState(false);
    const axios = useAxios();
    const [previewImages, setPreviewImages] = useState([]);
    const [sizes, setSizes] = useState({});
    const [newSize, setNewSize] = useState("");
    const [form, setForm] = useState({
        name: "",
        category: "",
        edition: "",
        season: "",
        price: "",
        discountPrice: "",
        preOrder: false,
        costPrice: "",
        description: "",
        images: "",
        popular: false,
        isLive: false,
    });


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

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

    const handleAddSize = () => {
        const size = newSize.trim();

        if (!size || sizes[size]) return;

        setSizes((prev) => ({
            ...prev,
            [size]: 0,
        }));
        setNewSize("");
    };

    const handleRemoveSize = (size) => {
        setSizes((prev) => {
            const next = { ...prev };
            delete next[size];
            return next;
        });
    };

    const handleSizeChange = (size, value) => {
        const stock = Number(value);

        setSizes((prev) => ({
            ...prev,
            [size]: value === "" ? 0 : isNaN(stock) || stock < 0 ? 0 : stock,
        }));
    };

    // ======================
    // IMAGE UPLOAD
    // ======================
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        setLoading(true);

        try {
            const res = await fetch(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`,
                { method: "POST", body: formData }
            );

            const data = await res.json();
            const imageUrl = data.data.url;

            setForm((prev) => ({
                ...prev,
                images: prev.images ? prev.images + "," + imageUrl : imageUrl,
            }));

            setPreviewImages((prev) => [...prev, imageUrl]);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const removeImage = (img) => {
        setPreviewImages((prev) => prev.filter((i) => i !== img));

        setForm((prev) => ({
            ...prev,
            images: prev.images
                .split(",")
                .map((i) => i.trim())
                .filter((i) => i !== img)
                .join(","),
        }));
    };
    const handleNavigation = (e) => {
        const keys = ["Enter", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"];

        if (!keys.includes(e.key)) return;

        // Allow Enter inside textarea
        if (e.target.tagName === "TEXTAREA" && e.key === "Enter") return;

        e.preventDefault();

        const form = e.target.form;
        const elements = Array.from(form.elements).filter(
            (el) =>
                !el.disabled &&
                el.tabIndex !== -1 &&
                ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName)
        );

        const currentIndex = elements.indexOf(e.target);

        if (e.key === "Enter" || e.key === "ArrowDown") {
            elements[currentIndex + 1]?.focus();
        }

        if (e.key === "ArrowUp") {
            elements[currentIndex - 1]?.focus();
        }
    };

    // ======================
    // SUBMIT
    // ======================
    const handleSubmit = async (e) => {
        e.preventDefault();

        const productData = {
            ...form,
            sizes,
            totalStock: Object.values(sizes).reduce((total, stock) => total + stock, 0),
            images: form.images.split(",").map((i) => i.trim()),
        };
        console.log(productData);

        try {
          await axios.post("/products", productData);

          Swal.fire("Success", "Product added", "success");

          // RESET
          setForm({
        name: "",
        category: "",
        edition: "",
        season: "",
        price: "",
        discountPrice: "",
        preOrder: false,
        costPrice: "",
        description: "",
        images: "",
        popular: false,
        isLive: false,
        });

          setPreviewImages([]);
        } catch (err) {
          Swal.fire("Error", "Failed", "error");
        } finally {
          setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-ring w-20 loading-xl"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="w-full p-8 rounded-2xl">

                <h1 className="text-3xl font-bold mb-6 text-center">
                    Add Product
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* NAME */}
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        onKeyDown={handleNavigation}
                        placeholder="Product Name"
                        className="w-full p-3 bg-black/10 rounded"
                        required
                    />
                    {/* Description */}

                    <textarea
                        rows={6}
                        name="description"
                        type="text"
                        value={form.description}
                        onKeyDown={handleNavigation}
                        onChange={handleChange}
                        placeholder="Product Description"
                        className="w-full p-3 bg-black/10 rounded"
                        required
                    />


                    {/* CATEGORY */}
                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        onKeyDown={handleNavigation}
                        className="w-full p-3 bg-black/10 rounded"
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="jersey">Jersey</option>
                        <option value="trouser">Trouser</option>
                        <option value="sneaker">Sneaker</option>
                        <option value="accessory">Accessory</option>
                    </select>

                    {/* VARIANT */}
                    {form.category === "jersey" && (
                        <select
                            name="edition"
                            value={form.edition}
                            onKeyDown={handleNavigation}
                            onChange={handleChange}
                            className="w-full p-3 bg-black/10 rounded"
                        >
                            <option value="">Select variant</option>
                            <option value="FAN">Fan Edition</option>
                            <option value="Player">Player Edition</option>
                            <option value="Retro">Retro</option>
                        </select>
                    )}

                    {/* Season */}
                    {form.category === "jersey" && (

                        <input
                            name="season"
                            value={form.season}
                            onKeyDown={handleNavigation}
                            onChange={handleChange}
                            Placeholder="Add Season "
                            className="w-full p-3 bg-black/10 rounded"
                            required
                        />
                    )}


                    {form.category === "sneaker" && (
                        <select
                            name="variant"
                            value={form.variant}
                            onKeyDown={handleNavigation}
                            onChange={handleChange}
                            className="w-full p-3 bg-black/10 rounded"
                        >
                            <option value="">Select variant</option>
                            <option value="1:1Grade">1:1 Grade</option>
                            <option value="oem">OEM</option>
                        </select>
                    )}

                    {/* ⭐ POPULAR */}
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="popular"
                            onKeyDown={handleNavigation}
                            checked={form.popular}
                            onChange={handleChange}
                        />
                        <label>Popular Product</label>
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            onKeyDown={handleNavigation}
                            name="isLive"
                            checked={form.isLive}
                            onChange={handleChange}
                        />
                        <label>Website visibility</label>
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            onKeyDown={handleNavigation}
                            name="preOrder"
                            checked={form.preOrder}
                            onChange={handleChange}
                        />
                        <label>Pre Order Only</label>
                    </div>

                    {/* PRICE */}
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="number"

                            name="price"
                            placeholder="Price"
                            value={form.price}
                            onChange={handleChange}
                            className="p-3 bg-black/10 rounded"
                            required
                        />

                        <input
                            type="number"

                            name="discountPrice"
                            placeholder="Discount Price"
                            value={form.discountPrice}
                            onChange={handleChange}
                            className="p-3 bg-black/10 rounded"
                        />
                    </div>

                    <input
                        type="number"
                        name="costPrice"

                        placeholder="Cost Price"
                        value={form.costPrice}
                        onChange={handleChange}
                        className="p-3 w-full bg-black/10 rounded"
                        required
                    />
                    {/* SIZE STOCK INPUTS */}
                    <div className="mb-4">
                        <h2 className="font-bold mb-2">Sizes</h2>

                        <div className="flex gap-2">
                            <input
                                value={newSize}
                                onKeyDown={handleNavigation}
                                onChange={(e) => setNewSize(e.target.value)}
                                placeholder="Enter size (40, XL, One Size)"
                                className="p-2 rounded border bg-white/20"

                            />

                            <button
                                type="button"
                                onClick={handleAddSize}
                                className="px-4 py-2 bg-green-600 rounded"
                            >
                                Add
                            </button>
                        </div>

                        <div className="flex gap-2 mt-2 flex-wrap">
                            {Object.keys(sizes).map((size) => (
                                <div
                                    key={size}
                                    className="px-3 py-1 rounded bg-black/30 flex items-center gap-2"
                                >
                                    {size}

                                    <button
                                        type="button"
                                        onClick={() => handleRemoveSize(size)}
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-wrap gap-3 mt-2">
                            {Object.keys(sizes).map((size) => (
                                <div key={size}>
                                    <span className="">Size {size} :</span>
                                    <input
                                        type="number"
                                        value={sizes[size] ?? ""}
                                        onChange={(e) =>
                                            handleSizeChange(size, e.target.value)
                                        }
                                        min="0"
                                        className="w-20 p-1 ml-2 border rounded"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* IMAGE */}
                    <input
                        type="file"
                        className="border rounded p-2 cursor-pointer"
                        onChange={handleImageUpload}
                    />

                    {/* PREVIEW */}
                    <div className="flex gap-2 flex-wrap">
                        {previewImages.map((img, i) => (
                            <div key={i} className="relative">
                                <img src={img} className="h-20 w-20 object-cover rounded" />
                                <button
                                    type="button"
                                    onClick={() => removeImage(img)}
                                    className="absolute top-0 right-0 bg-red-600 text-white px-1"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* SUBMIT */}
                    <button className="w-full py-3 bg-black text-white rounded font-bold">
                        Add Product
                    </button>

                </form>
            </div>
        </div>
    );
};

export default AddProduct;