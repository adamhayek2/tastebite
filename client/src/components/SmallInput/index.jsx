import React from 'react'

const SmallInput = ({ type, placeholder, value, onChange }) => {
  return (
    <input
      className= "text-xs w-32 mx-2 my-1 rounded-full border bg-white border-gray-300 px-3 py-3 focus:outline-none focus:border-gray-400 active:outline-none mr-3"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

export default SmallInput