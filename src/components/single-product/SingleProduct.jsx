import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoaderEffectVideo from "../../utils/LoaderEffectVideo";
import { FaCartArrowDown, FaMinus, FaPlus } from "react-icons/fa6";
import CreateContext from "../../context/CreateContext";
import toast from "react-hot-toast";

function SingleProduct() {
  const { id: productId } = useParams();
  const { addToCartList, setAddToCartList } = useContext(CreateContext);
  const [singleProductDetails, setSingleProductDetails] = useState(null);
  const [Loader, setLoader] = useState(true);
  const navigate = useNavigate();

  // fetch the single product details using product id
  const fetchSingleProductDetails = async () => {
    try {
      setLoader(true);
      const response = await axios.get(
        `https://fakestoreapi.in/api/products/${productId}`
      );
      const productDet = response.data.product;
      const modifiedProductDet = { ...productDet, quantity: 1 }; //since their is no quantity field in product that is why i m using this
      setSingleProductDetails(modifiedProductDet);
      setLoader(false);
    } catch (error) {
      console.log(
        "Internal Server Error While fetching single product details ",
        error
      );
    } finally {
      setLoader(false);
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
      toast.error("Qantity Cann't be Zero or Removed from cart");
      return item;
    });
    setAddToCartList(updatedCart);
  };

  useEffect(() => {
    fetchSingleProductDetails();
  }, [productId]);

  if (Loader) {
    return <LoaderEffectVideo />;
  }

  // HANDLE THE PRODUCT ADD TO CART FEATURE
  const handleAddToCartProduct = (product) => {
    const isProductAlreadyInCart = addToCartList?.some(
      (item) => item.id === product.id
    );
    if (isProductAlreadyInCart) {
      toast.error("Product Already in cart", {
        position: "top-right",
        duration: 1000,
      });
      setTimeout(() => {
        navigate("/cart");
      }, 1200);
    } else {
      setAddToCartList((prev) => [...prev, product]);
      toast.success("Product Add in Cart", { position: "top-right" });
    }
  };

  const {
    id,
    title,
    description,
    image,
    discount,
    price,
    brand,
    category,
    model,
    quantity,
  } = singleProductDetails;

  const originalPrice = Math.round((discount * price) / 100 + price);

  return (
    <>
      {/* header link */}
      <h1 className="line-clamp-1 my-4 px-4 max-w-7xl text-xl text-left font-medium text-slate-600">
        <Link to={"/"}>Home</Link> / <Link to={"/products"}>Products</Link> /
        {title}
      </h1>

      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-2 gap-6 mt-8 max-sm:grid-cols-1">
          {/* LEFT SECTION */}
          <div>
            <img src={image} alt={title} className="w-full h-full" />
          </div>

          {/* RIGHT SECTION */}
          <div className="space-y-5">
            <h2 className="text-2xl font-semibold"> {title} </h2>
            <p className=" uppercase">
              {brand}/{category}/{model}
            </p>
            <p className="text-xl font-bold space-x-2">
              <span className="text-red-600 ">₹{price}</span>
              <span className="line-through">₹{originalPrice || price}</span>
              <span className="bg-red-600 text-white px-4 py-1 rounded-md">
                {discount || 0}% discount{" "}
              </span>
            </p>
            <p className=" text-slate-700 font-light">{description}</p>
            {/* product quantity  start */}
            {/* <div className="space-x-2.5 w-fit">
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
            </div> */}
            {/* product quantity  end*/}
            <button
              onClick={() => handleAddToCartProduct(singleProductDetails)}
              className="flex gap-1 items-center bg-red-600 text-white font-medium px-6 py-2.5 text-xl rounded-lg cursor-pointer"
            >
              <span>
                <FaCartArrowDown />
              </span>
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleProduct;
