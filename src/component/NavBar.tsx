import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper";
import navBarData from "../util/dataNav";
import NavbarType from "../types/navType";
import { useDispatch } from "react-redux";
import { DispatchType } from "../store/store";
import { getRoomApi, loadingReducer } from "../redux/roomReducer";

type Props = {
  perView: number;
};

const NavBar = ({ perView }: Props) => {
  const dispatch: DispatchType = useDispatch();

  const getRoomFromApi = async () => {
    const action = getRoomApi();
    await dispatch(action);
    await dispatch(loadingReducer(false));
  };
  const handleClick = () => {
    getRoomFromApi();
  };
  return (
    <div className="navbar">
      <Swiper
        slidesPerView={perView}
        spaceBetween={0}
        centeredSlides={false}
        navigation
        modules={[Navigation]}
        className="mySwiper"
      >
        {navBarData.map((item: NavbarType, index: number) => (
          <SwiperSlide key={index} className="nav-wrapper">
            <div className="navbar-item" onClick={handleClick}>
              <img src={item.img} alt="" />
              <p>{item.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default NavBar;
