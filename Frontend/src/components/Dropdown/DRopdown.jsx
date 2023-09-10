import React, { useState } from 'react';
import './Dropdown.css';
import { MdOutlineArrowDropDown } from 'react-icons/md';

function DropdownMenu({ setSelectedType, fetchData }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = async (option) => {
        setSelectedOption(option);
        setIsOpen(false);

        setSelectedType(option); 
        fetchData(); 
    };

    return (
        <div className="dropdown">
            <div className="type  text-gray">
                {selectedOption || ' Property Type '} </div>
            <button className="dropdown-toggle bg-accent" onClick={toggleDropdown}>
                <div className='dicon text-lightgray'>
                    <MdOutlineArrowDropDown />
                </div>
            </button>
            {isOpen && (
                <div className="dropdown-content bg-lightgray text-primary">
                    <div className="dropdown-item" onClick={() => handleOptionClick('All')}>
                        All
                    </div>
                    <div className="dropdown-item" onClick={() => handleOptionClick('Flat')}>
                        Flat
                    </div>
                    <div className="dropdown-item" onClick={() => handleOptionClick('Apartment')}>
                        Apartment
                    </div>
                    <div className="dropdown-item" onClick={() => handleOptionClick('Commercial')}>
                        Commercial
                    </div>
                </div>
            )}
        </div>
    );
}

export default DropdownMenu;
