import React, { useEffect, useState,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../store/store";
import { deleteUser, getAllUsedApi } from "../../redux/userReducer";

import ModalAddUser from "./ModalAddUser";
import { changeComponent, setIsOpen } from "../../redux/modalReducer";
import { User } from "../../types/authType";
import { AiOutlineEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import Pagination from "../../component/Pagination";
import { BookRoom } from "../../types/roomReducerType";
import {format} from 'date-fns'
import { deleteBookRoom, getBookRoomApi } from "../../redux/bookRoomReducer";
import RegisterModal from "../../pages/register/RegisterModal";
import AddRoomModal from "./AddRoomModal";
import { removeVietnameseTones } from "../../util/convertViet";
 
const TableBookRoomAdmin = () => {

    const dispatch: DispatchType = useDispatch();

    const { getAllBookRoom } = useSelector((state: RootState) => state.bookRoomReducer);
  
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [postPerPage, setpostPerPage] = useState<number>(20);
    const inputSearch = useRef<string>('')
    const [bookRoomFilterSearch,setBookRoomFilterSearch] = useState<BookRoom[]>(getAllBookRoom)
    const [loadingTable,setLoadingtable] = useState<boolean>(false)
  
    console.log(getAllBookRoom)
    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;

    useEffect(() => {
      dispatch(getBookRoomApi());
    }, []);
  
    const openModal = () => {
      dispatch(changeComponent(<AddRoomModal />));
      dispatch(setIsOpen(true));
    };
  
    const handleDelete = (id: number) => {
      dispatch(deleteBookRoom(id));
      dispatch(getBookRoomApi());
    };

    const handleSearch = () => {
      setLoadingtable(true)
       const booRoomFilterSearch = getAllBookRoom.filter((item:BookRoom) => { 
        const inputSearchLowercase = removeVietnameseTones(inputSearch.current.toLowerCase())
        

        return item.id?.toString() === inputSearchLowercase  
        || format(new Date(item.ngayDen), 'dd/MM/yyyy').toString().includes(inputSearchLowercase)
        || format(new Date(item.ngayDi), 'dd/MM/yyyy').toString().includes(inputSearchLowercase)
        || item.maNguoiDung.toString() === inputSearchLowercase
        || item.soLuongKhach.toString() === inputSearchLowercase
      })
      setBookRoomFilterSearch(booRoomFilterSearch)
      setTimeout(() => {
        setLoadingtable(false)
      },1000)
    }
  return (
    <div className="table__user__admin">
       
      <div className="table__user__admin__wrapper" >

      <div className="btn__add-user" onClick={openModal}>
        Thêm phòng
      </div>

      <div className="table__user__search">
        <input type="text" onChange={(e:React.ChangeEvent<HTMLInputElement>)=> inputSearch.current = e.target.value}/>
        <button onClick={handleSearch}>Tìm kiếm</button>
      </div>
      </div>

      <table className="styled-table">
        <thead>
          <tr>
            <th>iD</th>
            <th>Mã phòng</th>
            <th>Ngày đến</th>
            <th>Ngày đi</th>
            <th>Số lượng khách</th>
            <th>Mã người dùng</th>
            <th>Chỉnh sữa</th>
          </tr>
        </thead>
        <tbody>
          {!loadingTable ? bookRoomFilterSearch
            .slice(firstPostIndex, lastPostIndex)
            .map((item: BookRoom, index: number) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.maPhong}</td>
                <td>{format(new Date(item.ngayDen), 'dd/MM/yyyy')}</td>
                <td>{format(new Date(item.ngayDi), 'dd/MM/yyyy')}</td>

                <td>{item.soLuongKhach}</td>
                <td>{item.maNguoiDung}</td>
                <td>
                  <button onClick={() => handleDelete(Number(item.id))}>
                    <BsTrash className="delete-icon" />
                  </button>
                  <button>
                    <AiOutlineEdit className="edit-icon" />
                  </button>
                </td>
              </tr>
            )) : "loading ..."}

          
        </tbody>
      </table>
      <div className="pagination">
            <Pagination
              totalPages={Number(bookRoomFilterSearch.length)}
              postPerPage={postPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
    </div>
  )
}

export default TableBookRoomAdmin