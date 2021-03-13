import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  SidebarHeader,
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarContent,
  SidebarFooter,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import {
  FcStatistics,
  FcCalendar,
  FcFeedback,
  FcPortraitMode,
  FcShop,
  FcFilingCabinet,
  FcAlarmClock,
  FcEngineering,
} from "react-icons/fc";

import "./Nav.scss";
import Logo from "./log_tecnigas_40x40.ico";
import Clock from "../Clock/Clock";

const Img = () => {
  return <img src={Logo} />;
};

const Nav = () => {
  let menu = null;
  const [collap, setCollap] = useState(false);

  useEffect(() => {
    menu = document.getElementById("menu");
  }, []);

  return (
    <>
      <ProSidebar id="menu" collapsed={collap} className="nav-bar">
        <SidebarHeader>
          <Menu
            onClick={() => {
              setCollap(!collap);
              document.getElementById("menu").collapsed = { collap };
            }}
          >
            <MenuItem icon={<Img />}>
              <div className="menu-tittle">
                <h2>TecniGas</h2>
              </div>
            </MenuItem>
          </Menu>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem icon={<FcShop className="menu-icons" />}>
              Ventas
              <Link to="/ventas" />
            </MenuItem>
            <MenuItem icon={<FcPortraitMode className="menu-icons" />}>
              Perfil <Link to="/" />
            </MenuItem>
            <MenuItem icon={<FcFilingCabinet className="menu-icons" />}>
              Inventario <Link to="/inventario" />
            </MenuItem>
            <MenuItem icon={<FcCalendar className="menu-icons" />}>
              Agenda <Link to="/" />
            </MenuItem>
            <MenuItem icon={<FcFeedback className="menu-icons" />}>
              Devoluciones <Link to="/" />
            </MenuItem>
            <SubMenu
              title="Gestion"
              icon={<FcEngineering className="menu-icons" />}
            >
              <MenuItem>
                Clientes <Link to="/clientes-proveedores" />
              </MenuItem>
              <MenuItem>
                Proveedores <Link to="/clientes-proveedores" />
              </MenuItem>
              <MenuItem>
                Proveedores <Link to="/clientes-proveedores" />
              </MenuItem>
              <MenuItem>
                Proveedores <Link to="/clientes-proveedores" />
              </MenuItem>
              <MenuItem>
                Proveedores <Link to="/clientes-proveedores" />
              </MenuItem>
            </SubMenu>
            <MenuItem icon={<FcStatistics className="menu-icons" />}>
              Informes <Link to="/ventas" />
            </MenuItem>
          </Menu>
        </SidebarContent>
        <SidebarFooter className="footer">
          <Menu>
            {collap ? (
              <MenuItem
                icon={<Clock colapsado={collap} icon={true} />}
              ></MenuItem>
            ) : (
              <MenuItem icon={<FcAlarmClock className="menu-icons" />}>
                <Clock colapsado={collap} icon={false} />
              </MenuItem>
            )}
          </Menu>
        </SidebarFooter>
      </ProSidebar>
    </>
  );
};

export default Nav;
