import React, { useEffect } from 'react'
import { getLocationApi } from '../../redux/location'
import { useDispatch, useSelector } from 'react-redux'
import { DispatchType, RootState } from '../../store/store'
import CardLoading from '../../loading/CardLoading'
import { Room } from '../../types/roomReducerType'
import { getRoomApi, getRoomByLocationApi, loadingReducer } from '../../redux/roomReducer'
import Cart from '../../component/Cart'
import MapModal from '../../component/MapModal'
import LazyLoad from 'react-lazyload'
import { useParams } from 'react-router-dom'
import HeaderMobileBottom from '../../component/HeaderMobileBottom'

type Props = {}

const Search = (props: Props) => {
  const {location} = useSelector((state:RootState) => state.locationReducer)
  const {roomState,loading} = useSelector((state:RootState) => state.roomReducer)
  const dispatch:DispatchType = useDispatch()
  const param = useParams()
  const delayLoading = setTimeout(() =>{
    dispatch(loadingReducer(false))
  },1500)

  useEffect(()=>{

    const getAllLocation = () =>{
      const action = getLocationApi()
    
      dispatch(action)
      dispatch(loadingReducer(true))
  }
  
    getAllLocation()
   return clearTimeout(delayLoading)
  },[])
  


  return (
    <div className="search">
      <div className="search__container">

      <div className="search__container__left">
      {
       roomState?.length !== 0 ?  loading ? Array(20).fill(1).map((i,index) => <CardLoading key={index}/>) :
            roomState?.map((item:Room,index:number)=>(
              <LazyLoad key={index} placeholder={<CardLoading/>}>
              <Cart key={index} data={item}/>
            </LazyLoad>
            )) : <p>Không tìm thấy phòng phù hợp</p>
            
            
        }
      </div>

      <div className="search__container__right">
        <MapModal/>
      </div>
      </div>  
      
        <HeaderMobileBottom/>

    </div>
  )
}

export default Search