import Navbar from '../../components/Navbar/Navbar';
import './PropertyDetail.css';
import React, { useState, useEffect } from 'react';
import Footer from '../../components/Footer/Footer';
import { RiUserLocationLine, RiHotelBedLine, RiSpace, RiMoneyDollarCircleLine } from "react-icons/ri";
import { BiBuildingHouse } from "react-icons/bi";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';


function PropertyDetails() {
    const { id } = useParams();
    const [showSlider, setShowSlider] = useState(true);
    const [propertyData, setPropertyData] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        id: id,
        name: '',
        surname: '',
        email: '',
        tourDate: '', 
        tourTime: '',
    });

    const handleImageClick = () => {
        setShowSlider(true);
    };


    const divStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundSize: 'cover',
        height: '400px'
    }
    const slideImages = [
        {
            url: `/image/${id}`,
            caption: 'Slide 1'
        },
        {
            url: `/image/${id}_2`,
            caption: 'Slide 2'
        },
        {
            url: `/image/${id}_3`,
            caption: 'Slide 3'
        },
        {
            url: `/image/${id}_4`,
            caption: 'Slide 4'
        },
    ];

    useEffect(() => {
        fetch(`/getPropertyDetails/${id}`)
            .then(response => response.json())
            .then(data => setPropertyData(data))
            .catch(error => console.error('Error fetching property data:', error));
    }, [id]);
    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const getTomorrowDate = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    };

    const generateTimeOptions = () => {
        const options = [];
        for (let hour = 9; hour <= 17; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const formattedHour = hour.toString().padStart(2, '0');
                const formattedMinute = minute.toString().padStart(2, '0');
                options.push(`${formattedHour}:${formattedMinute}`);
            }
        }
        return options;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
        const isFormIncomplete = Object.values(formData).some((value) => value === '' || value.trim() === '');

        if (isFormIncomplete) {
            toast.error('Please fill all fields');
            return; 
        }
        axios.post('/tourData', formData)
            .then((response) => {
                console.log(response.status)
                if (response.status === 200) {
                    setShowModal(false);
                    toast.success("Tour was appointed successfully");


                } else if (response.status === 400) {
                    toast.error('This timeslot is full. Please select another timeslot for tour');
                }
            })
            .catch((error) => {
                toast.error('This timeslot is full. Please select another timeslot for tour');

            });
    };

    const modalContent = (
        <div className="modal-container">
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <h2>Request a Tour</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="surname">Surname:</label>
                        <input
                            type="text"
                            id="surname"
                            name="surname"
                            value={formData.surname}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="tourDate">Tour Date:</label>
                        <input
                            type="date"
                            id="tourDate"
                            name="tourDate"
                            value={formData.tourDate}
                            onChange={handleInputChange}
                            min={getTomorrowDate()}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="tourDate">Tour Time:</label>
                        <select
                            id="tourTime"
                            name="tourTime"
                            value={formData.tourTime}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="" disabled>Select a time</option>
                            {generateTimeOptions().map((timeOption, index) => (
                                <option key={index} value={timeOption}>{timeOption}</option>
                            ))}
                        </select>
                    </div>
                    <div className="modal-buttons">
                        <button className="modal-button cancel" onClick={closeModal}>Cancel</button>
                        <button className="modal-button confirm" type="submit" onClick={handleSubmit}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );


    return (
        <div>
            <Navbar />
            <div className='back bg-lightgray'>
                <div className='mainDiv'>
                    <div className='left-side'>
                        <div className="slide-container">
                            <Slide >
                                {slideImages.map((slideImage, index) => (
                                    <div key={index}>
                                        <div className='picture' style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
                                        </div>
                                    </div>
                                ))}
                            </Slide>
                        </div>
                        <div className='imagesInRow'>
                            <img src={`/image/${id}`} alt="" />
                            <img src={`/image/${id}_2`} alt="" />
                            <img src={`/image/${id}_3`} alt="" />
                            <img src={`/image/${id}_4`} alt="" />
                        </div>
                    </div>
                    <div className='right-side'>
                        <div className='info'>
                            <div>
                                <h1 className='mainTitle text-primary uppercase'>{propertyData.title}</h1>
                                <p className='titleDesc'>{propertyData.description}</p></div>
                            <div className='priceDiv'>
                                <div className='location'>
                                    <RiUserLocationLine className="icon" />
                                    <p>{propertyData.address}</p>

                                </div>
                                <div className='addInfo'>
                                    <div className='bed'>
                                        <RiHotelBedLine className='icon' />
                                        <p>{propertyData.bed}</p>
                                    </div>

                                    <div className='bed'>
                                        <RiSpace className='icon' />
                                        <p>{propertyData.area}m2</p>
                                    </div>

                                    <div className='bed'>
                                        <BiBuildingHouse className='icon' />
                                        <p>Type : {propertyData.type}</p>
                                    </div>

                                </div>
                                <div className='price'>
                                    <RiMoneyDollarCircleLine className='icon text-primary' />
                                    <h1 className='text-primary'>{propertyData.price}</h1>
                                </div>
                            </div>
                        </div>
                        <div className='description'>
                            <div className='leftdesc'>
                                <hr></hr>
                                <p>Size: {propertyData.area}m2</p>
                                <p>Room number: {propertyData.roomNum}</p>
                                <p>Bathroom number: {propertyData.bathNum}</p>
                                <p>Year construction:  {new Date(propertyData.constructionYear).getFullYear()}</p>
                                <p>Floor: {propertyData.floor}</p>
                                <p>Heating: {propertyData.heating}</p>
                                <p>Windows: {propertyData.windows}</p>
                                <button onClick={openModal} >Request a Tour</button>
                            </div>
                            <div className='rightdesc'>
                                <hr></hr>
                                <ul>
                                    {propertyData['blinded door'] ? (
                                        <li>
                                            Blinded door
                                        </li>
                                    ) : null}
                                    {propertyData.lift ? (
                                        <li>
                                            Lift
                                        </li>
                                    ) : null}
                                    {propertyData['electrical power'] ? (
                                        <li>
                                            Electrical power
                                        </li>
                                    ) : null}
                                    {propertyData.internet ? (
                                        <li>
                                            Internet
                                        </li>
                                    ) : null}
                                    {propertyData.garbage ? (
                                        <li>
                                            Garbage
                                        </li>
                                    ) : null}
                                    {propertyData['cable TV'] ? (
                                        <li>
                                            Cable TV
                                        </li>
                                    ) : null}
                                    {propertyData.interphone ? (
                                        <li>
                                            Interphone
                                        </li>
                                    ) : null}
                                    {propertyData['public parking'] ? (
                                        <li>
                                            Public Parking
                                        </li>
                                    ) : null}
                                    {propertyData.electricity ? (
                                        <li>
                                            Electricity
                                        </li>
                                    ) : null}
                                    {propertyData.balcony ? (
                                        <li>
                                            Balcony
                                        </li>
                                    ) : null}
                                    {propertyData.garage ? (
                                        <li>
                                            Garage
                                        </li>
                                    ) : null}
                                    {propertyData['air conditioning'] ? (
                                        <li>
                                            Air Conditioning
                                        </li>
                                    ) : null}
                                    {propertyData.gas ? (
                                        <li>
                                            Gas
                                        </li>
                                    ) : null}
                                </ul>


                            </div>
                        </div>
                    </div>
                </div>
                <div className='pd-text mt-6'> </div>
                <div className="clear"></div>

            </div>
            <Footer />
            {showModal && modalContent}
            <ToastContainer
                position="top-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}

export default PropertyDetails;
