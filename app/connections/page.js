"use client";
import { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import UserCard from "../Components/UserCard";
import axios from "axios";

export default function Page() {
  const [auth, setauth] = useState({});
  const [pageType, setpageType] = useState("Connections");
  const [requests, setrequests] = useState([]);
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

  useEffect(() => {
    const fetchRequests = async () => {
      const response = await axios.get("http://52.66.95.247/api/g/request", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setrequests(response.data.requests);
    };

    if (token) {
      fetchRequests();
    }
  }, [token]);

  const pageTypes = ["Connections", "Pending"];

  const checkPageType = () => {
    if (pageType === "Connections") {
      return auth.connections;
    } else if (pageType === "Pending") {
      return requests;
    }
  };

  return (
    <Layout>
      <div>
        {pageTypes.map((type) => (
          <button
            onClick={() => setpageType(type)}
            className={`bg-blue-500 hover:bg-blue-600 text-white mt-auto text-[12px] font-[500] h-[32px] mr-2 mb-2 py-1 px-2 rounded-[24px] shadow-md focus:outline-none focus:ring focus:border-blue-500 ${
              pageType === type ? "bg-blue-600" : ""
            }`}
          >
            {type}
          </button>
        ))}
        <div className="flex flex-row flex-wrap min-h-screen py-2">
          {checkPageType() &&
            checkPageType().map((connection) => (
              <UserCard connection={connection} auth={auth} />
            ))}
        </div>
      </div>
    </Layout>
  );
}
