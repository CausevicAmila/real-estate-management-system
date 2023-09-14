import React, { useState, useRef } from 'react';
import "./Admin.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { RiUserLocationLine, RiHotelBedLine, RiSpace, RiMoneyDollarCircleLine } from "react-icons/ri";
import { BiBuildingHouse } from "react-icons/bi";
import { FaImages } from "react-icons/fa";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Dropdown({ name, options, value, onChange }) {
    return (
        <select name={name} className="rounded-dropdown" value={value} onChange={onChange}>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
}

function AddProperty() {

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [images, setImages] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);
    const [selectedType, setSelectedType] = useState('Flat');
    const [roomNumber, setRoomNumber] = useState('1');
    const [bathroomNumber, setBathroomNumber] = useState('1');
    const [yearConstruction, setYearConstruction] = useState('2023');
    const [floor, setFloor] = useState('1');
    const [selectedHeatingOption, setSelectedHeatingOption] = useState('');
    const [selectedJoineryOption, setSelectedJoineryOption] = useState('');

    const [selectedFeatures, setSelectedFeatures] = useState({
        "Blinded door": false,
        "Lift": false,
        "Electrical power": false,
        "Internet": false,
        "Garbage": false,
        "Cable TV": false,
        "Interphone": false,
        "Public Parking": false,
        "Electricity": false,
        "Balcony": false,
        "Garage": false,
        "Air conditioning": false,
        "Gas": false,
    });



    const selectFiles = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }
    const onFileSelect = (event) => {
        const files = event.target.files;
        if (files.length === 0) return;
        if (files.length > 4) return;
        for (let i = 0; i < files.length; i++) {
            if (files[i].type.split('/')[0] !== 'image') continue;
            if (images.length + files.length > 4) {
                break;
            }
            if (!images.some((e) => e.name === files[i].name)) {
                const reader = new FileReader();
                reader.onload = (event) => {

                    let dataUrl = event.target.result;


                    dataUrl = dataUrl.replace(/^data:image\/\w+;base64,/, '');

                    setImages((prevImages) => [
                        ...prevImages,
                        {
                            name: files[i].name,
                            url: URL.createObjectURL(files[i]),
                            data: dataUrl,
                        },
                    ]);
                };
                reader.readAsDataURL(files[i]);
            }

        }
    }
    const deleteImage = (index) => {
        setImages((prevImages) =>
            prevImages.filter((_, i) => i !== index)
        );
    }

    const onDragOver = (event) => {
        event.preventDefault();
        setIsDragging(true);
        event.dataTransfer.dropEffect = 'copy';
    }

    const onDragLeave = (event) => {
        event.preventDefault();
        setIsDragging(false)
    }
    const onDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);
        const files = event.dataTransfer.files;
        if (files.length > 4) return;
        for (let i = 0; i < files.length; i++) {
            if (files[i].type.split('/')[0] !== 'image') continue;
            if (images.length + files.length > 4) {
                break;
            }
            if (!images.some((e) => e.name === files[i].name)) {
                const reader = new FileReader();
                reader.onload = (event) => {

                    let dataUrl = event.target.result;


                    dataUrl = dataUrl.replace(/^data:image\/\w+;base64,/, '');

                    setImages((prevImages) => [
                        ...prevImages,
                        {
                            name: files[i].name,
                            url: URL.createObjectURL(files[i]),
                            data: dataUrl,
                        },
                    ]);
                };
                reader.readAsDataURL(files[i]);
            }

        }
    }

    const handleOptionChange = (event) => {
        const option = event.target.value;
        if (event.target.checked) {
            setSelectedOptions([...selectedOptions, option]);
        } else {
            setSelectedOptions(selectedOptions.filter((item) => item !== option));
        }
    };

    const [size, setSize] = useState('');
    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    };

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
    const handleRoomNumberClick = (event) => {
        const newValue = event.target.value;
        setRoomNumber(newValue);
    };
    const handleBathroomNumberChange = (event) => {
        const newValue = event.target.value;
        setBathroomNumber(newValue);
    };

    const handleYearConstructionChange = (event) => {
        const newValue = event.target.value;
        setYearConstruction(newValue);
    };

    const handleFloorChange = (event) => {
        const newValue = event.target.value;
        setFloor(newValue);
    };

    const handleHeatingOptionChange = (event) => {
        const option = event.target.value;
        setSelectedHeatingOption(option);
    };

    const handleJoineryOptionChange = (event) => {
        const option = event.target.value;
        setSelectedJoineryOption(option);
    };


    const handlePropertyFeatureChange = (event) => {
        const { value, checked } = event.target;

        setSelectedFeatures((prevSelectedFeatures) => ({
            ...prevSelectedFeatures,
            [value]: checked,
        }));
    };

    const roomNumberOptions = ['1', '2', '3', '4', '5', '6'];
    const bathroomNumberOptions = ['1', '2', '3', '4'];
    const typeOptions = ['Flat', 'Apartment', 'Commercial'];
    const yearConstructionOptions = Array.from({ length: 40 }, (_, i) => (2023 - i).toString());
    const floorOptions = Array.from({ length: 30 }, (_, i) => (i + 1).toString());



    const saveProperty = async () => {

        const propertyData = {
            title,
            desc,
            address,
            price,
            size,
            type: selectedType,
            images,
            roomNumber,
            bathroomNumber,
            yearConstruction,
            floor,
            heatingOption: selectedHeatingOption,
            joineryOption: selectedJoineryOption,
            selectedFeatures,

        };

        try {
            console.log(propertyData);
            const response = await axios.post('/addingProperty', propertyData);
            if (response.status === 200) {
                toast.success("Property added successfully", {
                    onClose: () => {
                        window.location.reload();
                    },
                });
            }

        } catch (error) {
            toast.error("Please fill all fields valid information ", {
                toastId: 'error1',
                autoClose: 1000,
            })
        }
    };


    return (
        <Sidebar>
            <div className='mainDivv' >
                <div className='back bg-lightgray'>
                    <div className='mainDiv'>
                        <div className='icon-left-side  text-primary font-inter font-semibold '>
                            <div className='lines' onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
                                <FaImages />
                                {isDragging ? (
                                    <h5 className='icon-text'><br></br> Drop Images here <br></br>  </h5>

                                ) : (<h5 className='icon-text'><br></br>Drag and Drop Images <br></br> or <span role='button' onClick={selectFiles}>Browse</span> </h5>

                                )}
                                <input type="file" className='imgupload' ref={fileInputRef} onChange={onFileSelect} multiple />

                            </div>
                            <div className='containerImage'>
                                {
                                    images.map((images, index) => (
                                        <div className='image' key={index}>
                                            <span className='delete' onClick={() => deleteImage(index)}>&times;</span>
                                            <img src={images.url} alt={images.name} />
                                        </div>

                                    )

                                    )
                                }

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
                                            
                                        </div>

                                        <div className='bed'>
                                            <RiSpace className='icon' />
                                            
                                        </div>

                                        <div className='bed'>
                                            <BiBuildingHouse className='icon' />
                                            <div className="horizontal-dropdown">
                                                <p>Type : Flat</p>
                                                <Dropdown name="type" options={typeOptions} value={selectedType} onChange={handleTypeChange} />
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
                                        <Dropdown name="roomNumber" options={roomNumberOptions} value={roomNumber} onChange={handleRoomNumberClick} />
                                    </div>
                                    <div className="horizontal-dropdown">
                                        <p>Bathroom number:</p>
                                        <Dropdown name="bathroomNumber" options={bathroomNumberOptions} value={bathroomNumber} onChange={handleBathroomNumberChange} />
                                    </div>
                                    <div className="horizontal-dropdown">
                                        <p>Year construction:</p>
                                        <Dropdown name="yearConstruction" options={yearConstructionOptions} value={yearConstruction} onChange={handleYearConstructionChange} />
                                    </div>
                                    <div className="horizontal-dropdown">
                                        <p>Floor:</p>
                                        <Dropdown name="floor" options={floorOptions} value={floor} onChange={handleFloorChange} />
                                    </div>
                                    <p>Heating:</p>
                                    <ul>
                                        <li>
                                            <label>
                                                <input
                                                    type='radio'
                                                    name='heatingOption'
                                                    value='Gas'
                                                    checked={selectedHeatingOption === 'Gas'}
                                                    onChange={handleHeatingOptionChange}

                                                />
                                                Gas
                                            </label>
                                        </li>
                                        <li>
                                            <label>
                                                <input
                                                    type='radio'
                                                    name='heatingOption'
                                                    value='City central heating'
                                                    checked={selectedHeatingOption === 'City central heating'}
                                                    onChange={handleHeatingOptionChange}
                                                />
                                                City central heating
                                            </label>
                                        </li>

                                    </ul>

                                    <p>Joinery:</p>
                                    <ul>
                                        <li>
                                            <label>
                                                <input
                                                    type='radio'
                                                    name='joineryOption'
                                                    value='Wood'
                                                    checked={selectedJoineryOption === 'Wood'}
                                                    onChange={handleJoineryOptionChange}
                                                />
                                                Wood
                                            </label>
                                        </li>
                                        <li>
                                            <label>
                                                <input
                                                    type='radio'
                                                    name='joineryOption'
                                                    value='PVC'
                                                    checked={selectedJoineryOption === 'PVC'}
                                                    onChange={handleJoineryOptionChange}
                                                />
                                                PVC
                                            </label>
                                        </li>
                                        <li>
                                            <label>
                                                <input
                                                    type='radio'
                                                    name='joineryOption'
                                                    value='Mix: Interior wood exterior PVC'
                                                    checked={selectedJoineryOption === 'Mix: Interior wood exterior PVC'}
                                                    onChange={handleJoineryOptionChange}
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
                                                    onChange={handlePropertyFeatureChange}
                                                />
                                                Blinded door
                                            </label>
                                        </li>
                                        <li>
                                            <label>
                                                <input
                                                    type='checkbox'
                                                    value='Lift'
                                                    onChange={handlePropertyFeatureChange}
                                                />
                                                Lift
                                            </label>
                                        </li>
                                        <li>
                                            <label>
                                                <input
                                                    type='checkbox'
                                                    value='Electrical power'
                                                    onChange={handlePropertyFeatureChange}
                                                />
                                                Electrical power
                                            </label>
                                        </li>
                                        <li>
                                            <label>
                                                <input
                                                    type='checkbox'
                                                    value='Internet'
                                                    onChange={handlePropertyFeatureChange}
                                                />
                                                Internet
                                            </label>
                                        </li>
                                        <li>
                                            <label>
                                                <input
                                                    type='checkbox'
                                                    value='Garbage'
                                                    onChange={handlePropertyFeatureChange}
                                                />
                                                Garbage
                                            </label>
                                        </li>
                                        <li>
                                            <label>
                                                <input
                                                    type='checkbox'
                                                    value='Cable TV'
                                                    onChange={handlePropertyFeatureChange}
                                                />
                                                Cable TV
                                            </label>
                                        </li>
                                        <li>
                                            <label>
                                                <input
                                                    type='checkbox'
                                                    value='Interphone'
                                                    onChange={handlePropertyFeatureChange}
                                                />
                                                Interphone
                                            </label>
                                        </li>
                                        <li>
                                            <label>
                                                <input
                                                    type='checkbox'
                                                    value='Public Parking'
                                                    onChange={handlePropertyFeatureChange}
                                                />
                                                Public Parking
                                            </label>
                                        </li>
                                        <li>
                                            <label>
                                                <input
                                                    type='checkbox'
                                                    value='Electricity'
                                                    onChange={handlePropertyFeatureChange}
                                                />
                                                Electricity
                                            </label>
                                        </li>
                                        <li>
                                            <label>
                                                <input
                                                    type='checkbox'
                                                    value='Balcony'
                                                    onChange={handlePropertyFeatureChange}
                                                />
                                                Balcony
                                            </label>
                                        </li>
                                        <li>
                                            <label>
                                                <input
                                                    type='checkbox'
                                                    value='Garage'
                                                    onChange={handlePropertyFeatureChange}
                                                />
                                                Garage
                                            </label>
                                        </li>
                                        <li>
                                            <label>
                                                <input
                                                    type='checkbox'
                                                    value='Air conditioning'
                                                    onChange={handlePropertyFeatureChange}
                                                />
                                                Air conditioning
                                            </label>
                                        </li>
                                        <li>
                                            <label>
                                                <input
                                                    type='checkbox'
                                                    value='Gas'
                                                    onChange={handlePropertyFeatureChange}
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
                <button className='btnSave' onClick={saveProperty} >Save</button>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </Sidebar>
    );
}

export default AddProperty;


