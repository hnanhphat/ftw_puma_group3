import React from 'react'
import Moment from "react-moment";

const ItemList = ({ itemList, titleResult }) => {
  return (
    <div className="main-content">
      <h2 className="heading-secondary">{titleResult}</h2>
      <ul className="issues">
        {itemList && itemList.map((item) =>
          <li key={item.id}>
            <div className="info">
              <figure className="info__shape">
                <img src={item.user.avatar_url} alt={item.user.login}/>
                <figcaption>@{item.user.login}</figcaption>
              </figure>
              <div className="info__txt">
                <h3 className="heading-tertiary">#{item.number} {item.title}</h3>
                <p className="time">Last update: <Moment fromNow>{item.updated_at}</Moment> - Comment: {item.comments}</p>
                <p className="des">{item.body}</p>
                <p className="tag">
                  <span>CLA Signed</span>
                  {item.labels.map((item) => <span key={item.id}>{item.name}</span>)}
                </p>
              </div>
            </div>
          </li>
        )}
      </ul>
    </div>
  )
}

export default ItemList
