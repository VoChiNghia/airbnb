import React, { useEffect } from "react";
import {
  unstable_HistoryRouter as HistoryRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomeTemplate from "./template/HomeTemplate";
import Home from "./pages/home/Home";
import "./style/index.scss";


import { createBrowserHistory } from "@remix-run/router";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Map2 from "./pages/map/Map";
import Usertemplate from "./template/UserTemplate";
import Detail from "./pages/detail/Detail";
import LoginModal from "./pages/login/LoginModal";
import Search from "./pages/search/Search";
import User from "./pages/user/User";
import { USER_LOGIN, getStore, getStoreJson, saveStore } from "./util/config";
import {
  User as UserDetail,
  UserLogin,
  User as UserType,
} from "./types/authType";
import Admin from "./pages/admin/Admin";
import AdminTemPlate from "./template/AdminTemPlate";

import { I18nextProvider } from "react-i18next";
import i18n from "./language/i18n";
import ModalHoc from "./HOC/ModalHoc";

import Trip from "./pages/trip/Trip";


export const history = createBrowserHistory({ v5Compat: true });

type Props = {};

const App = (props: Props) => {
  const user: UserDetail = getStoreJson(USER_LOGIN);
 
  
  useEffect(() => {
    if (user?.role === "ADMIN") {
      history.push("/admin");
    }
  
  }, []);
  
  return (
    <>
      <I18nextProvider i18n={i18n}>
        <SkeletonTheme baseColor="#e6e6e6" highlightColor="#f5f2f2">
          <HistoryRouter history={history}>
            <Routes>
              <Route path="" element={<HomeTemplate />}>
                <Route index element={<Home />} />
                <Route path="map" element={<Map2 />} />
                <Route path="search">
                  <Route path=":id" element={<Search />} />
                </Route>

                <Route path="detail">
                  <Route path=":id" element={<Detail />} />
                </Route>
              </Route>

              <Route path="/" element={<Usertemplate />}>
                <Route path="user">
                  <Route path=":id" element={user ? <User /> : <Home />} />
                </Route>
                <Route path="trip/:id" element={<Trip />} />
              </Route>

              <Route path="/admin" element={<AdminTemPlate />}>
                <Route
                  index
                  element={
                    user?.role === "ADMIN" ? (
                      <Admin />
                    ) : (
                      <Navigate to="/" replace={true} />
                    )
                  }
                />
              </Route>

              <Route path="admin" element={<Admin />} />
              <Route path="login" element={<LoginModal />} />
            </Routes>
          </HistoryRouter>
        </SkeletonTheme>
      </I18nextProvider>
      <ModalHoc />
    </>
  );
};

export default App;
