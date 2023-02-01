import React, { useEffect, useRef, useState } from "react";
import { BiSearch, BiMenu } from "react-icons/bi";
import { RiGlobalLine } from "react-icons/ri";
import { HiUserCircle, HiSearch } from "react-icons/hi";
import {MdLocationPin} from "react-icons/md"
import { useOnClickOutside } from 'usehooks-ts'
import NavBar from "./NavBar";
import { NavLink, useParams } from "react-router-dom";
import {
  ACCESS_TOKEN,
  USER_LOGIN,
  getStoreJson,
  removeStore,
} from "../util/config";
import { DateRangePicker } from "react-date-range";
import { CustommerType, SelectionDate } from "../types/detailType";
import { format, compareAsc } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../store/store";
import { getLocationAddressApi, getLocationApi } from "../redux/location";
import {removeVietnameseTones} from "../util/convertViet";
import { history } from "../App";
import RegisterModal from "../pages/register/RegisterModal";
import { changeComponent, setIsOpen } from "../redux/modalReducer";
import LoginModal from "../pages/login/LoginModal";
import { getRoomByLocationApi } from "../redux/roomReducer";
import { getBookRoomByUserApi } from "../redux/bookRoomReducer";
import { useTranslation } from 'react-i18next';
import Language from "./Language";
const Logo = require("../assest/image/Airbnb_Logo.jpg")
type Props = {};

const Header = (props: Props) => {

  const { t } = useTranslation()
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [customers, setCustomers] = useState<CustommerType>({
    adult: 1,
    children: 1,
    baby: 1,
  });

  const [locationInput,setLocationInput] = useState<string>('')
  const [locationId,setLocationId] = useState<number>(1)
  const {address} = useSelector((state:RootState) => state.locationReducer)
  const dispatch:DispatchType = useDispatch()


  const selectionRange: SelectionDate = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const startDateFormat = format(startDate, "dd/MM/yyyy");
  const endDateFormat = format(endDate, "dd/MM/yyyy");
  const itemCenterRef = useRef(null);

  const wrapperRef = useRef(null);
  const submenuRef = useRef(null);
  const checkoutRef = useRef(null);
  const user = getStoreJson(USER_LOGIN);


  useEffect(()=>{
    const getAllLocation = () =>{
      const action = getLocationAddressApi()
      dispatch(action)
  }
    getAllLocation()
  },[])
 
  const arrFilter = address?.filter((location) => {
    const vt = removeVietnameseTones(location.tenViTri.toLocaleLowerCase())
    const province = removeVietnameseTones(location.tinhThanh.toLocaleLowerCase())
   return  vt.includes(removeVietnameseTones(locationInput.toLocaleLowerCase())) ||
   province.includes(removeVietnameseTones(locationInput.toLocaleLowerCase()))
  })
  

  const handleClickOutside = () => {
    if (itemCenterRef.current) {
        (itemCenterRef.current as HTMLElement).classList.remove("active");
      }

      (document.querySelector(".submenu-user") as HTMLElement).classList.remove(
        "active"
      );
    
  }

  useOnClickOutside(wrapperRef, handleClickOutside)
  const handleSelect = (date: any) => {
    setStartDate(date.selection.startDate); // native Date object
    setEndDate(date.selection.endDate); // native Date object
  };

  const handleDislayLanguage = () => {
    dispatch(changeComponent(<Language/>))
    dispatch(setIsOpen(true))
  }
  const handleClick = () => {
    (document.querySelector(".submenu-user") as HTMLElement).classList.toggle(
      "active"
    );
  };
 
  const handleClickItemCenter = () => {
    if (itemCenterRef.current !== null) {
      if ((itemCenterRef.current as HTMLElement).classList.contains("active")) {
        (itemCenterRef.current as HTMLElement).classList.remove("active");

       
      } else (itemCenterRef.current as HTMLElement).classList.add("active");

     
    }
  };

  const handleClickItemSearch = (value:string,id:number) =>{
      setLocationInput(value)
      setLocationId(id)
  }

  const handleClickClose = () => {
    (document.querySelector(".header__container-second-wrapper-bottom-item.close") as HTMLElement).classList.remove("active");
  };

  const handleClickSubmit = () => {
    if (itemCenterRef.current) {

        (itemCenterRef.current as HTMLElement).classList.remove("active");
    }
    dispatch(getRoomByLocationApi(locationId))
  }

  const handleClickItem = () => {
    document
      .querySelectorAll(".header__container-second-wrapper-bottom-item")
      .forEach((element) => {
        element.addEventListener("click", () => {
          document
            .querySelector(
              ".header__container-second-wrapper-bottom-item.active"
            )
            ?.classList.remove("active");
          document.querySelector(".wraper")?.classList.add("active");
          element.classList.add("active");
        });
      });
  };

  const setCustomerPlus = (type: string) => {
    if (type === "adult") {
      setCustomers({ ...customers, adult: (customers.adult += 1) });
    }
    if (type === "children") {
      setCustomers({ ...customers, children: (customers.children += 1) });
    }
    if (type === "baby") {
      setCustomers({ ...customers, baby: (customers.baby += 1) });
    }
  };
  const setCustomerMinus = (type: string) => {
    if (type === "adult") {
      setCustomers({ ...customers, adult: (customers.adult -= 1) });
    }
    if (type === "children") {
      setCustomers({ ...customers, children: (customers.children -= 1) });
    }
    if (type === "baby") {
      setCustomers({ ...customers, baby: (customers.baby -= 1) });
    }
  };

  const handleChangeComponent = (value:string) => {
      if(value === "register"){
        dispatch(changeComponent(<RegisterModal/>))
        dispatch(setIsOpen(true))
      }else{
        dispatch(changeComponent(<LoginModal/>))
        dispatch(setIsOpen(true))
      }
    
  }

  const handleLocationZone = (address:string) => {
      setLocationInput(address)
  }

  const logout = () => {
    removeStore(USER_LOGIN);
    removeStore(ACCESS_TOKEN);
    history.push('/')
    window.location.reload();
  };

  return (
    <div ref={wrapperRef} className="header fixed">
      <div className="header__container">
        <div className="header__container-left">
         <NavLink to='/'>
         <img src={Logo} width={100} alt="" />
         </NavLink>
        </div>
        <div
          className="header__container-center"
          onClick={handleClickItemCenter}
        >
          <div className="header__container-center-wrapper">
            <div>
              <p>{t('content.anywhere')}</p>
            </div>
            <span className="line"></span>
            <div>
              <p>{t('content.anyweek')}</p>
            </div>
            <span className="line"></span>
            <div>
              <p>{t('content.addguests')}</p>
              <BiSearch className="search-icon" />
            </div>
          </div>
          <div
            className="header__container-second-wrapper"
            ref={itemCenterRef}
            onClick={handleClickItemCenter}
          >
            <div className="header__container-second-wrapper-top">
              <p>{t('content.stay')}</p>
              <p>{t('content.experience')}</p>
              <p>{t('content.onlineExperiences')}</p>
            </div>
            <div className="header__container-second-wrapper-bottom">
              <div className="wraper">
                <div
                  className="header__container-second-wrapper-bottom-item"
                  onClick={handleClickItem}
                >
                  <p>địa điểm</p>
                  <input defaultValue={locationInput} type="text" placeholder="Tìm kiếm điểm đến" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocationInput(e.target.value)}/>

                 {
                  locationInput 
                  ? <div className="location-search-input">
                     {
                      arrFilter.length !== 0 && <ul>
                        
                       {
                        
                           arrFilter?.map((item,index)=>(
                             <li onClick={() => handleClickItemSearch(`${item.tenViTri} ${item.tinhThanh} ${item.quocGia}`,item.id)} key={index}> <span><MdLocationPin className="location-icon" /></span>{item.tenViTri} {item.tinhThanh} {item.quocGia}</li>
                           ))
                        

                       }
                     </ul>
                     }
                  </div> 
                  :  <div className="location">
                  <h1>Tìm kiếm theo Khu vực</h1>
                  <div className="location-list">
                    <div className="location-item" onClick={() => handleLocationZone('hồ chí minh')}>
                      <img
                        src="https://a0.muscache.com/im/pictures/4e762891-75a3-4fe1-b73a-cd7e673ba915.jpg?im_w=320"
                        alt=""
                      />
                      <span>Hồ Chí Minh</span>
                    </div>
                    <div className="location-item" onClick={() => handleLocationZone('nha trang')}>
                      <img
                        src="https://a0.muscache.com/im/pictures/4e762891-75a3-4fe1-b73a-cd7e673ba915.jpg?im_w=320"
                        alt=""
                      />
                      <span>Nha Trang</span>
                    </div>
                    <div className="location-item" onClick={() => handleLocationZone('phú quốc')}>
                      <img
                        src="https://a0.muscache.com/im/pictures/4e762891-75a3-4fe1-b73a-cd7e673ba915.jpg?im_w=320"
                        alt=""
                      />
                      <span>Phú Quốc</span>
                    </div>
                    <div className="location-item" onClick={() => handleLocationZone('tuy hòa')}>
                      <img
                        src="https://a0.muscache.com/im/pictures/4e762891-75a3-4fe1-b73a-cd7e673ba915.jpg?im_w=320"
                        alt=""
                      />
                      <span>Tuy Hòa</span>
                    </div>
                    <div className="location-item" onClick={() => handleLocationZone('biên hòa')}>
                      <img
                        src="https://a0.muscache.com/im/pictures/4e762891-75a3-4fe1-b73a-cd7e673ba915.jpg?im_w=320"
                        alt=""
                      />
                      <span>Biên Hòa</span>
                    </div>
                    <div className="location-item" onClick={() => handleLocationZone('thuận an')}>
                      <img
                        src="https://a0.muscache.com/im/pictures/4e762891-75a3-4fe1-b73a-cd7e673ba915.jpg?im_w=320"
                        alt=""
                      />
                      <span>Thuận An</span>
                    </div>
                  </div>
                </div>
                 }
                </div>

                <div
                  className="header__container-second-wrapper-bottom-item"
                  onClick={handleClickItem}
                >
                  <p>nhân phòng</p>
                  <input
                    type="text"
                    placeholder="Thêm ngày"
                    defaultValue={startDateFormat}
                  />

                  <div className="date-range-picker">
                    <DateRangePicker
                      ranges={[selectionRange]}
                      minDate={new Date()}
                      onChange={handleSelect}
                      rangeColors={["#FD5861"]}
                      showDateDisplay={false}
                    />
                  </div>
                </div>

                <div
                  ref={checkoutRef}
                  className="header__container-second-wrapper-bottom-item "
                  onClick={handleClickItem}
                >
                  <p>Trả phòng</p>
                  <input
                    type="text"
                    placeholder="Thêm ngày"
                    defaultValue={endDateFormat}
                  />

                  <div className="date-range-picker">
                    <DateRangePicker
                      ranges={[selectionRange]}
                      minDate={new Date()}
                      onChange={handleSelect}
                      rangeColors={["#FD5861"]}
                      showDateDisplay={false}
                    />
                  </div>
                </div>
                <div
                  className="header__container-second-wrapper-bottom-item close"
                  onClick={handleClickItem}
                >
                  <div>
                    <p>Khánh</p>
                    <span>Thêm khách</span>

                    <div className="date__bottom-submenu" ref={submenuRef}>
                      <ul>
                        <li>
                          <div>
                            <h2>Người lớn</h2>
                            <p>Từ 13 tuổi trở lên</p>
                          </div>
                          <div>
                            <span onClick={() => setCustomerMinus("adult")}>
                              -
                            </span>
                            {customers.adult}
                            <span onClick={() => setCustomerPlus("adult")}>
                              +
                            </span>
                          </div>
                        </li>
                        <li>
                          <div>
                            <h2>Trẻ em</h2>
                            <p>Độ tuổi 2 - 12</p>
                          </div>
                          <div>
                            <span onClick={() => setCustomerMinus("children")}>
                              -
                            </span>
                            {customers.children}
                            <span onClick={() => setCustomerPlus("children")}>
                              +
                            </span>
                          </div>
                        </li>
                        <li>
                          <div>
                            <h2>Em bé</h2>
                            <p>Dưới 2 tuổi</p>
                          </div>
                          <div>
                            <span onClick={() => setCustomerMinus("baby")}>
                              -
                            </span>
                            {customers.baby}
                            <span onClick={() => setCustomerPlus("baby")}>
                              +
                            </span>
                          </div>
                        </li>

                        <li>
                          <div>
                            <h2>Thú cưng</h2>
                            <p>Bạn sẽ mang theo động vật phục vụ</p>
                          </div>
                          <div>
                            <span>-</span>0<span>+</span>
                          </div>
                        </li>
                        <li>
                          <p>
                            Chỗ ở này cho phép tối đa 4 khách, không tính em bé.
                            Không được phép mang theo thú cưng.
                          </p>
                        </li>
                      </ul>
                      <div className="btn-close" onClick={handleClickClose}>
                        Đóng
                      </div>
                    </div>
                  </div>
                  <button onClick={handleClickSubmit}>
                   <NavLink to={`/search/${locationId}`}>
                   <HiSearch className="hiSearch" />
                   </NavLink>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header__container-right">
          <div className="header__container-right-item left">
            <p>{t('content.airbnbyourhome')}</p>
          </div>
          <div className="header__container-right-item center" onClick={handleDislayLanguage}>
            <RiGlobalLine className="ciGlobe" />
          </div>
          <div
            className="header__container-right-item right"
            onClick={handleClick}
          >
            <BiMenu className="biMenu" />
            {user ? (
              <HiUserCircle className="hiUserCircleLogin" />
            ) : (
              <HiUserCircle className="hiUserCircle" />
            )}
            <div className="submenu-user">
              {user ? (
                <ul>
                  <li>{t('content.message')}</li>
                  <NavLink to={`/trip/${user.id}`}> <li className="active">{t('content.trip')}</li></NavLink>
                  <NavLink to='/favorite'><li className="active">{t('content.favorites')}</li></NavLink>
                  <hr />
                  <li>{t('content.airbnbyourhome')}</li>
                  <li>{t('content.hostanexperience')}</li>
                  <NavLink to={`/user/${user?.id}`}> <li className="active">{t('content.account')}</li></NavLink>
                  <hr />
                  <li>{t('content.help')}</li>
                  <li className="active" onClick={logout}>{t('content.logout')}</li>
                </ul>
              ) : (
                <>
                  <ul>
                    <li className="active" onClick={() => handleChangeComponent('register')}>
                    {t('content.register')}
                    </li>
                    <li className="active" onClick={() => handleChangeComponent('login')}>
                    {t('content.login')}
                    </li>
                  </ul>
                  <hr className="line" />
                  <ul>
                    <li>{t('content.airbnbyourhome')}</li>
                    <li>{t('content.hostanexperience')}</li>
                    <li>{t('content.help')}</li>
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

        <NavBar perView={15}/>
    </div>
  );
};

export default Header;
