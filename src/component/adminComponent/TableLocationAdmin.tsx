import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../store/store";
import { deleteUser, getAllUsedApi } from "../../redux/userReducer";

import ModalAddUser from "./ModalAddUser";
import { changeComponent, setIsOpen } from "../../redux/modalReducer";
import { User } from "../../types/authType";
import { AiOutlineEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import Pagination from "../../component/Pagination";
import { LocationDetail } from "../../types/locationType";
import { deleteLocation, getLocationApi } from "../../redux/location";
import ModalAddLocation from "./ModalAddLocation";
import AddImageAdmin from "./AddImageAdmin";
import { removeVietnameseTones } from "../../util/convertViet";

const TableLocationAdmin = () => {

    const dispatch: DispatchType = useDispatch();
    
    const { location } = useSelector((state: RootState) => state.locationReducer);
  
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [postPerPage, setpostPerPage] = useState<number>(10);

    const inputSearch = useRef<string>('')
    const [locationFilterSearch,setLocationFilterSearch] = useState<LocationDetail[]>(location)
    const [loadingTable,setLoadingtable] = useState<boolean>(false)


    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
 
    useEffect(() => {
      dispatch(getLocationApi());
    }, []);
  
    const openModal = () => {
      dispatch(changeComponent(<ModalAddLocation type="addLocation" />));
      dispatch(setIsOpen(true));
    };
  
    const handleDelete = (id: number) => {
      dispatch(deleteLocation(id));
    
    };

    const handleUpdate = (item:any) => {
      dispatch(changeComponent(<ModalAddLocation type='editLocation' item={item} />));
      dispatch(setIsOpen(true));
    }

    const handleUpdateImage = (id:number) => {
      dispatch(changeComponent(<AddImageAdmin idUpdate={id}/>));
      dispatch(setIsOpen(true));
    }

    const handleSearch = () => {
      setLoadingtable(true)
       const locationFilterSearch = location.filter((item:LocationDetail) => { 
        const inputSearchLowercase = removeVietnameseTones(inputSearch.current.toLowerCase())
        const name:string = removeVietnameseTones(item.tenViTri.toLocaleLowerCase())
        const province = removeVietnameseTones(item.tinhThanh).toLowerCase()
        const country = removeVietnameseTones(item.quocGia).toLowerCase()
      
        return name === inputSearchLowercase 
        ||item.id === Number(inputSearchLowercase) 
        || name === inputSearchLowercase || province === inputSearchLowercase || country === inputSearchLowercase
      })
      setLocationFilterSearch(locationFilterSearch)
      
      setTimeout(() => {
        setLoadingtable(false)
      },1000)
    }
  return (
    <div className="table__user__admin">
        

      <div className="table__user__admin__wrapper" >

      <div className="btn__add-user" onClick={openModal}>
        thêm vị trí
      </div>

<div className="table__user__search">
  <input type="text" onChange={(e:React.ChangeEvent<HTMLInputElement>)=> inputSearch.current = e.target.value}/>
  <button onClick={handleSearch}>Tìm kiếm</button>
</div>
</div>

      <table className="styled-table">
        <thead>
          <tr>
            <th>Mã vị trí</th>
            <th>Tên vị trí</th>
            <th>Tỉnh thành</th>
            <th>Quốc gia</th>
            <th>Hình ảnh</th>
            <th>Chỉnh sữa</th>
          </tr>
        </thead>
        <tbody>
          {!loadingTable ? (locationFilterSearch.length === 0 ? location : locationFilterSearch)
            .slice(firstPostIndex, lastPostIndex)
            .map((item: LocationDetail, index: number) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.tenViTri}</td>
                <td>{item.tinhThanh}</td>
                <td>{item.quocGia}</td>

                <td><img src={item.hinhAnh} width="50px" height="50px" alt="" onClick={() => handleUpdateImage(item.id)}/></td>
                <td>
                  <button onClick={() => handleDelete(item.id)}>
                    <BsTrash className="delete-icon" />
                  </button>
                  <button>
                    <AiOutlineEdit className="edit-icon" onClick={() => handleUpdate(item)}/>
                  </button>
                </td>
              </tr>
            )) :  <td style={{textAlign:'center',padding:'20px'}}>loading ...</td>}

          
        </tbody>
      </table>
      <div className="pagination">
            <Pagination
              totalPages={Number(locationFilterSearch.length)}
              postPerPage={postPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
    </div>
  )
}

export default TableLocationAdmin