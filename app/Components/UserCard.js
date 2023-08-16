import axios from "axios";
import React from "react";

const UserCard = ({ connection, auth }) => {
  const token = window.localStorage.getItem("token");
  const checkFollowing = () => {
    if (auth.connections) {
      const check = auth.connections.find(
        (conn) => conn._id === connection._id
      );
      if (check) {
        return true;
      }
    }
    return false;
  };

  const handleStatus = async () => {
    if (checkFollowing()) {
      const newAuth = auth.connections.filter(
        (conn) => conn._id !== connection._id
      );
      const newAuthId = newAuth.map((conn) => {
        return conn._id;
      });

      const response = await axios.put(
        "http://52.66.95.247/api/c/update",
        {
          connections: newAuthId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      window.localStorage.setItem("user", JSON.stringify(response.data.data));
    } else {
      const newAuth = [...auth.connections, connection];
      const newAuthId = newAuth.map((conn) => {
        return conn._id;
      });
      const response = await axios.put(
        "http://52.66.95.247/api/c/update",
        {
          connections: newAuthId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.localStorage.setItem("user", JSON.stringify(response.data.data));
    }
  };

  return (
    <div className="flex flex-row p-2 w-[300px] h-[140px] border rounded-lg">
      <div className="flex flex-col">
        <h1 className="text-[18x]">{connection.fullName}</h1>
        <h1 className="text-[14px]">{connection.about}</h1>
        {checkFollowing() ? (
          <button
            onClick={handleStatus}
            class="bg-red-500 hover:bg-red-600 text-white mt-auto text-[12px] font-[500] h-[32px] py-1 px-2 rounded-lg shadow-md focus:outline-none focus:ring focus:border-red-500"
          >
            Remove Connection
          </button>
        ) : (
          <button
            onClick={handleStatus}
            class="bg-green-500 hover:bg-green-600 text-white mt-auto text-[12px] font-[500] h-[32px] py-1 px-2 rounded-lg shadow-md focus:outline-none focus:ring focus:border-green-500"
          >
            Add Connection
          </button>
        )}
      </div>
      <img
        src={connection.picture}
        alt="profile"
        className="h-[120px] w-[120px] my-auto ml-auto"
      />
    </div>
  );
};

export default UserCard;
