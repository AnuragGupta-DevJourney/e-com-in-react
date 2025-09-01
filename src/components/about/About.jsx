import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="bg-slate-100 p-8 max-sm:p-4">
      <div className=" rounded-2xl bg-white p-8 max-w-5xl mx-auto max-sm:p-4">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-center font-bold text-4xl">About Jhepto</h1>
          <p className="text-slate-700 text-xl">
            Welcome to <span className="text-red-600 font-medium">Jhepto</span>, your one-stop destination for the
            latest and greatest in electronics. From cutting-edge gadgets to
            must-have accessories, we’re here to power up your tech life with
            premium products and unbeatable service.
          </p>
        </div>

        {/* Our mission */}
        <div className="space-y-4 mt-5">
          <h2 className=" text-red-600 font-semibold text-2xl">Our Mission</h2>
          <p className="text-slate-700 text-xl">
            At <span className="text-red-600 font-medium">Jhepto</span>, our mission is to make innovative technology accessible
            to everyone. We’re passionate about connecting people with the tools
            and tech they need to thrive in a digital world — all at competitive
            prices and delivered with speed and care.
          </p>
        </div>

        {/* Why Choose Jhepto? */}
        <div className="space-y-4 mt-5">
          <h2 className=" text-red-600 font-semibold text-2xl">
            Why Choose Jhepto?
          </h2>
          <ul className="space-y-1 ml-8">
            <li className="text-slate-700 text-[18px] list-disc">
              Top-quality electronic products from trusted brands
            </li>
            <li className="text-slate-700 text-[18px] list-disc">
              Lightning-fast and secure shipping
            </li>
            <li className="text-slate-700 text-[18px] list-disc">
              Reliable customer support, always ready to help
            </li>
            <li className="text-slate-700 text-[18px] list-disc">
              Easy returns and hassle-free shopping experience
            </li>
          </ul>
        </div>

        {/* Our Vision */}
        <div className="space-y-4 mt-5">
          <h2 className=" text-red-600 font-semibold text-2xl">Our Vision</h2>
          <p className="text-slate-700 text-[18px]">
            We envision a future where technology elevates everyday life. At
            Jhepto, we’re committed to staying ahead of the curve, offering
            cutting-edge solutions that are both practical and affordable.
          </p>
        </div>

        {/* Join the Jhepto Family */}
        <div className="space-y-4 mt-5 flex flex-col items-center text-center">
          <h2 className=" text-red-600 font-semibold text-2xl">
            Join the Jhepto Family
          </h2>
          <p className="text-slate-700 text-[18px] ">
            Whether you’re a tech enthusiast, a professional, or just looking
            for something cool and functional — Jhepto has something for
            everyone.
          </p>
          <Link
            to={"/products"} 
          className="px-5 py-2 text-white rounded-md bg-red-600">
            Start Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
