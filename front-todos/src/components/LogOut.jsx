import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LogOut.css';

function LogOut() {
    const navigate = useNavigate();
    const handleLogOut = () => {
        axios.defaults.headers.common['Authorization'] = "";
        localStorage.setItem('Authorization', "");
        navigate('/login');
    }

    return (
        <div className='log-out-container'>
            <a href=""  disabled="disabled" onClick={handleLogOut}>Log Out</a>
        </div>
    )
}

export default LogOut
