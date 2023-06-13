import React from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineGlobeAlt } from "react-icons/hi";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__container">
        <div className="footer__item">
          <h1>GỚI THIỆU</h1>
          <ul>
            <li>Phương thức hoạt động của Airbnb</li>
            <li>Trang tin tức</li>
            <li>Nhà đầu tư</li>
            <li>Airbnb plus</li>
            <li>Airbnb luxe</li>
            <li>Hoteltonight</li>
            <li>Airbnb for work</li>
            <li>Nhờ có host, mọi điều điều có thể</li>
            <li>Cơ hội nghề nghiệp</li>
            <li>Thư của nhà sáng lâpk</li>
          </ul>
        </div>
        <div className="footer__item">
          <h1>CỘNG ĐỒNG</h1>
          <ul>
            <li>Sự đa dạng và cảm giác thân thuộc</li>
            <li>Tiện nghi phù hợp cho người khuyết tật</li>
            <li>đối tác liên kết airbnb</li>
            <li>Chỗ ở tuyến đầu</li>
            <li>Lượt giới thiệu của khách</li>
            <li>airbnb.org</li>
          </ul>
        </div>
        <div className="footer__item">
          <h1>ĐÓN TIẾP KHÁCH</h1>
          <ul>
            <li>Cho thuê nhà</li>
            <li>Tổ chức trải nghiệm trực tuyến</li>
            <li>Tổ chức trải nghiệm</li>
            <li>Đón tiếp khách có trách nhiệm</li>
            <li>Trung tâm tài ngyên</li>
            <li>Trung tâm cộng đồng</li>
          </ul>
        </div>
        <div className="footer__item">
          <h1>HỖ TRỢ</h1>
          <ul>
            <li>Cho thuê nhà</li>
            <li>Trung Tâm trợ giúp</li>
            <li>Các tùy chọn hủy</li>
            <li>Hỗ trợ khu dân cư</li>
            <li>Tin cậy và an toàn</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-bottom-left">
          <NavLink className="footer-bottom-left-item" to="/">
            © 2022 Airbnb, Inc.
          </NavLink>
          <NavLink className="footer-bottom-left-item" to="/">
            Quyền riêng tư
          </NavLink>
          <NavLink className="footer-bottom-left-item" to="/">
            Điều Khoản
          </NavLink>
          <NavLink className="footer-bottom-left-item" to="/">
            Sơ đồ trang web
          </NavLink>
        </div>
        <div className="footer-bottom-right">
          <NavLink className="footer-bottom-left-item" to="/">
            <HiOutlineGlobeAlt className="global-icon" />
            tiếng việt
          </NavLink>
          <NavLink className="footer-bottom-left-item" to="/">
            $USD
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Footer;
