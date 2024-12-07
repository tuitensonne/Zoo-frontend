import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Routes, Route, Outlet } from "react-router-dom";

import SidebarComponent from "../../components/side-bar-nav/sidebar.component";

import HealthRecordsComponent from "../../pages/vet-employee-page/health-record-page/health-record.component";
import TreatmentComponent from "../../pages/vet-employee-page/treatment-page/treatment.component";
import VaccinationComponent from "../../pages/vet-employee-page/vaccination-page/vaccination.component";
import RecordDetailPage from "../../pages/vet-employee-page/health-record-page/healthDetails-page/healthDetails.component";


import './vet-employee.component.css';

export default function VetEmployeeComponent() {
    const navigate = useNavigate();
    const userRole = localStorage.getItem('role');

    useEffect(() => {
        if (userRole !== '3') {
            navigate('/not-found');
        }
    }, [userRole, navigate]);


    // Get API

    return (
        <div className="login-container">
            <SidebarComponent/>
            <Routes>
                <Route index element={<HealthRecordsComponent/>} />  {}
                <Route path="hssk/details/:id" element={<RecordDetailPage/>} />
                <Route path="hssk" element={<HealthRecordsComponent/>} />  {}
                <Route path="dt" element={<TreatmentComponent/>} />  {}
                <Route path="tc" element={<VaccinationComponent/>} />  {}
            </Routes>
            <Outlet/>
        </div>
    );
}
