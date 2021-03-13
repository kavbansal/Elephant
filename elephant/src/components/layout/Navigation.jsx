import React, { useContext } from "react";
import { Nav, Navbar } from "react-bootstrap";


const Navigation = () => {

  return (
    //<div>
    <React.Fragment>
      <Navbar expand="lg" fixed="top">
        <Navbar.Brand href="/">Elephant</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/add">About</Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link href="/schools">Schools</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      
    </React.Fragment>

  );
};

export default Navigation;
