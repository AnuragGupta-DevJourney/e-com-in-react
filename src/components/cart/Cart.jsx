import React, { useContext, useState } from "react";
import CreateContext from "../../context/CreateContext";
import { MdDeleteForever } from "react-icons/md";
import { FaMinus, FaPlus, FaTruck } from "react-icons/fa6";
import { CgNotes } from "react-icons/cg";
import { FaShoppingBag } from "react-icons/fa";
import { useUser } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import axios from "axios";
import NoItemInCartEffect from "../../utils/NoItemInCartEffect";

function Cart() {
  const { addToCartList, setAddToCartList, location, setLocation } =
    useContext(CreateContext);
  const { user } = useUser();

  // user addresss
  const [address, setAddress] = useState({
    fullname: user?.fullName || "",
    address: location?.suburb || "",
    state: location?.state || "",
    postCode: location?.postcode || "",
    country: location?.country || "",
    phoneNo: "",
  });

  const inputOnchange = (e) => {
    const { name, value } = e.target;
    setAddress({
      ...address,
      [name]: value,
    });
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
  };

  // FETCHING THE USER LOCATION
  const fetchUserGeoLocation = async () => {
    const timerId = toast.loading("detecting address...", {
      position: "bottom-right",
    });
    try {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { longitude, latitude } = position.coords;

        const location = await axios.get(
          `http://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );

        const userAddress = location.data.address;
        setLocation(userAddress);
        toast.success("fetched location successfully", {
          position: "bottom-right",
          id: timerId,
        });
      });
    } catch (error) {
      console.log("error", error);
      toast.error("failed to fetch address", {
        position: "bottom-right",
        id: timerId,
      });
    }
  };

  // handel increment of product in cart
  const handleIncrementProduct = (productId) => {
    const updatedCart = addToCartList.map((item) => {
      if (item.id === productId) {
        if (item.quantity > 0) {
          return { ...item, quantity: item.quantity + 1 };
        }
      }
      return item;
    });
    setAddToCartList(updatedCart);
  };

  // handle decrement of product in cart
  const handleDecrementProduct = (productId) => {
    const updatedCart = addToCartList.map((item) => {
      if (item.id === productId) {
        if (item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
      }
      toast.error("Qantity Cann't be Zero or Removed from cart")
      return item;
    });
    setAddToCartList(updatedCart);
  };

  const handleRemoveItemFromCart = (productId) => {
    const filteredCart = addToCartList.filter((item) => item.id !== productId);
    setAddToCartList(filteredCart);
  };

  if (addToCartList.length <= 0) {
    return <NoItemInCartEffect/>;
  }

  const totalPriceOfCartProduct = addToCartList.reduce((initial , item) => initial + (item.price * item.quantity) , 0)

  return (
    <div className="max-w-7xl p-8 mx-auto max-sm:p-3">
      {/* title */}
      <h1 className="text-2xl font-bold pb-4">
        My Cart({addToCartList.length})
      </h1>

      {/* add to cart product rendering */}
      <div className="flex flex-col gap-4">
        {addToCartList.map((item, i) => {
          const { title, price, image, quantity, id } = item;
          return (
            <div
              key={i}
              className="bg-slate-100 rounded-xl p-5 flex justify-between gap-4 items-center max-sm:p-2 
              flex-wrap
              "
            >
              {/* product details part */}
              <div className="max-w-5/12 flex  max-sm:max-w-full gap-2 justify-between">
                {/* left */}
                <div className="grow shrink-0">
                  <img
                    src={image}
                    alt={title}
                    className="w-28 h-24"
                    style={{ mixBlendMode: "darken" }}
                  />
                </div>
                {/* right */}
                <div>
                  <h2 className="line-clamp-2 font-semibold"> {title} </h2>
                  <p className="font-bold text-red-600">₹{price} </p>
                </div>
              </div>

              {/* product quantity */}
              <div className="bg-red-600 text-white flex items-center gap-4 rounded-md px-2">
                <button
                  onClick={() => handleDecrementProduct(id)}
                  className="cursor-pointer"
                >
                  <FaMinus />
                </button>
                <span className="text-xl font-bold text-black px-3 py-1 bg-white">
                  {quantity}
                </span>
                <button
                  onClick={() => handleIncrementProduct(id)}
                  className="cursor-pointer"
                >
                  <FaPlus />
                </button>
              </div>

              {/* product delete */}
              <div>
                <button
                  onClick={() => handleRemoveItemFromCart(id)}
                  className="text-red-600 cursor-pointer"
                >
                  <MdDeleteForever fontSize={32} />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* DELIVERY INFO AND BILLING DETAILS */}
      <div className="grid grid-cols-2 p-4 mt-4 gap-8 max-sm:grid-cols-1">

        {/* left section delevery info */}
        <div className="bg-slate-100 p-3 rounded">
          <h3 className="text-xl font-semibold py-2">Delivery Info</h3>
          <form onSubmit={handleAddressSubmit} className="space-y-2">
            <div className="flex flex-col">
              <label className="font-medium" htmlFor="fullname">
                Full Name:
              </label>
              <input
                type="text"
                name="fullname"
                placeholder="Enter Your Full Name"
                className=" rounded outline-none border border-slate-600/40 px-1 py-0.5 bg-slate-50"
                value={address.fullname || "user"}
                onChange={inputOnchange}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium" htmlFor="address">
                Address:
              </label>
              <input
                type="text"
                placeholder="Enter Your Address"
                name="address"
                className=" rounded outline-none border border-slate-600/40 px-1 py-0.5 bg-slate-50"
                value={address.address}
                onChange={inputOnchange}
              />
            </div>
            <div className="flex justify-between gap-6 flex-wrap">
              <div className="flex flex-col grow">
                <label className="font-medium" htmlFor="state">
                  State:
                </label>
                <input
                  type="text"
                  placeholder="Enter Your State"
                  name="state"
                  className=" rounded outline-none border border-slate-600/40 px-1 py-0.5 bg-slate-50"
                  value={address.state}
                  onChange={inputOnchange}
                />
              </div>
              <div className="flex flex-col grow">
                <label className="font-medium" htmlFor="postCode">
                  PostCode:
                </label>
                <input
                  type="text"
                  placeholder="Enter Your Post Code"
                  name="postCode"
                  className=" rounded outline-none border border-slate-600/40 px-1 py-0.5 bg-slate-50"
                  value={address.postCode}
                  onChange={inputOnchange}
                />
              </div>
            </div>
            <div className="flex justify-between gap-6 flex-wrap">
              <div className="flex flex-col grow">
                <label className="font-medium" htmlFor="country">
                  Country:
                </label>
                <input
                  type="text"
                  placeholder="Enter Your Country"
                  name="country"
                  className=" rounded outline-none border border-slate-600/40 px-1 py-0.5 bg-slate-50"
                  value={address.country}
                  onChange={inputOnchange}
                />
              </div>
              <div className="flex flex-col grow">
                <label className="font-medium" htmlFor="phoneNo">
                  Phone no.:
                </label>
                <input
                  type="text"
                  placeholder="Enter Your Number"
                  name="phoneNo"
                  className=" rounded outline-none border border-slate-600/40 px-1 py-0.5 bg-slate-50"
                  value={address.phoneNo}
                  onChange={inputOnchange}
                />
              </div>
            </div>
            <div>
              <button
                className="bg-red-600 text-white px-5 py-1.5 rounded-md my-3 cursor-pointer"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
          {/* breaker */}
          <div className="text-center">
            <span>-------</span>
            <span>OR</span>
            <span>-------</span>
          </div>
          {/* Detect Location */}
          <div className="flex justify-center">
            <button
              onClick={() => fetchUserGeoLocation()}
              className=" cursor-pointer bg-red-600 text-white px-5 py-1.5 rounded-md my-3"
            >
              Detect Location
            </button>
          </div>
        </div>

        {/* rigth section billing details */}
        <div className="p-6 rounded-md shadow-lg">
          {/* bill head */}
          <div>
            <h3 className="text-xl font-semibold py-2">Bill Details</h3>
            <div className="space-y-2 text-slate-700">
              {/* first item */}
              <div className="flex justify-between">
                <div className="flex items-center gap-1">
                  <span>
                    <CgNotes />
                  </span>
                  <span>Item Total</span>
                </div>
                <div>
                  <span>₹{totalPriceOfCartProduct} </span>
                </div>
              </div>
              <div>
                {/* second item */}
                <div className="flex justify-between">
                  <div className="flex items-center gap-1">
                    <span>
                      <FaTruck />
                    </span>
                    <span>Delvery Charge</span>
                  </div>
                  <div className="space-x-1.5">
                    <span className="line-through">₹50</span>
                    <span className="font-semibold uppercase text-red-600">
                      Free
                    </span>
                  </div>
                </div>
              </div>
              <div>
                {/* third item */}
                <div className="flex justify-between">
                  <div className="flex items-center gap-1">
                    <span>
                      <FaShoppingBag />
                    </span>
                    <span>Handling Charge</span>
                  </div>
                  <div className="space-x-1.5">
                    <span className="font-semibold text-red-600">₹50</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between border-t border-slate-400/70 pt-1 text-xl font-bold">
                <span> Grand Total </span>
                <span>₹1622</span>
              </div>
            </div>
          </div>

          {/* apply promo code */}

          <div className="mt-5 space-y-3">
            <h4 className="font-medium">Apply Promo Code</h4>
            <form action="">
              <div className="flex gap-2 justify-between">
                <input
                  className=" w-full rounded outline-none border border-slate-600/40 px-1 py-0.5"
                  type="text"
                  placeholder="Enter Code"
                />
                <button className="text-white bg-red-500 px-4 py-1 rounded-md">
                  Apply
                </button>
              </div>
              <button className="bg-red-600 px-4 py-1.5 text-white rounded-md w-full mt-3">
                Proceed to CheckOut
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Cart;
