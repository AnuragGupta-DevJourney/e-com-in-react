import React from "react";
import { FaLock, FaRegClock, FaRotateLeft, FaTruckFast } from "react-icons/fa6";

function ServicesSection() {
  const servicesResources = [
    {
      icon: <FaTruckFast />,
      title: "Free Shipping",
      description: "On orders over $100",
    },
    {
      icon: <FaLock />,
      title: "Secure Payment",
      description: "100% protected payments",
    },
    {
      icon: <FaRotateLeft />,
      title: "Easy Returns",
      description: "30-day return policy",
    },
    {
      icon: <FaRegClock />,
      title: "24/7 Support",
      description: "Dedicated customer service",
    },
  ];

  return (
    <div className="flex justify-center gap-4 flex-wrap">
      {servicesResources.map((service , i) => {
        const { icon, title, description } = service;

        return (
          <div key={i} className=" max-sm:grow mx-2 flex gap-4 items-center rounded-xl shadow bg-slate-100 py-3 px-4">
            <div>
              <i className="text-3xl text-gray-700">{icon}</i>
            </div>
            <div>
              <p className="font-medium"> {title} </p>
              <p className="font-light text-gray-700"> {description} </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ServicesSection;
