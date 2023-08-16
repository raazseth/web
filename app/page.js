"use client";
import { useEffect, useState } from "react";
import Layout from "./Components/Layout";

export default function Home() {
  const [auth, setauth] = useState({});

  useEffect(() => {
    if (window !== undefined) {
      const token = window.localStorage.getItem("token");
      setauth(JSON.parse(window.localStorage.getItem("user")));

      if (!token) {
        window.location.href = "/login";
      }
    }
  }, []);

  return (
    <Layout>
      <div className="flex flex-col  min-h-screen py-2">
        <div className="w-full h-60 flex rounded-lg	 mt-2 items-center justify-center bg-gradient-to-br from-blue-500 to-purple-700" />
        <div className="w-[80%] h-[auto] rounded flex p-3 flex-row bg-white mt-[-80px] ml-auto mr-auto shadow-lg">
          <div className="w-1/2 h-[auto] mr-1 flex flex-col ">
            <div className="flex flex-row">
              <img
                className="h-[100px] w-[100px] rounded-[50%] mr-auto"
                src={auth.picture}
                alt="profile"
              />
              <button className="bg-gray-300 h-[32px] my-auto w-[100px] hover:bg-gray-400 text-gray-700 font-[600] px-2 rounded-[24px] shadow-none focus:outline-none focus:ring focus:border-blue-500">
                <span className="text-[14px]">Edit</span>
              </button>
            </div>

            <div className="flex p-3 space-x-4 border rounded-lg my-5">
              <div className="flex-1">
                <div className="mb-4 flex flex-row">
                  <div>
                    <label className="text-gray-600 font-medium">Email:</label>
                    <p className="text-gray-600">user@example.com</p>
                  </div>
                  <button className="bg-gray-300 h-[24px] ml-auto my-auto w-[60px] hover:bg-gray-400 text-gray-700 font-[600] px-1 rounded-[12px] shadow-none focus:outline-none focus:ring focus:border-blue-500">
                    <span className="text-[12px]">Edit</span>
                  </button>
                </div>
                <div className="mb-4 flex flex-row">
                  <div>
                    <label className="text-gray-600 font-medium">Phone:</label>
                    <p className="text-gray-600">123-456-7890</p>
                  </div>
                  <button className="bg-gray-300 h-[24px] ml-auto my-auto w-[60px] hover:bg-gray-400 text-gray-700 font-[600] px-1 rounded-[12px] shadow-none focus:outline-none focus:ring focus:border-blue-500">
                    <span className="text-[12px]">Edit</span>
                  </button>
                </div>
                <div className="mb-4 flex flex-row">
                  <div>
                    <label className="text-gray-600 font-medium">
                      Full Name:
                    </label>
                    <p className="text-gray-600">John Doe</p>
                  </div>
                  <button className="bg-gray-300 h-[24px] ml-auto my-auto w-[60px] hover:bg-gray-400 text-gray-700 font-[600] px-1 rounded-[12px] shadow-none focus:outline-none focus:ring focus:border-blue-500">
                    <span className="text-[12px]">Edit</span>
                  </button>
                </div>
              </div>
            </div>

           <div className="flex p-3 space-x-4 border rounded-lg my-3">
           <div className="flex flex-row w-full">
                <h3 className="text-gray-600 font-medium">About</h3>
                <button className="bg-gray-300 h-[32px] ml-auto my-auto w-[100px] hover:bg-gray-400 text-gray-700 font-[600] px-2 rounded-[24px] shadow-none focus:outline-none focus:ring focus:border-blue-500">
                  <span className="text-[14px]">Edit</span>
                </button>
              </div>
              <p>{auth.about}</p>
            </div> 

            <div className="flex p-3 space-x-4 border rounded-lg my-3">
            <div className="flex flex-row w-full">
                <h3 className="text-gray-600 font-medium">Skills</h3>
                <button className="bg-gray-300 h-[32px] ml-auto my-auto w-[100px] hover:bg-gray-400 text-gray-700 font-[600] px-2 rounded-[24px] shadow-none focus:outline-none focus:ring focus:border-blue-500">
                  <span className="text-[14px]">Edit</span>
                </button>
              </div>
              {auth.skills &&
                auth.skills.map((skill, index) => <p key={index}>{skill}</p>)}
            </div>
          </div>
          <div className="w-[44%] h-[auto] ml-[auto] flex flex-col ">

          <div className="flex p-3 space-x-4 border rounded-lg my-3">
              <div className="flex flex-col w-[78%]">
                <h3 className="text-gray-600 font-medium">
                  Proffesional Details 
                </h3>
                <p>
                  This is the proffesional details of the user.
                </p>

              </div>
             
            </div>

              <div className="flex flex-row w-full">
                <h3>
                  Certifications
                </h3>
                <button className="bg-gray-300 h-[32px] ml-auto my-auto w-[100px] hover:bg-gray-400 text-gray-700 font-[600] px-2 rounded-[24px] shadow-none focus:outline-none focus:ring focus:border-blue-500">
                  <span className="text-[14px]">Edit</span>
                </button>
              </div>
            <div className="flex p-3 space-x-4 border rounded-lg my-3">
              {
                auth.certifications && auth.certifications.map((certification, index) => <p key={index}>{certification}</p>)
              }
            </div>


            <div className="flex flex-row w-full">
                <h3>
                  Experience
                </h3>
                <button className="bg-gray-300 h-[32px] ml-auto my-auto w-[100px] hover:bg-gray-400 text-gray-700 font-[600] px-2 rounded-[24px] shadow-none focus:outline-none focus:ring focus:border-blue-500">
                  <span className="text-[14px]">Edit</span>
                </button>
              </div>
            <div className="flex p-3 space-x-4 border rounded-lg my-3">
              {
                auth.experience && auth.experience.map((experience, index) => <p key={index}>{experience}</p>)
              }
            </div>



            <div className="flex flex-row w-full">
                <h3>
                  Education
                </h3>
                <button className="bg-gray-300 h-[32px] ml-auto my-auto w-[100px] hover:bg-gray-400 text-gray-700 font-[600] px-2 rounded-[24px] shadow-none focus:outline-none focus:ring focus:border-blue-500">
                  <span className="text-[14px]">Edit</span>
                </button>
              </div>
            <div className="flex p-3 space-x-4 border rounded-lg my-3">
              {
                auth.education && auth.education.map((education, index) => <p key={index}>{education}</p>)
              }
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
}
