import {PayloadAction, createSlice} from '@reduxjs/toolkit'
import { ACCESS_TOKEN, USER_LOGIN, http, saveStore, saveStoreJson } from '../util/config'
import { User } from '../types/authType'
import { DispatchType } from '../store/store'

import Swal from 'sweetalert2'
import { UserModal } from '../component/adminComponent/ModalAddUser'
import { setIsOpen } from './modalReducer'
import { AxiosResponse } from 'axios'

type UserLoginState = {
    userDetails:User,
    user:User[] | null,
    imgRespone:any
   
}

const initialState = {
   userDetails: {
    id:       1,
    name:     '',
    email:    '',
    password: '',
    phone:    '',
    birthday: '',
    avatar:   '',
    gender:   false,
    role:     '',
},
   imgRespone:null,
   user:[]
}


const userReducer = createSlice({
    name: 'userReducer',
    initialState,
    reducers:{
        userDetailsReducer:(state:UserLoginState,action:PayloadAction<User>) =>{
            state.userDetails = action.payload
        },
        allUserReducer:(state:UserLoginState,action:PayloadAction<User[]>) =>{
            state.user = action.payload
        },
        updateAvataReducer:(state:UserLoginState,action:PayloadAction<any>) =>{
            state.imgRespone = action.payload
        },
      
    }
})

export const {userDetailsReducer,updateAvataReducer,allUserReducer} = userReducer.actions
export default userReducer.reducer




export const getUserByIdApi = (id:number) => {
    return async (dispatch:DispatchType) => {
        try {
         const res:AxiosResponse = await http.get(`/api/users/${id}`)
        
         dispatch(userDetailsReducer(res.data.content))
        } catch (error:any) {
         alert(error?.response.data.content)
        }
     }
}


export const getAllUsedApi = () => {
    return async (dispatch:DispatchType) => {
        try {
         const res:AxiosResponse = await http.get('/api/users')
        
         dispatch(allUserReducer(res.data.content))
        } catch (error:any) {
         alert(error?.response.data.content)
        }
     }
}

export const deleteUser = (id:number) => {
    return async (dispatch:DispatchType) => {
        try {
         const res:AxiosResponse = await http.delete(`/api/users?id=${id}`)
      
    
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
              dispatch(getAllUsedApi( ))
            }
          })
        } catch (error:any) {
         alert(error?.response.data.content)
        }
     }
}

export const addUser = (data:UserModal) => {
    return async (dispatch:DispatchType) => {
        try {
         const res:AxiosResponse = await http.post('/api/users',data)
        if(res.data.statusCode === 200) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Thêm mới thành công',
                showConfirmButton: false,
                timer: 1500
              })
              dispatch(getAllUsedApi())
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


export const updateUserById = (id:number,data:UserModal) => {
    return async (dispatch:DispatchType) => {
        try {
         const res:AxiosResponse = await http.put(`/api/users/${id}`,data)
         console.log(res)
        if(res.data.statusCode === 200) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'cập nhập thành công',
                showConfirmButton: false,
                timer: 1500
              })

            dispatch(setIsOpen(false))
            dispatch(getAllUsedApi( ))
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


export const updateAvataApi = (data:FormData) => {
    return async (dispatch:DispatchType) => {
        try {
         const res:AxiosResponse = await http.post('/api/users/upload-avatar',data)
         console.log(res)
         if(res.data.statusCode === 200){
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'thành công',
            showConfirmButton: false,
            timer: 1500
          })
         }
        
         
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


export const updateUser = (id:number,data:any) => {
    return async () => {
        try {
         const res:AxiosResponse = await http.put(`/api/users/${id}`,data)
        
        if(res.data.statusCode === 200) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Thành công',
                showConfirmButton: false,
                timer: 1500
              })
        }
        } catch (error:any) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'thất bại',
                showConfirmButton: false,
                timer: 1500
              })
        }
     }
}