"use client";
import { useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = (props) => {
  useEffect(() => {
    if (window !== undefined) {
      const token = window.localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login";
      }
    }
  }, []);

  return (
    <div className="flex flex-row relative">
      <Sidebar />
      <div className="p-4 w-full">
        <Header />
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
