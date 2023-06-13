import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../component/Header";

import Footer from "../component/Footer";
import HeaderMobileComponent from "../component/HeaderMobileComponent";
import Responesive from "../HOC/Responesive";

type Props = {};

const HomeTemplate = (props: Props) => {
  return (
    <>
      <div className="home-template">
        <Responesive
          component={Header}
          mobileComponent={HeaderMobileComponent}
        />
        <main>{<Outlet />}</main>
      </div>
      <Footer />
    </>
  );
};

export default HomeTemplate;
