import {PayloadAction, createSlice} from '@reduxjs/toolkit'
import Admin from '../pages/admin/Admin'
import { DispatchType } from '../store/store'

type ModalType = {
    component:JSX.Element,

}

const initialState:ModalType = {
    component:<p></p>,
   
    
}


const tableModal = createSlice({
    name: 'tableModal',
    initialState,
    reducers:{
       componentReducer:(state:ModalType, action:PayloadAction<JSX.Element>) => {
        state.component = action.payload
       },
      
    }
})

export const {componentReducer} = tableModal.actions
export default tableModal.reducer


export const changeTable = (component:JSX.Element) => {
    return (dispatch:DispatchType) => {
            dispatch(componentReducer(component));
    }
}


