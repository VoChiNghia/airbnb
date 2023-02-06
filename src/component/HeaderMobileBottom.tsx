import React from 'react'
import {IoIosSearch} from 'react-icons/io'
import {AiOutlineHeart} from 'react-icons/ai'
import {HiOutlineUserCircle} from 'react-icons/hi'
import { useDispatch } from 'react-redux'
import { DispatchType } from '../store/store'
import { changeComponent, setIsOpen } from '../redux/modalReducer'
import LoginModal from '../pages/login/LoginModal'
import { ACCESS_TOKEN, USER_LOGIN, getStoreJson, removeStore } from '../util/config'
import { NavLink } from 'react-router-dom'
import {IoIosLogOut} from  'react-icons/io'
import {FaAirbnb} from 'react-icons/fa'
import { history } from '../App'
type Props = {}

const HeaderMobileBottom = (props: Props) => {
        const dispatch:DispatchType = useDispatch()
        const user = getStoreJson(USER_LOGIN)
    const hanndleLogin = () => {
        if(!user){
           dispatch(changeComponent(<LoginModal/>))
            dispatch(setIsOpen(true))
        }
       
      }

      const logout = () => {
        removeStore(USER_LOGIN);
        removeStore(ACCESS_TOKEN);
        history.push('/')
        window.location.reload();
      }
  return (
  <div className="header__mobile__bottom">
    <div className="header__mobile__bottom__container">
          <div className='active'>
              <NavLink to="/">
              <IoIosSearch className='icon'/>
              <p>Khám phá</p>
              </NavLink>
          </div>
          <div>
          {user ?
               <>
                <IoIosLogOut onClick={logout} className='icon'/>
              <p>Đăng xuất</p>
              </> :
              <NavLink to='/favorite'>
              <AiOutlineHeart className='icon'/>
              <p>Yêu thích</p>
              </NavLink>
              }
              
          </div>
         {user &&  <div>
          <NavLink to={`/trip/${user.id}`}>
          <FaAirbnb className='icon'/>
          </NavLink>
              <p>chuyến đi</p>
          </div>}
          <div onClick={hanndleLogin}>
              {user ?
               <NavLink to={`/user/${user.id}`}>
                <HiOutlineUserCircle className='icon'/>
              <p>Hồ sơ</p>
              </NavLink> :
              <>
              <HiOutlineUserCircle className='icon'/>
              <p>Đăng nhập</p>
              </>
              }
          </div>


      </div>

  </div>
  )
}

export default HeaderMobileBottom