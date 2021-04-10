import React from "react";
import Moment from "react-moment";
import { Media } from "react-bootstrap";

const ItemList = ({ itemList, showDetail }) => {
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
    <div className="main-content">
      <h2 className="heading-secondary">1000 Results</h2>
      <ul className="issues">
        <Media as="li" onClick={() => showDetail(item)}>
          <div className="info">
            <figure className="info__shape">
              <img src={item.user.avatar_url} alt="Generic placeholder" />
              <figcaption>@{item.user.login}</figcaption>
            </figure>
            <div className="info__txt">
              <h3 className="heading-tertiary">
                <span>#{item.number}</span>
                <span>{item.title}</span>
              </h3>
              <p className="time">
                Last update <Moment fromNow>{item.updated_at}</Moment>
              </p>
              <p className="des">
                {item.body.lenght <= 99
                  ? item.body
                  : item.body.slice(0, 99) + "..."}
              </p>
              <p className="tag">
                {item.labels.map((label) => (
                  <span className="comment-badge">{label.name}</span>
                ))}
              </p>
            </div>
          </div>
        </Media>
      </ul>
    </div>
  );
};

export default ItemList;
