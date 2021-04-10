import moment from "moment";
import React from "react";
import { Media } from "react-bootstrap";
import Moment from "react-moment";

const IssueList = ({ itemList, showDetail }) => {
  return (
    <ul className="list-unstyled">
      {itemList.map((item) => (
        <Item key={item.id} item={item} showDetail={showDetail} />
      ))}
    </ul>
  );
};

const Item = ({ item, showDetail }) => {
  return (
    <div>
      <Media className="modal" onClick={() => showDetail(item)}>
        <img
          width="150px"
          height="150px"
          className="mr-3"
          src={item.user.avatar_url}
          alt="Generic placeholder"
        />

        <div className="modal-body">
          <h4>
            <span>#{item.number}</span>
            <span>{item.title}</span>
          </h4>
        </div>
        <div className="modal-content-body">
          <span>@{item.user.login}</span>
          <span>
            Last update <Moment fromNow>{item.updated_at}</Moment>
          </span>
          <span>Comment: {item.comments}</span>
          <p>
            {item.body.lenght <= 99
              ? item.body
              : item.body.slice(0, 99) + "..."}
          </p>
        </div>
        <div className="modal-footer">
          {item.labels.map((label) => (
            <span className="comment-badge">{label.name}</span>
          ))}
        </div>
      </Media>
    </div>
  );
};
export default IssueList;
