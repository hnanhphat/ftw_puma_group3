import React from "react";
import { Media, Modal } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import Moment from "react-moment";
import Loading from './Loading';

const IssueModal = ({issue, comments, loadingComments, showModal, setShowModal, handleMore, disableShowMore}) => {
  return (
    issue && (
      <Modal size="xl" show={showModal} onHide={() => setShowModal(false)} aria-labelledby="issue-detail-modal">
        <Modal.Header closeButton><Modal.Title id="issue-detail-modal">#{issue.number} {issue.title}</Modal.Title></Modal.Header>
        <Modal.Body>
          <ReactMarkdown source={issue.body} />
          <h4 className="cmt">Comments:</h4>
          <ul className="list-cmts">
            {comments && comments.length ? (
              comments.map((comment) => (
                <Comments key={comment.id} {...comment} />
              ))
            ) : (<li>There are no comments of this issue</li>)}
          </ul>
          <div>{loadingComments ? (<Loading />) : (<div>{!disableShowMore && (<button onClick={handleMore} disabled={disableShowMore} className="btn btn--green">Show more</button>)}</div>)}</div>
        </Modal.Body>
      </Modal>
    )
  );
};

const Comments = ({ user, body, created_at }) => {
  return (
    <Media as="li">
      <img src={user.avatar_url} alt="User Avatar" />
      <Media.Body>
        <span className="time">@{user.login} - Commented <Moment fromNow>{created_at}</Moment></span>
        <ReactMarkdown source={body} />
      </Media.Body>
    </Media>
  );
};

export default IssueModal;