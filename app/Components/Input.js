import React from "react";

const Input = (props) => {
  return (
    <div className="mt-1 mb-1">
      <label htmlFor="input" className="block text-gray-600 text-[12px] mb-2">
        {props.label}
      </label>
      <input
        type={props.type ? props.type : "text"}
        id="input"
        name="input"
        className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
      />
    </div>
  );
};

export default Input;
