import {PayloadAction, createSlice} from '@reduxjs/toolkit'
import Admin from '../pages/admin/Admin'
import { DispatchType } from '../store/store'

type ModalType = {
    component:JSX.Element,
    modalIsOpen:boolean,
}

const initialState:ModalType = {
    component:<p></p>,
    modalIsOpen:false
    
}


const modalReducer = createSlice({
    name: 'modalReducer',
    initialState,
    reducers:{
       componentReducer:(state:ModalType, action:PayloadAction<JSX.Element>) => {
        state.component = action.payload
       },
       setComponentOpen:(state:ModalType, action:PayloadAction<boolean>) => {
        state.modalIsOpen = action.payload
       }
    }
})

export const {componentReducer,setComponentOpen} = modalReducer.actions
export default modalReducer.reducer


export const changeComponent = (component:JSX.Element) => {
    return (dispatch:DispatchType) => {
            dispatch(componentReducer(component));
    }
}


export const setIsOpen = (isOpen:boolean) => {
    return (dispatch:DispatchType) => {
            dispatch(setComponentOpen(isOpen));
    }
}
