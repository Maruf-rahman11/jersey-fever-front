import  { useState } from 'react';

import { Link } from 'react-router';
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from 'sweetalert2';
import useAxios from '../hooks/UseAxios';
import LoadingCompo from '../Components/LoadingCompo';


const AllItems = () => {
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [searchName, setSearchName] = useState(""); // <-- search state
    const limit = 16;
    const axios = useAxios()
    const queryClient = useQueryClient();
    // const navigate = useNavigate();


    const { data, isLoading } = useQuery({
        queryKey: ["allProduct", page, searchName],
        queryFn: async () => {
            const res = await axios.get(
                `/products?page=${page}&limit=${limit}&search=${searchName}`
            );
            setLoading(false)
            return res.data
            
        },
         placeholderData: keepPreviousData,

    });

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axios.delete(`/products/${id}`);
                    if (res.data) {
                        Swal.fire("Deleted!", "product has been deleted.", "success");
                        queryClient.invalidateQueries(["allProduct"]);
                    }
                } catch (error) {
                    console.error("Error deleting product:", error);
                    Swal.fire("Error!", "Failed to delete the product.", "error");
                }
            }
        });
    };

    if (loading || isLoading) return <LoadingCompo />;

    const { shoes = [], total = 0 } = data;
    const totalPages = Math.ceil(total / limit);



    return (
        <div className='w-11/12 mx-auto my-16'>
            {/* Search input */}
            <div className="mb-4 flex items-center gap-2">
                <p className='text-base-content'>Search by Name :</p>
                <input
                    type="text"
                    placeholder="Search by shoe name..."
                    value={searchName}
                    onChange={(e) => {
                        setSearchName(e.target.value);
                        setPage(1); // 🔥 reset to first page
                    }}
                    className="input input-bordered w-full max-w-xs"
                />
            </div>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead className='text-lg text-base-content'>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Stock</th>
                            <th>Edition</th>
                            <th>Category</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shoes.map((shoe, index) => (
                            <tr key={shoe._id} className='border-4 text-base-content'>
                                <th>{(page - 1) * limit + index + 1}</th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img src={shoe.images[0]} alt={shoe.name} />
                                            </div>
                                        </div>
                                        <div className="font-bold">{shoe.name}</div>
                                    </div>
                                </td>
                                <td>{shoe.totalStock}</td>
                                {shoe.edition ?<td>{shoe.edition}</td>: <td className='text-base-content'>N/A</td>}
                                <td>{shoe.category}</td>
                                <td>
                                    <div className='flex gap-2'>
                                        <Link to={`/adminDashboard/itemDetails/${shoe._id}`}><button className='btn'>Details</button></Link>

                                        <button onClick={() => handleDelete(shoe._id)} className='btn'>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className='flex justify-center mt-6 gap-3'>
                <button
                    disabled={page === 1}
                    onClick={() => setPage(prev => prev - 1)}
                    className='px-4 py-2 bg-gray-200 cursor-pointer rounded disabled:opacity-50'
                >
                    Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={`px-4 py-2 cursor-pointer rounded ${page === i + 1 ? 'bg-black text-white' : 'bg-gray-200'}`}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    disabled={page === totalPages}
                    onClick={() => setPage(prev => prev + 1)}
                    className='px-4 py-2 cursor-pointer bg-gray-200 rounded disabled:opacity-50'
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AllItems;
