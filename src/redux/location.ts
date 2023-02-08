import {PayloadAction, createSlice} from '@reduxjs/toolkit'
import { ACCESS_TOKEN, USER_LOGIN, http, saveStore, saveStoreJson } from '../util/config'
import { UserLogin } from '../types/authType'
import { DispatchType } from '../store/store'
import { LoginValue } from '../pages/login/LoginModal'

import { RegisterValue } from '../pages/register/RegisterModal'
import { LocationDetail, LocationState } from '../types/locationType'
import Swal from 'sweetalert2'
import { setIsOpen } from './modalReducer'
import { AxiosResponse } from 'axios'



const initialState:LocationState = {
   location:[],
   longitudeAndLatitude:null,
   address:[]
}



const locationReducer = createSlice({
    name: 'locationReducer',
    initialState,
    reducers:{
        getLocation:(state:LocationState,action:PayloadAction<LocationDetail[]>) => {
            state.location = action.payload
        },
        longAndLat:(state:LocationState,action:PayloadAction<any>) => {
            state.longitudeAndLatitude = action.payload
        },
        addresReducer:(state:LocationState,action:PayloadAction<any>) => {
          state.address = action.payload
        }
    }
})

export const {getLocation,longAndLat,addresReducer} = locationReducer.actions
export default locationReducer.reducer





export const getLocationApi = () => {
    return async (dispatch:DispatchType) => {
        var arrLocation:any = []
        try {
            
         const res:AxiosResponse = await http.get('/api/vi-tri')
         
         res.data.content.map(async (data:LocationDetail,index:number) =>{
            
                const response = await http.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${data.tenViTri +' '+ data.tinhThanh}.json?access_token=pk.eyJ1Ijoidm9jaGluZ2hpYSIsImEiOiJjbGNwMm1sN2IwMG52M3dvZG41b21kMGN4In0.P43VVScuPtGFkFt7fIrVDQ`)
                
                arrLocation.push({...data,longitude:response.data.features[0].center[0],latitude:response.data.features[0].center[1]})
                dispatch(getLocation([...arrLocation,{...data,longitude:response.data.features[0].center[0],latitude:response.data.features[0].center[1]}]))
                
                
         })

       
         
   
       
   
        } catch (error:any) {
     
         alert(error?.response.data.content)
        }
     }
}

export const getLocationAddressApi = () => {
  return async (dispatch:DispatchType) => {
     
      try {
          
       const res:AxiosResponse = await http.get('/api/vi-tri')
        dispatch(addresReducer(res.data.content))
 
      } catch (error:any) {
   
       alert(error?.response.data.content)
      }
   }
}


export const deleteLocation = (id:number) => {
    return async (dispatch:DispatchType) => {
        try {
         const res:AxiosResponse = await http.delete(`/api/vi-tri/${id}`)
      
         Swal.fire({
            title: 'Bạn Muốn Xóa',
            
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xác nhận'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Deleted!',
                res.data.message,
                'success'
              )
              dispatch(getLocationApi());
            }
          })
       
        } catch (error:any) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: error?.response.data.content,
                showConfirmButton: false,
                timer: 1500
              })
        }
     }
}


export const addLocation = (data:any) => {
    return async (dispatch:DispatchType) => {
        try {
         const res:AxiosResponse = await http.post('/api/vi-tri',data)
         
         Swal.fire({
            position: 'center',
            icon: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500
          })
          dispatch(getLocationApi());
          
       
        } catch (error:any) {
       
         Swal.fire({
            position: 'center',
            icon: 'error',
            title: error?.response.data.content,
            showConfirmButton: false,
            timer: 1500
          })
        }
     }
}


export const uploadImageLocation = (id:number,data:any) => {
    return async () => {
        try {
         const res:AxiosResponse = await http.post(`/api/vi-tri/upload-hinh-vitri?maViTri=${id}`,data)
         Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'thành công',
            showConfirmButton: false,
            timer: 1500
          })
       
       
        } catch (error:any) {
       console.log(error)
         Swal.fire({
            position: 'center',
            icon: 'error',
            title: error?.response.data.content,
            showConfirmButton: false,
            timer: 1500
          })
        }
     }
}


export const updateLocationById = (id:number,data:any) => {
  return async (dispatch:DispatchType) => {
      try {
       const res:AxiosResponse = await http.put(`/api/vi-tri/${id}`,data)

       
       Swal.fire({
          position: 'center',
          icon: 'success',
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500
        })
        dispatch(getLocationApi());
       dispatch(setIsOpen(false))
     
      } catch (error:any) {
     

        console.log(error)
       Swal.fire({
          position: 'center',
          icon: 'success',
          title: error?.response.data.content,
          showConfirmButton: false,
          timer: 1500
        })
      }
   }
}





