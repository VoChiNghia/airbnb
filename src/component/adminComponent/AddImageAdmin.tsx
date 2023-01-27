import React,{useState} from 'react'
import { uploadImageLocation } from '../../redux/location'
import { useDispatch } from 'react-redux'
import { DispatchType } from '../../store/store'

type Props = {
    idUpdate:number
}

const AddImageAdmin = ({idUpdate}: Props) => {
    const [selected,setSelected] = useState()

    const dispatch:DispatchType = useDispatch()

    console.log(selected)

    const handleSubmit = () => {
        const formData = new FormData();
        if(selected){
            formData.append('name', 'image-update')
        formData.append('formFile',selected)
        dispatch(uploadImageLocation(idUpdate,formData))
        }
    }

    console.log(selected)
  return (
    <div className="add-image">
        <label htmlFor="custom-file-upload" className="filupp">
        <span className="filupp-file-name js-value">Browse Files</span>
        <input type="file" name="attachment-file"id="custom-file-upload" onChange={(e:any) => setSelected(e.target.files[0])}/>
        </label>


        <button className="btn-update" onClick={handleSubmit}>Cập nhập</button>

    </div>
  )
}

export default AddImageAdmin