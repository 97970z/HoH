import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";

const navbarStyle = {
  display: "flex",
  justifyContent: "space-between",
};

const logoStyle = {
  cursor: "pointer",
  fontSize: "1.5rem",
  fontWeight: "bold",
};

const navStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
};

const buttonStyle = {
  width: "70px",
  height: "25px",
  margin: "0 10px",
  fontSize: "1rem",
  fontWeight: "bold",
  borderRadius: "5px",
  border: "none",
  backgroundColor: "#ffffff",
  cursor: "pointer",
  fontFamily: "강원교육모두 OTF",
};

const Header = ({ onNavigate }) => {
  return (
    <Navbar>
      <Navbar bg="light" expand="lg" style={navbarStyle}>
        <Navbar.Brand style={logoStyle} onClick={() => onNavigate("home")}>
          HoH : Helper of Homework
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" style={navStyle}>
            <Button
              style={buttonStyle}
              onClick={() => onNavigate("ask-question")}
            >
              질문하기
            </Button>
            <Button
              style={buttonStyle}
              onClick={() => onNavigate("answer-question")}
            >
              답변하기
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <hr></hr>
    </Navbar>
  );
};

export default Header;
