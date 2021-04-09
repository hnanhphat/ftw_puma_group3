import React from 'react'

const FirstView = () => {
  return (
    <div className="first-view">
      <div className="first-view__box">
        <h1 className="heading-primary">
          <span className="heading-primary--main">Github Issues</span>
          <span className="heading-primary--sub">Let's see about github issues</span>
        </h1>
        <input type="text"/>
        <button class="btn btn--white">Search</button>
      </div>
    </div>
  )
}

export default FirstView
