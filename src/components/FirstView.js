import React from 'react'

const FirstView = (props) => {
  return (
    <div className="first-view">
      <div className="first-view__box">
        <h1 className="heading-primary">
          <span className="heading-primary--main">Github Issues</span>
          <span className="heading-primary--sub">Let's see about github issues</span>
        </h1>
        <form onSubmit={props.handleSubmit}>
          <label className={props.error ? 'show' : ''}><span>{props.mess ? props.mess : 'Correct.'}</span></label>
          <input type="text" value={props.searchInput} onChange={props.handleSearch} placeholder="Github Repository"/>
          <button type="submit" className="btn btn--white">Search</button>
        </form>
      </div>
    </div>
  )
}

export default FirstView
