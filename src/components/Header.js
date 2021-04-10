import React from 'react'

const Header = ({status}) => {
  return (
    <header className={status}>
      <a href="." className="logo">
      </a>
      <div className="hamburger">
        <input type="checkbox" name="hamburger"/>
        <span></span>
      </div>
    </header>
  )
}

export default Header
