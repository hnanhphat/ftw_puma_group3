import logo from './logo.svg';
import "./App.css";
import Header from './components/Header';
import IssueList from './components/IssueList';
import React, { useState, useEffect } from 'react'


import ReactPaginate from 'react-paginate';

function App() {
  const [issues, setIssues] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState("")


  const getIssues = async () => {


    try {
      const url = `https://api.github.com/repos/facebook/react/issues?page=${(currentPage)}&per_page=5`;
      const res = await fetch(url);
      const data = await res.json();
      console.log('current page:', (currentPage))
      console.log(data);
      setIssues(data);
    } catch (error) {
      console.log("message:", error);
    }
  }

  useEffect(() => {
    getIssues();
  }, []);

  const handlePageChange = async (selectedObject) => {
    setLoading("loading")
    setCurrentPage((selectedObject.selected + 1))
    console.log('page clicked:', (selectedObject.selected + 1))
    setIssues("")
    await getIssues()
    setLoading("done")
  };

  return (
    <div id="wrap">
      <Header logo={logo} />
      <div className="issues">
        {/* exchange "loding..." with a spinner in the future */}
        {loading === "loading" ? <h1>loading...</h1>
          : ''}

        {issues ? <IssueList itemList={issues} />
          : ""}

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
