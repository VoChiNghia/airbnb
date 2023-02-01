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
import { USER_LOGIN, getStoreJson, saveStoreJson } from "../util/config";
import { SaveDataModal } from "../types/save";
import { changeComponent, setIsOpen } from "../redux/modalReducer";
import { DispatchType } from "../store/store";
import { useDispatch } from "react-redux";
import Save from "./Save";
import { UserModal } from "./adminComponent/ModalAddUser";
import Swal from "sweetalert2";

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
  const user:UserModal = getStoreJson(USER_LOGIN)
  const dispatch:DispatchType = useDispatch()
  const date = getRandomDate()
  const day = date.getDate() <= 0 ? 1 : date.getDate()
  const month = date.getMonth() <= 0 ? 2 : date.getMonth()

const cardImg:any = useRef(null)
const prev:any = useRef(null)
const next:any = useRef(null)
  let count = 1
  const handleClick = () => {

   if(user){
    dispatch(changeComponent(<Save maPhong={data.id} img={data.hinhAnh}/>))
    dispatch(setIsOpen(true))

const getSaveData:SaveDataModal[] = getStoreJson('saveData') ? getStoreJson('saveData') : []

getSaveData.forEach((saveData:SaveDataModal) =>{
  saveData.maPhong === data.id ?  setActiveHeart(true) : setActiveHeart(false)
})
   }else{
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Bạn chưa đăng nhập',
      showConfirmButton: false,
      timer: 1500
    })
   }


  }
 
  useEffect(() =>{
    const save = getStoreJson('saveData') ? getStoreJson('saveData') : []

    save.forEach((saveData:SaveDataModal) =>{
        saveData.maPhong === data.id ?  setActiveHeart(true) : setActiveHeart(false)
    })
  },[])
   

  
 
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
        <SwiperSlide><img src={data?.hinhAnh} alt="" width="100%"/></SwiperSlide>
        <SwiperSlide><img src={data?.hinhAnh} alt="" width="100%"/></SwiperSlide>
        <SwiperSlide><img src={data?.hinhAnh} alt="" width="100%"/></SwiperSlide>
        <SwiperSlide><img src={data?.hinhAnh} alt="" width="100%"/></SwiperSlide>
        
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
          activeHeart ? <AiFillHeart className="heart-icon-fill"/> 
          : <svg
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="presentation"
          focusable="false"
         className="heart-icon-outline"
        >
          <path
            d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"
          ></path>
        </svg>
        }
          
          
      </div>
    </div>
  );
};

export default Cart;
