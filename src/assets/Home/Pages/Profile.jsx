import { useState, useEffect } from "react";
import axios from "axios";
import { getFavoriteByUser, getAllGenre, getWatchedByUser } from "../../Function/ApiFunction";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { ToastContainer, toast } from 'react-toastify';
import Header from "../Layouts/Header";
import Footer from "../Layouts/Footer";
import user1 from "../../../../public/images/user/user-1.jpg"
import user2 from "../../../../public/images/user/user-2.jpg"
import user3 from "../../../../public/images/user/user-3.jpg"
import user4 from "../../../../public/images/user/user-4.jpg"
const Profile = () => {
    const [user, setUser] = useState({})

    const handleToast = (strMessage) => {
        if (strMessage === "success") {
            toast.success("Cập nhật thành công.", {

            });
        } else if (strMessage === "wrong") {
            toast.error("Nhập lại mật khẩu không chính xác, vui lòng thử lại.", {

            });
        } else if (strMessage === "exist") {
            toast.warn("Mật khẩu mới cần khác với mật khẩu cũ.", {

            });
        } else if (strMessage === "duplicate") {
            toast.warn("Cập nhật thất bại, mật khẩu sai.", {

            })
        } else {
            toast.warn("Cập nhật thất bại.", {

            });
        }
    };
    useEffect(() => {
        const storedUserInfo = localStorage.getItem('userInfo');
        if (storedUserInfo) {
            const parsedUserInfo = JSON.parse(storedUserInfo);
            // console.log(parsedUserInfo.username.id)
            setUser(parsedUserInfo.username);
            setUserUpdate(parsedUserInfo.username);
            setSelectedImage(parsedUserInfo.username.avatar);
        } else {

        }

    }, [])

    const [userUpdate, setUserUpdate] = useState({});
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserUpdate({
            ...userUpdate,
            [name]: value
        });
    };

    // đổi pass
    const [password, setPassword] = useState({
        old_password: '',
        password: '',
        re_password: ''
    });
    const handlePassword = (e) => {
        const { name, value } = e.target;
        setPassword({
            ...password,
            [name]: value
        });
    };

    // chọn ảnh avatar
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (image) => {
        setUserUpdate({
            ...userUpdate,
            "avatar": image
        });
        setSelectedImage(image);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(userUpdate);
        try {
            if (Object.keys(userUpdate).length > 0) {
                const response = await axios.post('http://localhost:8080/user/edit', userUpdate, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response.data === "Cập nhật thành công") {
                    handleToast("success")
                    localStorage.removeItem('userInfo');
                    const userInfo = { username: userUpdate, isLogin: true };
                    localStorage.setItem('userInfo', JSON.stringify(userInfo));
                } else {
                    handleToast("")

                }
            } 
        } catch (error) {
        }

    };
    const handleSubmitPassword = async (e) => {
        e.preventDefault();
        console.log(password);
        if (password.old_password === password.password) {
            handleToast("exist")

        } else {
            if (password.password === password.re_password) {
                if (Object.keys(userUpdate).length > 0) {
                    try {
                        const response = await axios.post(`http://localhost:8080/user/change-password?user_id=${userUpdate.id}&password=${password.old_password}&new_password=${password.password}`);
                        if (response.data === "Đổi mật khẩu thất bại") {
                            handleToast("duplicate")
                        } else if (response.data = "Đổi mật khẩu thành công") {
                            handleToast("success")
                        }
                    } catch (e) {
                        console.log(e);
                    }
                    // handleToast("SUCCESS")
                } else {
                    // handleToast("")
                }

            } else {
                handleToast("wrong")
            }
        }
    };

    return (
        <>
            <Header />
            <ToastContainer />
            <div className="page-single">
                <div className="container">
                    <div className="row ipad-width" style={{ display: "flex" }}>
                        <div className="col-md-9 col-sm-12 col-xs-12">
                            <div className="form-style-1 user-pro" action="#">
                                <form onSubmit={handleSubmit} className="user">
                                    <h4>01. Thông tin tài khoản</h4>
                                    <div className="row">
                                        <div className="col-md-6 form-it">
                                            <label>Tên tài khoản</label>
                                            <input name="username" type="text" placeholder="edwardkennedy" defaultValue={user.name} readOnly style={{ backgroundColor: "#233a50" }} />
                                        </div>
                                        <div className="col-md-6 form-it">
                                            <label>Số điện thoại</label>
                                            <input name="phone_number" onChange={handleInputChange} defaultValue={user.phone_number} type="text" placeholder="edward@kennedy.com" />
                                        </div>
                                    </div>
                                    <div style={{ marginBottom: "1em" }}>
                                        <label className="mb-3 block text-black dark:text-white">
                                            Ảnh
                                        </label>
                                        <div>
                                            <button className="btn-img" type='button' onClick={() => handleImageClick('1')}>
                                                <img className={selectedImage === '1' ? 'selected-img' : ''} src={user1} alt="Avatar" />
                                            </button>
                                            <button className="btn-img" type='button' onClick={() => handleImageClick('2')}>
                                                <img className={selectedImage === '2' ? 'selected-img' : ''} src={user2} alt="Avatar" />
                                            </button>
                                            <button className="btn-img" type='button' onClick={() => handleImageClick('3')}>
                                                <img className={selectedImage === '3' ? 'selected-img' : ''} src={user3} alt="Avatar" />
                                            </button>
                                            <button className="btn-img" type='button' onClick={() => handleImageClick('4')}>
                                                <img className={selectedImage === '4' ? 'selected-img' : ''} src={user4} alt="Avatar" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-2">
                                            <button className="submit" type="submit">Cập nhật</button>                                        </div>
                                    </div>
                                </form>

                            </div>
                        </div>
                        <div className="col-md-9 col-sm-12 col-xs-12">
                            <div className="form-style-1 user-pro" action="#">
                                <form onSubmit={handleSubmitPassword} className="">
                                    <h4>02. Đổi mật khẩu</h4>
                                    <div className="row">
                                        <div className="col-md-6 form-it">
                                            <label>Mật khẩu cũ</label>
                                            <input type="password" name="old_password" onChange={handlePassword} required placeholder="**********" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 form-it">
                                            <label>Mật khẩu mới</label>
                                            <input type="password" name="password" onChange={handlePassword} required placeholder="***************" />
                                        </div>
                                        <div className="col-md-6 form-it">
                                            <label>Nhập lại mật khẩu mới</label>
                                            <input type="password" name="re_password" onChange={handlePassword} required placeholder="*************** " />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-2">
                                            <button className="submit" type="submit">Cập nhật</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

        </>
    )
}

export default Profile;
