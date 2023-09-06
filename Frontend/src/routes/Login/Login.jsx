import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './Login.css';
import { MdSupervisedUserCircle, MdPassword } from 'react-icons/md';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [isButtonClicked, setButtonClicked] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleClick = () => {
        setButtonClicked(true);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        setButtonClicked(true);

        try {
            const response = await axios.post('/loginIn', {
                username,
                password,
            });

            window.location.href = '/admin';

            
               
        } catch (error) {
            console.error('Login failed:', error);
        }
    };



    return (
        <>
            <div className="page-wrapper">
                <Navbar />
                <section className="h-screen">
                    <div className="h-containerlog bg-lightgray text-primary">
                        <div>
                            <p className='text1  text-3xl leading-9 font-extrabold'>Sign in!</p>
                            <p className='text2 text-xl leading-7 font-normal' >Welcome back! <br></br><br></br>

                                Please enter your username and password to access admin panel. </p>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className='forml text-xl leading-7 font-normal text-primary'>

                                <div className='femail'>
                                    <p >Username</p>
                                    <div className="email bg-lightgray">
                                        <MdSupervisedUserCircle className="email-icon text-gray" />
                                        <input type="text" className="email-input" placeholder="Enter your username " value={username}
                                            onChange={handleUsernameChange} />
                                    </div>
                                </div>
                                <div className='fpassword'>
                                    <p >Password</p>
                                    <div className="email bg-lightgray">
                                        <MdPassword className="email-icon text-gray" />
                                        <input type="password" className="email-input" placeholder="Enter your password " value={password}
                                            onChange={handlePasswordChange} />
                                    </div>
                                </div>

                            </div>
                            <div>

                                <button type='submit' onClick={handleClick} className={`login-button bg-accent text-lightgray ${isButtonClicked ? 'clicked' : ''}`}>Sign in</button>

                            </div>
                        </form>
                    </div>
                </section>
                <Footer />
            </div>
        </>

    );
}

export default Login;
