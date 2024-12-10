import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Routes, Route, Outlet } from "react-router-dom";
import './office-employee.component.css';

import SidebarComponent from "../../components/side-bar-nav/sidebar.component";
import ExportComponent from "./export-page/export.component";
import ImportComponent from "./inport-page/import.component.";
import PartnerComponent from "./partner-page/partner.component.";
import CaringHistoryComponent from "./caring-history-page/caring-history.component.";
import DetailComponent from "./export-page/Detail.component"; // Import DetailComponent
import ChooseExportComponent from "./export-page/phieuxuat.component"; 
import ChooseExportnhomComponent from "./export-page/taophieunhom.component"; 
import ChooseExportctComponent from "./export-page/taophieuct.component";

export default function OfficeEmployeeComponent() {
    const navigate = useNavigate();
    const userRole = localStorage.getItem('role');

    useEffect(() => {
        if (userRole !== '1') {
            navigate('/not-found');
        }
    }, [userRole, navigate]);

    return (
        <div className="login-container">
            <SidebarComponent/>
            <Routes>
                <Route index element={<ExportComponent/>} />  {}
                <Route path="caring-history" element={<CaringHistoryComponent/>} />  {}
                <Route path="import" element={<ImportComponent/>} />  {}
                <Route path="export" element={<ExportComponent/>} />  {}
                <Route path="partner" element={<PartnerComponent/>} />  {}
                <Route path="export/details/:id" element={<DetailComponent />} />
                <Route path="export/choose-export" element={<ChooseExportComponent />} />
                <Route path="export/choose-export/export-group" element={<ChooseExportnhomComponent />} />
                <Route path="export/choose-export/export-individual" element={<ChooseExportctComponent />} />
            </Routes>
            <Outlet/>

        </div>
    );
}