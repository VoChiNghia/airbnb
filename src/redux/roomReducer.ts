import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BookRoom, CommentDetail, CommentModal, Room } from '../types/roomReducerType'
import {http} from '../util/config'
import { DispatchType } from '../store/store'
import { AxiosResponse } from 'axios'
import Swal from 'sweetalert2'

interface initialStateType {
    roomState:Room[] | null
    roomById:Room | null
  
    getComment:CommentDetail[] | []
    loading: boolean
}

const initialState:initialStateType = {
    roomState:[],
    loading:false,
    roomById:null,
    getComment:[],
 
}

const roomReducer = createSlice({
    name: 'roomReducer',    
    initialState,
    reducers:{
        getRoom:(state:initialStateType,action:PayloadAction<Room[]>) =>{
            state.roomState = action.payload
        },
        loadingReducer:(state:initialStateType,action:PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        getRoomById: (state:initialStateType,action:PayloadAction<Room>) =>{
            state.roomById = action.payload
        },
        getCommentApiReducer: (state:initialStateType,action:PayloadAction<CommentDetail[]>) =>{
            state.getComment = action.payload
        }
    }
})

export const { getRoom,loadingReducer,getRoomById,getCommentApiReducer } = roomReducer.actions

export default roomReducer.reducer



export const getRoomApi = () => {
    return async (dispatch: DispatchType) => {
        dispatch(loadingReducer(true))
        const response:AxiosResponse = await http.get('/api/phong-thue')
        dispatch(getRoom(response.data.content))
    }
}

export const getRoomByIdApi = (id:number) => {

    return async (dispatch: DispatchType) => {
        const response:AxiosResponse = await http.get(`/api/phong-thue/${id}`)
        dispatch(getRoomById(response.data.content))
    }
}

export const getCommentApi = (id:number) => {

    return async (dispatch: DispatchType) => {
        dispatch(loadingReducer(true))
        const response:AxiosResponse = await http.get(`/api/binh-luan/lay-binh-luan-theo-phong/${id}`)
        dispatch(getCommentApiReducer(response.data.content))
    }
}
 

export const bookRoomApi = (data:BookRoom) => {
    return async () => {
        
        try {
            const response:AxiosResponse = await http.post('/api/dat-phong',data)
          
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: response.data.message,
                showConfirmButton: false,
                timer: 1500
              })
        } catch (error) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Đặt phòng thất bại',
                showConfirmButton: false,
                timer: 1500
              })
        }
       
    }
}


export const getRoomByLocationApi = (id:number) => {

    return async (dispatch: DispatchType) => {
        const response:AxiosResponse = await http.get(`/api/phong-thue/lay-phong-theo-vi-tri?maViTri=${id}`)
        dispatch(getRoom(response.data.content))
    }
}

export const postCommentApi = (data: CommentModal) => {
    return async (dispatch:DispatchType) => {
       try {
        const res:AxiosResponse = await http.post('/api/binh-luan',data)
        if(res.data.statusCode === 201){
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'thành công',
              showConfirmButton: false,
              timer: 1500
            })
           }
       } catch (error:any) {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: error?.response.data.message,
            showConfirmButton: false,
            timer: 1500
          })
       }
    }
}