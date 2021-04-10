import logo from './img/logo.png';
import "./App.css";
import Header from './components/Header';
import FirstView from './components/FirstView';
import ItemList from './components/ItemList';
import PaginationBar from './components/PaginationBar';
import Footer from './components/Footer';
import { useState, useEffect } from 'react';


function App() {
  const [headerStatus, setHeaderStatus] = useState('');
  
  const [issues, setIssues] = useState([]);
  const [issueTitle, setIssueTitle] = useState('Welcom Github Issues')
  const [searchInput, setSearchInput] = useState("facebook/react");

  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const [loading, setLoading] = useState(false);

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
      const url = `https://api.github.com/repos/${owner}/${repo}/issues?page=${currentPage}&per_page=5`;
      const res = await fetch(url);
      const data = await res.json();
      if (res.status === 200) {
        setIssues(data);
        setErrorMessage("");
        if(res.status === 200) {
          const resLink = res.headers.get("link");
          if(resLink) {
            const getTotalPage = resLink.match(/page=(\d+)&per_page=\d+>; rel="last"/);
            if (getTotalPage) {
              setTotalPage(parseInt(getTotalPage[1]));
            }
          }
        }
        setLoading(true);
        setIssueTitle(`~${5 * totalPage} results found`);
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
  }, [owner, repo, currentPage, totalPage]);

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
        <div className="issues">
          {loading ? '' : ''}

          {issues ? <ItemList itemList={issues} titleResult={issueTitle} /> : ''}

          {totalPage > 1 ? 
            <PaginationBar
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPage={totalPage}
            />
          : ''}
        </div>
      </main>
      <Footer logo={logo} />
    </div>
  );
}

export default App;
