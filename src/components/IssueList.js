import React from "react";
import { Media } from "react-bootstrap";

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
    <Media className="mt-5">
      <img
        width={150}
        height={150}
        className="mr-3"
        src={item.user.avatar_url}
        alt="Generic placeholder"
      />
      <Media.Body>
        <h5>{item.title}</h5>
        <p>{item.body}</p>
      </Media.Body>
    </Media>
  );
};
export default IssueList;
