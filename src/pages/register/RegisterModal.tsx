import React,{useState} from 'react'
import ReactDOM from 'react-dom';
import {AiOutlineClose} from 'react-icons/ai'
import { Formik, Field, Form, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DispatchType, RootState } from '../../store/store';
import { setLoading, signUpApi } from '../../redux/auth';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import {format} from 'date-fns'
import { changeComponent } from '../../redux/modalReducer';
import LoginModal from '../login/LoginModal';
import {BsEyeSlash} from 'react-icons/bs'
import {AiOutlineEye} from 'react-icons/ai'

type Props = {

}

export interface RegisterValue {
  
  name:string
  phone:string
  birthday:Date
  password: string
  email:string
  gender:boolean
  
}
const initialValues: RegisterValue = { 
  email:'',
  password:'',
  name:'',
  birthday:new Date(),
  gender:false,
  phone:'',

};



const RegisterModal = () => {
    const [hidePass,setHidePass] = useState<boolean>(false)
  const {loading} = useSelector((state:RootState) => state.authReducer)
  const [date,setDate] = useState<Date>(new Date())
  
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const dispatch:DispatchType = useDispatch()

  const handleRedirect = () => {
    dispatch(changeComponent(<LoginModal/>))
  }

  const handleSubmit = async (values:RegisterValue) => {
    let action:RegisterValue = values
    if( typeof values.gender == 'string'){
    if(values.gender === '0'){
    action = {...values, gender:false,birthday:date}
    } else{
    action = {...values, gender: true,birthday:date}
    }
    }

    await dispatch(signUpApi(action))
   
  }
   const handleDisplayPass = () => {
    setHidePass(!hidePass)
  }
 
  return  <>
     <div className="modal-overlay"/>
    <div  className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
      <div className="modal">
        <div className="modal-header">
        <img src='./image/Airbnb_Logo.jpg' width="80" alt="" />
          <h1>Đăng Kí</h1>
        </div>
        <hr />
      <div className='modal-body'>
        <h1>Chào mừng bạn đến với Airbnb</h1>

        <Formik
         initialValues={initialValues}
         validationSchema={
          yup.object().shape({
            email: yup.string().email('email invalid'),
            password: yup.string().required().min(3,'must be at least 3 charator'),
            phone:yup.string().matches(phoneRegExp, 'Phone number is not valid'),
          
            name: yup.string().required()

            
          })
        }
         onSubmit={(values:RegisterValue,{setSubmitting}) => {
          
          handleSubmit(values)
          
          setSubmitting(false)
         }}
       >
        {({values,errors,touched }) => (
          <Form className="form">
            <div className="form-group">
             <p>Name</p>
            <Field  name="name" placeholder="Name..." />
            {errors.name && touched.name && <p className="error">{errors.name}</p>}
             </div>

          <div className="form-group">
             <p>Email</p>
            <Field  name="email" placeholder="Email..." />
            {errors.email && touched.email && <p className="error">{errors.email}</p>}
             </div>

             <div className="form-group">
             <p>Phone</p>
            <Field  name="phone" placeholder="Phone..." />
            {errors.phone && touched.phone && <p className="error">{errors.phone}</p>}
             </div>

             <div className="form-group">
             <p>Birthday</p>
             <DatePicker 
                      selected={date}
                      className="form-control"
                      name="birthday"
                      onChange={(date:Date) => setDate(date)}
                    />
         
             </div>
 
             <div className="form-group">
             <p>Password</p>
            <div className='password'>
            <Field   name="password" type={hidePass ? "text" : "password" } placeholder="Password..." />
                <span onClick={handleDisplayPass}>{hidePass ? <BsEyeSlash className='password-icon'/>:<AiOutlineEye className='password-icon'/>}</span>
            </div>
            {errors.password && touched.password && <p className="error">{errors.password}</p>}
             </div>

             <div className="form-group">
             <p>Gender</p>
            <div className='gender'>
            <Field  name="gender" value='1' type='radio'/><span>Nam</span>
            <Field  name="gender" value='0' type='radio'/><span>Nữ</span>
            </div>
           
             </div>
           
            
             <div className="form-button">
            
            <button  className="login-button">{loading ? 'Loading...' : 'Đăng kí'}</button>
            </div>
            <div className='form-bottom'>
                Bạn đã có tài khoản <span onClick={handleRedirect}>Đăng Nhập</span>
            </div>
          </Form>
        )}
         
       </Formik>
      
      </div>
      </div>
    </div>
  
    </>

      }
export default RegisterModal