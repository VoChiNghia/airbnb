import React, { useEffect } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { DispatchType, RootState } from '../../store/store'
import { getRoomApi, loadingReducer } from '../../redux/roomReducer'
import Cart from '../../component/Cart'
import { Room } from '../../types/roomReducerType'
import {BsFillMapFill} from 'react-icons/bs'
import CardLoading from '../../loading/CardLoading'
import { NavLink } from 'react-router-dom'
import LazyLoad from 'react-lazyload'



type Props = {}

const Home = (props: Props) => {

  const {roomState,loading} = useSelector((state:RootState) => state.roomReducer)


  const dispatch:DispatchType = useDispatch()

  const getRoomFromApi = async () => {
    const action = getRoomApi()
     await dispatch(action)
     await dispatch(loadingReducer(false))
  }

  useEffect(() =>{
    window.scrollTo(0, 0);
    getRoomFromApi()
   
      
  
  },[])

  return (
    <div className="home">
      <div className="home__container">
        {
          loading ? Array(20).fill(1).map((i,index) => <CardLoading key={index}/>) :
            roomState?.map((item:Room,index:number)=>(
              <LazyLoad key={index} placeholder={<CardLoading/>}>
          <Cart key={index} data={item}/>
        </LazyLoad>
            
            ))
            
            
        }

          <NavLink to='/map'>
          <div className="show-map">
           <span > bản đồ</span>
            <BsFillMapFill/>
            
          </div>
          </NavLink>
          <div>
              
          </div>
        
      </div>
      
    </div>
  )
}

export default Home