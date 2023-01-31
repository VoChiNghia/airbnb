import React, { useEffect, useState } from 'react'
import Map, {FullscreenControl, NavigationControl, Marker, Popup} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useDispatch, useSelector } from "react-redux";

import { NavLink } from "react-router-dom";
import { DispatchType, RootState } from '../store/store';
import { getLocationApi } from '../redux/location';






type Props = {}

const MapModal = (props: Props) => {

    const [showPopup,setShowPopup] = useState<boolean>(false)
    const {location} = useSelector((state:RootState) => state.locationReducer)
  
    const [viewState,setViewState] = useState({
      longitude: 0,
      latitude: 0,
      img:'',
      id:1
    })
    const dispatch:DispatchType = useDispatch()
  
    
  
  
  
    useEffect(()=>{
        const getAllLocation = () =>{
            const action = getLocationApi()
            dispatch(action)
        }
          getAllLocation()
        
    },[])
  return (
    <Map
    initialViewState={{
      longitude: 106.753272,
      latitude: 10.85402,
      zoom: 6
  
      
    }}
    mapStyle="mapbox://styles/vochinghia/cldk7hbd9000001nvkvi9dhrp"
    mapboxAccessToken='pk.eyJ1Ijoidm9jaGluZ2hpYSIsImEiOiJjbGNwczZuMzMxdGIxM25yeTIyMjh1ZXFiIn0.BBrTFz4H4l5Ar49w4yR-cw'
   
  >
    {showPopup && (
      <Popup
      longitude={viewState.longitude}
       latitude={viewState.latitude}
       closeButton={true}
       closeOnClick={false}
       onClose={() => setShowPopup(false)}
       anchor='top'
      >
        <div className="map-popup">
          <NavLink to={`/detail/${viewState.id}`}>
          <img src={viewState.img} alt="" />
          </NavLink>
        </div>
      </Popup>
    )}

      {
        location?.map((item:any,index:number) => (
          <Marker 
          key={index}
  onClick={() => {
    setViewState({
      longitude: item.longitude,
      latitude: item.latitude,
      img:item.hinhAnh,
      id:item.id,
    })
    setShowPopup(true)
  }} 
    longitude={item.longitude} latitude={item.latitude} anchor="bottom" >
      <div className="map-maker">
        <p>${Math.round(Math.random()*100)}</p>
      </div>

    </Marker >
        ))
      }

<NavigationControl />
<FullscreenControl />

  </Map>
  )
}

export default MapModal