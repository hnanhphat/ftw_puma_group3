import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import IssueList from "./components/IssueList";
import React, { useState, useEffect } from "react";
import SearchForm from "./components/SearchForm";
import "bootstrap/dist/css/bootstrap.min.css";
import { Alert } from "react-bootstrap";

function App() {
  console.log("this is app render");
  const [issues, setIssues] = useState([]);
  const [searchInput, setSearchInput] = useState("facebook/react");
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  // when client hit enter after input. This re-render to take value with own Rule
  const handleSubmit = (e) => {
    e.preventDefault();
    // searchInput = owner/repo
    const temp = searchInput.split("/");
    if (temp.length === 2) {
      setOwner(temp[0]);
      setRepo(temp[1]);
    } else if (temp.length === 5) {
      setOwner(temp[3]);
      setRepo(temp[4]);
    } else {
      setErrorMessage("Wrong format of search input");
    }
  };

  useEffect(() => {
    console.log("this is useEffect");
    if (!owner || !repo) return; //in the first time if we dont have owner or repo We STOP here and fuction getIssues() will not run
    const getIssues = async () => {
      try {
        const url = `https://api.github.com/repos/${owner}/${repo}/issues?page=1&per_page=20`;
        const res = await fetch(url);
        const data = await res.json();
        // everytime we call API, we need to check with 200 "It's mean ok"
        if (res.status === 200) {
          setIssues(data);
          setErrorMessage("");
          console.log(data);
          return;
        }
        setErrorMessage("can not get data, status is not 200");
      } catch (error) {
        console.log("error!!!", error.message);
        setErrorMessage(error.message);
      }
    };
    getIssues();
  }, [owner, repo]);

  return (
    <div id="wrap">
      <Header logo={logo} />
      {errorMessage ? <Alert variant="danger">{errorMessage}</Alert> : <></>}
      <SearchForm
        searchInput={searchInput}
        handleSearch={handleSearch}
        handleSubmit={handleSubmit}
      />

      <div className="issues">
        <IssueList itemList={issues} />
      </div>
    </div>
  );
}

export default App;
