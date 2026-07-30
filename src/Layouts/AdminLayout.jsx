import React, { use, useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Link, NavLink, Outlet, useNavigate } from 'react-router';
import { FaArrowLeft, FaBox, FaBoxOpen, FaChartLine, FaMotorcycle, FaUserCheck } from 'react-icons/fa6';
import { FaHome, FaMoneyCheckAlt } from 'react-icons/fa';
import { GiConverseShoe } from 'react-icons/gi';
import { RiAddLine } from 'react-icons/ri';
import { AuthContext } from '../Context/AuthContext';
import Swal from 'sweetalert2';

const AdminLayout = () => {
     
    const {user , signOutUser} = use(AuthContext)
    const navigate = useNavigate();
   
    
    const handleSignOut =()=>{
         Swal.fire({
                    title: "Are you sure?",
                    text: "This action cannot be undone!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Yes, delete it!",
                }).then(async (result) => {
                    if(result.isConfirmed){
                        signOutUser()
                    .then(() => {
                        navigate('/');
                    })
                    .catch(error => console.log(error));
                    }
                    
                 
    });
       
    }

    
    
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
                        <li className='hover:bg-amber-50 text-xl hover:text-black'>
                            <NavLink to={`/adminDashboard/allOrders`}>
                                <FaBoxOpen className="inline-block mr-2" />
                                Orders
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