import React, { useState } from 'react'
import { setIsOpen } from '../redux/modalReducer'
import { useDispatch } from 'react-redux'
import { DispatchType } from '../store/store'
import { getStoreJson, saveStoreJson } from '../util/config'
import { SaveDataModal } from '../types/save'

type Props = {
    maPhong:number
    img:string | undefined
}

const Save = (props: Props) => {
    const [textInput,setText] = useState<string>('')
    const dispatch:DispatchType = useDispatch()
    const handleSubmit = () => {
        const saveData:SaveDataModal =  {
                textInput,
                maPhong:props.maPhong,
                image:props.img
            }
        

        const getSaveData:SaveDataModal[] = getStoreJson('saveData') ? getStoreJson('saveData') : []
        getSaveData.push(saveData)
        saveStoreJson('saveData',getSaveData)

        dispatch(setIsOpen(false))
        
    }
  return (
    <div className="save__favorite">
        <h1>Danh sách Yêu thích của bạn</h1>
        <hr />
        <input type="text"  placeholder='Tên ' onChange={(e) => setText(e.target.value)}/>
        <p>tối đa 50 kí tự</p>
        <button className={textInput ? 'active' : ''} onClick={handleSubmit}>Tạo</button>
    </div>
  )
}

export default Save