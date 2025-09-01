import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FaAngleDown,
  FaCaretDown,
  FaCartShopping,
  FaUser,
} from "react-icons/fa6";
import { FiMapPin } from "react-icons/fi";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import axios from "axios";
import { IoCloseSharp } from "react-icons/io5";
import CreateContext from "../../context/CreateContext";
import { MdOutlineMenuOpen } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

function Navbar() {
  const { user } = useUser();

  const { addToCartList, location, setLocation } = useContext(CreateContext);
  const [openGetLocationModal, setOpenGetLocationModal] = useState(false);
  const [openNavMenu, setOpenNavMenu] = useState(false);

  // FETCHING THE USER LOCATION
  const fetchUserGeoLocation = async () => {
    try {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { longitude, latitude } = position.coords;

        const location = await axios.get(
          `http://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );

        const userAddress = location.data.address;
        setLocation(userAddress);
        setOpenGetLocationModal(false);
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchUserGeoLocation();
  }, []);

  const navMenusList = [
    {
      title: "Home",
      link: "/home",
    },
    {
      title: "Products",
      link: "/products",
    },
    {
      title: "About",
      link: "/about",
    },
    {
      title: "Contact",
      link: "/contact",
    },
  ];

  return (
    <header className="container mx-auto px-8 bg-slate-100 border-b border-slate-300 max-sm:px-4 max-sm:py-2">
      <nav className="flex flex-wrap justify-between items-center py-2 max-sm:flex-nowrap">
        {/* NAVBAR BRAND LOGO AND ADDRESS START */}
        <div className="flex gap-4 items-center ">
          <h1 className="text-3xl font-black">
            <Link to={"/home"}>Jhepto</Link>
          </h1>
          <div className="flex items-center font-medium gap-1 relative max-sm:hidden">
            <span className="text-red-700 text-xl">
              <FiMapPin />
            </span>
            <span>
              {location
                ? `${location?.county},${location?.state}`
                : "Add Adress"}
            </span>
            <span
              className="cursor-pointer"
              onClick={() => setOpenGetLocationModal(true)}
            >
              <FaCaretDown />
            </span>

            {/* location detect modal start */}
            {openGetLocationModal && (
              <div className="p-4 gap-4 absolute top-8 w-[220px] flex flex-col items-center -right-10 bg-white/80 shadow-lg z-40">
                <span className="flex flex-row-reverse gap-5 justify-between items-center">
                  <button
                    onClick={() =>
                      setOpenGetLocationModal(!openGetLocationModal)
                    }
                    className="w-fit text-xl bg-slate-200 rounded p-1 cursor-pointer"
                  >
                    <IoCloseSharp />
                  </button>
                  <p className="whitespace-nowrap">Change the location</p>
                </span>
                <button
                  onClick={() => fetchUserGeoLocation()}
                  className="bg-red-600 text-sm text-white px-4 py-1 rounded-md cursor-pointer"
                >
                  detect the location
                </button>
              </div>
            )}
            {/* location detect modal end */}
          </div>
        </div>
        {/* NAVBAR BRAND LOGO AND ADDRESS END */}

        {/* NAVBAR LINKS START HERE */}
        <div>
          <ul className="flex gap-4 items-center text-xl font-medium flex-wrap max-sm:flex-nowrap">
            {navMenusList.map((menu, i) => (
              <li key={i}>
                <NavLink
                  className={(e) =>
                    `${
                      e.isActive ? "underline decoration-red-600" : ""
                    } max-sm:hidden`
                  }
                  to={menu.link}
                >
                  {menu.title}
                </NavLink>
              </li>
            ))}
            <li>
              <Link to={"/cart"} className="relative">
                <i>
                  <FaCartShopping fontSize={24} />
                </i>
                <span className="bg-red-500  rounded-full w-5 h-5 flex justify-center items-center  absolute -top-2 -right-2 text-sm text-white">
                  {addToCartList.length}
                </span>
              </Link>
            </li>
            <li>
              {/* <Link
                className="bg-red-500 rounded-md text-white px-5 py-1 font-normal"
                to={"/"}
              >
                Sign in
              </Link> */}
              <SignedOut>
                <SignInButton className="bg-red-500 rounded-md text-white px-5 py-1 font-normal cursor-pointer text-[16px]" />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </li>
            <li className="sm:hidden">
              <button
                onClick={() => setOpenNavMenu(!openNavMenu)}
                className="mt-1"
              >
                <MdOutlineMenuOpen fontSize={28} />
              </button>
            </li>
          </ul>
        </div>
        {/* NAVBAR LINKS END HERE */}
      </nav>

      {/* LOCATION FOR MOBILE VIEW */}

      <div className="hidden justify-center items-center font-medium gap-1 relative max-sm:flex">
        <span className="text-red-700 text-xl">
          <FiMapPin />
        </span>
        <span>
          {location ? `${location?.county},${location?.state}` : "Add Adress"}
        </span>
        <span
          className="cursor-pointer"
          onClick={() => setOpenGetLocationModal(true)}
        >
          <FaCaretDown />
        </span>

        {/* location detect modal start */}
        {openGetLocationModal && (
          <div className="p-4 gap-4 absolute top-8 w-[220px] flex flex-col items-center -right-10 bg-white/80 shadow-lg z-40">
            <span className="flex flex-row-reverse gap-5 justify-between items-center">
              <button
                onClick={() => setOpenGetLocationModal(!openGetLocationModal)}
                className="w-fit text-xl bg-slate-200 rounded p-1 cursor-pointer"
              >
                <IoCloseSharp />
              </button>
              <p className="whitespace-nowrap">Change the location</p>
            </span>
            <button
              onClick={() => fetchUserGeoLocation()}
              className="bg-red-600 text-sm text-white px-4 py-1 rounded-md cursor-pointer"
            >
              detect the location
            </button>
          </div>
        )}
        {/* location detect modal end */}
      </div>

      <div
        className={` ${
          openNavMenu ? "left-0" : "left-[-100%]"
        } w-9/12 p-5 shadow-lg bg-white fixed top-0 z-100 h-screen transition-all duration-300 text-black`}
      >
        {/* close menu start */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setOpenNavMenu(false)}
            className="text-xl p-2 bg-slate-100 rounded"
          >
            <IoCloseSharp fontSize={24} />
          </button>
        </div>
        {/* close menu end*/}
        <div>
          {user ? (
            <div className=" flex gap-4 items-center">
              <div className="scale-125 mt-1.5 py-2">
                <UserButton />
              </div>
              <h1>
                {" "}
                <span className="font-medium">Hello,</span> <br />
                {user.fullName}{" "}
              </h1>
            </div>
          ) : (
            <div className=" p-3 flex gap-2 items-center">
              <FaUserCircle fontSize={35} />
              <h1>
                {" "}
                <span className="font-medium">Hello,</span> <br />
                Premium User
              </h1>
            </div>
          )}
        </div>
        <ul className="flex gap-4 items-start text-2xl font-medium flex-wrap flex-col my-3">
          {navMenusList.map((menu, i) => (
            <li key={i}>
              <NavLink
              onClick={() => setOpenNavMenu(false)}
                className={(e) =>
                  `${e.isActive ? "underline decoration-red-600" : ""}`
                }
                to={menu.link}
              >
                {menu.title}
              </NavLink>
            </li>
          ))}

          {
            !user &&           <li>
            <SignedOut>
              <SignInButton className="bg-red-500 rounded-md text-white px-5 py-1 font-normal cursor-pointer text-[16px]" />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </li>
          }
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
