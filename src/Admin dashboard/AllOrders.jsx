import React, { useState } from "react";
import useAxios from "../hooks/UseAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingCompo from "../Components/LoadingCompo";
import { Link } from "react-router";
import Swal from "sweetalert2";


const AllOrders = () => {
  
  const [page, setPage] = useState(1);
  const [searchNumber, setSearchNumber] = useState(""); // <-- search state
  const axios = useAxios();

  const limit = 16;
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["orders", page, searchNumber],
    queryFn: async () => {
      const res = await axios.get(
        `/orders?page=${page}&limit=${limit}&search=${searchNumber}`
      );
      
      return res.data;
    },
    keepPreviousData: true,
  });

  const formatDateTime = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleString("en-BD", {
      timeZone: "Asia/Dhaka",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This order will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      await axios.delete(`/orders/${id}`);
      queryClient.invalidateQueries(["orders"]);
      Swal.fire("Deleted!", "Order has been deleted.", "success");
    }
  };

  const { orders = [], total = 0 } = data || {};
  const totalPages = Math.ceil(total / limit);

  if(orders.length < 0) return <div className="flex my-10 tet-center text-base-content">No Orders yet!!</div>

  if ( isLoading ) return <LoadingCompo />;

  return (
    <div>
      {/* Search input */}
      <div className="ml-4 flex items-center gap-2 my-4">
        <p className="text-base-content">
          Search by number :
        </p>
        <input
                    type="text"
                    placeholder="Search by customer number..."
                    value={searchNumber}
                    onChange={(e) => {
                        setSearchNumber(e.target.value);
                        setPage(1); // 🔥 reset to first page
                    }}
                    className="input input-bordered w-full max-w-xs"
                />
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead className="text-lg text-base-content">
            <tr>
              <th>No.</th>
              <th>Customer</th>
              <th>Order ID</th>
              <th>Placed At</th>
              <th>Products</th>
              <th>Total(DL)</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id} className="border-4 font-semibold text-base-content">
                <th>{index + 1}</th>
                <td>
                  <div className="font-bold">
                    {order.customer?.customerName}
                  </div>
                  <div className="text-sm opacity-80">
                    {order.customer?.email}
                  </div>
                  <div className="text-sm opacity-80">
                    {order.customer?.customerNumber}
                  </div>
                </td>
                <td className="text-xs break-all">{order._id}</td>
                <td>{formatDateTime(order.createdAt)}</td>
                <td>
                  <ul className="space-y-1">
                    {order.products.map((product, i) => (
                      <li key={i} className="text-sm">
                        • {product.name} × {product.quantity} (Size {product.size})
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="font-bold">{order.totalAmount}৳</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs font-bold ${
                      order.status === "pending" && "bg-yellow-500 text-black"
                    } ${
                      order.status === "confirmed" && "bg-orange-600 text-black"
                    } ${
                      order.status === "delivered" && "bg-green-500 text-black"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td>
                  <div className="flex gap-2">
                    <Link to={`/adminDashboard/orderDetails/${order._id}`}>
                      <button className="btn btn-sm">Details</button>
                    </Link>
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-6 gap-3">
  <button
    disabled={page === 1}
    onClick={() => setPage(prev => prev - 1)}
    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
  >
    Prev
  </button>

  {Array.from({ length: Math.ceil(total / limit) }, (_, i) => (
    <button
      key={i}
      onClick={() => setPage(i + 1)}
      className={`px-4 py-2 rounded ${
        page === i + 1 ? "bg-black text-white" : "bg-gray-200"
      }`}
    >
      {i + 1}
    </button>
  ))}

  <button
    disabled={page === totalPages}
    onClick={() => setPage(prev => prev + 1)}
    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
  >
    Next
  </button>
</div>

      </div>
    </div>
  );
};

export default AllOrders;
