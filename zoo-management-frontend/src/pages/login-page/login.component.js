import React, { useState } from "react";
import './login.component.css';
import zooPoster from '../../assets/images/zoo-poster.jpg';
import { useNavigate } from 'react-router-dom';

export default function LoginComponent() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [userRole, setRole] = useState("");
    const [token, setToken] = useState("")
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };

    localStorage.setItem('role', userRole);
    localStorage.setItem('token', token);

    const handleLogin = (e) => {
        // Suppose calling api and get token from response
        setToken("accept")
        
        e.preventDefault()
        if (userRole === "1")
            navigate('/office');
        else if (userRole === "2") {
            navigate('/caring');   
        }
        else if (userRole === "3") 
            navigate('/vet') 
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h1>Đăng nhập</h1>
                <p>Truy cập vào tài khoản của bạn</p>
                
                <div className="form-group">
                    <label htmlFor="email">Địa chỉ email</label>
                    <input type="email" id="email" name="email" placeholder="Nhập email" />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Mật khẩu</label>
                    <div className="password-input">
                    <input
                        type={passwordVisible ? "text" : "password"}
                        id="password"
                        name="password"
                        placeholder="Nhập mật khẩu"
                    />

                    <button
                        type="button"
                        className="toggle-password"
                        onClick={togglePasswordVisibility}
                    >
                        {passwordVisible ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                    </button>
                    </div>
                </div>
                
                <div className="form-group">
                    <label htmlFor="password">Loại công việc</label>
                    <select value={userRole} onChange={(e) => setRole(e.target.value)}>
                        <option value="">-- Chọn loại công việc --</option>
                        <option value="1">Nhân viên văn phòng</option>
                        <option value="2">Nhân viên chăm sóc</option>
                        <option value="3">Nhân viên thú y</option>
                    </select>
                </div>
                <button type="submit" className="login-button">Đăng nhập</button>
            </form>

            <img src={zooPoster} alt="Zoo Poster" className="poster" />
        </div>
    );
}