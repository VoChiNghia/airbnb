import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { BookRoom, Room } from "../types/roomReducerType"
import { http } from "../util/config"
import { DispatchType } from "../store/store"
import { AddBookRoom } from "../component/adminComponent/AddRoomModal"
import Swal from "sweetalert2"
import { AxiosResponse } from "axios"

interface initialStateBookRoom {
    getAllBookRoom:BookRoom[]
    getRoomByUser:any
    trip:Room[]
}

const initialState:initialStateBookRoom = {
    getAllBookRoom:[],
    getRoomByUser:[],
    trip:[]
 }
 
 
 
 const bookRoomReducer = createSlice({
     name: 'bookRoomReducer',
     initialState,
     reducers:{
         getBookRoom:(state:initialStateBookRoom,action:PayloadAction<BookRoom[]>) => {
             state.getAllBookRoom = action.payload
         },
         getRoomByUserReducer:(state:initialStateBookRoom,action:PayloadAction<BookRoom[]>) => {
            state.getAllBookRoom = action.payload
        },
        tripReducer:(state:initialStateBookRoom,action:PayloadAction<Room[]>) => {
            state.trip = action.payload
        }
         
     }
 })
 
 export const {getBookRoom,tripReducer} = bookRoomReducer.actions
 export default bookRoomReducer.reducer

export const getBookRoomApi = () => {
    return async (dispatch:DispatchType) => {
       try {
        const res:AxiosResponse = await http.get('/api/dat-phong')
        dispatch(getBookRoom(res.data.content))
       } catch (error) {
        alert('có lỗi')
       }
    }
 }


 export const getBookRoomByUserApi = (userId:number) => {
    return async (dispatch:DispatchType) => {

       let arr:Room[] = []
       try {
        const res:AxiosResponse = await http.get(`/api/dat-phong/lay-theo-nguoi-dung/${userId}`)
        dispatch(getBookRoom(res.data.content))
        res.data.content.forEach(async (room:BookRoom)=>{
            const response = await http.get(`/api/phong-thue/${room.maPhong}`)
            
            
            arr.push({...response.data.content,ngayDen:room.ngayDen,ngayDi:room.ngayDi})
          
           dispatch(tripReducer([...arr]))
        })

    
       
       
       } catch (error) {
        
       }
    }
 }


 export const deleteBookRoom = (id:number) => {
    return async () => {
        try {
         const res:AxiosResponse = await http.delete(`/api/dat-phong/${id}`)
        
        alert(res.data.message)
        
        } catch (error:any) {
         alert(error?.response.data.content)
        }
     }
}

export const addBookRoom = (data:AddBookRoom) => {
    return async () => {
        try {
            const res:AxiosResponse = await http.post('/api/phong-thue',data)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: res.data.content,
                showConfirmButton: false,
                timer: 1500
              })
        } catch (error) {
            console.log(error)
        }
    }
}