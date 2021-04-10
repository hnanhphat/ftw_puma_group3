import logo from './img/logo.png';
import "./App.css";
import Header from './components/Header';
import FirstView from './components/FirstView';
import ItemList from './components/ItemList';
import Footer from './components/Footer';
import {useState, useEffect} from 'react';

function App() {
  const [headerStatus, setHeaderStatus] = useState('');
  const [issues, setIssues] = useState([]);
  const [searchInput, setSearchInput] = useState("facebook/react");
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
      const url = `https://api.github.com/repos/${owner}/${repo}/issues?page=1&per_page=20`;
      const res = await fetch(url);
      const data = await res.json();
      if (res.status === 200) {
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
      if(window.scrollY > 100) {
        setHeaderStatus('active');
      } else {
        setHeaderStatus('');
      }
    }

    if (owner || repo) {
      getIssues();
    }
  }, [owner, repo]);

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
        <ItemList itemList={issues} />
      </main>
      <Footer logo={logo} />
    </div>
  );
}

export default App;
