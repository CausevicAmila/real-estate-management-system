import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ToursTable.css'; 
import { ToastContainer, toast } from 'react-toastify';

function ToursTable() {
    const [tours, setTours] = useState([]);

    useEffect(() => {
        axios
            .get('/getTours')
            .then((response) => {
                setTours(response.data); 
            })
            .catch((error) => {
                console.error('Error fetching tours:', error);
            });
    }, []);

    return (
        <div className="tours-table-container"> 
            <table className="tours-table"> 
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Email</th>
                        <th>Tour Date</th>
                        <th>Tour Time</th>
                        <th>Property</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {tours.map((tour) => (
                        <tr key={tour.id}>
                            <td>{tour.name}</td>
                            <td>{tour.surname}</td>
                            <td>{tour.email}</td>
                            <td>
                                {new Date(tour.tourdate).toLocaleDateString('en-GB')}
                            </td>
                            <td>{tour.tourtime}</td>
                            <td>
                                <a href={`/property/${tour.id}`} target='_blank'>View Property</a>
                            </td>
                            <td className='tourBtns'>
                                {tour.state === 'none' && (
                                    <div>
                                        <button className="acceptBtn" onClick={() => handleAccept(tour.id)}>Accept</button>
                                        <button className="declineBtn" onClick={() => handleDecline(tour.id)}>Decline</button>
                                    </div>
                                )}
                                {tour.state === 'accepted' && (
                                    <button className="confirmedBtn" disabled>Confirmed</button>
                                )}
                                {tour.state === 'declined' && (
                                    <button className="declinedBtn" disabled>Declined</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ToastContainer
                position="top-right"
                autoClose={1000}
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


    async function handleAccept(tourId) {
        try {
            await axios.get(`/acceptTour/${tourId}`);
            toast.success("Tour has been accepted", {
                onClose: () => {
                    window.location.reload();
                },
            });
            toast.success("Confirmation mail was sent to client");
        } catch (error) {
            toast.error("Error when confirming tour, try again ")
        }
    }


async function handleDecline(tourId) {
    try {
        await axios.get(`/declineTour/${tourId}`);
        toast.success("Tour has been declined succesfully", {
            onClose: () => {
                window.location.reload();
            },
        });
        toast.success("Confirmation mail was sent to client");
    } catch (error) {
        toast.error("Error when declining tour, try again ")
    }
}
}

export default ToursTable;
