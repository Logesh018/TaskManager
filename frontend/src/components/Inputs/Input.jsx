import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, label, placeholder, type, name }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const inputId = name || label?.replace(/\s+/g, "-").toLowerCase();

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={inputId} className="block text-[13px] text-slate-800 mb-1">
          {label}
        </label>
      )}

      <div className="input-box flex items-center border border-gray-300 rounded px-3 py-2">
        <input
          id={inputId}
          name={name}
          type={
            type === 'password'
              ? (showPassword ? 'text' : 'password')
              : type
          }
          placeholder={placeholder}
          className="w-full bg-transparent outline-none"
          value={value}
          onChange={onChange}
        />

        {type === "password" && (
          showPassword ? (
            <FaRegEye
              size={22}
              className="text-primary cursor-pointer"
              onClick={toggleShowPassword}
            />
          ) : (
            <FaRegEyeSlash
              size={22}
              className="text-slate-400 cursor-pointer"
              onClick={toggleShowPassword}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Input;
