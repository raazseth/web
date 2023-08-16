import Link from "next/link";
import React from "react";
import { FaAngleRight } from "react-icons/fa";

const Sidebar = () => {
 
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

  return (
    <div className="w-2/12 h-screen p-4 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] sticky top-0">
      {Sidebars.map((sidebar, index) => (
        <Link key={index} href={sidebar.link}>
          <div
            className={`flex items-center  justify-start p-2 my-2 rounded-lg hover:bg-gray-200 cursor-pointer`}
          >
            <div>{sidebar.icon}</div>
            <div className="ml-2 text-sm font-semibold">{sidebar.name}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
