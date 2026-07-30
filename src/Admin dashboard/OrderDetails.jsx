import { useParams, Link } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxios from "../hooks/UseAxios";
import useAxiosSecure from "../Hooks/UseAxiosSecure";
import LoadingCompo from "../Components/LoadingCompo";

const OrderDetails = () => {
    const { id } = useParams();
    const axios = useAxios();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: order, isLoading } = useQuery({
        queryKey: ["order", id],
        queryFn: async () => {
            const res = await axios.get(`/orders/${id}`);
            return res.data;
        },
    });


    const handleChange = async (e) => {
        const newStatus = e.target.value;
      
        try {
          const res = await axios.patch(`/orders/${order._id}/status`, {
            status: newStatus,
          });
      
          if (res.data?.success) {
            Swal.fire({
              icon: "success",
              title: "Status Updated",
              text: `Order status changed to "${newStatus}"`,
              timer: 1200,
              showConfirmButton: false,
            });
      
            // ✅ Invalidate ONLY the orders query
            queryClient.invalidateQueries(`orders/${order._id}`);
          }
        } catch (error) {
          console.error("Error updating order status:", error);
      
          Swal.fire({
            icon: "error",
            title: "Update Failed",
            text: "Failed to update order status",
          });
        }
      };

      const zone = order?.customer.deliveryZone
      console.log(zone)
      



    if (isLoading) return <LoadingCompo />;

    if (!order)
        return (
            <p className="text-center text-red-500 text-xl">
                Order not found
            </p>
        );

    const {
        customer,
        products,
        totalAmount,
        status,
        createdAt,
    } = order;

    return (
        <div className="w-11/12 mx-auto p-6 text-base-content">
            <h1 className="text-3xl font-bold mb-6">Order Details</h1>
            <hr className=" border-t-4 mb-8 lg:mb-16 w-12/12 mx-start border-orange-600" />

            {/* Order Meta */}
            <div className="bg-white/10 p-4 rounded-xl mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <p><span className="font-semibold">Order ID:</span> {order._id}</p>
                <p className="flex items-center gap-2"><span className="font-semibold">Status:</span>
                    <span className="ml-2 px-3 py-1 text-base-200
                     rounded bg-orange-600">
                        {status}
                    </span>
                    <select
                        value={order.status}
                        onChange={handleChange}
                        className="select select-bordered select-sm  text-base-content"
                    >
                        <option className="hover:bg-orange-600" value="pending">Pending</option>
                        <option className="hover:bg-orange-600" value="confirmed">Confirmed</option>
                        <option className="hover:bg-orange-600" value="delivered">Delivered</option>
                    </select>
                </p>
                <p><span className="font-semibold">Placed At:</span> {new Date(createdAt).toLocaleString()}</p>
                <p><span className="font-semibold">Total Amount:</span> {totalAmount}Tk</p>
            </div>

            {/* Customer Info */}
            <div className="bg-white/10 p-4 rounded-xl mb-6">
                <h2 className="text-xl font-semibold ">Customer Information</h2>
                <hr className=" border-t-4 lg: mb-5 w-4/12 mx-start mt-2 border-orange-600" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <p><span className="font-semibold">Name:</span> {customer.customerName}</p>
                    <p><span className="font-semibold">Email:</span> {customer.email}</p>
                    <p><span className="font-semibold">Phone:</span> {customer.customerNumber}</p>
                    <p><span className="font-semibold">District:</span> {customer.district}</p>
                    <p className="md:col-span-2">
                        <span className="font-semibold">Address:</span> {customer.address}
                    </p>
                    <p><span className="font-semibold">Delivery Zone:</span> {customer.deliveryZone}</p>
                </div>
            </div>

            {/* Products */}
            <div className="bg-white/10 p-4 rounded-xl">
                <h2 className="text-xl font-semibold mb-4">Ordered Products</h2>

                <div className="overflow-x-auto">
                    <table className="table text-base-content">
                        <thead className="text-base-content">
                            <tr>
                                <th>#</th>
                                <th>Shoe</th>
                                <th>Size</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr className="font-semibold" key={index}>
                                    <td>{index + 1}</td>
                                    <td>{product.name}</td>
                                    <td>{product.size}</td>
                                    <td>{product.quantity}</td>
                                    <td>৳{product.price}</td>
                                    <td>৳{product.price * product.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <hr className=" border-t-4 mb-4 w-12/12 mx-start border-orange-600" />

                <div className=" items-start mt-4 text-lg font-bold">
                <p className="mb-2">Delivery Fee :{` `}{zone === 'cumilla' ? '80' : "150"}</p>
                  <p>Total: {totalAmount}Tk</p>  
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6">
                <Link to="/adminLayout/allOrders">
                    <button className="btn">Back</button>
                </Link>
            </div>
        </div>
    );
};

export default OrderDetails;
