import React from "react";

const IssueList = ({ itemList }) => {
  // console.log(itemList);
  return (
    <ul className="list-unstyled">
      {itemList && itemList.map((item) => <Item key={item.id} item={item} />)}
    </ul>
  );
};

const Item = ({ item }) => {
  return (
    <div>
      <img
        width="150px"
        height="150px"
        className="mr-3"
        src={item.user.avatar_url}
        alt="Generic placeholder"
      />
      <div>
        <h5>{item.title}</h5>
        <p>{item.body}</p>
      </div>
    </div>
  );
};
export default IssueList;
