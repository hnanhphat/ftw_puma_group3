import logo from './img/logo.png';
import "./App.css";
import Header from './components/Header';
import FirstView from './components/FirstView';
import ItemList from './components/ItemList';
import ItemModal from './components/ItemModal';
import Loading from './components/Loading';
import PaginationBar from './components/PaginationBar';
import Footer from './components/Footer';
import { useState, useEffect } from 'react';


function App() {
  const [headerStatus, setHeaderStatus] = useState('');

  const [issues, setIssues] = useState([]);
  const [issueTitle, setIssueTitle] = useState('')
  const [searchInput, setSearchInput] = useState('');

  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [scrollStatus, setScrollStatus] = useState('false');

  const [cmtCurrentPage, setCmtCurrentPage] = useState(1);
  const [cmtTotalPage, setCmtTotalPage] = useState(1);
  const [urlFetchComments, setUrlFetchComments] = useState("");
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [cmtLoading, setCmtLoading] = useState(false);

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

  const showDetail = (item) => {
    setShowModal(true);
    if (selectedIssue?.number !== item.number) {
      setComments([]);
      setCmtCurrentPage(1);
      setCmtTotalPage(1);
      setSelectedIssue(item);
      setUrlFetchComments(
        `https://api.github.com/repos/${owner}/${repo}/issues/${item.number}/comments?page=1&per_page=5`
      );
    }
  };

  const handleMoreComments = () => {
    if (cmtCurrentPage >= cmtTotalPage) return;
    const url = `https://api.github.com/repos/${owner}/${repo}/issues/${selectedIssue.number}/comments?page=${cmtCurrentPage + 1}&per_page=5`;
    setCmtCurrentPage((num) => num + 1);
    setUrlFetchComments(url);
  };

  useEffect(() => {
    const getComments = async () => {
      if (!urlFetchComments && !showModal) return;
      setCmtLoading(true);
      try {
        const response = await fetch(urlFetchComments);
        const data = await response.json();
        if (response.status === 200) {
          const link = response.headers.get("link");
          if (link) {
            const getTotalPage = link.match(
              /page=(\d+)&per_page=\d+>; rel="last"/
            );
            if (getTotalPage) {
              setCmtTotalPage(parseInt(getTotalPage[1]));
            }
          }
          setComments((c) => [...c, ...data]);
          setErrorMessage(null);
        } else {
          setErrorMessage(`FETCH COMMENTS ERROR: ${data.message}`);
          setShowModal(false);
        }
      } catch (error) {
        setErrorMessage(`FETCH COMMENTS ERROR: ${error.message}`);
        setShowModal(false);
      }
      setCmtLoading(false);
    };

    getComments();
  }, [urlFetchComments, showModal])

  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY > 100) {
        setHeaderStatus('active');
      } else {
        setHeaderStatus('');
      }
    }

    const getIssues = async () => {
      if (!owner || !repo) return;
      setLoading(false);
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
          setIssueTitle(`~${5 * totalPage} results found - Page ${currentPage}`);
          setLoading(true);
          setScrollStatus('true');
          if(scrollStatus === 'true') {
            window.scrollTo({
              top: 600,
              left: 0,
              behavior: 'smooth'
            });
          }
          return;
        }
        setErrorMessage("Can not get data, status is not 200.");
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    getIssues();
  }, [owner, repo, currentPage, totalPage, scrollStatus]);

  return (
    <div id="home" className={scrollStatus}>
      <Header status={headerStatus} page={searchInput && !searchInput.includes('https://github.com/') ? `https://github.com/${searchInput}` : searchInput} readme={searchInput && !searchInput.includes('https://github.com/') ? `https://github.com/${searchInput}/blob/master/README.md` : `${searchInput}/blob/master/README.md`} class={searchInput ? '' : 'hide'}/>
      <main>
        <FirstView handleSubmit={handleSubmit} error={errorMessage ? true : false} mess={errorMessage} searchInput={searchInput} handleSearch={handleSearch} />
        <div className="issues" >
          {loading ? <ItemList itemList={issues} titleResult={issueTitle} showDetail={showDetail} /> : <Loading />}
          {loading && totalPage > 1 ? <PaginationBar currentPage={currentPage} setCurrentPage={setCurrentPage} totalPage={totalPage} /> : ''}
        </div>
      </main>
      <Footer logo={logo} />
      <ItemModal issue={selectedIssue} comments={comments} loadingComments={cmtLoading} showModal={showModal} setShowModal={setShowModal} handleMore={handleMoreComments} disableShowMore={cmtCurrentPage === cmtTotalPage} />
    </div>
  );
}

export default App;
