import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Property.css';
import { IoLocationOutline } from 'react-icons/io5';
import { FaBed } from 'react-icons/fa';
import { MdSpaceBar } from 'react-icons/md';
import { MdOutlineEuro } from 'react-icons/md';
import Modal from '../Modal/Modal';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminCard(props) {
    const [isButtonClicked, setButtonClicked] = useState(false);
    const [isConfirmationOpen, setConfirmationOpen] = useState(false);

    const handleClick = (e) => {
        e.stopPropagation();
        setButtonClicked(true);
    };

    const deleteProperty = (e) => {
        e.preventDefault(); 
        e.stopPropagation();
        setButtonClicked(true);
        setConfirmationOpen(true);
    };

    const handleConfirmDelete = async () => {
 
        try {
            const id = props.property.id;
            const response = await axios.delete(`/deleteProperty/${id}`);
            console.log('Response Status:', response.status);
            toast.success("Property deleted successfully", {
                onClose: () => {
                    window.location.reload();
                },
            });
        } catch (error) {
            toast.error("Error when deleting property ", {
                toastId: 'error1',
                autoClose: 1000,
            })
        }

        setConfirmationOpen(false);
    };

    const handleCancelDelete = () => {
        setConfirmationOpen(false);
    };


    return (
        <div className='p-card-admin bg-lightgray'>
            <div className='p-image object-cover mt-6 ml-6 mr-6'>
                <img src={props.property.pimage} alt='image' />
            </div>
            <p className='header leading-8 font-inter text-primary font-semibold uppercase mt-3 text-center'>
                {props.property.title}
            </p>
            <p className='desc leading-7 font-inter text-darkgray font-normal mt-3'>
                {props.property.description}
            </p>
            <div className='location mt-3 ml-0 mb-0'>
                <IoLocationOutline className='location-icon text-darkgray ' />
                <p className='address text-darkgray leading-7 font-inter'>{props.property.address}</p>
            </div>

            <div className='rooms-area mt-4 ml-6'>
                <div className='room-container'>
                    <FaBed className='icon bed-icon text-darkgray' />
                    <p className='roomnumber text-darkgray leading-7 font-inter'>{props.property.bed}</p>
                </div>
                <div className='room-container'>
                    <MdSpaceBar className='icon area-icon text-darkgray' />
                    <p className='areanumber text-darkgray leading-7 font-inter'>{props.property.area} m2</p>
                </div>
            </div>
            <div className='price-container ml-6'>
                <MdOutlineEuro className='icon text-primary font-bold' />
                <p className='price text-primary leading-7 font-inter  font-bold'>{props.property.price}</p>
            </div>

            <div className='mb-3 btnDeleteEdit'>
                <div className='propcard2-button-container'>
                    <Link to={`/admin/edit/${props.property.id}`} className={`propcard-button bg-darkgray text-lightgray `} >
                        <button onClick={handleClick} >Edit</button>
                    </Link>
                </div>
                <div className='propcard1-button-container'>
                    <Link  className={`propcard-button bg-accent text-lightgray `} >
                        <button onClick={deleteProperty} >Delete</button>
                    </Link>
                </div>
            </div>

            <Modal
                isOpen={isConfirmationOpen}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
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
        </div>
    );
}

export default AdminCard;
