import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoaderEffectVideo from "../../utils/LoaderEffectVideo";
import { IoMdArrowRoundBack } from "react-icons/io";
import toast from "react-hot-toast";
import CreateContext from "../../context/CreateContext";

function CategoryComponent() {
  const params = useParams();
  const { categoryName } = params;

  const { addToCartList, setAddToCartList } = useContext(CreateContext);

  const navigate = useNavigate();

  const [categoryProduct, setCategoryProduct] = useState(null);
  const [loader, setLoader] = useState(true);

  const fetchCategoryProductDetails = async () => {
    try {
      setLoader(true);
      const response = await axios.get(
        `https://fakestoreapi.in/api/products/category?type=${categoryName}`
      );
      const categoryProducts = response.data.products;
      const modifiedCategoryProducts = categoryProducts.map((product) => ({...product,quantity:1}))
      setCategoryProduct(modifiedCategoryProducts);
      setLoader(false);
    } catch (error) {
      console.log(
        "Internal Server Error while fetching the category productd details",
        error
      );
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchCategoryProductDetails();
  }, [categoryName]);

  // HANDLE THE PRODUCT ADD TO CART FEATURE
  const handleAddToCartProduct = (product) => {
    const isProductAlreadyInCart = addToCartList?.some(
      (item) => item.id === product.id
    );
    if (isProductAlreadyInCart) {
      toast.error("Product Already in cart", {
        position: "bottom-right",
        duration: 1000,
      });
      setTimeout(() => {
        navigate("/cart");
      }, 1200);
    } else {
      setAddToCartList((prev) => [...prev, product]);
      toast.success("Product Add in Cart", { position: "bottom-right" });
    }
  };

  if (loader) {
    return <LoaderEffectVideo />;
  }

  return (
    <div className=" p-3 bg-slate-50 mx-auto ">
      <div className="sm:px-16 py-4">
        <button
          className="bg-black cursor-pointer text-white font-medium flex items-center gap-1 px-5 py-1.5 rounded-md"
          onClick={() => history.back()}
        >
          <IoMdArrowRoundBack />
          Back
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {categoryProduct?.map((product , i) => {
          const { title, image, price, id, discount } = product;
          return (
            <div key={i} className="flex sm:h-72 w-full max-w-7xl mx-auto bg-white shadow-lg p-3 rounded-md gap-4 max-sm:flex-wrap">
              {/* left section of product image */}
              <Link to={`/product/${id}`} className="min-w-4/12 h-full">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-contain rounded-lg cursor-pointer"
                />
              </Link>
              {/* right section of product details */}
              <div className="space-y-2">
                <h2 className="sm:text-xl font-bold">{title}</h2>
                <p className="flex items-start">
                  <span className="text-3xl font-semibold">₹{price} </span>
                  <span className="font-medium  text-xl">
                    ({discount}% off)
                  </span>
                </p>
                <div>
                  <p>
                    <span>FREE delivery</span>
                    <span className="font-medium"> Fri, 18 Apr</span>
                  </p>
                  <p>
                    <span>Or fastest delivery</span>
                    <span className="font-medium">Tomorrow, 17 Apr</span>
                  </p>
                </div>
                <button
                  onClick={() => handleAddToCartProduct(product)}
                  className="bg-red-600 text-white px-4 py-2 rounded-md font-medium cursor-pointer "
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryComponent;
