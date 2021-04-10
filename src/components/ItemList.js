import React from 'react'

const ItemList = ({ itemList }) => {
  return (
    <div className="main-content">
      <h2 className="heading-secondary">1000 Results</h2>
      <ul className="issues">
        {itemList && itemList.map((item) =>
          <li key={item.id}>
            <div className="info">
              <figure className="info__shape">
                <img src="https://avatars.githubusercontent.com/u/2440089?v=4" alt="rickhanlonii"/>
                <figcaption>@rickhanlonii</figcaption>
              </figure>
              <div className="info__txt">
                <h3 className="heading-tertiary">#21207 Warn when a function whose name starts with a capital letter is passed to useState/setState</h3>
                <p className="time">Last update: 2 days ago - Comment: 1</p>
                <p className="des">## Overview Adds a flag to opt-into time-slicing by default per root.## Overview Adds a flag to opt-into time-slicing by default per root.</p>
                <p className="tag">
                  <span>CLA Signed</span>
                  <span>CLA Signed</span>
                  <span>CLA Signed</span>
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
