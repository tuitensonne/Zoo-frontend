import React from 'react';
import { useNavigate } from 'react-router-dom';
import './page-not-found.component.css';

export default function PageNotFoundComponent() {
    const navigate = useNavigate();
    const userRole = localStorage.getItem('role')
    const isAuthenticated = localStorage.getItem('token');
    
    const handleGoHome = () => {
        if (!isAuthenticated)
            navigate('/');
        else {
            if (userRole === "1")
                navigate('/office');
            else if (userRole === "2")
                navigate('/caring')
            else navigate('/vet')
        }
    };

    return (
      <div className="not-found-container">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-message">Trang bạn tìm không tồn tại.</p>
        <button className="go-home-button" onClick={handleGoHome}>
          Quay về trang chủ
        </button>
      </div>
    );
}