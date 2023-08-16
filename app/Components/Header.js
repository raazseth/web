"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaAngleDown, FaAngleRight, FaRegBell } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import Link from "next/link";

const Header = () => {
  const [auth, setauth] = useState({});
  const [showSidebar, setshowSidebar] = useState(false);
  const ref = useRef();

  useEffect(() => {
    if (window !== undefined) {
      setauth(JSON.parse(window.localStorage.getItem("user")));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setshowSidebar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const Sidebars = [
    {
      name: "My Profile",
      link: "/",
      icon: <FaAngleRight size={20} />,
    },
    {
      name: "Connections",
      link: "/connections",
      icon: <FaAngleRight size={20} />,
    },
  ];
  const handleLogout = () => {
    window.localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="flex flex-row w-full ">
      <AiOutlineMenu
        onClick={() => setshowSidebar(!showSidebar)}
        size={24}
        className="md:hidden my-auto cursor-pointer"
      />
      {showSidebar && (
        <div
          ref={ref}
          className="w-1/2 h-screen bg-white p-4 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] fixed top-0 left-0 lg:hidden md:flex flex-col"
        >
          {Sidebars.map((sidebar, index) => (
            <Link key={index} href={sidebar.link}>
              <div
                className={`flex items-center justify-start p-2 my-2 rounded-lg hover:bg-gray-200 cursor-pointer`}
              >
                <div>{sidebar.icon}</div>
                <div className="ml-2 text-sm font-semibold">{sidebar.name}</div>
              </div>
            </Link>
          ))}
          <div>
            <div
              onClick={handleLogout}
              className="ml-2 mt-[78vh] text-sm font-semibold cursor-pointer text-[red]"
            >
              Logout
            </div>
          </div>
        </div>
      )}

      <FaRegBell size={24} className="my-auto ml-auto" />
      <div className="border border-zinc-200 p-[2px] px-2 ml-4 rounded flex flex-row ">
        <img
          src={
            auth.picture
              ? auth.picture
              : "https://res.cloudinary.com/dybxqfdaw/image/upload/v1692097363/Test/man_y9hd89.png"
          }
          alt="user-dp"
          className="h-7 my-auto"
        />
        <div className="mx-2 my-auto">
          <p className="text-[11.5px] text-zinc-400">Welcome Back,</p>
          <p className="text-[15px] font-[500]">{auth.fullName}</p>
        </div>
        <FaAngleDown size={20} color="gray" className="my-auto ml-8" />
      </div>
    </div>
  );
};

export default Header;
