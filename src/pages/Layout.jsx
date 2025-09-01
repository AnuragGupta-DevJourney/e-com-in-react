import React from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { Outlet } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";

function Layout() {
  return (
    <>
      <Navbar />
      <ScrollToTop smooth color="white" style={{
        backgroundColor : "red",
        fontWeight : "900",
        display : "flex",
        justifyContent : "center",
        padding : "4px",
        alignItems :"center",
        height : "50px"
      }} />
      <main className="container px-0 mx-auto max-sm:px-0">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
