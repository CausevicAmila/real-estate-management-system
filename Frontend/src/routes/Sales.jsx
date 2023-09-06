import React, { useState , useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import SearchBar from '../components/SearchBar/SearchBar';
import PropertyCard from '../components/Property/PropertyCard';
import Footer from '../components/Footer/Footer';
import './Sales.css';
import Sort from '../components/Dropdown/Sort/Sort';
import DropdownMenu from '../components/Dropdown/DRopdown';

function Sales() {

    const [cardItems, setCardItems] = useState([]);
    const [selectedType, setSelectedType] = useState(''); 
    const [selectedSort, setSelectedSort] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };
    const filteredCardItems = cardItems.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );



    const fetchData = async () => {
        try {
            let url = '/properties';
            const queryParams = [];

            if (selectedType) {
                queryParams.push(`type=${selectedType}`);
            }
            if (selectedSort) {
                queryParams.push(`sort=${selectedSort.toLowerCase()}`);
            }

            if (queryParams.length > 0) {
                url += `?${queryParams.join('&')}`;
            }

            const response = await fetch(url);
            const data = await response.json();
            setCardItems(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedType, selectedSort]);


    return (
        <>
            <section className="h-screen">
                <Navbar />
                <div className="search-bar">
                    <SearchBar onSearchChange={handleSearchChange} />
                </div>
                <div className='container'>
                    <div className='h-text text-primary uppercase text-2xl leading-8 font-inter font-semibold'>
                        <p className='mt-6'>Sales</p>
                        <p className='text-darkgray text-lg leading-7 font-inter font-normal lowercase'>8 of 587</p>
                    </div>
                    <div className='dropdown'>
                        <DropdownMenu setSelectedType={setSelectedType} fetchData={fetchData} />
                    </div>
                    <div className='sort'>
                        <Sort setSelectedSort={setSelectedSort} fetchData={fetchData} />
                    </div>
                </div>
                <PropertyCard cardItems={filteredCardItems} />
                <Footer />
            </section>
        </>
    );
}

export default Sales;
