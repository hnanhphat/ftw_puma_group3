import moment from "moment";
import React from "react";
// import Modal from "./components/Modal";

const IssueList = ({ itemList }) => {
  return (
    <ul className="list-unstyled">
      {itemList.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </ul>
  );
};

const Item = ({ item }) => {
  return (
    <div>
      <div>
        <li className="issue mb-5 media">
          <img
            width="150px"
            height="150px"
            className="avatar mr-3"
            src={item.user.avatar_url}
            alt="Generic placeholder"
          />
          <div className="text-left media-body">
            <h4>
              <span className="mr-2">#{item.number}</span>
              <span>{item.title}</span>
            </h4>

            <div className="content-body">
              <span className="text-grey mr-2">@{item.user.login} </span>
              <span className="text-grey mr-2">
                Last updated:{" "}
                {moment(item.updated_at).startOf("hour").fromNow()}
              </span>
              <span className="text-grey">Commentss: {item.comments}</span>
              <p ClassName="issue-body">{item.body}</p>

              <div className="content-footer">
                {item &&
                  item.labels.map((label) => (
                    <span className="badge badge secondary" color="fbca04">
                      {label.name}{" "}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </li>

        {/* <div>
          <Modal />
        </div> */}
      </div>
    </div>
  );
};
export default IssueList;
