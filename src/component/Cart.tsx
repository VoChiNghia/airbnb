import React, { useEffect, useRef, useState } from "react";
import { Room } from "../types/roomReducerType";
import {AiFillStar} from 'react-icons/ai'
import separator from "../util/addComa";
import getRandomDate from "../util/generate";
import {AiOutlineHeart,AiFillHeart} from 'react-icons/ai'

import { NavLink } from "react-router-dom";
// Import Swiper styles
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination,Navigation } from "swiper";

type Props = {
  data:Room
};

interface Element {
  style: CSSStyleDeclaration
}

const Cart = ({data}: Props) => {

  const [activeHeart,setActiveHeart] = useState<boolean>(false)
  let ranNum = Math.random()*5;
  if(ranNum <= 3){
    ranNum += 2
  }


  const date = getRandomDate()
  const day = date.getDate() <= 0 ? 1 : date.getDate()
  const month = date.getMonth() <= 0 ? 2 : date.getMonth()
  var slideCount = document.querySelectorAll('.card-img img').length
const cardImg:any = useRef(null)
const prev:any = useRef(null)
const next:any = useRef(null)
  let count = 1
  const handleClick = () => {
    setActiveHeart(!activeHeart)
  }
 

   

  
 
  return (
    <div className="card">
       <NavLink to={`/detail/${data.id}`}>
       <div className="card-img">
       <Swiper
       navigation={true}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination,Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><img src={data.hinhAnh} alt="" width="100%"/></SwiperSlide>
        <SwiperSlide><img src={data.hinhAnh} alt="" width="100%"/></SwiperSlide>
        <SwiperSlide><img src={data.hinhAnh} alt="" width="100%"/></SwiperSlide>
        <SwiperSlide><img src={data.hinhAnh} alt="" width="100%"/></SwiperSlide>
        
      </Swiper>
     
      
       </div>
    
      <div className="card__info">
        <p className="name">{data.tenPhong.length > 32 ? data.tenPhong.slice(0,33): data.tenPhong}</p>
        <p className='star'><span><AiFillStar className=""/></span> {ranNum.toFixed(1)}</p>
      </div>

      <p className="description">{data.moTa.length > 35 ? data.moTa.slice(0,35) + '...': data.moTa}</p>
      <p className="date">{`Ngày ${day} - Ngày ${day} tháng ${month}`}</p>
      <p className="price">${separator(Number(data.giaTien * 15))} đêm</p>
      
       </NavLink>
       <div className="heart" onClick={handleClick}>
        {
          activeHeart ? <AiFillHeart className="heart-icon-fill"/> :  <AiOutlineHeart className="heart-icon-outline"/>
        }
          
         
      </div>
    </div>
  );
};

export default Cart;
