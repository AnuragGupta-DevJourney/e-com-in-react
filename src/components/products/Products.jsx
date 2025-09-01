import React, { useContext, useState } from "react";
import LeftFilterSection from "./LeftFilterSection";
import RightProductListingSection from "./RightProductListingSection";
import CreateContext from "../../context/CreateContext";
import LoaderEffectVideo from "../../utils/LoaderEffectVideo";

function Products() {
  const { allProductsData } = useContext(CreateContext);
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    brands: "all",
    priceRange: 1000,
  });

  const [page, setPage] = useState(1);

  if (allProductsData?.length <= 0 || allProductsData?.length === undefined) {
    return <LoaderEffectVideo />;
  }

  return (
    <div className="flex p-8 bg-slate-100 max-sm:flex-wrap max-sm:p-4">
      <LeftFilterSection
        setPage={setPage}
        filters={filters}
        setFilters={setFilters}
      />
      <RightProductListingSection
        filters={filters}
        page={page}
        setPage={setPage}
      />
    </div>
  );
}

export default Products;
