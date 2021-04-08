import React from 'react'

const Header = (props) => {
  return (
    <header>
      <a href="." className="logo">
        <img src={props.logo} alt="Github Issues"/>
        <span>Github Issues</span>
      </a>
      <div className="search-bar"></div>
      <div className="avatar"></div>
    </header>
  )
}

export default Header
