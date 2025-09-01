import React from "react";
import { useNavigate } from "react-router-dom";

function NoItemInCartEffect() {

    const navigate = useNavigate()

  return (
    <div className="py-16 flex items-center flex-col justify-center">
      <h1 className="text-4xl font-bold text-center">No Item in Cart</h1>
      <img src="/assets/empty-cart.png" alt="" className="w-3/12 mx-auto" />
      <button
      onClick={() => navigate("/products")}
      className="bg-red-600 cursor-pointer px-6 py-2 text-white rounded-md font-medium"
      >
        Continue Shopping
      </button>
    </div>
  );
}

export default NoItemInCartEffect;
