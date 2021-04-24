import React from "react";
import Nav from "../NavBar/Nav";
import "./Layout.css";

const Layout = ({ children, tipo }) => {
  return (
    <div className="contenedor">
      <div className="nav-contenedor">
        <Nav className="nav" tipo={tipo} />
      </div>
      <div className="chil-contenedor">{children}</div>
    </div>
  );
};

export default Layout;
