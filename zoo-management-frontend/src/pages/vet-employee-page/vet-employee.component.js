import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import SidebarComponent from "../../components/side-bar-nav/sidebar.component";

import './vet-employee.component.css';

export default function VetEmployeeComponent() {
    const navigate = useNavigate();
    const userRole = localStorage.getItem('role');

    useEffect(() => {
        if (userRole !== '3') {
            navigate('/not-found');
        }
    }, [userRole, navigate]);

    return (
        <div className="login-container">
            <SidebarComponent/>
        </div>
    );
}