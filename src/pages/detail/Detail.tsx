import React, { useEffect, useRef, useState } from "react";
import { bookRoomApi, getCommentApi, getRoomByIdApi, loadingReducer } from "../../redux/roomReducer";
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
import { BookRoom, CommentDetail } from "../../types/roomReducerType";
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


type Props = {};

const Detail = (props: Props) => {
 
  const { roomById, getComment,loading } = useSelector(
    (state: RootState) => state.roomReducer
  );
    const params = useParams()
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [customers, setCustomers] = useState<CustommerType>({
    adult: 1,
    children: 1,
    baby: 1,
  });
  const { t } = useTranslation()
  const user = getStoreJson(USER_LOGIN)
  const startDateFormat = format(startDate, "dd/MM/yyyy");
  const endDateFormat = format(endDate, "dd/MM/yyyy");

  const dispatch: DispatchType = useDispatch();
  const param = useParams();
  const submenuRef = useRef(null);
  const datePickerRef = useRef(null);

  //lấy thông tin phòng qua id
  const getRoomByIdFromApi = () => {
    const action = getRoomByIdApi(Number(param.id));
    dispatch(action);
  };
  //lấy thông tin comment theo id
  const delayLoading: NodeJS.Timeout = setTimeout(() =>{
    dispatch(loadingReducer(false))
  },1000)
  const getCommentById = () => {
    const action = getCommentApi(Number(param.id));
     dispatch(action);
  
  };
  useEffect(() => {
    getRoomByIdFromApi();
    getCommentById();
  
    window.scrollTo(0, 0);
    return clearTimeout(delayLoading)
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

  return (
  <>
  {
    loading ? <Detailloading/> : 
    <div className="detail container">
    <div className="detail__header">
      <h1 className="detail__header-name">{roomById?.tenPhong}</h1>
      <div className="detail__header-info">
        <div>Tambon Thep Krasatti, Chang Wat Phuket, Thái Lan</div>
        <div>
          <p>
            <FiShare /> {t('content.share')}
          </p>
          <p>
            {" "}
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
          <span>{roomById?.khach} Khách</span>
          <span>{roomById?.phongNgu} Phòng ngủ</span>
          <span>{roomById?.giuong} Giường</span>
          <span>{roomById?.phongTam} Phòng tắm</span>
        </div>
        <hr />
        <ul>
          <li>
            <BsWater className="detail__body-left-icon" />
            <div>
              <h3>Lặn ngụp</h3>
              <p>Đây là một trong số ít chỗ ở có bể bơi tại khu vực này.</p>
            </div>
          </li>
          <li>
            <BiMessageMinus className="detail__body-left-icon" />
            <div>
              <h3>Giao tiếp tuyệt vời</h3>
              <p>
                100% khách gần đây đã đánh giá Ake (Warapong) 5 sao về mặt
                giao tiếp.
              </p>
            </div>
          </li>
          <li>
            <AiOutlineCalendar className="detail__body-left-icon" />
            <div>
              <h3>ủy miễn phí trước 7 thg 9.</h3>
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
            Một số thông tin đã được dịch tự động.{" "}
            <span> Hiển thị ngôn ngữ gốc</span>
          </p>

          <p>
            Biệt thự CON trai được đặt theo tên của cha tôi, người đã dành
            trọn cuộc đời chăm sóc 4 đứa con gái của mình và yêu thương người
            vợ đã ở trên cánh đồng lúa suốt những ngày dài để mang lại thức ăn
            tinh khiết cho con cái. Nhà tôi nằm ở làng Thanh Hà yên bình được
            bao bọc bởi dòng sông Thu Bồn nổi tiếng và những cánh đồng xanh vô
            tận. Biệt thự CON trai có 7 căn hộ ở 2 khu vực khác nhau nhìn ra
            hồ bơi tuyệt vời và những cánh đồng.
          </p>

          <span>{t('content.showmore')}</span>
        </div>

        <hr />
        <div className="feature">
          <h2>Nơi này có những gì cho bạn</h2>
          <div>
            <ul>
              <li>
              <TbToolsKitchen2 className="icon" />
                {roomById?.bep ? 'Bếp' : 'Không có'}
              </li>
              <li>
                <TbParking className="icon" /> {roomById?.doXe?'Chỗ đỗ xe miễn phí': 'không có'}
              </li>
              <li>
                <BsSnow className="icon" /> {roomById?.dieuHoa ? 'Điều hòa nhiệt độ':'không có'}
              </li>
              <li>
                <MdOutlineIron className="icon" /> {roomById?.banLa?'Bàn là':'không có'}
              </li>
            </ul>
            <ul>
              <li>
                <BsWifi className="icon" /> {roomById?.wifi ? 'Wifi': 'không có'}
              </li>
              <li>
                <TbPool className="icon" /> {roomById?.hoBoi?'Hồ Bơi':'không có'}
              </li>
              <li>
                <TiVideoOutline className="icon" /> Camera an ninh trong nhà
              </li>
              <li>
                <MdOutlineBedroomParent className="icon" /> {roomById?.phongNgu?'Phòng ngủ':'không có'}
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
            <div>${roomById?.giaTien} đêm</div>
            <div>18 đánh giá</div>
          </div>

          <div className="date">
            <div className="date__header" onClick={handleClickDatePicker}>
              <div>
                <p>Nhận phòng</p>
                <input type="text" value={startDateFormat} />
              </div>
              <div>
                <p>Trả phòng</p>
                <input type="text" value={endDateFormat} />
              </div>
              <div className="date-picker" ref={datePickerRef}>
                <div className="btn-close" onClick={handleClickClose}>
                  Đóng
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
                <p>Khách</p>
                <span>{customers.adult} khách, {customers.baby} em bé, {customers.children} trẻ em</span>
              </div>
              <div>
                <BsChevronDown />
              </div>
            </div>
            <div className="date__bottom-submenu" ref={submenuRef}>
              <ul>
                <li>
                  <div>
                    <h2>Người lớn</h2>
                    <p>Từ 13 tuổi trở lên</p>
                  </div>
                  <div>
                    <span onClick={() => setCustomerMinus("adult")}>-</span>
                    {customers.adult}
                    <span onClick={() => setCustomerPlus("adult")}>+</span>
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
                    <span onClick={() => setCustomerPlus("children")}>+</span>
                  </div>
                </li>
                <li>
                  <div>
                    <h2>Em bé</h2>
                    <p>Dưới 2 tuổi</p>
                  </div>
                  <div>
                    <span onClick={() => setCustomerMinus("baby")}>-</span>
                    {customers.baby}
                    <span onClick={() => setCustomerPlus("baby")}>+</span>
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
                    Chỗ ở này cho phép tối đa 4 khách, không tính em bé. Không
                    được phép mang theo thú cưng.
                  </p>
                </li>
              </ul>
              <div className="btn-close" onClick={handleClickClose}>
                Đóng
              </div>
            </div>
          </div>

          <button className="checkRoom" onClick={handleSubmit}>{t('content.bookroom')}</button>

          <div className="price">
            <span>bạn vẫn chưa bị trừ tiền</span>
            <div>
              <p>
                ${roomById?.giaTien} x{" "}
                {Number(endDateFormat.split("/")[0]) -
                  Number(startDateFormat.split("/")[0])}{" "}
                đêm{" "}
              </p>
              <p>
                $
                {Number(roomById?.giaTien) *
                  Number(endDateFormat.split("/")[0]) -
                  Number(startDateFormat.split("/")[0])}
              </p>
            </div>
            <div>
              <p>Phí vệ sinh</p>
              <p>$50</p>
            </div>
            <div>
              <p>Phí dịch vụ</p>
              <p>$0</p>
            </div>
          </div>
          <hr />

          <div className="bottom">
            <p>Tổng trước thuế</p>
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
          {getComment.length == 0 ? 'Chưa có' : getComment.length} đánh giá
        </h1>
        <p>Xếp hạng trung bình sẽ được hiển thị sau khi có 3 đánh giá</p>
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
