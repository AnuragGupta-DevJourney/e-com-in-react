import React, { useContext, useState } from "react";
import CreateContext from "../../context/CreateContext";
import { MdDoubleArrow } from "react-icons/md";

function LeftFilterSection({ setFilters, filters, setPage }) {
  const { uniqueCategories, uniqueBrands, allProductsData } =
    useContext(CreateContext);

  const [openFilterMenu, setOpenFilterMenu] = useState(false);

  const handlefilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setPage(1);
    setOpenFilterMenu(false);
  };

  const handleResetFilter = () => {
    setFilters({
      search: "",
      category: "all",
      brands: "all",
      priceRange: 1000,
    });
    setPage(1);
  };

  const highestPriceProduct = allProductsData.reduce((max, product) =>
    product.price > max.price ? product : max
  );
  const highestPrice = highestPriceProduct.price;
  const lowestPriceProduct = allProductsData.reduce((min, product) =>
    product.price < min.price ? product : min
  );
  const lowestPrice = lowestPriceProduct.price;

  return (
    <div
      className={`w-72 bg-slate-50 flex flex-col p-3 gap-4 shadow max-sm:fixed transition-all duration-300
      max-sm:h-screen max-sm:py-8
    ${
      openFilterMenu
        ? "left-0 relative shadow-2xl top-0 z-50 bg-bg-slate-50 bottom-0 "
        : "-left-72 bg-slate-50 z-50 top-0 "
    }
    `}
    >
      <div
        className="bg-red-600 absolute top-5/12 text-white rounded-md -right-8 py-4 sm:hidden"
        style={{ zIndex: "-888" }}
      >
        <button
          className="flex flex-col justify-center items-center gap-2"
          onClick={() => setOpenFilterMenu(!openFilterMenu)}
        >
          <MdDoubleArrow fontSize={24} />
          <p className="rotate-90 font-semibold">Filter</p>
        </button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search..."
          name="search"
          onChange={handlefilterChange}
          value={filters.search}
          className="px-2 py-1 text-xl border border-slate-400/60 rounded-xl outline-none "
        />
      </div>
      <div>
        <h4 className="text-xl font-semibold mb-2">Category</h4>
        <div className="flex items-center gap-2 pl-2">
          <input
            className="accent-red-600 scale-150"
            type="checkbox"
            name="category"
            value="all"
            onChange={handlefilterChange}
            checked={"all" == filters.category}
          />
          <span className="text-slate-800 uppercase">All </span>
        </div>
        {uniqueCategories?.map((category, i) => {
          return (
            <div key={i} className="flex items-center gap-2 pl-2">
              <input
                className="accent-red-600 scale-150"
                type="checkbox"
                name="category"
                value={category}
                onChange={handlefilterChange}
                checked={category == filters.category}
              />
              <span className="text-slate-800 uppercase"> {category} </span>
            </div>
          );
        })}
      </div>

      <div>
        <h4 className="text-xl font-semibold mb-2">Brands</h4>
        <div>
          <select
            onChange={handlefilterChange}
            className="w-full bg-white p-2"
            name="brands"
            value={filters.brands}
          >
            <option name="brands" value="all">
              all
            </option>
            {uniqueBrands?.map((brand, i) => {
              return (
                <option name="brands" key={i} value={brand}>
                  {brand}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <div>
        <h4 className="text-xl font-semibold mb-2">Price Range</h4>
        <span>
          Price Range : ₹{lowestPrice} - ₹{highestPrice}{" "}
        </span>
        <div>
          <input
            onChange={handlefilterChange}
            className="w-full text-red-600 accent-red-600"
            type="range"
            value={filters.priceRange}
            min={lowestPrice}
            max={highestPrice}
            name="priceRange"
          />
        </div>
      </div>

      <div>
        <button
          onClick={handleResetFilter}
          className="rounded-md px-5 py-1.5 text-white font-medium bg-red-600 w-full cursor-pointer"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}

export default LeftFilterSection;
