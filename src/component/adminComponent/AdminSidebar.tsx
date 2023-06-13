import React, { useEffect } from "react";
import { changeTable } from "../../redux/tableModal";
import { useDispatch } from "react-redux";
import { DispatchType } from "../../store/store";
import TableUserAdmin from "./TableUserAdmin";
import TableLocationAdmin from "./TableLocationAdmin";
import TableBookRoomAdmin from "./TableBookRoomAdmin";

const AdminSidebar = () => {
  const dispatch: DispatchType = useDispatch();
  const handleClick = (e: any, type: string) => {
    document.querySelectorAll("li").forEach((item) => {
      item.classList.remove("active");
    });
    e.target.classList.add("active");

    if (type === "user") {
      dispatch(changeTable(<TableUserAdmin />));
    }
    if (type === "location") {
      dispatch(changeTable(<TableLocationAdmin />));
    }
    if (type === "bookRoom") {
      dispatch(changeTable(<TableBookRoomAdmin />));
    }
  };

  useEffect(() => {
    dispatch(changeTable(<TableUserAdmin />));
  }, []);
  return (
    <div className="admin-sidebar">
      <div>
        <img src="./image/Airbnb_Logo.jpg" alt="" />
      </div>
      <div>
        <ul className="menu-list">
          <li className="active" onClick={(e) => handleClick(e, "user")}>
            Quản lý người dùng
          </li>
          <li onClick={(e) => handleClick(e, "location")}>
            Quản lý thông tin vị trí
          </li>

          <li onClick={(e) => handleClick(e, "bookRoom")}>Quản lý đặt phòng</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
