import React, { useContext } from "react";
import CreateContext from "../../context/CreateContext";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

function LandingCarousel() {
  const { allProductsData , uniqueCategories } = useContext(CreateContext);

  // for carousel
  const slicedProducts = allProductsData?.slice(0, 6);

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <Slider {...settings} className="container mx-auto">
        {slicedProducts?.map((product, i) => {
          const { image, title, description, category } = product;

          return (
            <div key={i}>
              <div className=" bg-gradient-to-r  from-[#0f0c29] via-[#410202] to-[#24243e]  -z-10  max-sm:h-full ">
                <div className="flex gap-8  items-center max-w-7xl mx-auto h-full p-12 max-sm:flex-col-reverse max-sm:p-4">
                  <div className="max-w-7/12 space-y-3.5 max-sm:max-w-full">
                    <h2 className="text-xl text-red-500">
                      Powering Your World with the Best in Electronics.
                    </h2>
                    <h3 className="text-3xl font-bold text-white uppercase line-clamp-3">
                      {title}
                    </h3>
                    <p className="text-slate-300 line-clamp-5">{description}</p>
                    <button className="bg-gradient-to-r px-4 py-1 rounde-md from-red-600  to-blue-600 rounded-md text-white cursor-pointer">
                      Shop Now
                    </button>
                  </div>
                  <div className="">
                    <img
                      src={image}
                      alt={title}
                      className="w-full rounded-full p-2 border-2 border-slate-200/80 shadow-lg shadow-red-400 bg-red-400/80"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
      <div className="flex bg-slate-900 justify-evenly items-center py-4 flex-wrap gap-2">
        {uniqueCategories?.map((category , i) => {
          return (
            <Link
              to={`/category/${category}`}
            key={i} className="bg-gradient-to-r px-4 py-1 rounde-md from-red-600  to-blue-600 rounded-md text-white cursor-pointer uppercase">
              {category}
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default LandingCarousel;
