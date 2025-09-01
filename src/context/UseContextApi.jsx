import React, { useEffect, useState } from "react";
import CreateContext from "./CreateContext";
import axios from "axios";

function UseContextApi({ children }) {
  const [allProductsData, setAllProductsData] = useState(null);
  const [addToCartList, setAddToCartList] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [location, setLocation] = useState(null);

  // Fetching all product details
  const fetchAllProductsData = async () => {
    try {
      const response = await axios.get(
        "https://fakestoreapi.in/api/products?limit=150"
      );
      const products = response.data.products;
      // since in product their is not quantity field so i m adding manually ok
      const modifiedProducts = products?.map((product) => ({
        ...product,
        quantity: 1,
      }));
      setAllProductsData(modifiedProducts);
    } catch (error) {
      console.log("Internal Server Error While fetching the data", error);
    }
  };

  // for category list
  const categoryList = allProductsData?.map((product) => {
    const categories = product.category;
    return categories;
  });
  // but we need unique categories so i am using Set()
  const uniqueCategories = [...new Set(categoryList)];

  // for brand list
  const brandsList = allProductsData?.map((product) => {
    const brands = product.brand;
    return brands;
  });
  const uniqueBrands = [...new Set(brandsList)];

  useEffect(() => {
    fetchAllProductsData();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const localStorageCart = localStorage.getItem("cart");
    if (localStorageCart) {
      setAddToCartList(JSON.parse(localStorageCart));
    } else {
      setAddToCartList([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(addToCartList));
  }, [addToCartList]);

  return (
    <CreateContext.Provider
      value={{
        allProductsData,
        uniqueCategories,
        uniqueBrands,
        addToCartList,
        setAddToCartList,
        location,
        setLocation,
      }}
    >
      {children}
    </CreateContext.Provider>
  );
}

export default UseContextApi;
