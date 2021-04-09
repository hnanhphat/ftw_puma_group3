import logo from './logo.svg';
import "./App.css";
import Header from './components/Header';
import IssueList from './components/IssueList';
import React, { useState, useEffect } from 'react'


import ReactPaginate from 'react-paginate';

function App() {
  const [issues, setIssues] = useState([])
  const [currentPage, setcurrentPage] = useState(1)


  const getIssues = async () => {


    try {
      const url = `https://api.github.com/repos/facebook/react/issues?page=${currentPage}&per_page=5`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setIssues(data);
    } catch (error) {
      console.log("message:", error);
    }
  }

  useEffect(() => {
    getIssues();
  }, []);

  const handlePageChange = (selectedObject) => {
    setcurrentPage(selectedObject.selected);
    getIssues();
  };

  return (
    <div id="wrap">
      <Header logo={logo} />
      <div className="issues">
        <IssueList itemList={issues} />

        <ReactPaginate
          pageCount={4}
          // pageRange={2}
          // marginPagesDisplayed={2}
          onPageChange={handlePageChange}
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
          containerClassName={'pagination'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          activeClassName={'active'}
        />


      </div>
    </div>
  );
}

export default App;
