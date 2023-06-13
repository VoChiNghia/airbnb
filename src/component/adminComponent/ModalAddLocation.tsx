import React, { useRef } from "react";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { DispatchType } from "../../store/store";
import { addLocation, updateLocationById } from "../../redux/location";
type Props = {
  type: string;
  item?: any;
};
export interface AddLocatiton {
  tenViTri: string;
  tinhThanh: string;

  quocGia: string;
}
const initialValues: AddLocatiton = {
  tenViTri: "",
  tinhThanh: "",

  quocGia: "",
};
//isShowing && type === 'login'? ReactDOM.createPortal(

const ModalAddLocation = ({ type, item }: Props) => {
  const dispatch: DispatchType = useDispatch();
  const modalRef = useRef(null);
  return (
    <div className="login-modal" ref={modalRef}>
      <div className="modal-overlay" />
      <div className="modal-wrapper">
        <div className="modal">
          <div className="modal-header">
            <img src="./image/Airbnb_Logo.jpg" width="80" alt="" />
            {type === "addLocation" ? <h1>Thêm vị trí</h1> : <h1>chỉnh sữa</h1>}
          </div>
          <hr />
          <div className="modal-body">
            <h1>Chào mừng bạn đến với Airbnb</h1>
            <Formik
              initialValues={initialValues}
              validationSchema={yup.object().shape({
                tenViTri: yup.string().required(),
                tinhThanh: yup.string().required(),
                quocGia: yup
                  .string()
                  .required()
                  .min(3, "must be at least 3 charator"),
              })}
              onSubmit={(values: AddLocatiton) => {
                if (type === "editLocation") {
                  dispatch(updateLocationById(item.id, values));
                  return;
                }

                if (type === "addLocation") {
                  dispatch(addLocation(values));
                  return;
                }
              }}
            >
              {({ values, errors, touched }) => (
                <Form className="form">
                  <div className="form-group">
                    <p>tên vị trí</p>
                    <Field name="tenViTri" placeholder="Tên vị trí" />
                    {errors.tenViTri && touched.tenViTri && (
                      <p className="error">{errors.tenViTri}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <p>Tỉnh Thành</p>
                    <Field name="tinhThanh" placeholder="Tỉnh thành" />
                    {errors.tinhThanh && touched.tinhThanh && (
                      <p className="error">{errors.tinhThanh}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <p>Quốc gia</p>
                    <Field name="quocGia" placeholder="Quốc gia" />
                    {errors.quocGia && touched.quocGia && (
                      <p className="error">{errors.quocGia}</p>
                    )}
                  </div>

                  <div className="form-button">
                    <button type="submit" className="login-button">
                      {type === "addLocation" ? "Thêm" : "cập nhập"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAddLocation;
