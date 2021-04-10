import React from 'react'

const Header = (props) => {
  return (
    <header className={props.status}>
      <a href="." className="logo">
      </a>
      <div className="hamburger">
        <input type="checkbox" name="hamburger"/>
        <label><span></span></label>
        <div className="bg"></div>
        <nav className="nav">
          <ul>
            <li><a href={props.page} target="_blank" rel="noreferrer"><em>01</em>Github Page</a></li>
            <li><a href={props.readme} target="_blank" rel="noreferrer"><em>02</em>Github Readme</a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
