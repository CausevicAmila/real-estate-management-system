import React, { useState } from 'react';
import "./Admin.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import '../PropertyDetail/PropertyDetail.css';
import { RiUserLocationLine, RiHotelBedLine, RiSpace, RiMoneyDollarCircleLine } from "react-icons/ri";
import { BiBuildingHouse } from "react-icons/bi";
import { FaImages } from "react-icons/fa";

function Dropdown({ name, options }) {
    return (
      <select name={name} className="rounded-dropdown">
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }

function AddProperty() {
    const divStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundSize: 'cover',
        height: '300px'
      };
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleOptionChange = (event) => {
        const option = event.target.value;
        if (event.target.checked) {
            setSelectedOptions([...selectedOptions, option]);
        } else {
            setSelectedOptions(selectedOptions.filter((item) => item !== option));
        }
    };
  
    const [size, setSize] = useState('');
    const handleSizeChange = (event) => {
        setSize(event.target.value);
    };
    const [desc, setDesc] = useState('');
    const handleDescChange = (event) => {
        setDesc(event.target.value);
    };
    const [title, setTitle] = useState('');
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
    const [address, setAddress] = useState('');
    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };
    const [price, setPrice] = useState('');
    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };
    const roomNumberOptions = ['1', '2', '3', '4', '5', '6+'];
    const bathroomNumberOptions = ['1', '2', '3', '4+'];
    const typeOptions = ['Flat', 'Apartment', 'Commercial'];
    const yearConstructionOptions = Array.from({ length: 40 }, (_, i) => (2023 - i).toString());
    const floorOptions = Array.from({ length: 30 }, (_, i) => (i + 1).toString());
  return (
    <Sidebar>
        <div className='mainDivv' >
            <div className='back bg-lightgray'>
            <div className='mainDiv'>
            <div className='icon-left-side  text-primary font-inter font-semibold '>
                <div className='lines' >
                    <FaImages/>
                    <h5 className='icon-text'><br></br>Drag and Drop Images <br></br> or Browse!</h5>
                </div> 
            </div>
            <div className='right-side'>
                <div className='info'>
                <div>
                    <input className='a-mainTitle text-primary font-inter bg-lightgray' 
                        type="text"
                        placeholder='Main Title eg. FLAT, TWO-BEDROOM SARAJEVO TOWER'
                            value={title}
                            onChange={handleTitleChange} />
                    <input className='a-desc bg-lightgray'
                        type="text"
                        placeholder='Short Description eg. Top quality apartments with beautiful open view.'
                        value={desc}
                        onChange={handleDescChange}
                        />
                    </div>
                <div className='priceDiv'>
                <div className='location'>
                    <RiUserLocationLine className="icon" />
                    <input className='a-address text-primary font-inter bg-lightgray' 
                    type="text"
                    placeholder='Add Address eg. Ive Andrica bb'
                    value={address}
                    onChange={handleAddressChange} />
                </div>
              <div className='addInfo'>
                <div className='bed'>
                  <RiHotelBedLine className='icon' />
                  <p>2</p>
                </div>

                <div className='bed'>
                  <RiSpace className='icon' />
                  <p>60m2</p>
                </div>

                <div className='bed'>
                  <BiBuildingHouse className='icon' />
                  <div className="horizontal-dropdown">
                    <p>Type : Flat</p>
                    <Dropdown name="type" options={typeOptions} />
                </div>
                  
                </div>

              </div>
              <div className='price'>
                <RiMoneyDollarCircleLine className='icon text-primary' />
                <input className='a-price text-primary font-inter bg-lightgray font-extrabold' 
                        type="text"
                        placeholder='Add Price'
                        value={price}
                        onChange={handlePriceChange} />
              </div>
            </div>
          </div>
          <div className='description'>
            <div className='leftdesc'>
              <hr></hr>
                <p > Size: 
                    <input className='form bg-lightgray'
                        type="text"
                        value={size}
                        onChange={handleSizeChange}
                        />
                    m2
                </p>
                <div className="horizontal-dropdown">
                    <p>Room number:</p>
                    <Dropdown name="roomNumber" options={roomNumberOptions} />
                </div>
                <div className="horizontal-dropdown">
                    <p>Bathroom number:</p>
                    <Dropdown name="bathroomNumber" options={bathroomNumberOptions} />
                </div>
                <div className="horizontal-dropdown">
                    <p>Year construction:</p>
                    <Dropdown name="yearConstruction" options={yearConstructionOptions} />
                </div>
                <div className="horizontal-dropdown">
                    <p>Floor:</p>
                    <Dropdown name="floor" options={floorOptions} />
                </div>
              <p>Heating: </p>
              <ul>
                <li>
                <label>
                    <input
                        type='checkbox'
                        value='Gas'
                        onChange={handleOptionChange}
                    />
                    Gas
                </label>
                </li>
              </ul>
              <li>
              <label>
                  <input
                      type='checkbox'
                      value='City central heating'
                      onChange={handleOptionChange}
                  />
                  City central heating
              </label>
              </li>
              <p>Joinery: </p>
                <ul>
                <li>
                <label>
                    <input
                        type='checkbox'
                        value='Wood'
                        onChange={handleOptionChange}
                    />
                    Wood
                </label>
                </li>
                <li>
              <label>
                  <input
                      type='checkbox'
                      value='PVC'
                      onChange={handleOptionChange}
                  />
                  PVC
              </label>
              </li>
              <li>
              <label>
                  <input
                      type='checkbox'
                      value='Mix: Interior wood exterior PVC'
                      onChange={handleOptionChange}
                  />
                  Mix: Interior wood exterior PVC
              </label>
              </li>
            </ul>
           
            </div>
            <div className='rightdesc'>
              <hr></hr>
              <p className='select-text font-inter font-semibold text-accent mt-8 mb-6'> Select Property Features: <br></br></p>
              <ul>
              <li>
                <label>
                    <input
                        type='checkbox'
                        value='Blinded door'
                        onChange={handleOptionChange}
                        />
                        Blinded door
                </label>
                </li>
                <li>
                <label>
                    <input
                      type='checkbox'
                      value='Lift'
                      onChange={handleOptionChange}
                    />
                    Lift
                </label>
                </li>
                <li>
                <label>
                    <input
                      type='checkbox'
                      value='Electrical power'
                      onChange={handleOptionChange}
                    />
                    Electrical power
                </label>
                </li>
                <li>
                <label>
                    <input
                      type='checkbox'
                      value='Internet'
                      onChange={handleOptionChange}
                    />
                    Internet
                </label>
                </li>
                <li>
                <label>
                    <input
                      type='checkbox'
                      value='Garbage'
                      onChange={handleOptionChange}
                    />
                    Garbage
                </label>
                </li>
                <li>
                <label>
                    <input
                      type='checkbox'
                      value='Cable TV'
                      onChange={handleOptionChange}
                    />
                    Cable TV
                </label>
                </li>
                <li>
                <label>
                    <input
                      type='checkbox'
                      value='Interphone'
                      onChange={handleOptionChange}
                    />
                    Interphone
                </label>
                </li>
                <li>
                <label>
                    <input
                      type='checkbox'
                      value='Public Parking'
                      onChange={handleOptionChange}
                    />
                    Public Parking
                </label>
                </li>
                <li>
                <label>
                    <input
                      type='checkbox'
                      value='Electricity'
                      onChange={handleOptionChange}
                    />
                    Electricity
                </label>
                </li>
                <li>
                <label>
                    <input
                      type='checkbox'
                      value='Balcony'
                      onChange={handleOptionChange}
                    />
                    Balcony
                </label>
                </li>
                <li>
                <label>
                    <input
                      type='checkbox'
                      value='Garage'
                      onChange={handleOptionChange}
                    />
                    Garage
                </label>
                </li>
                <li>
                <label>
                    <input
                      type='checkbox'
                      value='Air conditioning'
                      onChange={handleOptionChange}
                    />
                    Air conditioning
                </label>
                </li>
                <li>
                <label>
                    <input
                      type='checkbox'
                      value='Gas'
                      onChange={handleOptionChange}
                    />
                    Gas
                </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
        </div>
        <div className='pd-text mt-6'> </div>
        </div>
        </div>
        <div className='btnSaveDiv'>
        <button className='btnSave'>Save</button>
        </div>

    </Sidebar>
  );
}

export default AddProperty;


