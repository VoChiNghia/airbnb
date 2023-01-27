import React,{useState} from 'react'
import ReactDOM from 'react-dom';
import {AiOutlineClose} from 'react-icons/ai'
import { Formik, Field, Form, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import {format} from 'date-fns'
import { DispatchType, RootState } from '../../store/store';
import { signUpApi } from '../../redux/auth';
import { addUser, updateUserById } from '../../redux/userReducer';
import {BsEyeSlash} from 'react-icons/bs'
import {AiOutlineEye} from 'react-icons/ai'
import { USER_LOGIN, getStoreJson } from '../../util/config';
import { User } from '../../types/authType';
import { MdPassword } from 'react-icons/md';
type Props = {
    type:string
    item?:User
}

export interface UserModal {
  
  name:string
  phone:string
  birthday:string
  password?: string
  email:string
  gender:boolean
  role?:string
  
}
const initialValues: UserModal = { 
  email:'',
  password:'',
  name:'',
  birthday:'',
  gender:false,
  phone:'',
  role:'USER'

};

const ModalAddUser = ({type,item}:Props) => {

  const [hidePass,setHidePass] = useState<boolean>(false)
  const [date,setDate] = useState<Date>(new Date())
  const dateFormat = format(date,'dd-MM-yyyy')
 
  const dispatch:DispatchType = useDispatch()
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/



  const handleSubmit = (values:UserModal) => {
    let action:UserModal = values
    if( typeof values.gender == 'string'){
    if(values.gender === '0'){
    action = {...values, gender:false,birthday:dateFormat}
    } else{
    action = {...values, gender: true,birthday:dateFormat}
    }
    }
    if(type === 'addUser'){
      dispatch(addUser(action))
      return
    }
    const {password,...others} = action

  if(item){
    dispatch(updateUserById(item.id,others))
  }
  }


  
  const handleDisplayPass = () => {
    setHidePass(!hidePass)
  }

  
  return  <>
   
    <div  className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
      <div className="modal">
        <div className="modal-header">
        <img src='./image/Airbnb_Logo.jpg' width="80" alt="" />
         {type === 'addUser' ?  <h1>Thêm Người Dùng</h1> : <h1>Chỉnh sữa</h1>}
        </div>
        <hr />
      <div className='modal-body'>
        <h1>Chào mừng bạn đến với Airbnb</h1>

        <Formik
         initialValues={initialValues}
         validationSchema={
          yup.object().shape({
            email: yup.string().email('email invalid'),
            password: type === 'addUser' ? yup.string().required().min(3,'must be at least 3 charator') : yup.string().notRequired(),
            phone:yup.string().matches(phoneRegExp, 'Phone number is not valid'),
      
            name: yup.string().required()
            

            
          })
        }
         onSubmit={(values:UserModal,{setSubmitting}) => {
          console.log(123)
          handleSubmit(values)
         
          setSubmitting(false)
          
         }}
         
       >
        {({values,errors,touched,handleSubmit }) => (
           <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
             <p>Name</p>
            <Field  name="name" placeholder={item?.name || 'Name'} />
            {errors.name && touched.name && <p className="error">{errors.name}</p>}
             </div>

          <div className="form-group">
             <p>Email</p>
            <Field  name="email" placeholder={item?.email || "Email..."}/>
            {errors.email && touched.email && <p className="error">{errors.email}</p>}
             </div>

             <div className="form-group">
             <p>Phone</p>
            <Field  name="phone" placeholder={item?.phone || 'Phone...'}/>
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
 
            {
              type === 'addUser' &&  <div className="form-group">
              <p>Password</p>
              <div className='password'>
             <Field   name="password" type={hidePass ? "text" : "password" } placeholder="Password..." />
                 <span onClick={handleDisplayPass}>{hidePass ? <BsEyeSlash className='password-icon'/>:<AiOutlineEye className='password-icon'/>}</span>
             </div>
             {errors.password && touched.password && <p className="error">{errors.password}</p>}
              </div>
            }

             <div className="form-group">
             <p>Role</p>
            <div className='gender'>
            <Field  name="role" value='ADMIN' type='radio'/>ADMIN
            <Field  name="role" value='USER' type='radio'/>USER
            </div>
           
             </div>
             

             <div className="form-group">
             <p>Gender</p>
            <div className='gender'>
            <Field  name="gender" value='1' type='radio'/>Nam
            <Field  name="gender" value='0' type='radio'/>Nữ
            </div>
           
             </div>
           
            
             <div className="form-button">
            
            <button type="submit" className="login-button">{type === 'addUser' ? 'Thêm người dùng' : 'cập nhập'}</button>
            </div>
           
          </form>
        )}
         
       </Formik>
      
      </div>
      </div>
    </div>
  
    </>

      }
export default ModalAddUser