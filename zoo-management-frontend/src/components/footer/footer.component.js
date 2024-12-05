import React from 'react';
import './footer.component.css';
import zooLogo from '../../assets/images/zoo-logo.jpg';

export default function FooterComponent() {
    return (
        <footer className="footer">
            <div className="footer-left">
                <img src={zooLogo} alt="Zoo Logo" className="footer-logo" />
                <div className="footer-text">
                <h3>zoo.management</h3>
                <p>An official website for managing zoo</p>
                </div>
            </div>
            <div className="footer-right">
                <h3>Agency Contact Center</h3>
                <p>(800) CALL-GOVT</p>
                <p>info@agency.gov</p>
            </div>
        </footer>
    );
}
