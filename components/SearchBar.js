import React from 'react';
import { BiSearchAlt } from "react-icons/bi";

const SearchBar = ({ setSearchTerm, searchBy }) => {
  return (
    <div className="flex gap-8 items-center">
        <p className="text-xl">Search by {searchBy}:</p>
        <div className="flex items-center justify-center border-black border bg-gray-200 p-2 my-2 rounded-md shadow-lg">
        <BiSearchAlt className="text-gray-500" />
        <input 
            className="bg-transparent outline-none px-2 w-full" 
            type="text" 
            placeholder="Search..." 
            onChange={(e) => setSearchTerm(e.target.value)}
        />
        </div>
    </div>
  );
}

export default SearchBar;
