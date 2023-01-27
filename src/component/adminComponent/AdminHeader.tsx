import React,{useRef} from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { ACCESS_TOKEN, USER_LOGIN, getStoreJson, removeStore } from '../../util/config'
import { User, UserLogin } from '../../types/authType'
import { history } from '../../App'
import {FaBars} from 'react-icons/fa'
import { useOnClickOutside } from 'usehooks-ts'
import { NavLink } from 'react-router-dom'

type Props = {}

const AdminHeader = (props: Props) => {


 const submenuRef = useRef(null)
 const wrapperRef = useRef(null)
 const userId = getStoreJson(USER_LOGIN)

 const displaySubmenu = () => {
 if(submenuRef.current){
  (submenuRef.current as HTMLElement).classList.toggle("active")
 }
 }

 const logout = () => {
  removeStore(USER_LOGIN);
  removeStore(ACCESS_TOKEN);
  history.push('/')
  window.location.reload();
};

const handleClickOutside = () => {
  if(submenuRef.current){
    (submenuRef.current as HTMLElement).classList.remove("active")
   }
}

useOnClickOutside(wrapperRef, handleClickOutside)

  return (
    <div ref={wrapperRef} className="admin__header">
        <div className="admin__header__left">
         <h1> Dashboard</h1>
        </div>

        <div className="admin__header__right">
          <h1>Admin</h1>
          <span onClick={displaySubmenu}><FaBars style={{fontSize:'18px',margin:'0 10px'}}/></span>
         <div className="submenu"   ref={submenuRef} >
          <ul>
            <li onClick={logout}>Đăng xuất</li>
            <NavLink to={`/user/${userId.id}`} ><li>Thông tin</li></NavLink>
          </ul>
         </div>
        </div>
    </div>
  )
}

export default AdminHeader