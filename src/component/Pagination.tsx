import React from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";


type Props = {
  totalPages: number;
  postPerPage: number;
  setCurrentPage: any;
  currentPage: number;
};

const Pagination = ({
  totalPages,
  postPerPage,
  setCurrentPage,
  currentPage,
}: Props) => {
  let pages:number[] = [];
  for (let i = 1; i <= Math.ceil(totalPages / postPerPage); i++) {
    pages.push(i);
  }
  return (
    <div className="pagination">
      <ul className="pagination-list">
        <button
          className="btn-move-left"
          disabled={currentPage === pages[0] ? true : false}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <MdChevronLeft />
        </button>

        {
          
          pages.map((page:number, index:number) =>(
            <li className={currentPage === page ? 'active' : ''} key={index} onClick={()=>setCurrentPage(page)}>{page}</li>
          ))
          
        }
        <button
          className="btn-move-right"
          disabled={currentPage === pages[pages.length - 1] ? true : false}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <MdChevronRight />
        </button>
      </ul>
    </div>
  );
};

export default Pagination;
