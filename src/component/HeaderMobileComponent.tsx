import React,{useRef,useState,useEffect} from 'react'
import {IoIosSearch} from 'react-icons/io'
import {AiOutlineHeart} from 'react-icons/ai'
import {HiOutlineUserCircle} from 'react-icons/hi'
import NavBar from './NavBar'
import HeaderMobileBottom from './HeaderMobileBottom'
import {VscChromeClose} from 'react-icons/vsc'
import { useOnClickOutside } from 'usehooks-ts'
import { removeVietnameseTones } from '../util/convertViet'
import { useDispatch, useSelector } from 'react-redux'
import { DispatchType, RootState } from '../store/store'
import { MdLocationPin } from 'react-icons/md'
import { getLocationAddressApi, getLocationApi } from '../redux/location'
import { useLocation, useNavigate } from 'react-router-dom'
import { getRoomByLocationApi } from '../redux/roomReducer'
import { DateRange } from 'react-date-range'

type Props = {}

const HeaderMobileComponent = (props: Props) => {

  const [locationInput,setLocationInput] = useState<string>('')
  const [locationId,setLocationId] = useState<number>(1)
  const {address} = useSelector((state:RootState) => state.locationReducer)
  const dispatch:DispatchType = useDispatch()
  const searchRef = useRef(null)
  const wrapper = useRef(null)
  const navigate = useNavigate();
  const pathName = useLocation();
 
  useEffect(()=>{
    const getAllLocation = () =>{
      const action = getLocationAddressApi()
      dispatch(action)
  }
    getAllLocation()
  },[])

  const selectionRange: any = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };
 


  const arrFilter = address?.filter((location) => {
    const vt = removeVietnameseTones(location.tenViTri.toLocaleLowerCase())
    const province = removeVietnameseTones(location.tinhThanh.toLocaleLowerCase())
   return  vt.includes(removeVietnameseTones(locationInput.toLocaleLowerCase())) ||
   province.includes(removeVietnameseTones(locationInput.toLocaleLowerCase()))
  })
  


const handleClick = () => {
    if(searchRef.current){
      (searchRef.current as HTMLElement).classList.toggle('active')
    }
}
const handleClickOutside = () => {
  if(searchRef.current){
    (searchRef.current as HTMLElement).classList.remove('active')
  }
}

const handleSubmit = () => {
  dispatch(getRoomByLocationApi(locationId))
  navigate(`/search/${locationId}`);

  if(searchRef.current){
    (searchRef.current as HTMLElement).classList.remove('active')
  }
}

const handleClickItemSearch = (value:string,id:number) =>{
  setLocationInput(value)
  setLocationId(id)
}
useOnClickOutside(wrapper,handleClickOutside)

  return (
    <div ref={wrapper} className="header__mobile">
      <div onClick={handleClick} className="header__mobile__top">
        <div className='wrapper'>
            <IoIosSearch className='search-icon'/>
            <div className='info'>
                <p>Địa điểm bất kỳ</p>
                <span>Tuần bất kỳ . Thêm khách</span>
            </div>
        </div>


        
        
      </div>

      <div ref={searchRef} className="header__mobile__search">
            <div className='wrapper'>
                <div className='head'>
                  <div onClick={handleClick}><VscChromeClose/></div>
                  <h2>Chỗ ở</h2>
                </div>
                <div className="body">
                  <h1>Bạn sẽ đi đâu?</h1>
                  <div className='body-search body-item'>
                  <IoIosSearch className='search-icon'/>
                  <input type="text" placeholder="bạn sẽ đi đâu" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocationInput(e.target.value)}  value={locationInput} />
                  </div>

                  
               
                 {
                  locationInput && <div className="location-search-input">
                  {
                   arrFilter.length !== 0 && <ul>
                     
                    {
                     
                        arrFilter?.map((item,index)=>(
                          <li onClick={() => handleClickItemSearch(`${item.tenViTri} ${item.tinhThanh} ${item.quocGia}`,item.id)} key={index}> <span><MdLocationPin className="location-icon" /></span>{item.tenViTri} {item.tinhThanh} {item.quocGia}</li>
                        ))
                     

                    }
                  </ul>
                  }
               </div> 
                 }
                  
                 

                  <div className='body-time body-item' >
                      <p>thời gian</p>
                      <p>thêm ngày</p>
                  </div>
                  <DateRange 
          ranges={[selectionRange]}
          minDate={new Date()}
          onChange={(date:any)=> console.log(date)}
          rangeColors={["#FD5861"]}
          fixedHeight={true}
          className="date-range-mobile"
        />
                  <div className='body-customer body-item'>
                      <p>Khách</p>
                      <p>thêm Khách</p>
                  </div>
                </div>

                <button className='btn-search' onClick={handleSubmit}>Tìm kiếm</button>
            </div>
        </div>
      
      <div className="header-navbar">
     <NavBar perView={4}/>
     </div>
      {pathName.pathname.split('/')[1] != 'detail' ? <HeaderMobileBottom/> : null }
      <HeaderMobileBottom/>
    </div>
  )
}

export default HeaderMobileComponent