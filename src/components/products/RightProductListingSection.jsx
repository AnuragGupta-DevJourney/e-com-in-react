import React, { useContext, useState } from "react";
import CreateContext from "../../context/CreateContext";
import { FaCartArrowDown } from "react-icons/fa";
import Lottie from "lottie-react";
import Pagination from "../../utils/Pagination";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function RightProductListingSection({ filters, page, setPage }) {
  const { brands, category, search, priceRange } = filters;

  const { allProductsData, addToCartList, setAddToCartList } =
    useContext(CreateContext);

  // HANDLE THE PRODUCT ADD TO CART FEATURE
  const navigate = useNavigate();
  const handleAddToCartProduct = (product) => {
    const isProductAlreadyInCart = addToCartList.some(
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
      toast.success("Product Add in Cart", {
        position: "bottom-right",
        duration: 1000,
      });
    }
  };

  // filtered products here
  const filteredProduct = allProductsData?.filter((product) => {
    const { title } = product;

    return (
      title.toLowerCase().includes(search.toLowerCase()) &&
      (category == "all" ||
        product.category.toLowerCase().includes(category.toLowerCase())) &&
      (brands == "all" ||
        product.brand.toLowerCase().includes(brands.toLowerCase())) &&
      product.price <= Number(priceRange)
    );
  });

  // sliced product for pagination
  const productsPerPage = 8;
  const lastPage = Math.ceil(filteredProduct?.length / productsPerPage); //total page or last page
  const start = page * productsPerPage - productsPerPage;
  const end = page * productsPerPage;
  const slicedFilterProduct = filteredProduct?.slice(start, end);

  // handle pagination page
  const handlePaginationPage = (pageNumber) => {
    setPage(pageNumber);
    window.scrollTo(0, 0);
  };

  if (filteredProduct?.length <= 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full">
        <h1 className="text-4xl font-bold -mb-20 text-shadow-red-600/20 text-shadow-sm">
          Product Not found
        </h1>
        <img
          className="100%"
          src="/assets/data-not-found.gif"
          alt="data not found image"
          style={{ mixBlendMode: "darken" }}
        />
      </div>
    );
  }

  return (
    <div>
      {/* PRODUCT CARDS */}
      <div
        className="flex flex-wrap justify-evenly gap-5
      max-sm:grid max-sm:grid-cols-2 max-sm:gap-2
      "
      >
        {slicedFilterProduct?.map((product, i) => {
          const { title, image, price } = product;

          return (
            <div
              key={i}
              className="sm:w-64 py-4  px-2 rounded-md shadow space-y-2.5 hover:scale-105 transition-all duration-300 hover:shadow-lg overflow-hidden bg-slate-50"
            >
              <Link to={`/product/${product.id}`}>
                <div className="border border-red-300 overflow-hidden rounded-md h-64">
                  <img
                    style={{ mixBlendMode: "darken" }}
                    className=" hover:scale-110 duration-300 transition-all overflow-hidden max-sm:h-44 mx-auto"
                    src={
                      image ||
                      "https://images-cdn.ubuy.co.in/64ee22ba19b93a1a9d77224e-dummy-premium-display-model-phone-for.jpg"
                    }
                    alt={title}
                    onError={(e) => {
                      e.target.onerror = null; // Infinite loop prevent
                      e.target.src =
                        "https://images-cdn.ubuy.co.in/64ee22ba19b93a1a9d77224e-dummy-premium-display-model-phone-for.jpg";
                    }}
                  />
                </div>
              </Link>
              <h4 className="text-xl line-clamp-2 font-semibold">{title}</h4>
              <p className="font-bold text-xl">₹{price} </p>
              <button
                onClick={() => handleAddToCartProduct(product)}
                className="flex gap-1 items-center bg-red-600 text-white font-medium px-6 py-1.5 rounded-lg w-fit mx-auto cursor-pointer
                max-sm:text-sm
                "
              >
                <span>
                  <FaCartArrowDown />
                </span>
                <span>Add to Cart</span>
              </button>
            </div>
          );
        })}
      </div>
      {/* PAGINATION COMPONENTS */}
      <Pagination
        page={page}
        lastPage={lastPage}
        handlePaginationPage={handlePaginationPage}
      />
    </div>
  );
}

export default RightProductListingSection;
