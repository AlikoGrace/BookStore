import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="layout">
      <NavBar />
      <main>
        <h1>CONTENT</h1>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
