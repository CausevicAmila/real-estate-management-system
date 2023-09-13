import React, { useState, useRef , useEffect } from 'react';
import "./Admin.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { RiUserLocationLine, RiHotelBedLine, RiSpace, RiMoneyDollarCircleLine } from "react-icons/ri";
import { BiBuildingHouse } from "react-icons/bi";
import { FaImages } from "react-icons/fa";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';

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

function Heating({ name, options, selectedValue, onChange }) {
    return (
        <ul>
            {options.map((option) => (
                <li key={option}>
                    <label>
                        <input
                            type="radio"
                            name={name}
                            value={option}
                            checked={selectedValue === option}
                            onChange={onChange}
                        />
                        {option}
                    </label>
                </li>
            ))}
        </ul>
    );
}
function Windows({ name, options, selectedValue, onChange }) {
    return (
        <ul>
            {options.map((option) => (
                <li key={option}>
                    <label>
                        <input
                            type="radio"
                            name={name}
                            value={option}
                            checked={selectedValue === option}
                            onChange={onChange}
                        />
                        {option}
                    </label>
                </li>
            ))}
        </ul>
    );
}

function CheckboxGroup({ options, selectedValues, onChange }) {
    return (
        <ul>
            {options.map((option) => (
                <li key={option}>
                    <label>
                        <input
                            type="checkbox"
                            value={option} 
                            checked={selectedValues[option]}
                            onChange={onChange}
                        />
                        {option}
                    </label>
                </li>
            ))}
        </ul>
    );
}


function EditProperty() {

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
    const [editProperty, setEditProperty] = useState({
        title: '',
        desc: '',
        address: '',
        price: '',
        size: '',
        type: 'Flat',
        images: [],
        roomNumber: '1', 
        bathroomNumber: '1',
        yearConstruction: '2023', 
        floor: '1',
        heatingOption: '', 
        joineryOption: '', 
        selectedFeatures: {
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
        },
    });
    console.log(editProperty)

    const { id } = useParams();

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
        setEditProperty({
            ...editProperty,
            type: event.target.value,
        });
    };

    const handleSizeChange = (event) => {
        setEditProperty({
            ...editProperty,
            area: event.target.value,
        });
    };
    const [desc, setDesc] = useState('');
    const handleDescChange = (event) => {
        setEditProperty({
            ...editProperty,
            description: event.target.value,
        });
    };
    const handleTitleChange = (event) => {
        setEditProperty({
            ...editProperty,
            title: event.target.value,
        });
    };
    const [address, setAddress] = useState('');
    const handleAddressChange = (event) => {
        setEditProperty({
            ...editProperty,
            address: event.target.value,
        });
    };
    const [price, setPrice] = useState('');
    const handlePriceChange = (event) => {
        setEditProperty({
            ...editProperty,
            price: event.target.value,
        });
    };
    const handleRoomNumberClick = (event) => {
        const newValue = event.target.value;
        setEditProperty({
            ...editProperty,
            roomNum: newValue,
        });
    };
    const handleBathroomNumberChange = (event) => {
        const newValue = event.target.value;
        setEditProperty({
            ...editProperty,
            bathNum: newValue,
        });
    };

    const handleYearConstructionChange = (event) => {
        const newValue = event.target.value;
        setEditProperty({
            ...editProperty,
            constructionYear: newValue,
        });
    };

    const handleFloorChange = (event) => {
        const newValue = event.target.value;
        setEditProperty({
            ...editProperty,
            floor: newValue,
        });
    };

    const handleHeatingOptionChange = (event) => {
        setEditProperty({
            ...editProperty,
            heating: event.target.value,
        });
    };

    const handleJoineryOptionChange = (event) => {
        setEditProperty({
            ...editProperty,
            windows: event.target.value,
        });
    };



    const handlePropertyFeatureChange = (event) => {
        const { value, checked } = event.target;

        setEditProperty((prevEditProperty) => ({
            ...prevEditProperty,
            selectedFeatures: {
                ...prevEditProperty.selectedFeatures,
                [value]: checked,
            },
        }));
    };

    const roomNumberOptions = ['1', '2', '3', '4', '5', '6'];
    const bathroomNumberOptions = ['1', '2', '3', '4'];
    const typeOptions = ['Flat', 'Apartment', 'Commercial'];
    const yearConstructionOptions = Array.from({ length: 40 }, (_, i) => (2023 - i).toString());
    const floorOptions = Array.from({ length: 30 }, (_, i) => (i + 1).toString());



    const saveProperty = async () => {

        const propertyData = {
            title: editProperty.title,
            desc: editProperty.description,
            address: editProperty.address,
            price: editProperty.price,
            size: editProperty.area,
            type: editProperty.type,
            images,
            roomNumber: editProperty.roomNum,
            bathroomNumber: editProperty.bathNum,
            yearConstruction: editProperty.constructionYear,
            floor: editProperty.floor,
            heatingOption: editProperty.heating,
            joineryOption: editProperty.windows,
            selectedFeatures: editProperty.selectedFeatures,

        };

        try {
            const propertyId = id;
            console.log(propertyData);
            const response = await axios.post(`/editingProperty/${propertyId}`, propertyData);
            if (response.status === 200) {
                toast.success("Property updated successfully", {
                    onClose: () => {
                        window.location.href = '/admin';
                    },
                });
            }

        } catch (error) {
            toast.error("Error when editing property ", {
                toastId: 'error1',
                autoClose: 1000,
            })
        }
    };


    useEffect(() => {
        const propertyId = id;

        axios.get(`/getEditProperty/${propertyId}`)
            .then(response => {
                const receivedFeatures = response.data;
                const selectedFeatures = {
                    "Blinded door": receivedFeatures["blinded door"],
                    "Lift": receivedFeatures.lift,
                    "Electrical power": receivedFeatures["electrical power"],
                    "Internet": receivedFeatures.internet,
                    "Garbage": receivedFeatures.garbage,
                    "Cable TV": receivedFeatures["cable TV"],
                    "Interphone": receivedFeatures.interphone,
                    "Public Parking": receivedFeatures["public parking"],
                    "Electricity": receivedFeatures.electricity,
                    "Balcony": receivedFeatures.balcony,
                    "Garage": receivedFeatures.garage,
                    "Air conditioning": receivedFeatures["air conditioning"],
                    "Gas": receivedFeatures.gas,
                };

                setEditProperty({
                    ...response.data,
                    selectedFeatures: selectedFeatures,
                });
                axios.get(`/images/${propertyId}`)
                    .then(imageResponse => {
                        const newImages = imageResponse.data.map((base64Data, index) => {
                            return {
                                name: `Image ${index + 1}`,
                                url: `data:image/png;base64,${base64Data}`,
                                data: base64Data,
                            };
                        });

                        setImages(prevImages => [...prevImages, ...newImages]);
                    })
                    .catch(error => {
                        console.error('Error fetching images:', error);
                    });

            })
            .catch(error => {
                console.error('Error fetching property details:', error);
            });
    }, [id]);

    console.log(images)
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
                                        value={editProperty.title}
                                        onChange={handleTitleChange} />
                                    <input className='a-desc bg-lightgray'
                                        type="text"
                                        value={editProperty.description}
                                        onChange={handleDescChange}
                                    />
                                </div>
                                <div className='priceDiv'>
                                    <div className='location'>
                                        <RiUserLocationLine className="icon" />
                                        <input className='a-address text-primary font-inter bg-lightgray'
                                            type="text"
                                            value={editProperty.address}
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
                                                <Dropdown name="type" options={typeOptions} value={editProperty.type} onChange={handleTypeChange} />
                                            </div>

                                        </div>

                                    </div>
                                    <div className='price'>
                                        <RiMoneyDollarCircleLine className='icon text-primary' />
                                        <input className='a-price text-primary font-inter bg-lightgray font-extrabold'
                                            type="text"
                                            value={editProperty.price}
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
                                            value={editProperty.area}
                                            onChange={handleSizeChange}
                                        />
                                        m2
                                    </p>
                                    <div className="horizontal-dropdown">
                                        <p>Room number:</p>
                                        <Dropdown name="roomNumber" options={roomNumberOptions} value={editProperty.roomNum} onChange={handleRoomNumberClick} />
                                    </div>
                                    <div className="horizontal-dropdown">
                                        <p>Bathroom number:</p>
                                        <Dropdown name="bathroomNumber" options={bathroomNumberOptions} value={editProperty.bathNum} onChange={handleBathroomNumberChange} />
                                    </div>
                                    <div className="horizontal-dropdown">
                                        <p>Year construction:</p>
                                        <Dropdown name="yearConstruction" options={yearConstructionOptions} value={editProperty.constructionYear} onChange={handleYearConstructionChange} />
                                    </div>
                                    <div className="horizontal-dropdown">
                                        <p>Floor:</p>
                                        <Dropdown name="floor" options={floorOptions} value={editProperty.floor} onChange={handleFloorChange} />
                                    </div>
                                    <p>Heating:</p>
                                    <Heating
                                        name="heatingOption"
                                        options={['Gas', 'City central heating']}
                                        selectedValue={editProperty.heating}
                                        onChange={handleHeatingOptionChange}
                                    />

                                    <p>Joinery:</p>
                                    <Windows
                                        name="joineryOption"
                                        options={['Wood', 'PVC', 'Mix: Interior wood exterior PVC']}
                                        selectedValue={editProperty.windows}
                                        onChange={handleJoineryOptionChange}
                                    />
                                    

                                </div>
                                <div className='rightdesc'>
                                    <hr></hr>
                                    <p className='select-text font-inter font-semibold text-accent mt-8 mb-6'> Select Property Features: <br></br></p>
                                    <CheckboxGroup
                                        options={[
                                            'Blinded door',
                                            'Lift',
                                            'Electrical power',
                                            'Internet',
                                            'Garbage',
                                            'Cable TV',
                                            'Interphone',
                                            'Public Parking',
                                            'Electricity',
                                            'Balcony',
                                            'Garage',
                                            'Air conditioning',
                                            'Gas',
                                        ]}
                                        selectedValues={editProperty.selectedFeatures}
                                        onChange={handlePropertyFeatureChange}
                                    />

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

export default EditProperty;


