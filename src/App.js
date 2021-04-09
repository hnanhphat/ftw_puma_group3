import "./App.css";
import PublicNavbar from "./components/PublicNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { HashLoader } from "react-spinners";
import { useEffect, useState } from "react";
import SearchForm from "./components/SearchForm";
import IssueList from "./components/IssueList";

function App() {
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("facebook/react");
  const [issues, setIssues] = useState([]);
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");

  // this function to take handle search when client change key word => change data with setSearchInput
  const handleSearch = (event) => {
    setSearchInput(event.target.value);
  };

  // When user hit enter, take the value of search form
  const handleSubmit = (event) => {
    event.preventDefault();
    // when typing something, expect to see something
    // alert(searchInput);

    setOwner(searchInput.split('/')[0])
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const url = `https://api.github.com/repos/${owner}/${repo}/issues?page=1&per_page=20`;
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        setIssues(data);
      } catch (error) {
        console.log("message:", error);
      }
      setLoading(false);
    };
    // fetchData();
  }, [owner, repo]);

  return (
    <>
      <PublicNavbar />

      <Container>
        <h1 className="text-center">Github Issues</h1>
        <SearchForm
          loading={loading}
          searchInput={searchInput}
          handleSearch={handleSearch}
          handleSubmit={handleSubmit}
        />
        {loading ? (
          <HashLoader color="#f86c6b" loading={true} size={100} />
        ) : (
          <IssueList itemList={issues} />
        )}
      </Container>
    </>
  );
}

export default App;
