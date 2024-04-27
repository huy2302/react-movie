import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { Button } from 'antd'
import Modal from 'react-modal';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import Header from "../layouts/Header";
import Navbar from "../layouts/Navbar";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { getMovieDetails, getAllWithPaginate } from '../../assets/Function/ApiFunction'
import { Line } from "react-chartjs-2";

const HomePageAdmin = () => {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [movies, setMovies] = useState([])
    const [movieDetail, setMovieDetail] = useState({});

    function openModal(id) {
        setIsOpen(true);
        getMovieDetail(id).then((res) => {
            setTimeout(() => {
                setMovieDetail(res);
                setFormData(res);
                setEpisodes(res.episodes);
                // console.log(episodesData)
            }, 500);
            // console.log(movieDetail.content)
        }).catch((ex) => {
            console.log(ex)
        })
    }

    function closeModal() {
        setIsOpen(false);
    }
    const getMovieDetail = async (id) => {
        let data = await getMovieDetails(id)
        // console.log(data)
        return data
    }
    const getAllMovie = async () => {
        let data = await getAllWithPaginate()
        // console.log(data)
        return data
    }
    useEffect(() => {
        getAllMovie().then((data) => {
            setMovies(data)
        }).catch((e) => {
            // setError(error.message)
            // setIsLoading(false)
        })
    }, [])

    const [formData, setFormData] = useState({
        // id: '',
        // name: '',
        // slug: '',
        // year: '',
        // rated: '',
        // runtime: '',
        // content: '',
        // type: '',
        // country: '',
        // awards: '',

    });
    const [episodesData, setEpisodes] = useState([])

    const handleChangeEpi = (e, index) => {
        const { name, value } = e.target;
        const newEpisodesData = [...episodesData];
        newEpisodesData[index] = { ...newEpisodesData[index], [name]: value };
        setEpisodes(newEpisodesData);
    };
    // cập nhật phim
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // console.log(formData)
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormData(prevFormData => ({
            ...prevFormData,
            episodes: episodesData
        }));
        console.log(formData)
        // console.log(episodesData)
        try {
            // const response = await axios.post('http://localhost:8080/user/login', formData);
            // console.log('Server response:', response);
        } catch (error) {
            console.error(error.code)
            handleLoginToast(error.code)
            // setShowLoginErr(true)
            // setIsLogin(false)
        }
    };
    return (
        <>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                overlayClassName="react-modal-overlay"
                className="modal-content-admin"
            >
                {
                    movieDetail && Object.keys(movieDetail).length > 0 ?
                        <form onSubmit={handleSubmit} method="post" action="#" className="modal-container">
                            <div>
                                <img src={formData.poster} alt="" />
                            </div>
                            <div className="content-modal">
                                <div className="input-css">
                                    <label htmlFor="id">ID</label>
                                    <input value={formData.movie_id} type="text" name="id" readOnly />
                                    <span />
                                </div>
                                <div className="input-css">
                                    <label htmlFor="name">Name</label>
                                    <input value={formData.name} type="text" name="name" onChange={handleChange} />
                                    <span />
                                </div>
                                <div className="input-css">
                                    <label htmlFor="slug">Slug</label>
                                    <input value={formData.slug} type="text" name="slug" onChange={handleChange}/>
                                    <span />
                                </div>
                                <div className="input-css">
                                    <label htmlFor="year">Year</label>
                                    <input value={formData.year} type="text" name="year" onChange={handleChange}/>
                                    <span />
                                </div>
                                <div className="input-css">
                                    <label htmlFor="rated">Rated</label>
                                    <input value={formData.rated} type="text" name="rated" onChange={handleChange}/>
                                    <span />
                                </div>
                                <div className="input-css">
                                    <label htmlFor="runtime">Runtime</label>
                                    <input value={formData.runtime} type="text" name="runtime" onChange={handleChange}/>
                                    <span />
                                </div>
                                <div className="input-css">
                                    <label htmlFor="content">Content</label>
                                    <input value={formData.content} type="text" name="content" onChange={handleChange}/>
                                    <span />
                                </div>
                                <div className="input-css">
                                    <label htmlFor="type">Type</label>
                                    <select name="type" id="" readOnly>
                                        {
                                            formData.type === "series" ?
                                                <>
                                                    <option value="series">series</option>
                                                    <option value="single">single</option>
                                                </>
                                                :
                                                <>
                                                    <option value="single">single</option>
                                                    <option value="series">series</option>
                                                </>
                                        }

                                    </select>
                                    <span />
                                </div>
                                <div className="input-css">
                                    <label htmlFor="country">Country</label>
                                    <input value={formData.country} type="text" name="country" onChange={handleChange} />
                                    <span />
                                </div>
                                <div className="input-css">
                                    <label htmlFor="awards">Awards</label>
                                    <input value={formData.awards} type="text" name="awards" onChange={handleChange} />
                                    <span />
                                </div>


                            </div>
                            <ul className="episodes-box">
                                <p className="p-episodes">Tập phim: {movieDetail.episodes.length} tập</p>
                                {
                                    movieDetail.episodes.length > 0 && episodesData.map((item, index) => {
                                        return (
                                            <li className="" key={index}>
                                                {/* <div className="input-css">
                                                    <label htmlFor="epi-name">Name</label>
                                                    <input value={episodesData[index].name} type="text" name="name" onChange={handleChangeEpi}/>
                                                    <span />
                                                </div> */}
                                                <div className="input-css">
                                                    <label htmlFor="{`link_embeds-${index}`}">Link cũ</label>
                                                    <input 
                                                        value={episodesData[index].link_embed} 
                                                        type="text"  
                                                        name="link_embed" 
                                                        onChange={(e) => handleChangeEpi(e, index)} 
                                                    />
                                                    <span />
                                                </div>
                                                <div className="input-css">
                                                    <label htmlFor={`link_embeds-${index}`}>Link mới</label>
                                                    <input type="text" name="link_embeds" onChange={handleChangeEpi}/>
                                                    <span />
                                                </div>
                                            </li>
                                        )
                                    })

                                }

                            </ul>
                            <button type="submit" className="submid-admin">Cập nhật</button>
                        </form>
                        :
                        <></>
                }
                

            </Modal>
            <ToastContainer />
            <Header />
            <Tabs>
                <div className="container-ad">
                    {/* Navbar */}
                    <div className="navbar-ad">
                        <TabList>
                            <Tab>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-houses" viewBox="0 0 16 16">
                                    <path d="M5.793 1a1 1 0 0 1 1.414 0l.647.646a.5.5 0 1 1-.708.708L6.5 1.707 2 6.207V12.5a.5.5 0 0 0 .5.5.5.5 0 0 1 0 1A1.5 1.5 0 0 1 1 12.5V7.207l-.146.147a.5.5 0 0 1-.708-.708zm3 1a1 1 0 0 1 1.414 0L12 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l1.854 1.853a.5.5 0 0 1-.708.708L15 8.207V13.5a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 4 13.5V8.207l-.146.147a.5.5 0 1 1-.708-.708zm.707.707L5 7.207V13.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V7.207z" />
                                </svg>
                                Trang chủ
                            </Tab>
                            <Tab>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-film" viewBox="0 0 16 16">
                                    <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm4 0v6h8V1zm8 8H4v6h8zM1 1v2h2V1zm2 3H1v2h2zM1 7v2h2V7zm2 3H1v2h2zm-2 3v2h2v-2zM15 1h-2v2h2zm-2 3v2h2V4zm2 3h-2v2h2zm-2 3v2h2v-2zm2 3h-2v2h2z" />
                                </svg>Danh sách phim
                            </Tab>
                            <Tab>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people" viewBox="0 0 16 16">
                                    <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
                                </svg>
                                Người dùng
                            </Tab>
                        </TabList>

                    </div>
                    <div className="content-ad">
                        <TabPanel className="">
                            <div>

                            </div>
                        </TabPanel>
                        <TabPanel className="">
                            <div className="content-right list-movie">
                                <div className="">
                                    <table className="">
                                        <thead>
                                            <tr>
                                                <th className="id">ID</th>
                                                <th className="name">Tên phim</th>
                                                <th className="">Thời lượng</th>
                                                <th className="rate">Đánh giá</th>
                                                <th className="rate">Số tập</th>
                                                <th className="">Lượt xem</th>
                                                <th className=""></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                movies.data && movies.data.map((item, index) => {
                                                    return (
                                                        <tr>
                                                            <td>
                                                                <p>{index + 1}</p>
                                                            </td>
                                                            <td>
                                                                <p className="bold">{item.name}</p>
                                                                <p className="">{item.year}</p>
                                                            </td>
                                                            <td className="">
                                                                <p className="">{item.runtime}</p>
                                                            </td>
                                                            <td className="">
                                                                <span className="">{item.rated}</span>
                                                            </td>
                                                            <td className="">
                                                                <span className="">{item.episodes.length}</span>
                                                            </td>
                                                            <td className="">
                                                                <p className="">{item.view}</p>
                                                            </td>
                                                            <td className="">
                                                                <Button onClick={() => openModal(item.movie_id)} className="">Chi tiết</Button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel className="">
                            <div className="content-right list-movie">
                                <div className="">
                                    <table className="">
                                        <thead>
                                            <tr>
                                                <th className="id">ID</th>
                                                <th className="name">Tên phim</th>
                                                <th className="">Thời lượng</th>
                                                <th className="rate">Đánh giá</th>
                                                <th className="rate">Số tập</th>
                                                <th className="">Quốc gia</th>
                                                <th className=""></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                movies.data && movies.data.map((item, index) => {
                                                    return (
                                                        <tr>
                                                            <td>
                                                                <p>{index + 1}</p>
                                                            </td>
                                                            <td>
                                                                <p className="bold">{item.name}</p>
                                                                <p className="">{item.year}</p>
                                                            </td>
                                                            <td className="">
                                                                <p className="">{item.runtime}</p>
                                                            </td>
                                                            <td className="">
                                                                <span className="">{item.rated}</span>
                                                            </td>
                                                            <td className="">
                                                                <span className="">{item.episodes.length}</span>
                                                            </td>
                                                            <td className="">
                                                                <p className="">{item.country}</p>
                                                            </td>
                                                            <td className="">
                                                                <Button onClick={() => openModal(item.movie_id)} className="">Chi tiết</Button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </TabPanel>

                    </div>
                </div>
            </Tabs>
        </>
    )
}

export default HomePageAdmin;
