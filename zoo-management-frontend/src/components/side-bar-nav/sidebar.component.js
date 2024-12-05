import React, { useEffect, useState } from 'react';
import './sidebar.component.css';
import zooLogo from '../../assets/images/zoo-logo.jpg';
import { useNavigate } from 'react-router-dom';

export default function SidebarComponent() {
    const [role, setRole] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        const savedRole = localStorage.getItem('role');
        if (savedRole) {
            setRole(savedRole);
        }
    }, []); 
    
    const handleNavigate = (link) => {
        navigate(link);
    };

    const handleLogOut = () => {
        localStorage.removeItem('role')
        navigate('/');
    }
    
    const sidebarData = {
        '2': [
            { label: 'Lịch Sử Cho Ăn', link: '/caring/meal-history' },
            { label: 'Khẩu Phần Ăn', link: '/caring/create-meal' }
        ],
        '3': [
            { label: 'Hồ Sơ Sức Khỏe', link: '/vet/hssk' },
            { label: 'Điều Trị', link: '/vet/dt' },
            { label: 'Tiêm Chủng', link: '/vet/tc' }
        ],
        '1': [
            { label: 'Thông Tin Chăm Sóc', link: '/office/caring-history' },
            { label: 'Phiếu Nhập', link: '/office/import' },
            { label: 'Phiếu Xuất', link: '/office/export' },
            { label: 'Đối Tác', link: '/office/partner' }
        ]
    };

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <img src={zooLogo} alt="Zoo Logo" className="sidebar-logo" />
            </div>

            <div className='navbar'>
                {role && sidebarData[role] && (
                    <ul className="sidebar-list">
                        {sidebarData[role].map((item, index) => (
                            <li className="sidebar-item" key={index}>
                                <button onClick={() => handleNavigate(item.link)}>{item.label}</button>
                            </li>
                        ))}
                    </ul>
                )}

                <ul className="sidebar-list">
                    <li className="sidebar-item"><button >Thông tin tài khoản</button></li>
                    <li className="sidebar-item"><button onClick={() => handleLogOut()}>Đăng xuất</button></li>
                </ul>
            </div>
            
    </div>
    );
}
