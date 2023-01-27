import {PayloadAction, createSlice} from '@reduxjs/toolkit'
import { ACCESS_TOKEN, USER_LOGIN, http, saveStore, saveStoreJson } from '../util/config'
import { UserLogin } from '../types/authType'
import { DispatchType } from '../store/store'
import LoginModal, { LoginValue } from '../pages/login/LoginModal'
import { history } from '../App'
import { RegisterValue } from '../pages/register/RegisterModal'
import { accessToken } from 'mapbox-gl'
import { setIsOpen } from './modalReducer'
import Swal from 'sweetalert2'
import { AxiosResponse } from 'axios'

type UserLoginState = {
    signIn:UserLogin | null,
 
    loading:boolean
}

const initialState:UserLoginState = {
    signIn:null,

    loading:false
}


const authReducer = createSlice({
    name: 'authReducer',
    initialState,
    reducers:{
        signInReducer:(state:UserLoginState,action:PayloadAction<UserLogin>) =>{
            state.signIn = action.payload
            saveStoreJson(USER_LOGIN,action.payload.user)
            saveStore(ACCESS_TOKEN,action.payload.token)
           window.location.reload()
        },
       
        setLoading:(state:UserLoginState,action:PayloadAction<boolean>) =>{
            state.loading = action.payload
        }
    }
})

export const {signInReducer,setLoading} = authReducer.actions
export default authReducer.reducer



export const signInApi = (data:LoginValue) => {
    return async (dispatch:DispatchType) => {
       try {
        const res:AxiosResponse = await http.post('/api/auth/signin',data)
        dispatch(signInReducer(res.data.content))
        
        dispatch(setIsOpen(false))
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


export const signUpApi = (data:RegisterValue) => {
    return async (dispatch:DispatchType) => {
        try {
            dispatch(setLoading(true))
         const res:AxiosResponse = await http.post('/api/auth/signup',data)
         if(res.data.statusCode == 200){
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Đăng ký Thành công',
                showConfirmButton: false,
                timer: 1500
              })
            dispatch(setIsOpen(false))
           
         }
       
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