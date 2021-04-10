import React from "react";
import Moment from "react-moment";
import ReactMarkdown from "react-markdown";
import { Modal, Media, Button } from "react-bootstrap";

const IssueModal = ({
  issue,
  comments,

  showModal,
  setShowModal,
  handleMore,
  disableShowMore,
}) => {
  return (
    issue && (
      <Modal
        size="xl"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="issue-detail-modal"
      >
        <Modal.Header className="modal-container" closeButton>
          <Modal.Title>
            <span>#{issue.number} </span>
            <span>{issue.title}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReactMarkdown source={issue.body} />
          <hr />
          <div>
            <h4>Comments:</h4>
            <ul className="list-unstyled">
              {comments && comments.length ? (
                comments.map((comment) => (
                  <Comments key={comment.id} {...comment} />
                ))
              ) : (
                <li>There are no comments of this issue</li>
              )}
            </ul>
          </div>
          <div className="d-flex justify-content-center">
            {!disableShowMore && (
              <Button
                type="button"
                onClick={handleMore}
                disabled={disableShowMore}
              >
                Show More
              </Button>
            )}
          </div>
        </Modal.Body>
      </Modal>
    )
  );
};

const Comments = ({ user, body, created_at }) => {
  return (
    <Media as="li">
      <img className="comment-avatar" src={user.avatar_url} alt="User Avatar" />
      <Media.Body>
        <div>
          <span>@{user.login}</span>
          <span>
            <Moment fromNow>{created_at}</Moment>
          </span>
        </div>
        <ReactMarkdown source={body} />
      </Media.Body>
    </Media>
  );
};
export default IssueModal;
