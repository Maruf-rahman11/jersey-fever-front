import { use } from 'react';

import Footer from '../Components/Footer';
import { Link, NavLink, Outlet, useNavigate } from 'react-router';
import { FaArrowLeft, FaBoxOpen } from 'react-icons/fa6';
import { GiConverseShoe } from 'react-icons/gi';
import { RiAddLine } from 'react-icons/ri';
import { AuthContext } from '../Context/AuthContext';
import Swal from 'sweetalert2';
import useAxiosSecure from '../hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingCompo from '../Components/LoadingCompo';
import { Plane } from 'lucide-react';

const AdminLayout = () => {

    const { user, signOutUser } = use(AuthContext)
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const { data, isLoading } = useQuery({
        queryKey: ["orders"],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/pending-count`
            );

            return res.data;
        },
        keepPreviousData: true,
    });

    const count = data?.pendingCount



    const handleSignOut = () => {
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
                signOutUser()
                    .then(() => {
                        navigate('/');
                    })
                    .catch(error => console.log(error));
            }


        });

    }
    if (isLoading) <LoadingCompo></LoadingCompo>


    return (
        <div className=''>

            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">

                    {/* Navbar */}
                    <div className="navbar w-full lg:hidden">
                        <div className="flex-none ">
                            <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn text-amber-50 btn-square btn-ghost">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="inline-block h-6 w-6 stroke-current"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    ></path>
                                </svg>
                            </label>
                        </div>
                        <div className="mx-2 flex-1 px-2 text-amber-50 text-2xl lg:hidden">Dashboard</div>

                    </div>
                    {/* Page content here */}
                    <Outlet></Outlet>
                    {/* Page content here */}

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu border-r-2  text-orange-600  min-h-full w-80 p-4">
                        {/* Sidebar content here */}
                        <li className='text-xl text-base-content mb-3'>
                            <Link to={'/'}><FaArrowLeft /> Go Back to Home</Link>
                        </li>
                        <li className='hover:bg-amber-50 text-xl hover:text-black'>
                            <NavLink to="/adminDashboard/allItems">
                                <GiConverseShoe className="inline-block mr-2 " />
                                All Items
                            </NavLink>
                        </li>
                        <li className='hover:bg-amber-50 text-xl hover:text-black'>
                            <NavLink to="/adminDashboard/addProduct">
                                <RiAddLine className="inline-block mr-2" />
                                Add Product
                            </NavLink>
                        </li >
                        <li className='hover:bg-amber-50 relative text-xl hover:text-black'>
                            <NavLink to={`/adminDashboard/allOrders`}>
                                <FaBoxOpen className="inline-block  mr-2" />
                                {count > 0 && (
                                    <span className="absolute bottom-2 right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                        {count}
                                    </span>
                                )}
                                Orders
                            </NavLink>
                        </li>
                        <li className='hover:bg-amber-50 relative text-xl hover:text-black'>
                            <NavLink to={`/adminDashboard/preOrders`}>
                                <Plane size={20} strokeWidth={2} className="inline-block  mr-2" />
                                {count > 0 && (
                                    <span className="absolute bottom-2 right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                        {count}
                                    </span>
                                )}
                                Pre Orders
                            </NavLink>
                        </li>
                        <li className='hover:bg-amber-50 text-xl hover:text-black'>
                            <button onClick={handleSignOut}>
                                <FaBoxOpen className="inline-block mr-2" />
                                Sign out
                            </button>
                        </li>

                    </ul>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default AdminLayout;