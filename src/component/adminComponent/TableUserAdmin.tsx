import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../store/store";
import { deleteUser, getAllUsedApi } from "../../redux/userReducer";

import ModalAddUser from "./ModalAddUser";
import { changeComponent, setIsOpen } from "../../redux/modalReducer";
import { User } from "../../types/authType";
import { AiOutlineEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import Pagination from "../../component/Pagination";
import { removeVietnameseTones } from "../../util/convertViet";

const TableUserAdmin = () => {
  const dispatch: DispatchType = useDispatch();
  const { user } = useSelector((state: RootState) => state.userReducer);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postPerPage] = useState<number>(10);
  const inputSearch = useRef<string>("");
  const [userFilterSearch, setUserFilterSearch] = useState<User[]>([]);
  const [loadingTable, setLoadingtable] = useState<boolean>(false);

  console.log(userFilterSearch);
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;

  useEffect(() => {
    dispatch(getAllUsedApi());
  }, []);

  const openModal = () => {
    dispatch(changeComponent(<ModalAddUser type="addUser" />));
    dispatch(setIsOpen(true));
  };

  const handleDelete = (id: number) => {
    dispatch(deleteUser(id));
  };

  const handleSearch = () => {
    setLoadingtable(true);
    const userFilterSearch = user.filter((item: User) => {
      const inputSearchLowercase = removeVietnameseTones(
        inputSearch.current.toLowerCase()
      );
      const name: string = removeVietnameseTones(item.name.toLocaleLowerCase());
      const gender: string = item.gender === true ? "nam" : "nữ";

      //console.log(format(new Date(item.birthday), 'dd/MM/yyyy').toString().includes(inputSearchLowercase))

      return (
        name === inputSearchLowercase ||
        item.email === inputSearchLowercase ||
        item.id.toString() === inputSearchLowercase ||
        gender === inputSearchLowercase
      );
    });

    setUserFilterSearch(userFilterSearch);

    setTimeout(() => {
      setLoadingtable(false);
    }, 1000);
  };

  const handleEdit = (item: User) => {
    dispatch(changeComponent(<ModalAddUser type="editUser" item={item} />));
    dispatch(setIsOpen(true));
  };
  return (
    <div className="table__user__admin">
      <div className="table__user__admin__wrapper">
        <div className="btn__add-user" onClick={openModal}>
          thêm người dùng
        </div>

        <div className="table__user__search">
          <input
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              (inputSearch.current = e.target.value)
            }
          />
          <button onClick={handleSearch}>Tìm kiếm</button>
        </div>
      </div>

      <table className="styled-table">
        <thead>
          <tr>
            <th>Mã người dùng</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Ngày sinh</th>
            <th>Giới tính</th>
            <th>Chỉnh sữa</th>
          </tr>
        </thead>
        <tbody>
          {!loadingTable ? (
            (userFilterSearch.length === 0 ? user : userFilterSearch)
              .slice(firstPostIndex, lastPostIndex)
              .map((item: User, index: number) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.birthday}</td>

                  <td>{item.gender === true ? "nam" : "nữ"}</td>
                  <td>
                    <button onClick={() => handleDelete(item.id)}>
                      <BsTrash className="delete-icon" />
                    </button>
                    <button>
                      <AiOutlineEdit
                        className="edit-icon"
                        onClick={() => handleEdit(item)}
                      />
                    </button>
                  </td>
                </tr>
              ))
          ) : (
            <td style={{ textAlign: "center", padding: "20px" }}>
              loading ...
            </td>
          )}
        </tbody>
      </table>
      <div className="pagination">
        <Pagination
          totalPages={Number(
            (inputSearch.current.length === 0 ? user : userFilterSearch).length
          )}
          postPerPage={postPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default TableUserAdmin;
