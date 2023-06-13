import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../component/Footer";

const MobileDetailTemplate = () => {
  return (
    <>
      <div className="mobile-detail-template">
        <main>{<Outlet />}</main>
      </div>
      <Footer />
    </>
  );
};

export default MobileDetailTemplate;
