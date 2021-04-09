import React from 'react'

const Footer = (props) => {
  return (
    <footer>
      <a href="." className="logo">
        <img src={props.logo} alt="Github Issues"/>
      </a>
      <p className="copyright">2021 - Github Issues developed by Group 03</p>
    </footer>
  )
}

export default Footer
