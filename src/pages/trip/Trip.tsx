import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { USER_LOGIN, getStoreJson } from "../../util/config";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../store/store";
import { getBookRoomByUserApi } from "../../redux/bookRoomReducer";

import { Room } from "../../types/roomReducerType";

import { format } from "date-fns";



import { TbToolsKitchen2, TbParking, TbPool } from "react-icons/tb";
import { MdOutlineBedroomParent, MdOutlineIron } from "react-icons/md";
import { TiVideoOutline } from "react-icons/ti";


type Props = {};

const Trip = (props: Props) => {
  const { trip } = useSelector((state: RootState) => state.bookRoomReducer);
  
  const dispatch: DispatchType = useDispatch();
  const user = getStoreJson(USER_LOGIN);

  useEffect(() => {
    if (user) {
      dispatch(getBookRoomByUserApi(Number(user.id)));
    }
  }, []);

 

  return (
    <div className="trip container">
      <div className="trip__container">
        <h1>Chuyến đi</h1>

        <hr />
        {
            trip.length != 0 ? <div className="trip__container__wrapper">
            <div className="left">
              {trip?.map((item: Room, index: number) => (
               <NavLink to={`/detail/${item.id}`} key={index}>
                 <div className="trip__item" >
                  <img src={item.hinhAnh} alt="" />
                  <div className="trip__item__info">
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
                </div>
               </NavLink>
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
