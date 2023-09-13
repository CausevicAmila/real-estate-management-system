import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import Logo from "../../public/balogo.png";
import { BsHouses, BsHouseAdd, BsReverseListColumnsReverse } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { FaBars } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";

function Sidebar({ children }) {
    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen(!isOpen);
    const location = useLocation();

    const sidebarClass = isOpen ? "sidebar" : "sidebar sidebar-closed";

    const menuItem = [
        {
            path: "/admin",
            name: "All Properties",
            icon: <BsHouses />,
        },
        {
            path: "/admin/add",
            name: "Add property",
            icon: <BsHouseAdd />,
        },
        {
            path: "/admin/tours",
            name: "Tour schedule",
            icon: <BsReverseListColumnsReverse />,
        },
        {
            path: "/login",
            name: "Log Out",
            icon: <FiLogOut />,
        },
    ];

    return (
        <div className="sidebar-container">
            <div className={sidebarClass}>
                <div className="top_section">
                    <div style={{ display: isOpen ? "block" : "none" }} className="side-logo">
                        <img src={Logo} alt="logo" />
                    </div>
                    <div style={{ marginLeft: isOpen ? "30px" : "0px" }} className="bars">
                        <FaBars onClick={toggle} />
                    </div>
                </div>
                {menuItem.map((item, index) => (
                    <NavLink
                        to={item.path}
                        key={index}
                        className={`link font-inter font-semibold ${location.pathname === item.path ? "active" : ""
                            }`}
                    >
                        <div style={{ fontSize: isOpen ? "24px" : "block" }} className="icon">
                            {item.icon}
                        </div>
                        <div style={{ display: isOpen ? "block" : "none" }} className="link_text">
                            {item.name}
                        </div>
                    </NavLink>
                ))}
            </div>
            <main className={isOpen ? "main-open" : "main-closed"}>
                <div className="alogo">
                    <h1 className="font-inter font-bold text-primary">BA Real Estate</h1>
                </div>
                {children}
            </main>
        </div>
    );
}

export default Sidebar;
