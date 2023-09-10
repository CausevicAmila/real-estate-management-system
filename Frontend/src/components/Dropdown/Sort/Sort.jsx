import React, { useState, useEffect } from 'react';
import '../Dropdown.css';
import { MdOutlineArrowDropDown } from 'react-icons/md';

function Sort({ setSelectedSort, fetchData }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

   
    const handleOptionClick = async (option) => {
        setSelectedOption(option);
        setIsOpen(false);

        setSelectedSort(option); 
        fetchData(); 
    };


    return (
        <div className="dropdown">
            <div className="type text-gray">
                {selectedOption || ' Sort '}
            </div>
            <button className="dropdown-toggle bg-accent" onClick={toggleDropdown}>
                <div className='dicon text-lightgray'>
                    <MdOutlineArrowDropDown />
                </div>
            </button>
            {isOpen && (
                <div className="dropdown-content bg-lightgray text-primary">
                    <div className="dropdown-item" onClick={() => handleOptionClick('Lowest Price First')}>
                        Lowest Price First
                    </div>
                    <div className="dropdown-item" onClick={() => handleOptionClick('Highest Price First')}>
                        Highest Price First
                    </div>
                </div>
            )}
        </div>
    );
}

export default Sort;
