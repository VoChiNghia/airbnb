import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../store/store";
import { deleteUser, getAllUsedApi } from "../../redux/userReducer";

import ModalAddUser from "../../component/adminComponent/ModalAddUser";
import { changeComponent, setIsOpen } from "../../redux/modalReducer";
import {BiUser} from 'react-icons/bi'
import {GoLocation} from 'react-icons/go'
import {GiBunkBeds} from 'react-icons/gi'
import TableUserAdmin from "../../component/adminComponent/TableUserAdmin";
import TableBookRoomAdmin from "../../component/adminComponent/TableBookRoomAdmin";
import TableLocationAdmin from "../../component/adminComponent/TableLocationAdmin";
import AddImageAdmin from "../../component/adminComponent/AddImageAdmin";

type Props = {};

const Admin = (props: Props) => {

  const {component} = useSelector((state:RootState) => state.tableModal)




  return (
    <div>
      <div className="overview">
        <h1>Overview</h1>

        <div className="overview__container">
          <div className="overview__container-item">
            <div className="overview__container-item-wrapper">
              <div className="icon-wrapper">
                <BiUser className="icon"/>
              </div>
              <div className="info">
                <p> accounters</p>
                <span>$30.000</span>
              </div>
            </div>
            <button>View All</button>
          </div>

          <div className="overview__container-item">
            <div className="overview__container-item-wrapper">
              <div className="icon-wrapper">
                <GoLocation className="icon"/>
              </div>
              <div className="info">
                <p> accounters</p>
                <span>$30.000</span>
              </div>
            </div>
            <button>View All</button>
          </div>

          <div className="overview__container-item">
            <div className="overview__container-item-wrapper">
              <div className="icon-wrapper">
                <GiBunkBeds className="icon"/>
              </div>
              <div className="info">
                <p> accounters</p>
                <span>$30.000</span>
              </div>
            </div>
            <button>View All</button>
          </div>



          <div className="overview__container-item">
            <div className="overview__container-item-wrapper">
              <div className="icon-wrapper">
                <GiBunkBeds className="icon"/>
              </div>
              <div className="info">
                <p> accounters</p>
                <span>$30.000</span>
              </div>
            </div>
            <button>View All</button>
          </div>
        </div>
      </div>

       {
       component
       }

      
      
    </div>
  );
};

export default Admin;
