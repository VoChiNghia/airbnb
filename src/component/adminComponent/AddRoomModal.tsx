import React from "react";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import { addBookRoom } from "../../redux/bookRoomReducer";
import { DispatchType } from "../../store/store";
import { useDispatch } from "react-redux";
export interface AddBookRoom {
  tenPhong: string;
  moTa: string;

  giaTien: number;
  mayGiat: boolean;
  banLa: boolean;
  tivi: boolean;
  dieuHoa: boolean;
  wifi: boolean;
  bep: boolean;
  doXe: boolean;
  hoBoi: boolean;
  banUi: boolean;
  khach: number;
  phongNgu: number;
  giuong: number;
  phongTam: number;
}
const initialValues: AddBookRoom = {
  tenPhong: "",
  moTa: "",
  giaTien: 0,
  khach: 0,
  phongNgu: 0,
  giuong: 0,
  mayGiat: false,
  banLa: false,
  tivi: false,
  dieuHoa: false,
  wifi: false,
  bep: false,
  doXe: false,
  hoBoi: false,
  banUi: false,
  phongTam: 0,
};
const AddRoomModal = () => {
  const dispatch: DispatchType = useDispatch();

  return (
    <div className="add__room__modal">
      <Formik
        initialValues={initialValues}
        validationSchema={yup.object().shape({
          tenPhong: yup.string().required(),
          moTa: yup.string().required(),
        })}
        onSubmit={(values: AddBookRoom) => {
          dispatch(addBookRoom(values));
        }}
      >
        {({ values, errors, touched }) => (
          <Form className="form">
            <div className="form-group-container">
              <div className="form-group-wrapper">
                <div className="form-group">
                  <p>Tên Phòng</p>
                  <Field name="tenPhong" placeholder="Tên phòng" />
                  {errors.tenPhong && touched.tenPhong && (
                    <p className="error">{errors.tenPhong}</p>
                  )}
                </div>

                <div className="form-group">
                  <p>Mô tả</p>
                  <Field as="textarea" name="moTa" placeholder="Mô tả" />
                  {errors.moTa && touched.moTa && (
                    <p className="error">{errors.moTa}</p>
                  )}
                </div>

                <div className="form-group">
                  <p>Giá tiền</p>
                  <Field name="giaTien" type="number" placeholder="gia tien" />
                  {errors.giaTien && touched.giaTien && (
                    <p className="error">{errors.giaTien}</p>
                  )}
                </div>

                <div className="form-group">
                  <p>Khách</p>
                  <Field name="khach" type="number" placeholder="gia tien" />
                  {errors.khach && touched.khach && (
                    <p className="error">{errors.khach}</p>
                  )}
                </div>

                <div className="form-group">
                  <p>Phòng ngủ</p>
                  <Field name="phongNgu" type="number" placeholder="gia tien" />
                  {errors.phongNgu && touched.phongNgu && (
                    <p className="error">{errors.phongNgu}</p>
                  )}
                </div>

                <div className="form-group">
                  <p>Giường</p>
                  <Field name="giuong" type="number" placeholder="gia tien" />
                  {errors.giuong && touched.giuong && (
                    <p className="error">{errors.giuong}</p>
                  )}
                </div>

                <div className="form-group">
                  <p>Phòng tắm</p>
                  <Field name="phongTam" type="number" placeholder="gia tien" />
                  {errors.phongTam && touched.phongTam && (
                    <p className="error">{errors.phongTam}</p>
                  )}
                </div>
              </div>

              <div className="form-group-checkbox-container">
                <div className="form-group-checkbox">
                  <p className={values.mayGiat ? "active" : ""}>Máy giặt</p>

                  <Field
                    className="form-checkbox"
                    type="checkbox"
                    name="mayGiat"
                  />
                  <div className="slider"></div>
                </div>

                <div className="form-group-checkbox">
                  <p className={values.banLa ? "active" : ""}>Bàn là</p>
                  <Field
                    className="form-checkbox"
                    type="checkbox"
                    name="banLa"
                  />
                  <div className="slider"></div>
                </div>

                <div className="form-group-checkbox">
                  <p className={values.tivi ? "active" : ""}>Tivi</p>
                  <Field
                    className="form-checkbox"
                    type="checkbox"
                    name="tivi"
                  />
                  <div className="slider"></div>
                </div>

                <div className="form-group-checkbox">
                  <p className={values.dieuHoa ? "active" : ""}>Điều hòa</p>
                  <Field
                    className="form-checkbox"
                    type="checkbox"
                    name="dieuHoa"
                  />
                  <div className="slider"></div>
                </div>

                <div className="form-group-checkbox">
                  <p className={values.wifi ? "active" : ""}>Wifi</p>
                  <Field
                    className="form-checkbox"
                    type="checkbox"
                    name="wifi"
                  />
                  <div className="slider"></div>
                </div>

                <div className="form-group-checkbox">
                  <p className={values.bep ? "active" : ""}>Bếp</p>
                  <Field className="form-checkbox" type="checkbox" name="bep" />
                  <div className="slider"></div>
                </div>

                <div className="form-group-checkbox">
                  <p className={values.doXe ? "active" : ""}>Đỗ xe</p>
                  <Field
                    className="form-checkbox"
                    type="checkbox"
                    name="doXe"
                  />
                  <div className="slider"></div>
                </div>

                <div className="form-group-checkbox">
                  <p className={values.hoBoi ? "active" : ""}>Hồ bơi</p>
                  <Field
                    className="form-checkbox"
                    type="checkbox"
                    name="hoBoi"
                  />
                  <div className="slider"></div>
                </div>

                <div className="form-group-checkbox">
                  <p className={values.banUi ? "active" : ""}>Bàn ủi</p>
                  <Field
                    className="form-checkbox"
                    type="checkbox"
                    name="banUi"
                  />
                  <div className="slider"></div>
                </div>
              </div>
            </div>

            <div className="form-button">
              <button type="submit" className="login-button">
                thêm
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddRoomModal;
