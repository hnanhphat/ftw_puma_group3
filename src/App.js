import './App.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios'

// const API_KEY = process.env.REACT_APP_API_KEY

function App() {
  const [issues, setIssues] = useState(null)

  const getIssues = async () => {
    try {

      const res = await axios.get('https://api.github.com/repos/facebook/react/issues?page=$1&per_page=20')
      // https://api.github.com/repos/${owner}/${repo}/issues?page=${pageNum}&per_page=20
      setIssues(res.data)
      console.log(res.data)
    }
    catch (err) {
      setIssues("ERROR!")
      console.log(issues)
    }

  }

  useEffect(() => {
    getIssues()
  }, [])

  return (
    <div className="container">

    </div>
  );
}

export default App;
