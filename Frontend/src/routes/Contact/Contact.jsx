import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import '../Register/Register.css';
import { MdEmail, MdPassword } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Contact() {
    const [isButtonClicked, setButtonClicked] = useState(false);

    const handleClick = () => {
        setButtonClicked(true);
    };

    const handleSubmit = async () => {
        const firstName = document.getElementById('name').value;
        const lastName = document.getElementById('surname').value;
        const userEmail = document.getElementById('email').value;
        const userMessage = document.getElementById('message').value;

        const formData = {
            name: firstName,
            surname: lastName,
            email: userEmail,
            message: userMessage
        };

        try {
            await fetch('/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            setButtonClicked(true);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="page-wrapper" style={{ height: "110vh" }}>
                <Navbar />
                <section className="h-screen">
                    <div className="h-containerreg bg-lightgray text-primary">
                        <div>
                            <p className='text1 text-3xl leading-9 font-extrabold'>You are selling the property?</p>
                            <p className='text2 text-xl leading-7 font-normal'>
                                You are on the right place <br /><br />
                                Fill out this form and we will contact you as soon as possible.
                            </p>
                        </div>
                        <div className='formr text-xl leading-7 font-normal text-primary'>
                            <div className='name'>
                                <div>
                                    <p>First Name</p>
                                    <div className="emailreg bg-lightgray">
                                        <CgProfile className="email-icon text-gray" />
                                        <input type="text" className="remail-input" id="name" placeholder="Enter your first name" />
                                    </div>
                                </div>
                                <div>
                                    <p>Last Name</p>
                                    <div className="emailreg bg-lightgray">
                                        <CgProfile className="email-icon text-gray" />
                                        <input type="text" className="remail-input" id="surname" placeholder="Enter your last name" />
                                    </div>
                                </div>
                            </div>
                            <div className='remail'>
                                <p>Email</p>
                                <div className="reemail bg-lightgray">
                                    <MdEmail className="email-icon text-gray" />
                                    <input type="text" className="email-input" id="email" placeholder="Enter your email" />
                                </div>
                            </div>
                            <div className='note'>
                                <p>Note</p>
                                <div className="rnote bg-lightgray">

                                    <input type="text" className="note-input" id="message" placeholder="" />
                                </div>
                            </div>

                        </div>
                        <div>
                            <Link to="/" className={`register-button bg-accent text-lightgray ${isButtonClicked ? 'clicked' : ''}`}>
                                <button onClick={handleSubmit}>Submit</button>
                            </Link>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        </>
    );
}

export default Contact;
