import React, { useEffect, useRef, useState } from "react";
import { bookRoomApi, getCommentApi, getRoomByIdApi, loadingReducer, postCommentApi } from "../../redux/roomReducer";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../store/store";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { TbToolsKitchen2, TbParking, TbPool } from "react-icons/tb";
import { MdOutlineBedroomParent, MdOutlineIron } from "react-icons/md";
import { TiVideoOutline } from "react-icons/ti";
import { BiMessage, BiHeart, BiMessageMinus,BiArrowBack } from "react-icons/bi";
import {
  BsCalendar3Event,
  BsWater,
  BsChevronDown,
  BsTranslate,
  BsSnow,
  BsWifi,
} from "react-icons/bs";
import { FiShare } from "react-icons/fi";
import { AiFillStar, AiOutlineCalendar } from "react-icons/ai";

import { DateRange , DateRangePicker } from "react-date-range";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import { format } from "date-fns";
import { CustommerType, SelectionDate } from "../../types/detailType";
import { BookRoom, CommentDetail, CommentModal } from "../../types/roomReducerType";
import Detailloading from "../../loading/Detailloading";

import { USER_LOGIN, getStoreJson } from "../../util/config";
import LoginModal from "../login/LoginModal";
import { changeComponent, setIsOpen } from "../../redux/modalReducer";
import { useMediaQuery } from 'react-responsive'
import DetailMobileBottom from "../../component/DetailMobileBottom";
import DisplayMore from "../../component/DisplayMore";
import AllFeature from "../../component/AllFeature";
import { history } from "../../App";
import { useTranslation } from 'react-i18next';
import StarRating from "../../component/StarRating";
import Swal from "sweetalert2";
import { FacebookShareButton,FacebookIcon } from "react-share";
import Save from "../../component/Save";




type Props = {};

const Detail = (props: Props) => {
 
  const { roomById, getComment,loading } = useSelector(
    (state: RootState) => state.roomReducer
  );
    const params = useParams()
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [rating, setRating] = useState<number>(1);
  const [customers, setCustomers] = useState<CustommerType>({
    adult: 1,
    children: 1,
    baby: 1,
  });
  const commentInput = useRef<string>('')
  const { t } = useTranslation()
  const user = getStoreJson(USER_LOGIN)

  const startDateFormat = format(startDate, "dd/MM/yyyy");
  const endDateFormat = format(endDate, "dd/MM/yyyy");

  const dispatch: DispatchType = useDispatch();
  const param = useParams();
  const submenuRef = useRef(null);
  const datePickerRef = useRef(null);




  const getRoomByIdFromApi = async () => {
    const action = getRoomByIdApi(Number(param.id));
    await dispatch(action);
    await dispatch(loadingReducer(false))
  };
  
  

  const getCommentById = async () => {
    const action = getCommentApi(Number(param.id));
     await dispatch(action);
     await dispatch(loadingReducer(false))
  
  };
  useEffect(() => {
    
    getRoomByIdFromApi();
    getCommentById();
    
 
  
    window.scrollTo(0, 0);
   
  }, []);
  

  const handleClickSubmenu = () => {
    if (submenuRef.current) {
      (submenuRef.current as HTMLElement).classList.toggle("active");
    }
  };

  const handleClickDatePicker = () => {
    if (datePickerRef.current) {
      (datePickerRef.current as HTMLElement).classList.toggle("active");
    }
  };

  const handleClickClose = () => {
    if (submenuRef.current) {
      (submenuRef.current as HTMLElement).classList.remove("active");
    }
  };
  const handleSelect = (date:any) => {
    setStartDate(date.selection.startDate); // native Date object
    setEndDate(date.selection.endDate); // native Date object
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
  const selectionRange: SelectionDate = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const handleDisplayMore = () => {
      dispatch(changeComponent(<DisplayMore/>))
      dispatch(setIsOpen(true))
  }

  const handleDisplayAllFeature = () => {
    dispatch(changeComponent(<AllFeature/>))
    dispatch(setIsOpen(true))
}

  

  const handleSubmit = () =>{
     if(user){
      const action:BookRoom = {
        maPhong:Number(params.id),
        ngayDen:startDate,
        ngayDi:endDate,
        soLuongKhach:customers.adult,
        maNguoiDung:user.id
      }

      dispatch(bookRoomApi(action))
     }else{
      dispatch(changeComponent(<LoginModal/>))
      dispatch(setIsOpen(true))
     }
  }


  


  const handleComment = async () => {
    console.log(user)
    if(user){
      const data:CommentModal = {
      
        maPhong: Number(param.id),
        maNguoiBinhLuan: user.id,
        ngayBinhLuan: new Date().toDateString(),
        noiDung: commentInput.current,
        saoBinhLuan:rating + 1
      }
     await dispatch(postCommentApi(data))


      getCommentById();
    dispatch(loadingReducer(false))
    }else{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'B???n ch??a ????ng nh???p',
        showConfirmButton: false,
        timer: 1500
      })
    }
    
    
  }

  const handleSave = () =>{
    dispatch(changeComponent(<Save maPhong={Number(param.id)} img={roomById?.hinhAnh}/>))
    dispatch(setIsOpen(true))
  }

  return (
  <>
  {
    loading ? <Detailloading/> : 
    <div className="detail container">
    <div className="detail__header">
      <h1 className="detail__header-name">{roomById?.tenPhong}</h1>
      <div className="detail__header-info">
        <div>Tambon Thep Krasatti, Chang Wat Phuket, Th??i Lan</div>
        <div>
          <p>
           
            <FacebookShareButton
              url={'https://thunderous-speculoos-c4bfd0.netlify.app/'}
              quote="example"
              hashtag="#Airbnb"
            >
                <FiShare /> {t('content.share')}
            </FacebookShareButton>
          </p>
          <p onClick={handleSave}>
            
            <BiHeart /> {t('content.save')}
          </p>
        </div>
      </div>
      <div className="detail__header-img">
        <img src={roomById?.hinhAnh} alt="" />
        <div className="detail__goback" onClick={() => history.go(-1)}>
          <BiArrowBack/>
        </div>
      </div>
    </div>

    <div className="detail__body">
      <div className="detail__body-left">
        <h2>{roomById?.tenPhong}</h2>
        <div>
          <span>{roomById?.khach} Kh??ch</span>
          <span>{roomById?.phongNgu} Ph??ng ng???</span>
          <span>{roomById?.giuong} Gi?????ng</span>
          <span>{roomById?.phongTam} Ph??ng t???m</span>
        </div>
        <hr />
        <ul>
          <li>
            <BsWater className="detail__body-left-icon" />
            <div>
              <h3>L???n ng???p</h3>
              <p>????y l?? m???t trong s??? ??t ch??? ??? c?? b??? b??i t???i khu v???c n??y.</p>
            </div>
          </li>
          <li>
            <BiMessageMinus className="detail__body-left-icon" />
            <div>
              <h3>Giao ti???p tuy???t v???i</h3>
              <p>
                100% kh??ch g???n ????y ???? ????nh gi?? Ake (Warapong) 5 sao v??? m???t
                giao ti???p.
              </p>
            </div>
          </li>
          <li>
            <AiOutlineCalendar className="detail__body-left-icon" />
            <div>
              <h3>???y mi???n ph?? tr?????c 7 thg 9.</h3>
            </div>
          </li>
        </ul>
        <hr />
        <div className="detail__body-left-desc">
          <img src="../image/aircover.jpg" alt="" width={150} />
          <p>{roomById?.moTa}</p>
          <h3 onClick={handleDisplayMore}>{t('content.showmore')}</h3>
        </div>
        <hr />

        <div className="translate-desc">
          <p>
            <span>
              <BsTranslate />
            </span>{" "}
            M???t s??? th??ng tin ???? ???????c d???ch t??? ?????ng.{" "}
            <span> Hi???n th??? ng??n ng??? g???c</span>
          </p>

          <p>
            Bi???t th??? CON trai ???????c ?????t theo t??n c???a cha t??i, ng?????i ???? d??nh
            tr???n cu???c ?????i ch??m s??c 4 ?????a con g??i c???a m??nh v?? y??u th????ng ng?????i
            v??? ???? ??? tr??n c??nh ?????ng l??a su???t nh???ng ng??y d??i ????? mang l???i th???c ??n
            tinh khi???t cho con c??i. Nh?? t??i n???m ??? l??ng Thanh H?? y??n b??nh ???????c
            bao b???c b???i d??ng s??ng Thu B???n n???i ti???ng v?? nh???ng c??nh ?????ng xanh v??
            t???n. Bi???t th??? CON trai c?? 7 c??n h??? ??? 2 khu v???c kh??c nhau nh??n ra
            h??? b??i tuy???t v???i v?? nh???ng c??nh ?????ng.
          </p>

          <span>{t('content.showmore')}</span>
        </div>

        <hr />
        <div className="feature">
          <h2>N??i n??y c?? nh???ng g?? cho b???n</h2>
          <div>
            <ul>
              <li>
              <TbToolsKitchen2 className="icon" />
                {roomById?.bep ? 'B???p' : 'Kh??ng c??'}
              </li>
              <li>
                <TbParking className="icon" /> {roomById?.doXe?'Ch??? ????? xe mi???n ph??': 'kh??ng c??'}
              </li>
              <li>
                <BsSnow className="icon" /> {roomById?.dieuHoa ? '??i???u h??a nhi???t ?????':'kh??ng c??'}
              </li>
              <li>
                <MdOutlineIron className="icon" /> {roomById?.banLa?'B??n l??':'kh??ng c??'}
              </li>
            </ul>
            <ul>
              <li>
                <BsWifi className="icon" /> {roomById?.wifi ? 'Wifi': 'kh??ng c??'}
              </li>
              <li>
                <TbPool className="icon" /> {roomById?.hoBoi?'H??? B??i':'kh??ng c??'}
              </li>
              <li>
                <TiVideoOutline className="icon" /> Camera an ninh trong nha??
              </li>
              <li>
                <MdOutlineBedroomParent className="icon" /> {roomById?.phongNgu?'Ph??ng ng???':'kh??ng c??'}
              </li>
            </ul>
          </div>

          <div className="feature-display">
            <button onClick={handleDisplayAllFeature}>{t('content.allfeature')}</button>
          </div>
        </div>

        <hr />
        <DateRangePicker 
          ranges={[selectionRange]}
          minDate={new Date()}
          onChange={(date)=> handleSelect(date)}
          rangeColors={["#FD5861"]}
          className="date-range-picker"
        />

        <DateRange 
          ranges={[selectionRange]}
          minDate={new Date()}
          onChange={(date)=> handleSelect(date)}
          rangeColors={["#FD5861"]}
          fixedHeight={true}
          className="date-range"
        />
      </div>
      <div className="detail__body-right">
        <div className="detail__body-right-wrapper">
          <div className="header">
            <div>${roomById?.giaTien} ????m</div>
            <div>18 ????nh gi??</div>
          </div>

          <div className="date">
            <div className="date__header" onClick={handleClickDatePicker}>
              <div>
                <p>Nh???n ph??ng</p>
                <input type="text" value={startDateFormat} />
              </div>
              <div>
                <p>Tr??? ph??ng</p>
                <input type="text" value={endDateFormat} />
              </div>
              <div className="date-picker" ref={datePickerRef}>
                <div className="btn-close" onClick={handleClickClose}>
                  ????ng
                </div>
          
                 <DateRangePicker
                  ranges={[selectionRange]}
                  minDate={new Date()}
                  onChange={(date) => handleSelect(date)}
                  rangeColors={["#FD5861"]}
                />
              </div>
            </div>
            <div className="date__bottom" onClick={handleClickSubmenu}>
              <div>
                <p>Kh??ch</p>
                <span>{customers.adult} kh??ch, {customers.baby} em b??, {customers.children} tr??? em</span>
              </div>
              <div>
                <BsChevronDown />
              </div>
            </div>
            <div className="date__bottom-submenu" ref={submenuRef}>
              <ul>
                <li>
                  <div>
                    <h2>Ng?????i l???n</h2>
                    <p>T??? 13 tu???i tr??? l??n</p>
                  </div>
                  <div>
                    <span onClick={() => setCustomerMinus("adult")}>-</span>
                    {customers.adult}
                    <span onClick={() => setCustomerPlus("adult")}>+</span>
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
                    <span onClick={() => setCustomerPlus("children")}>+</span>
                  </div>
                </li>
                <li>
                  <div>
                    <h2>Em b??</h2>
                    <p>D?????i 2 tu???i</p>
                  </div>
                  <div>
                    <span onClick={() => setCustomerMinus("baby")}>-</span>
                    {customers.baby}
                    <span onClick={() => setCustomerPlus("baby")}>+</span>
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
                    Ch??? ??? n??y cho ph??p t???i ??a 4 kh??ch, kh??ng t??nh em b??. Kh??ng
                    ???????c ph??p mang theo th?? c??ng.
                  </p>
                </li>
              </ul>
              <div className="btn-close" onClick={handleClickClose}>
                ????ng
              </div>
            </div>
          </div>

          <button className="checkRoom" onClick={handleSubmit}>{t('content.bookroom')}</button>

          <div className="price">
            <span>b???n v???n ch??a b??? tr??? ti???n</span>
            <div>
              <p>
                ${roomById?.giaTien} x{" "}
                {Number(endDateFormat.split("/")[0]) -
                  Number(startDateFormat.split("/")[0])}{" "}
                ????m{" "}
              </p>
              <p>
                $
                {Number(roomById?.giaTien) *
                  Number(endDateFormat.split("/")[0]) -
                  Number(startDateFormat.split("/")[0])}
              </p>
            </div>
            <div>
              <p>Ph?? v??? sinh</p>
              <p>$50</p>
            </div>
            <div>
              <p>Ph?? d???ch v???</p>
              <p>$0</p>
            </div>
          </div>
          <hr />

          <div className="bottom">
            <p>T???ng tr?????c thu???</p>
            <p>${(Number(roomById?.giaTien) *
                  Number(endDateFormat.split("/")[0]) -
                  Number(startDateFormat.split("/")[0])) + 50}</p>
          </div>
        </div>
      </div>
    </div>

    <hr />
    <div className="detail__review">
      <div className="detail__review-header">
        <h1>
          <span><AiFillStar/>5</span>
          {getComment.length == 0 ? 'Ch??a c??' : getComment.length} ????nh gi??
        </h1>
        <p>X???p h???ng trung b??nh s??? ???????c hi???n th??? sau khi c?? 3 ????nh gi??</p>
      </div>

      <div className="detail__review-body">
        {getComment.map((comment: CommentDetail, index: number) => (
          <div key={index} className="detail__review-body-item">
            <div className="wrapper">
              <img src={comment.avatar} alt="" />
              <div>
                <h3>{comment.tenNguoiBinhLuan}</h3>
                <p>{comment.ngayBinhLuan}</p>
              </div>
              
            </div>
            <p className="content">{comment.noiDung}</p>
          </div>
        ))}
      </div>

      <div className="post-comment">
      <StarRating getStar={setRating}/>
        <textarea placeholder="Vi???t b??nh lu???n ..." onChange={(e) => commentInput.current = e.target.value}></textarea>
        <button className="btn-comment" onClick={handleComment}>B??nh lu???n</button>
      </div>
    </div>

    <DetailMobileBottom startDate={startDateFormat} endDate={endDateFormat} price={Number(roomById?.giaTien) *
                  Number(endDateFormat.split("/")[0]) -
                  Number(startDateFormat.split("/")[0])}  setStartDate={setStartDate} setEndDate={setEndDate} submit={handleSubmit} selectionRange={selectionRange}/>
  </div>
  }
  </>
  );
};

export default Detail;
