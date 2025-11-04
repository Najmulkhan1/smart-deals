import React, { use, useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";
import { Link, NavLink } from "react-router";
import MyLink from "./Mylink";
import image1 from "../assets/img1.jpg";
import { AuthContext } from "../provider/AuthContext";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const { user, logout } = use(AuthContext);

  const image = user?.photoURL || image1;

  const handleLogout = () => {
    console.log("click");
    logout()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const links = (
    <>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </>
  );

  return (
    <div className="w-11/12 mx-auto my-4">
      <nav className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="md:hidden " onClick={() => setOpenMenu(!openMenu)}>
            {openMenu ? <IoIosClose /> : <CiMenuFries />}
            <ul
              className={`md:hidden absolute duration-1000 p-2 text-black
              ${openMenu ? "top-12" : "-top-40"}
              bg-amber-400 rounded`}
            >
              <li className="hover:bg-amber-100 rounded p-1">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block w-full rounded p-1 px-2 ${
                      isActive ? "bg-white" : ""
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>

              <li className="hover:bg-amber-100 rounded p-1">
                <NavLink
                  to="/all-products"
                  className={({ isActive }) =>
                    `block w-full rounded p-1 px-2 ${
                      isActive ? "bg-white" : ""
                    }`
                  }
                >
                  All Product
                </NavLink>
              </li>
            </ul>
          </div>

          <h2>
            Smart<span>Deals</span>
          </h2>
        </div>
        <div>
          <ul className="md:flex hidden gap-3 ">
            <li className="hover:bg-amber-100 hover:text-black rounded p-1">
              <MyLink to={"/"}>Home</MyLink>
            </li>

            <li className="hover:bg-amber-100 hover:text-black rounded p-1">
              <MyLink to={"/all-products"}>All Product</MyLink>
            </li>
            <li className="hover:bg-amber-100 hover:text-black rounded p-1">
              <MyLink to={"/my-bids"}>My Bids</MyLink>
            </li>
            <li className="hover:bg-amber-100 hover:text-black rounded p-1">
              <MyLink to={"/create-product"}>Create Product</MyLink>
            </li>
          </ul>
        </div>
        <div className="flex gap-4">
          {user ? (
            <>
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={image}
                alt=""
              />
              <button
                onClick={handleLogout}
                className="btn bg-red-400 text-white"
              >
                SignOut
              </button>
            </>
          ) : (
            <>
              <Link to={"/register"} className="btn btn-primary">
                Register
              </Link>
              <Link
                to={"/login"}
                className="btn border-primary hover:bg-primary hover:text-white"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
