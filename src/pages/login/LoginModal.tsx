import React, { useEffect, useRef,useState } from 'react'
import ReactDOM from 'react-dom';
import {AiOutlineClose} from 'react-icons/ai'
import { Formik, Field, Form, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { DispatchType, RootState } from '../../store/store';
import { signInApi } from '../../redux/auth';
import { history } from '../../App';
import { USER_LOGIN, getStoreJson } from '../../util/config';

import { changeComponent } from '../../redux/modalReducer';
import RegisterModal from '../register/RegisterModal';
import {BsEyeSlash} from 'react-icons/bs'
import {AiOutlineEye} from 'react-icons/ai'
import { User } from '../../types/authType';

const logo = require('../../assest/image/Airbnb_Logo.jpg')
type Props = {
   
}
export interface LoginValue {
  password: string;
  email:string
}
const initialValues: LoginValue = { 
  email:'',
  password:'',
};
//isShowing && type === 'login'? ReactDOM.createPortal(

const LoginModal = () => {
 
  const dispatch:DispatchType = useDispatch()

  const [hidePass,setHidePass] = useState<boolean>(false)
  const modalRef = useRef(null)
 
  const {signIn} = useSelector((state:RootState) => state.authReducer)
  const userFromLocal:User = getStoreJson(USER_LOGIN)
  const user:User = signIn?.user ? signIn?.user : userFromLocal
    useEffect(() => {
      if(user){
        if(user?.role === 'ADMIN') {
          history.push('/admin')
        }
      }
    },[])

  const handleRedirect = () => {
    dispatch(changeComponent(<RegisterModal/>))
  }

  const handleDisplayPass = () => {
    setHidePass(!hidePass)
  }
 

  return <div className="login-modal"  ref={modalRef}>
     <div className="modal-overlay"/>
    <div  className="modal-wrapper" >
      <div className="modal">
        <div className="modal-header">
          <img src={logo} width="80" alt="" />
          <h1>Đăng nhập</h1>
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
            
          })
        }
         onSubmit={(values:LoginValue) => {
        
          dispatch(signInApi(values))
         
         }}
       >
        {({values,errors,touched }) => (
          <Form className="form">
          <div className="form-group">
             <p>Email</p>
            <Field  name="email" placeholder="Email..." />
            {errors.email && touched.email && <p className="error">{errors.email}</p>}
             </div>
 
             <div className="form-group">
             <p>Password</p>
            <div className='password'>
            <Field   name="password" type={hidePass ? "text" : "password" } placeholder="Password..." />
                <span onClick={handleDisplayPass}>{hidePass ? <BsEyeSlash className='password-icon'/>:<AiOutlineEye className='password-icon'/>}</span>
            </div>
            {errors.password && touched.password && <p className="error">{errors.password}</p>}
             </div>
           
             <div className="form-button">
             <p>Quên mật khẩu?</p>
             <button type="submit" className="login-button">Đăng Nhập</button>
             </div>
             <div className='form-bottom'>
                 Bạn chưa có tài khoản <span onClick={handleRedirect}>Đăng kí</span>
             </div>
          </Form>
        )}
         
       </Formik>
        
      </div>
      </div>
    </div>
  
    </div>

        }

export default LoginModal