import React from "react";
import { Link, Navigate } from "react-router-dom";
import image from "./Images/craveconnect.jpg";
import "./Styles.css"; // Ensure you have a separate CSS file for the footer

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-logo">
                    <img src={image} alt="Logo" />
                </div>
                <div className="footer-text">
                    <p>&copy; 2024 My Application. All rights reserved</p>
                </div>
                <div className="footer-links">
                    <ul>
                        
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/menu">Menu</Link></li>
                        <li><Link to="/restaurants">Restaurants</Link></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
