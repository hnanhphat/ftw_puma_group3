import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
const PublicNavbar = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand className="mr-auto">
          <i class="fab fa-github fa-3x"></i>
        </Navbar.Brand>
        <Nav className="mr-auto"></Nav>
        <Nav>
          <a href="#github_repo_link" target="_blank">
            <i class="fas fa-code-branch fa-2x"></i>
          </a>
        </Nav>
      </Navbar>
    </>
  );
};

export default PublicNavbar;
