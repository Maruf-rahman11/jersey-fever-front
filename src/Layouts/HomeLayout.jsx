import React from "react";
import { Outlet, useLocation } from "react-router";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import useScrollTop from "../Utilities/UseScrollTop";

const HomeLayout = () => {
  const { pathname } = useLocation();
  useScrollTop([pathname]);

  
  return (
    <div className="">


        <Navbar />
        <Outlet />
        <Footer></Footer>
 

    </div>
  );
};

export default HomeLayout;