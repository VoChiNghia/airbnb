import {configureStore} from '@reduxjs/toolkit'
import roomReducer from '../redux/roomReducer'
import authReducer from '../redux/auth'
import locationReducer from '../redux/location'
import userReducer from '../redux/userReducer'
import modalReducer from '../redux/modalReducer'
import bookRoomReducer from '../redux/bookRoomReducer'
import tableModal from '../redux/tableModal'


const store = configureStore({
   reducer:{
    roomReducer,
    authReducer,
    locationReducer,
    userReducer,
    modalReducer,
    bookRoomReducer,
    tableModal
   
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type DispatchType = typeof store.dispatch

export default store
