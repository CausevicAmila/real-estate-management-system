import React from "react";
import { Route, Routes } from "react-router-dom";
import Sales from './routes/Sales'
import Home from './routes/Home/Home';
import Rentals from './routes/Rentals';
import Contact from "./routes/Contact/Contact";
import AboutUs from './routes/AboutUs/AboutUs';
import Login from './routes/Login/Login';
import ForgotPassword from './routes/ForgotPassword/ForgotPassword';
import Register from './routes/Register/Register';
import Apartments from './routes/Apartments';
import PropertyDetails from "./routes/PropertyDetail/PropertyDetail";
import Admin from "./routes/AdminDashboard/Admin";
import Properties from "./routes/AdminDashboard/Properties";
import AddProperty from "./routes/AdminDashboard/AddProperty";

function App() {
    return (
        <section className="h-screen">
            <Routes>
                <Route path="/sales" element={<Sales />} />
                <Route path="/rentals" element={<Rentals />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/" element={<Home />} />
                <Route path="/apartments" element={<Apartments />} />
                <Route path="/forgot" element={<ForgotPassword />} />
                <Route path="/register" element={<Register />} />
                <Route path="/property/:id" element={<PropertyDetails />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin" element={<Properties />} />
                <Route path="/admin/add" element={<AddProperty />} />
            </Routes>
        </section>
    );
}

export default App;
