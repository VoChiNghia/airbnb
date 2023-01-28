import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { USER_LOGIN, getStoreJson } from "../../util/config";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../store/store";
import { deleteBookRoom, getBookRoomByUserApi } from "../../redux/bookRoomReducer";

import { Room } from "../../types/roomReducerType";

import { format } from "date-fns";



import { TbToolsKitchen2, TbParking, TbPool } from "react-icons/tb";
import { MdOutlineBedroomParent, MdOutlineIron } from "react-icons/md";
import { TiVideoOutline } from "react-icons/ti";
import {MdArrowBack} from 'react-icons/md'
import { history } from "../../App";


type Props = {};

const Trip = (props: Props) => {
  const { trip } = useSelector((state: RootState) => state.bookRoomReducer);

  console.log(trip)
  
  const dispatch: DispatchType = useDispatch();
  const user = getStoreJson(USER_LOGIN);

  useEffect(() => {
    if (user) {
      dispatch(getBookRoomByUserApi(Number(user.id)));
    }
  }, []);

 const handleDelete = (id:number) => {
 
   dispatch(deleteBookRoom(id))
   dispatch(getBookRoomByUserApi(Number(user.id)));
 }

 const handleClick = (id:number) => {
    history.push(`/detail/${id}`);
 }

  return (
    <div className="trip container">
      <div className="trip__container">
        <div className="trip__container__back" onClick={() => history.go(-1)}>
          <button><MdArrowBack className="back-icon"/></button>
        </div>
        <h1>Chuyến đi</h1>

        <hr />
        {
            trip.length != 0 ? <div className="trip__container__wrapper">
            <div className="left">
              {trip?.map((item: Room, index: number) => (
                <div className="trip__item" key={index} >
                   
                  <img src={item.hinhAnh} alt="" onClick={() => handleClick(item.id)}/>
              
             
                  <div className="trip__item__info" onClick={() => handleClick(item.id)}>
                    <h3>{item.tenPhong}</h3>
                    <p>
                      {item.ngayDen && format(new Date(item.ngayDen), 'dd/MM/yyyy')} - {item.ngayDi && format(new Date(item.ngayDi), 'dd/MM/yyyy')}
                    </p>
                    <div>
                      <h3>Tiện ích</h3>
                      <div>
                        {item.bep && <TbToolsKitchen2 className="trip_icon" />}
                        {item.doXe && <TbParking className="trip_icon" />}
                        {item.hoBoi && <TbPool className="trip_icon" />}
                        {item.phongNgu && (
                          <MdOutlineBedroomParent className="trip_icon" />
                        )}
                        {item.banUi && <MdOutlineIron className="trip_icon" />}
                        {item.tivi && <TiVideoOutline className="trip_icon" />}
                      </div>
                    </div>

                  </div>
               
                    <button onClick={() => handleDelete(Number(item.roomId))}>Delete</button>
                </div>
              ))}
            </div>
            <div className="trip__info right">
              <h2>Chưa có chuyến đi nào được đặt... vẫn chưa!</h2>
              <p>
                Đã đến lúc phủi bụi hành lý và bắt đầu chuẩn bị cho chuyến phiêu
                lưu tiếp theo của bạn rồi
              </p>
              <NavLink to="/">
                <button>Bắt đầu tìm kiếm</button>
              </NavLink>
            </div>
          </div>
          : <div className="trip__info right">
          <h2>Chưa có chuyến đi nào được đặt... vẫn chưa!</h2>
          <p>
            Đã đến lúc phủi bụi hành lý và bắt đầu chuẩn bị cho chuyến phiêu
            lưu tiếp theo của bạn rồi
          </p>
          <NavLink to="/">
            <button>Bắt đầu tìm kiếm</button>
          </NavLink>
        </div>

        }
        <hr />



        <p>Bạn không tìm thấy đặt phòng/đặt chỗ của mình ở đây?</p>

        <hr />
      </div>
    </div>
  );
};

export default Trip;
