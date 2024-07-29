import React from "react";
import "./Header.css";
import logo from "../logo.jpg";
function Header() {
  return (
    <>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>School dashboard</p>
      </header>
    </>
  );
}
export default Header;
