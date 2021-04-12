import React from 'react'

const FirstView = (props) => {
  return (
    <div ref={props.id} className="first-view">
      <div className="first-view__box">
        <h1 className="heading-primary">
          <span className="heading-primary--main">Github Issues</span>
          <span className="heading-primary--sub">The No. 1 search bar in Vietnam</span>
        </h1>
        <form onSubmit={props.handleSubmit}>
          <label className={props.error ? 'show' : ''}><span>{props.mess ? props.mess : 'Correct.'}</span></label>
          <input type="text" value={props.searchInput} onChange={props.handleSearch} placeholder="owner/repo"/>
          <button type="submit" className="btn btn--white">Search</button>
        </form>
      </div>
    </div>
  )
}

export default FirstView
