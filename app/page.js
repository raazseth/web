"use client";
import { useEffect, useRef, useState } from "react";
import Layout from "./Components/Layout";
import axios from "axios";

export default function Home() {
  const [auth, setauth] = useState({});
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [token, settoken] = useState("");

  useEffect(() => {
    if (window !== undefined) {
      const token = window.localStorage.getItem("token");
      setauth(JSON.parse(window.localStorage.getItem("user")));
      settoken(token);

      if (!token) {
        window.location.href = "/login";
      }
    }
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleUpload = async () => {
    if (selectedImage) {
      try {
        const formData = new FormData();
        formData.append("picture", selectedImage);

        const response = await axios.put(
          "http://52.66.95.247/api/c/picture",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        window.localStorage.setItem("user", JSON.stringify(response.data.data));
        setauth(response.data.data);
        setSelectedImage(null);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };

  const handleSelectImage = () => {
    fileInputRef.current.click();
  };

  console.log(selectedImage);
  return (
    <Layout>
      <div className="flex flex-col  min-h-screen py-2">
        <div className="w-full h-60 flex rounded-lg	 mt-2 items-center justify-center bg-gradient-to-br from-blue-500 to-purple-700" />
        <div className="w-[90%] md:w-[80%] h-[auto] rounded flex flex-col md:flex-row p-3 bg-white mt-[-80px] ml-auto mr-auto shadow-lg">
          <div className="w-full md:w-1/2 h-[auto] mr-1 flex flex-col">
            <div className="flex flex-row">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              <img
                className="h-[100px] w-[100px] rounded-[50%] mr-auto"
                src={
                  selectedImage
                    ? URL.createObjectURL(selectedImage)
                    : auth.picture
                }
                alt="profile"
              />
              <div className="flex flex-col ml-auto">
                <button
                  onClick={handleSelectImage}
                  className="bg-gray-100 h-[32px] my-auto w-[100px] hover:bg-gray-300 text-gray-700 font-[600] px-2 rounded-[24px] shadow-none focus:outline-none focus:ring focus:border-blue-500"
                >
                  <span className="text-[14px]">Edit</span>
                </button>
                {selectedImage && (
                  <button
                    onClick={handleUpload}
                    className="bg-gray-100 h-[32px] my-auto w-[100px] hover:bg-gray-300 text-gray-700 font-[600] px-2 rounded-[24px] shadow-none focus:outline-none focus:ring focus:border-blue-500"
                  >
                    <span className="text-[14px]">Upload</span>
                  </button>
                )}
              </div>
            </div>

            <div className="flex p-3 space-x-4 border rounded-lg my-5">
              <div className="flex-1">
                <div className="mb-4 flex flex-row">
                  <div>
                    <label className="text-gray-600 font-medium">Email</label>
                    <p className="text-gray-600">{auth.email}</p>
                  </div>
                  <button className="bg-gray-100 h-[24px] ml-auto my-auto w-[60px] hover:bg-gray-300 text-gray-700 font-[600] px-1 rounded-[12px] shadow-none focus:outline-none focus:ring focus:border-blue-500">
                    <span className="text-[12px]">Edit</span>
                  </button>
                </div>
                <div className="mb-4 flex flex-row">
                  <div>
                    <label className="text-gray-600 font-medium">Phone</label>
                    <p className="text-gray-600">
                      {auth.phone ? auth.phone : "Not Available"}
                    </p>
                  </div>
                  <button className="bg-gray-100 h-[24px] ml-auto my-auto w-[60px] hover:bg-gray-300 text-gray-700 font-[600] px-1 rounded-[12px] shadow-none focus:outline-none focus:ring focus:border-blue-500">
                    <span className="text-[12px]">Edit</span>
                  </button>
                </div>
                <div className="mb-4 flex flex-row">
                  <div>
                    <label className="text-gray-600 font-medium">
                      Full Name
                    </label>
                    <p className="text-gray-600">
                      {auth.fullName ? auth.fullName : "Not Available"}
                    </p>
                  </div>
                  <button className="bg-gray-100 h-[24px] ml-auto my-auto w-[60px] hover:bg-gray-300 text-gray-700 font-[600] px-1 rounded-[12px] shadow-none focus:outline-none focus:ring focus:border-blue-500">
                    <span className="text-[12px]">Edit</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex p-3 space-x-4 border rounded-lg my-3">
              <div className="flex flex-row w-full">
                <h3 className="text-gray-600 font-medium">About</h3>
                <button className="bg-gray-100 h-[32px] ml-auto my-auto w-[100px] hover:bg-gray-300 text-gray-700 font-[600] px-2 rounded-[24px] shadow-none focus:outline-none focus:ring focus:border-blue-500">
                  <span className="text-[14px]">Edit</span>
                </button>
              </div>
              <p>{auth.about}</p>
            </div>

            <div className="flex p-3 space-x-4 border rounded-lg my-3">
              <div className="flex flex-row w-full">
                <h3 className="text-gray-600 font-medium">Skills</h3>
                <button className="bg-gray-100 h-[32px] ml-auto my-auto w-[100px] hover:bg-gray-300 text-gray-700 font-[600] px-2 rounded-[24px] shadow-none focus:outline-none focus:ring focus:border-blue-500">
                  <span className="text-[14px]">Edit</span>
                </button>
              </div>
              {auth.skills &&
                auth.skills.map((skill, index) => <p key={index}>{skill}</p>)}
            </div>
          </div>
          <div className="w-full md:w-[44%] h-[auto] mr-1 flex flex-col">
            <div className="flex p-3 space-x-4 border rounded-lg my-3">
              <div className="flex flex-col w-[78%]">
                <h3 className="text-gray-600 font-medium">
                  Proffesional Details
                </h3>
                <p>This is the proffesional details of the user.</p>
              </div>
            </div>

            <div className="flex flex-row w-full">
              <h3>Certifications</h3>
              <button className="bg-gray-100 h-[32px] ml-auto my-auto w-[100px] hover:bg-gray-300 text-gray-700 font-[600] px-2 rounded-[24px] shadow-none focus:outline-none focus:ring focus:border-blue-500">
                <span className="text-[14px]">Edit</span>
              </button>
            </div>
            <div className="flex p-3 space-x-4 border rounded-lg my-3">
              {auth.certifications &&
                auth.certifications.map((certification, index) => (
                  <p key={index}>{certification}</p>
                ))}
            </div>

            <div className="flex flex-row w-full">
              <h3>Experience</h3>
              <button className="bg-gray-100 h-[32px] ml-auto my-auto w-[100px] hover:bg-gray-300 text-gray-700 font-[600] px-2 rounded-[24px] shadow-none focus:outline-none focus:ring focus:border-blue-500">
                <span className="text-[14px]">Edit</span>
              </button>
            </div>
            <div className="flex p-3 space-x-4 border rounded-lg my-3">
              {auth.experience &&
                auth.experience.map((experience, index) => (
                  <p key={index}>{experience}</p>
                ))}
            </div>

            <div className="flex flex-row w-full">
              <h3>Education</h3>
              <button className="bg-gray-100 h-[32px] ml-auto my-auto w-[100px] hover:bg-gray-300 text-gray-700 font-[600] px-2 rounded-[24px] shadow-none focus:outline-none focus:ring focus:border-blue-500">
                <span className="text-[14px]">Edit</span>
              </button>
            </div>
            <div className="flex p-3 space-x-4 border rounded-lg my-3">
              {auth.education &&
                auth.education.map((education, index) => (
                  <p key={index}>{education}</p>
                ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
