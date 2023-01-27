import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BookRoom, CommentDetail, Room } from '../types/roomReducerType'
import {http} from '../util/config'
import { DispatchType } from '../store/store'
import { AxiosResponse } from 'axios'

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
            alert(response.data.message)
        } catch (error) {
            console.log(error)
        }
       
    }
}


export const getRoomByLocationApi = (id:number) => {

    return async (dispatch: DispatchType) => {
        const response:AxiosResponse = await http.get(`/api/phong-thue/lay-phong-theo-vi-tri?maViTri=${id}`)
        dispatch(getRoom(response.data.content))
    }
}