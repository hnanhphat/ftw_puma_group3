import logo from "./logo.svg";
import "./App.css";
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [issues, setIssues] = useState(null)

  const getIssues = async () => {
    try {
      const res = await axios.get('https://api.github.com/repos/facebook/react/issues?page=$1&per_page=20');
      setIssues(res.data);
      console.log(res.data);
    }
    catch (err) {
      setIssues("ERROR!");
      console.log(issues);
    }

  }

  useEffect(() => {
    getIssues();
  }, []);

  return (
    <div id="wrap">
      <Header logo={logo} />
    </div>
  );
}

export default App;
