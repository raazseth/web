"use client";
import React, { useEffect, useState } from "react";
import { FaAngleDown, FaRegBell } from "react-icons/fa";

const Header = () => {
  const [auth, setauth] = useState({});

  useEffect(() => {
    if (window !== undefined) {
      setauth(JSON.parse(window.localStorage.getItem("user")));
    }
  }, []);
  console.log(auth);
  return (
    <div className="flex flex-row justify-end items-end w-full ">
      <FaRegBell size={24} className="my-auto" />
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
