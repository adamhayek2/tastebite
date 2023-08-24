import React from 'react'

const Input = ({ type, placeholder, value, onChange }) => {
  return (
    <input
    type={type}
    className= {`${type === "text" ||type === "password" ? "text-xs w-72 mb-2 rounded-full border bg-white border-gray-300 px-3 py-3 focus:outline-none focus:border-gray-400 active:outline-none" : " block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#ffd8ca] file:text-[#df0052] hover:file:bg-[#ffffff]"}`}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    />
  );
}

export default Input