import logo from './logo.svg';
import "./App.css";
import Header from './components/Header';
import IssueList from './components/IssueList';
import React, { useState, useEffect } from 'react'

function App() {
  const [issues, setIssues] = useState([])

  const getIssues = async () => {
    try {
      const url = `https://api.github.com/repos/facebook/react/issues?page=1&per_page=20`;
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

  return (
    <div id="wrap">
      <Header logo={logo} />
      <div className="issues">
        <IssueList itemList={issues} />

      </div>
    </div>
  );
}

export default App;
