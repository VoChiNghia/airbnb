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
import {User} from '../types/authType'
import { Logout } from "../redux/auth";
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
  const { signIn,logoutState } = useSelector((state:RootState)=> state.authReducer)
  const startDateFormat = format(startDate, "dd/MM/yyyy");
  const endDateFormat = format(endDate, "dd/MM/yyyy");
  const itemCenterRef = useRef(null);

  const wrapperRef = useRef(null);
  const submenuRef = useRef(null);
  const checkoutRef = useRef(null);
  const userFromLocal:User = getStoreJson(USER_LOGIN);

  const user:User = signIn?.user ? signIn.user : userFromLocal

  useEffect(()=>{
    const getAllLocation = () =>{
      const action = getLocationAddressApi()
      dispatch(action)
  }
    getAllLocation()
  },[])
  console.log(logoutState)
  console.log('re-render', user)
  console.log('signIn', signIn)
  console.log('local',userFromLocal)
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

  const logout = async () => {
  await  removeStore(USER_LOGIN);
  await removeStore(ACCESS_TOKEN);
    
    history.push('/')
    dispatch(Logout())
   
   
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
                  <p>?????a ??i???m</p>
                  <input defaultValue={locationInput} type="text" placeholder="T??m ki???m ??i???m ?????n" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocationInput(e.target.value)}/>

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
                  <h1>T??m ki???m theo Khu v???c</h1>
                  <div className="location-list">
                    <div className="location-item" onClick={() => handleLocationZone('h??? ch?? minh')}>
                      <img
                        src="https://a0.muscache.com/im/pictures/4e762891-75a3-4fe1-b73a-cd7e673ba915.jpg?im_w=320"
                        alt=""
                      />
                      <span>H??? Ch?? Minh</span>
                    </div>
                    <div className="location-item" onClick={() => handleLocationZone('nha trang')}>
                      <img
                        src="https://a0.muscache.com/im/pictures/4e762891-75a3-4fe1-b73a-cd7e673ba915.jpg?im_w=320"
                        alt=""
                      />
                      <span>Nha Trang</span>
                    </div>
                    <div className="location-item" onClick={() => handleLocationZone('ph?? qu???c')}>
                      <img
                        src="https://a0.muscache.com/im/pictures/4e762891-75a3-4fe1-b73a-cd7e673ba915.jpg?im_w=320"
                        alt=""
                      />
                      <span>Ph?? Qu???c</span>
                    </div>
                    <div className="location-item" onClick={() => handleLocationZone('tuy h??a')}>
                      <img
                        src="https://a0.muscache.com/im/pictures/4e762891-75a3-4fe1-b73a-cd7e673ba915.jpg?im_w=320"
                        alt=""
                      />
                      <span>Tuy H??a</span>
                    </div>
                    <div className="location-item" onClick={() => handleLocationZone('bi??n h??a')}>
                      <img
                        src="https://a0.muscache.com/im/pictures/4e762891-75a3-4fe1-b73a-cd7e673ba915.jpg?im_w=320"
                        alt=""
                      />
                      <span>Bi??n H??a</span>
                    </div>
                    <div className="location-item" onClick={() => handleLocationZone('thu???n an')}>
                      <img
                        src="https://a0.muscache.com/im/pictures/4e762891-75a3-4fe1-b73a-cd7e673ba915.jpg?im_w=320"
                        alt=""
                      />
                      <span>Thu???n An</span>
                    </div>
                  </div>
                </div>
                 }
                </div>

                <div
                  className="header__container-second-wrapper-bottom-item"
                  onClick={handleClickItem}
                >
                  <p>nh??n ph??ng</p>
                  <input
                    type="text"
                    placeholder="Th??m ng??y"
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
                  <p>Tr??? ph??ng</p>
                  <input
                    type="text"
                    placeholder="Th??m ng??y"
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
                    <p>Kh??nh</p>
                    <span>Th??m kh??ch</span>

                    <div className="date__bottom-submenu" ref={submenuRef}>
                      <ul>
                        <li>
                          <div>
                            <h2>Ng?????i l???n</h2>
                            <p>T??? 13 tu???i tr??? l??n</p>
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
                            <h2>Tr??? em</h2>
                            <p>????? tu???i 2 - 12</p>
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
                            <h2>Em b??</h2>
                            <p>D?????i 2 tu???i</p>
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
                            <h2>Th?? c??ng</h2>
                            <p>B???n s??? mang theo ?????ng v???t ph???c v???</p>
                          </div>
                          <div>
                            <span>-</span>0<span>+</span>
                          </div>
                        </li>
                        <li>
                          <p>
                            Ch??? ??? n??y cho ph??p t???i ??a 4 kh??ch, kh??ng t??nh em b??.
                            Kh??ng ???????c ph??p mang theo th?? c??ng.
                          </p>
                        </li>
                      </ul>
                      <div className="btn-close" onClick={handleClickClose}>
                        ????ng
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
