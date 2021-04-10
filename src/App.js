import logo from "./img/logo.png";
import "./App.css";
import Header from "./components/Header";
import FirstView from "./components/FirstView";

import ItemList from "./components/ItemList";
import IssueModal from "./components/IssueModal";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer";
import React, { useState, useEffect } from "react";

function App() {
  const [headerStatus, setHeaderStatus] = useState("");

  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");

  const [issues, setIssues] = useState([]);

  const [commentPageNum, setCommentPageNum] = useState(1);
  const [commentTotalPageNum, setCommentTotalPageNum] = useState(1);
  const [urlFetchComments, setUrlFetchComments] = useState("");
  const [comments, setComments] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);

  const showDetail = (item) => {
    setShowModal(true);
    if (selectedIssue?.number !== item.number) {
      setComments([]);
      setSelectedIssue(item);
      setUrlFetchComments(item.comments_url);
    }
  };

  // const handleMoreComments = () => {
  //   if (commentPageNum >= commentTotalPageNum) return;
  //   const url = `https://api.github.com/repos/${owner}/${repo}/issues/${
  //     selectedIssue.number
  //   }/comments?page=${commentPageNum + 1}&per_page=5`;
  //   setCommentPageNum((num) => num + 1);
  //   setUrlFetchComments(url);
  // };

  useEffect(() => {
    const fetchComments = async () => {
      if (!urlFetchComments && !showModal) return;

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
              setCommentTotalPageNum(parseInt(getTotalPage[1]));
            }
          }
          setComments((c) => [...c, ...data]);
        } else {
          setShowModal(false);
        }
      } catch (error) {
        setShowModal(false);
      }
    };
    fetchComments();
  }, [urlFetchComments, showModal]);

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
  };

  useEffect(() => {
    window.onscroll = () => {
      getIssues();
      if (window.scrollY > 100) {
        setHeaderStatus("active");
      } else {
        setHeaderStatus("");
      }
    };
  }, []);

  return (
    <div>
      <div id="home">
        <Header status={headerStatus} />
        <main>
          <FirstView />
          <ItemList itemList={issues} showDetail={showDetail} />
        </main>
        <IssueModal
          issue={selectedIssue}
          comments={comments}
          showModal={showModal}
          setShowModal={setShowModal}
          // handleMore={handleMoreComments}
          disableShowMore={commentPageNum === commentTotalPageNum}
        />
        <Footer logo={logo} />
      </div>
    </div>
  );
}

export default App;
