import React from "react";
const logo = require("../assest/image/aircover.jpg");
const DisplayMore = () => {
  return (
    <div className="display-more">
      <div className="display-more-header">
        <img src={logo} alt="" />
        <p>
          AirCover là chương trình bảo vệ toàn diện, được áp dụng miễn phí với
          mọi đặt phòng.
        </p>
      </div>
      <hr />
      <div className="display-more-body">
        <div className="display-more-body-left">
          <div className="item">
            <h1>Bảo đảm bảo vệ đặt phòng</h1>
            <p>
              Trong trường hợp hãn hữu khi Chủ nhà cần hủy đặt phòng của bạn
              trong vòng 30 ngày trước ngày nhận phòng, chúng tôi sẽ tìm cho bạn
              một chỗ ở tương tự hoặc tốt hơn, hoặc sẽ hoàn tiền cho bạn.
            </p>
          </div>

          <div className="item">
            <h1>Bảo đảm chi phí tương xứng</h1>
            <p>
              Trong thời gian ở, nếu bạn nhận thấy chỗ ở không đúng như quảng
              cáo, ví dụ như tủ lạnh ngừng hoạt động và Chủ nhà không thể dễ
              dàng khắc phục vấn đề này, hoặc số phòng ngủ ít hơn so với thông
              tin trên mục cho thuê, thì bạn sẽ có 3 ngày để báo cáo vấn đề. Khi
              đó, chúng tôi sẽ tìm cho bạn một chỗ ở tương tự hoặc tốt hơn, hoặc
              chúng tôi sẽ hoàn tiền cho bạn.
            </p>
          </div>
        </div>
        <div className="display-more-body-right">
          <div className="item">
            <h1>Bảo đảm nhận phòng</h1>
            <p>
              Nếu bạn không thể nhận phòng và Chủ nhà không thể giải quyết vấn
              đề này, chúng tôi sẽ tìm cho bạn một chỗ ở tương tự hoặc tốt hơn
              có thời gian ở tương đương, hoặc chúng tôi sẽ hoàn tiền cho bạn.
            </p>
          </div>

          <div className="item">
            <h1>Đường dây an toàn 24 giờ</h1>
            <p>
              Nếu cảm thấy không an toàn, bạn sẽ được ưu tiên liên hệ với nhân
              viên hỗ trợ an toàn được đào tạo đặc biệt của chúng tôi, bất kể
              ngày đêm.
            </p>
          </div>
        </div>
      </div>

      <div className="display-more-bottom">
        <p>
          Hãy truy cập Trung tâm trợ giúp của chúng tôi để biết đầy đủ thông tin
          chi tiết về cách Airbnb bảo vệ đặt phòng của bạn
        </p>
      </div>
    </div>
  );
};

export default DisplayMore;
