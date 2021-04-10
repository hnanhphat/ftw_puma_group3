import logo from './img/logo.png';
import "./App.css";
import Header from './components/Header';
import FirstView from './components/FirstView';
import ItemList from './components/ItemList';
import Footer from './components/Footer';
import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';


function App() {
  const [headerStatus, setHeaderStatus] = useState('');
  const [issues, setIssues] = useState([]);
  const [searchInput, setSearchInput] = useState("facebook/react");
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  let currentPage = 1
  const [loading, setLoading] = useState("")

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const temp = searchInput.split("/");
    if (temp.length === 2) {
      setOwner(temp[0]);
      setRepo(temp[1]);
    } else if (temp.length === 5) {
      setOwner(temp[3]);
      setRepo(temp[4]);
    } else {
      setErrorMessage("Wrong format of search input.");
    }
  };

  const getIssues = async () => {
    try {
      const url = `https://api.github.com/repos/${owner}/${repo}/issues?page=${(currentPage)}&per_page=5`;
      const res = await fetch(url);
      const data = await res.json();
      if (res.status === 200) {
        console.log('current page:', (currentPage))
        setIssues(data);
        setErrorMessage("");
        return;
      }
      setErrorMessage("Can not get data, status is not 200.");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY > 100) {
        setHeaderStatus('active');
      } else {
        setHeaderStatus('');
      }
    }

    if (owner || repo) {
      getIssues();
    }
  }, [owner, repo]);

  const handlePageClick = async (selectedObject) => {
    setLoading("loading")
    currentPage = (selectedObject.selected + 1)
    console.log('page clicked:', (selectedObject.selected + 1))
    setIssues("")
    await getIssues()
    setLoading("done")
  };

  return (
    <div id="home">
      <Header
        status={headerStatus}
      // page="https://github.com/facebook/react/"
      // readme="https://github.com/facebook/react/blob/master/README.md"
      />
      <main>
        <FirstView
          handleSubmit={handleSubmit}
          error={errorMessage ? true : false}
          mess={errorMessage}
          searchInput={searchInput}
          handleSearch={handleSearch}
        />
        {/* <ItemList itemList={issues} /> */}
        <div className="issues">
          {/* exchange "loding..." with a spinner in the future */}
          {loading === "loading" ? <h1>loading...</h1>
            : ''}

          {issues ? <ItemList itemList={issues} />
            : ""}

          <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={20}
            marginPagesDisplayed={2}
            pageRangeDisplayed={4}
            onPageChange={handlePageClick}
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
      </main>
      <Footer logo={logo} />
    </div>
  );
}

export default App;
