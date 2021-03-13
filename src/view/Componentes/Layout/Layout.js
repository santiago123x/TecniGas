import React from "react";
import Nav from "../NavBar/Nav";
import "./Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="contenedor">
      <div className="nav-contenedor">
        <Nav className="nav" />
      </div>
      {children}
    </div>
  );
};

export default Layout;
