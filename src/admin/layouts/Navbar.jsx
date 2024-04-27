import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { Button, Modal } from 'antd'
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <>
            <div className="navbar-ad">
                <ul>
                    <li>
                        {/* icon */}
                        <button>Trang chủ</button>
                    </li>
                    <li>
                        <button>Danh sách phim</button>
                    </li>
                    <li>
                        <button>Người dùng</button>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Navbar;
