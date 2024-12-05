import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './caring-employee.component.css';
import SidebarComponent from "../../components/side-bar-nav/sidebar.component";

export default function CaringEmployeeComponent() {
    const navigate = useNavigate();
    const userRole = localStorage.getItem('role');

    useEffect(() => {
        if (userRole !== '2') {
            navigate('/not-found');
        }
    }, [userRole, navigate]);

    return (
        <div className="login-container">
            <SidebarComponent/>
        </div>
    );
}