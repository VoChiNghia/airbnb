import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../component/Header";
import Footer from "../component/Footer";

const Usertemplate = () => {
  return (
    <>
      <div className="home-template">
        <Header />

        <main>{<Outlet />}</main>
      </div>
      <Footer />
    </>
  );
};

export default Usertemplate;
