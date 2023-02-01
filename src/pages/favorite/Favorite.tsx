import React, { useEffect,useState } from 'react'
import { getStoreJson, saveStoreJson } from '../../util/config'
import {TfiClose} from 'react-icons/tfi'
import { SaveDataModal } from '../../types/save'
import Swal from 'sweetalert2'

type Props = {}

const Favorite = (props: Props) => {
  const saveData = getStoreJson('saveData') ? getStoreJson('saveData') : []
  const [arrFilter,setArrFilter] = useState<SaveDataModal[]>(saveData)

   
    
    const handleDelete = (id:number) => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          const result = saveData.filter((item:SaveDataModal) => item.maPhong !== id)
      setArrFilter(result)
      saveStoreJson('saveData',result)
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
      
    }
  return (
    <div className="favorite">
        <h1>Yêu thích</h1>
        <div className="favorite__list">  
        {
          arrFilter.map((item:any,index:number) => (
            <div className="favorite__list__item" key={index}>
                  <TfiClose className='item-icon' onClick={() => handleDelete(item.maPhong)}/>
                <img src={item.image} alt="" />
                <p>{item.textInput}</p>
            </div>
          ))
        }
           
        </div>
    </div>
  )
}

export default Favorite