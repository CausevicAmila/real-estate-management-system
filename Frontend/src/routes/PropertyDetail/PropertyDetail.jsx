import Navbar from '../../components/Navbar/Navbar';
import ImageSlider from '../../components/ImageSlider/ImageSlider';
import SearchBar from "../../components/SearchBar/SearchBar";
import './PropertyDetail.css';
import React, { useState, useEffect } from 'react';
import Footer from '../../components/Footer/Footer';
import { RiUserLocationLine, RiHotelBedLine, RiSpace, RiMoneyDollarCircleLine } from "react-icons/ri";
import { BiBuildingHouse } from "react-icons/bi";
import { TiTick } from "react-icons/ti"; 
import { RxCross2 } from "react-icons/rx";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { useParams } from 'react-router-dom';


function PropertyDetails() {
    const [showSlider, setShowSlider] = useState(false);
    const [propertyData, setPropertyData] = useState({});

    const handleImageClick = () => {
        setShowSlider(true);
    };

    const { id } = useParams();

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

    console.log(propertyData['blinded door'])

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
                                <button >Request a Tour</button>
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
        </div>
    );
}

export default PropertyDetails;
