import React from "react";
import "./parellex.css";

function ParellexEffect() {
  return (
    <div className="p-16 max-sm:p-2">
      <div className="parellex-effect-conatiner rounded-2xl overflow-hidden">
        <div className="flex flex-col justify-center gap-8 items-center bg-black/50 w-full h-full max-sm:text-center">
          <h3 className="text-4xl font-bold text-white max-sm:text-3xl">
            Next-Gen Electronics at Your Fingertips
          </h3>
          <p className="text-xl font-medium text-white">
            Discover the latest tech innovations with unbeatable prices and free
            shipping on all orders.
          </p>
          <button className="px-6 cursor-pointer py-2 text-xl bg-red-600 rounded-md font-semibold text-white">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ParellexEffect;
