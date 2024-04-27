import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { Button, Modal } from 'antd'
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import '../assets/css/admin.css'
import logo from '../../../public/images/netflix2.png'

const Header = () => {

    return (
        <>
            <div className="header-ad">
                <img src={logo} alt="logo" />
                <button className="user-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                    </svg>
                    Admin
                </button>
            </div>
        </>
    )
}

export default Header;
