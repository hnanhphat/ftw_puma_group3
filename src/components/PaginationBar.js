import React from "react";
import { Pagination } from "react-bootstrap";

const PaginationBar = ({ currentPage, setCurrentPage, totalPage }) => {
  const handleClick = (page) => {
    setCurrentPage(parseInt(page));
  };

  const handleClickOnFirst = () => {
    setCurrentPage(1);
  };

  const handleClickOnLast = () => {
    setCurrentPage(totalPage);
  };

  const handleClickOnNext = () => {
    if (currentPage < totalPage) {
      setCurrentPage((num) => num + 1);
    }
  };
  
  const handleClickOnPrev = () => {
    if (currentPage > 1) {
      setCurrentPage((num) => num - 1);
    }
  };

  return (
    <Pagination>
      <Pagination.First disabled={currentPage === 1} onClick={handleClickOnFirst} />
      <Pagination.Prev disabled={currentPage === 1} onClick={handleClickOnPrev} />
      <Pagination.Item active={currentPage === 1} onClick={() => handleClick(1)}>{1}</Pagination.Item>

      {currentPage - 2 > 1 && <Pagination.Ellipsis />}

      {currentPage - 1 > 1 && (<Pagination.Item active={currentPage === currentPage - 1} onClick={() => handleClick(currentPage - 1)}>{currentPage - 1}</Pagination.Item>)}
      {currentPage > 1 && currentPage < totalPage && (<Pagination.Item active>{currentPage}</Pagination.Item>)}
      {currentPage + 1 < totalPage && (<Pagination.Item active={currentPage === currentPage + 1} onClick={() => handleClick(currentPage + 1)}>{currentPage + 1}</Pagination.Item>)}

      {totalPage > currentPage + 2 && <Pagination.Ellipsis />}

      {totalPage > 1 && (<Pagination.Item active={currentPage === totalPage} onClick={() => handleClick(totalPage)}>{totalPage}</Pagination.Item>)}
      <Pagination.Next disabled={currentPage === totalPage} onClick={handleClickOnNext} />
      <Pagination.Last disabled={currentPage === totalPage} onClick={handleClickOnLast} />
    </Pagination>
  );
};

export default PaginationBar;