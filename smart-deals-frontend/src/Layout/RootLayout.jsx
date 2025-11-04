import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className=" bg-[#E9E9E9] min-h-screen">
        <div className="w-11/12 mx-auto py-10">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
