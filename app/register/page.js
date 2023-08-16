"use client";
import React, { useState } from "react";
import Input from "../Components/Input";
import axios from "axios";

const Page = () => {
  const [email, setemail] = useState("");
  const [fullName, setfullName] = useState("");
  const [password, setpassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validation
    const newErrors = {};
    if (email === "") {
      newErrors.email = "Email is required";
      alert("Email is required");
    }
    if (fullName === "") {
      newErrors.fullName = "Full name is required";
      alert("Full name is required");
    }
    if (password === "") {
      newErrors.password = "Password is required";
      alert("Password is required");
    }

    // Update errors state
    setErrors(newErrors);

    // If there are no errors, proceed with form submission
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post("http://52.66.95.247/api/register", {
          email,
          fullName,
          password,
        });

        console.log("Form submitted successfully");
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        window.location.href = "/";
      } catch (error) {
        // Handle errors from the API here, e.g. show an error message
        console.error("Error submitting form:", error.message);
      }
    }
  };

  return (
    <div>
      <div className="w-full h-60 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-700" />
      <div className="w-[400px] h-[auto]  rounded flex p-3 flex-col bg-white mt-[-100px] ml-auto mr-auto shadow-lg">
        <h2 className="text-center">Register</h2>
        <Input
          value={email}
          label="Email"
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setemail(e.target.value)}
        />
        <Input
          value={fullName}
          label="Full Name"
          placeholder="Enter your full name"
          onChange={(e) => setfullName(e.target.value)}
        />
        <Input
          value={password}
          type="password"
          label="Password"
          placeholder="Enter your password"
          onChange={(e) => setpassword(e.target.value)}
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="border mt-[12px] mb-[4px] text-blue-500 font-normal py-2 px-4 rounded-lg shadow border-blue-500  hover:outline-none hover:ring hover:border-blue-500 focus:outline-none focus:ring focus:border-blue-500"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Page;
