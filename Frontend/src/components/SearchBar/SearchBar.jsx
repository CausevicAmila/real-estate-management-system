import React from 'react';
import './SearchBar.css';
import { GoSearch } from 'react-icons/go';

const SearchBar = ({ onSearchChange }) => {

    return (
        <>
            <input type="text" className="search-input" placeholder="Search..." onChange={onSearchChange} />
            <button className="search-button font-sans bg-accent">
                <GoSearch className="search-icon " />
                Search
            </button>
        </>
    );
};

export default SearchBar;
