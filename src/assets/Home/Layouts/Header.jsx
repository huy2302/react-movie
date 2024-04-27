import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { Button, Modal } from 'antd'
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import logo1 from "../../../../public/images/netflix2.png"

import user1 from "../../../../public/images/user/user-1.jpg"
import user2 from "../../../../public/images/user/user-2.jpg"
import user3 from "../../../../public/images/user/user-3.jpg"
import user4 from "../../../../public/images/user/user-4.jpg"

import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";

const Header = () => {
    // trạng thái đăng nhập để ẩn login và show uname người dùng header
    const [isLogin, setIsLogin] = useState(false)
    const [isOpenLogin, setIsOpenLogin] = useState(false);
    const [isOpenRegister, setIsOpenRegister] = useState(false);

    const toggleContainerClass = () => {
        setIsOpenLogin(!isOpenLogin);
    };

    const closeLoginModal = () => {
        setIsOpenLogin(false);
    };
    const toggleContainerClassRegi = () => {
        setIsOpenRegister(!isOpenRegister);
    };

    const closeLoginModalRegi = () => {
        setIsOpenRegister(false);
    };

    // show toast khi đăng nhập thất bại
    const handleLoginToast = (strMessage) => {
        if (strMessage === "ERR_NETWORK") {
            toast.error("Connection failed, please check network connection.", {

            });
        } else if (strMessage === "ERR_BAD_REQUEST") {
            toast.error("Wrong login information, please try again.", {

            });
        } else {
            toast.success("Log in successfully!", {

            });
        }
    };
    const handleLoginToastRegister = (strMessage) => {
        if (strMessage === "ERR_NETWORK") {
            toast.error("Connection failed, please check network connection.", {

            });
        } else if (strMessage === "ERR_BAD_REQUEST") {
            toast.error("Account already exists, please try again.", {

            });
        } else {
            toast.success("Account registration successful!", {

            });
        }
    };
    // Chứa dữ liệu người dùng trả về khi đăng nhập thành công 
    const [user, setUser] = useState({})
    const [formData, setFormData] = useState({
        username: '',
        password: 'none',
        role: 1
    });
    const [formDataRegister, setFormDataRegister] = useState({
        username: '',
        password: 'none',
        role: 1
    });

    // Hàm xử lý sự kiện khi người dùng nhập vào các trường form
    const handleChange = (e) => {
        const { name, value } = e.target;
        const lowercaseValue = value.toLowerCase();
        setFormData({ ...formData, [name]: value });
    };
    const handleChangeRegister = (e) => {
        const { name, value } = e.target;
        const lowercaseValue = value.toLowerCase();
        setFormDataRegister({ ...formData, [name]: lowercaseValue });
    };

    // Hàm xử lý sự kiện khi form được gửi đi
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        try {
            const response = await axios.post('http://localhost:8080/user/login', formData);
            console.log('Server response:', response);
            setIsLogin(true)
            setUser(response.data)
            // handleLoginToast("success")
            setIsOpenLogin(false);
            const userInfo = { username: response.data, isLogin: true };
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            window.location.reload();
        } catch (error) {
            console.error(error.code)
            handleLoginToast(error.code)
            // setShowLoginErr(true)
            // setIsLogin(false)
        }
    };
    const handleSubmitRegister = async (e) => {
        e.preventDefault();
        console.log(formDataRegister)
        try {
            const response = await axios.post('http://localhost:8080/user/register', formDataRegister);
            console.log('Server response:', response);
            // setIsLogin(true)
            // setUser(response.data)
            handleLoginToastRegister("success")
            setIsOpenRegister(false);
            const userInfo = { username: response.data, isLogin: true };
            // localStorage.setItem('userInfo', JSON.stringify(userInfo));

        } catch (error) {
            console.error(error.code)
            handleLoginToastRegister(error.code)
            // setShowLoginErr(true)
            // setIsLogin(false)
        }
    };

    useEffect(() => {
        const storedUserInfo = localStorage.getItem('userInfo');
        if (storedUserInfo) {
            const parsedUserInfo = JSON.parse(storedUserInfo);
            console.log(parsedUserInfo)
            setUser(parsedUserInfo.username);
            setIsLogin(parsedUserInfo.isLogin);
        }

    }, []);

    // log out
    const history = useNavigate();
    const location = useLocation();

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('You will be logged out');
    const showModal = () => {
        setOpen(true);
    };
    const handleLogout = () => {
        setModalText('You are logged out, the board will be closed in 2 seconds.');
        setConfirmLoading(true);
        setTimeout(() => {
            setIsLogin(false);
            setUser({});
            localStorage.removeItem('userInfo');
            setOpen(false);
            setConfirmLoading(false);
            window.location.reload();
        }, 2000);
    };
    const handleCancel = () => {
        // console.log('Clicked cancel button');
        setOpen(false);
    };
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <>
            {/* login */}
            <ToastContainer />
            {/* <button ref={targetRef} style={{ display: 'none' }}></button> */}
            {/* <div className="overlay"> */}
            <div className={`overlay ${isOpenLogin ? 'openform' : ''}`}>
                <div className="login-wrapper" id="login-content">
                    <div className="login-content">
                        <button onClick={closeLoginModal} className="close-btn">x</button>
                        <h3>Login</h3>
                        <form onSubmit={handleSubmit} method="post" action="#">
                            <div className="row">
                                <label htmlFor="username">
                                    Username:
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        placeholder="Username"
                                        // pattern="^[a-zA-Z][a-zA-Z0-9-_\.]{8,20}$"
                                        required="required"
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>

                            <div className="row">
                                <label htmlFor="password">
                                    Password:
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="******"
                                        // pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                                        required="required"
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>
                            <div className="row">
                                <div className="remember">
                                    <div>
                                        <input type="checkbox" name="remember" value="Remember me" /><span>Remember me</span>
                                    </div>
                                    <a href="#">Forget password ?</a>
                                </div>
                            </div>
                            <div className="row">
                                <button className="login" type="submit">Login</button>
                            </div>
                        </form>
                        <div className="row">
                            <p>Or via social</p>
                            <div className="social-btn-2">
                                <a className="fb" href="#"><i className="ion-social-facebook"></i>Facebook</a>
                                <a className="tw" href="#"><i className="ion-social-twitter"></i>twitter</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`overlay ${isOpenRegister ? 'openform' : ''}`}>
                <div className="login-wrapper" id="signup-content">
                    <div className="login-content">
                        <button onClick={closeLoginModalRegi} className="close-btn">x</button>
                        <h3>sign up</h3>
                        <form onSubmit={handleSubmitRegister} method="post" action="#">
                            <div className="row">
                                <label htmlFor="username">
                                    Username:
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        placeholder="Username"
                                        // pattern="^[a-zA-Z][a-zA-Z0-9-_\.]{8,20}$"
                                        required="required"
                                        onChange={handleChangeRegister}
                                    />
                                </label>
                            </div>

                            <div className="row">
                                <label htmlFor="password">
                                    Password:
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="******"
                                        // pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                                        required="required"
                                        onChange={handleChangeRegister}
                                    />
                                </label>
                            </div>
                            <div className="row">
                                <label htmlFor="password-2">
                                    re-type Password:
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="******"
                                        // pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                                        required="required"
                                        onChange={handleChangeRegister}
                                    />
                                </label>
                            </div>
                            <div className="row">
                                <button className="regi-btn-submit" type="submit">sign up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <header className="ht-header">
                <div className="container">
                    <nav className="navbar navbar-default navbar-custom">
                        <div className="navbar-header logo">
                            <div className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                                <span className="sr-only">Toggle navigation</span>
                                <div id="nav-icon1">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                            <Link to={"/home"}>
                                <img className="logo" src={logo1} alt="" width="119" height="58" />
                            </Link>
                        </div>
                        <div className="collapse navbar-collapse flex-parent" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav flex-child-menu menu-left">
                                <li className="hidden">
                                    <a href="#page-top"></a>
                                </li>
                                <li className="dropdown first">
                                    <Link to={"/home/"} className="btn btn-default dropdown-toggle lv1">
                                        Trang chủ
                                    </Link>
                                </li>
                                <li className="dropdown first">
                                    <Link to={"/phim-truyenhinh/"} className="btn btn-default dropdown-toggle lv1">
                                        Phim truyền hình
                                    </Link>
                                </li>
                                <li className="dropdown first">
                                    <Link to={"/phim-le/"} className="btn btn-default dropdown-toggle lv1">
                                        Phim lẻ
                                    </Link>
                                </li>
                                <li className="dropdown first">
                                    <Link to={"/phim-le/"} className="btn btn-default dropdown-toggle lv1">
                                        Mới & phổ biến
                                    </Link>
                                </li>
                                {
                                    Object.keys(user).length > 0 ?
                                        (<li className="dropdown first">
                                            <Link to={"/phim-cuatoi/"} className="btn btn-default dropdown-toggle lv1">
                                                Danh sách của tôi
                                            </Link>
                                        </li>)
                                        :
                                        <></>
                                }

                                <li className="dropdown first">
                                    <Link to={"/tim-kiem/"} className="btn btn-default dropdown-toggle lv1">
                                        Tìm kiếm
                                    </Link>
                                </li>
                            </ul>
                            <ul className="nav navbar-nav flex-child-menu menu-right">

                                {/* <li className="loginLink"><a href="#">LOG In</a></li>
                                <li className="btn signupLink"><a href="#">sign up</a></li> */}
                                {
                                    isLogin && isLogin === true ? (
                                        <>
                                            <a className="btn btn-default dropdown-toggle lv1 " onClick={toggleMenu}>
                                                {
                                                    user ?
                                                        <img className="img-avt" src={`../../../../public/images/user/user-${user.avatar}.jpg`} alt="Avatar" />
                                                        :
                                                        <img className="img-avt" src={userBlue} alt="Avatar" />
                                                }
                                            </a>
                                            {showMenu && (
                                                <ul className="dropdown-menu level1 dropdownhover-bottom" >
                                                    <li>
                                                        <Link className="a-profile" to='/profile'>Profile</Link>

                                                    </li>
                                                    <li>
                                                        <button type="primary" onClick={showModal}>Log out</button>
                                                    </li>
                                                </ul>
                                            )}
                                            <Modal
                                                title="Warning"
                                                open={open}
                                                onOk={(handleLogout)}
                                                confirmLoading={confirmLoading}
                                                onCancel={handleCancel}
                                            >
                                                <p>{modalText}</p>
                                            </Modal>
                                        </>
                                    ) : (
                                        <>
                                            {/* <li className="loginLink"><a href="#">LOG In</a></li> */}
                                            <li className=""><button className="login-btn" onClick={toggleContainerClass}>Log in</button></li>
                                            <li className="btn signupLink"><button className="regi-btn" onClick={toggleContainerClassRegi}>Sign Up</button></li>
                                            {/* <li className="btn signupLink"><a href="#">sign up</a></li> */}
                                        </>
                                    )
                                }
                            </ul>
                        </div>
                    </nav>

                    {/* <div className="top-search">
                        <select>
                            <option value="united">TV show</option>
                            <option value="saab">Others</option>
                        </select>
                        <input type="text" placeholder="Search for a movie, TV Show or celebrity that you are looking for" />
                    </div> */}
                </div>
            </header>
        </>
    )
}

export default Header;
