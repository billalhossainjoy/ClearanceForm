/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { forwardRef } from "react";

const Select = ({ options = [], label, className, ...props }, ref) => {
  return (
    <div className="flex flex-col my-2">
      {label && <label className="">{label}</label>}
      <select
        name=""
        id=""
        className="rounded py-1 px-2 border border-gray-300"
        ref={ref}
        {...props}
      >
        {options?.map((option, index) => (
          <option key={index} value={option} className="">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default forwardRef(Select);
