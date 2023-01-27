
import React from 'react';
import ReactDOM from 'react-dom';
type Props = {
    isShowing:boolean,
    hide:() => void
    setSelected:(e:any) => void
    submit:() => void
}

const UpdateAvatar = ({ isShowing, hide,setSelected,submit }:Props) => isShowing ? ReactDOM.createPortal(
  <React.Fragment>
    <div className="modal-UpdateAvatar"/>
    <div className="modal-UpdateAvatar-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
      <div className="modal">
        <div className="modal-header">
            <p>Ảnh đại diện</p>
          <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-header-body">
            <div className="modal-header-body-left">
                <img src="https://a0.muscache.com/defaults/user_pic-225x225.png?v=3" alt="" />
            </div>
            <div className="modal-header-body-right">
                    <p>Ảnh đại diện cho thấy khuôn mặt của bạn có thể giúp các chủ nhà và khách khác làm quen với bạn. Airbnb yêu cầu tất cả chủ nhà phải có ảnh đại diện. Chúng tôi không yêu cầu khách phải có ảnh đại diện, nhưng chủ nhà có thể yêu cầu điều này. Nếu bạn là khách, ngay cả khi chủ nhà yêu cầu bạn đăng ảnh, họ sẽ không thể xem ảnh cho đến khi xác nhận yêu cầu đặt phòng của bạn.</p>
               
                 <div>
             
                  <input type="file" name="photo" id="upload-photo" onChange={(e:any) => setSelected(e.target.files[0])}/>

                  <div className="btn-upload" onClick={submit}>upload</div>
                 </div>

               

            </div>
          
        </div>
      </div>
    </div>
  </React.Fragment>, document.body
) : null;

export default UpdateAvatar;