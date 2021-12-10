import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import "./pagination.scss";

const Pagination = () => {
  const [changePage, setChangePage] = useState(1);
  const handlePageClick = (data) => {
    setChangePage(data.selected);
    //console.log(data.selected);
  };
  console.log(changePage);
  return (
    <div className="pagination">
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={10}
        onPageChange={handlePageClick}
        //class names
        containerClassName={"paginateBtn"}
        previousLinkClassName="previousBtn"
        nextLinkClassName="nextBtn"
        activeClassName="paginationActive"
      />
    </div>
  );
};

export default Pagination;
