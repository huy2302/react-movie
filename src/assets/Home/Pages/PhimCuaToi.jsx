import { useState, useEffect } from "react";
import axios from "axios";
import { getFavoriteByUser, getAllGenre, getWatchedByUser } from "../../Function/ApiFunction";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { ToastContainer, toast } from 'react-toastify';
import Header from "../Layouts/Header";
import Footer from "../Layouts/Footer";

const MovieList = () => {
    const [displayCount, setDisplayCount] = useState(5);
    const [user, setUser] = useState({})

    const [movieList, setMovieList] = useState([])
    const [watchedList, setWatchedList] = useState([])
    const [movieListStatus, setMovieListStatus] = useState(true)


    const getFavoriteMovie = async (id) => {
        let data = await getFavoriteByUser(id)
        console.log(data)
        return data
    }
    const getWatchedMovie = async (id) => {
        let data = await getWatchedByUser(id)
        console.log(data)
        return data
    }

    const handleLoginToastRegister = (strMessage) => {
        if (strMessage === "ERR_NETWORK") {
            toast.error("Connection failed, please check network connection.", {

            });
        } else if (strMessage === "ERR_BAD_REQUEST") {
            toast.error("Account already exists, please try again.", {

            });
        } else {
            toast.warn("Không tìm thấy phim phù hợp.", {

            });
        }
    };
    useEffect(() => {
        const storedUserInfo = localStorage.getItem('userInfo');
        if (storedUserInfo) {
            const parsedUserInfo = JSON.parse(storedUserInfo);
            // console.log(parsedUserInfo.username.id)
            setUser(parsedUserInfo.username);
            getFavoriteMovie(parsedUserInfo.username.id).then((data) => {
                setMovieList(data)
            }).catch((e) => {
            })
            getWatchedMovie(parsedUserInfo.username.id).then((data) => {
                setWatchedList(data)
            }).catch((e) => {
            })
        } else {

        }

    }, [])

    return (
        <>
            <Header />
            <ToastContainer />
            <div className="page-single movie_list">
                <div className="container">
                    <div className="row ipad-width2">
                        <div className="col-md-12 col-sm-12 col-xs-12 content-col-12">
                            <div class="title-hd"><h2>Yêu thích</h2>

                            </div>
                            {
                                movieListStatus ?
                                    <div className="flex-wrap-movielist">
                                        {
                                            movieList.data && movieList.data.length > 0 ?
                                                movieList.data
                                                    .map((item, index) => {
                                                        return (
                                                            <Link to={`/detail/${item.movie_id}/${item.slug}`} key={index} className="movie-item-style-2 movie-item-style-1">
                                                                <img src={item.poster} alt="" />
                                                                {
                                                                    item && item.episodes.length > 0 && (
                                                                        <div className="number-series">
                                                                            <p>{item.episodes.length}/{item.episodes.length}</p>
                                                                        </div>
                                                                    )
                                                                }
                                                                <div className="number-views">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                                                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                                                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                                                    </svg>
                                                                    <p>{item.view}</p>
                                                                </div>
                                                                {/* <div className="hvr-inner">
                                                        <Link to={`/detail/${item.movie_id}/${item.slug}/${item.slug}`}>Read more <i className="ion-android-arrow-dropright"></i></Link>
                                                    </div> */}

                                                                <div className="mv-item-infor">
                                                                    <h6>
                                                                        <Link to={`/detail/${item.movie_id}/${item.slug}`}>{item.name}</Link>
                                                                    </h6>
                                                                    <div className="flex">
                                                                        <p className="rate">
                                                                            <i className="ion-android-star"></i>
                                                                            <span>{item.rated}</span>
                                                                        </p>
                                                                        <div class="card-badge">{item.year}</div>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        )
                                                    })
                                                :
                                                <h1>Chưa có phim nào trong thư viện.</h1>
                                        }

                                    </div>

                                    :

                                    <div className="movie-list">
                                        {
                                            movieList.data && movieList.data.length > 0
                                            && movieList.data.map((item, index) => {
                                                return (
                                                    <div key={index} className="movie-item-style-2">
                                                        <img src={item.poster} alt="" />
                                                        <div className="mv-item-infor">
                                                            <h6><a href="moviesingle.html">{item.name} <span>({item.released})</span></a></h6>
                                                            <p className="rate"><i className="ion-android-star"></i><span>{item.rated}</span></p>
                                                            <p className="describe">Earth's mightiest heroes must come together and learn to fight as a team if they are to stop the mischievous Loki and his alien army from enslaving humanity...</p>
                                                            <p className="run-time"> Run Time: {item.runtime}    .     <span>MMPA: PG-13 </span>    .     <span>Release: {item.year}</span></p>
                                                            <p>Director: <a href="#">Joss Whedon</a></p>
                                                            <p>Stars: {
                                                                item.actors && item.actors.length > 0 && item.actors.map((actor, i) => {
                                                                    return (
                                                                        <a href="#">{actor.name}, </a>
                                                                    )
                                                                })
                                                            }</p>
                                                        </div>
                                                    </div>
                                                )
                                            })

                                        }
                                    </div>
                            }
                            <div class="title-hd"><h2>Đã xem</h2>

                            </div>
                            {
                                movieListStatus ?
                                    <div className="flex-wrap-movielist">
                                        {
                                            watchedList.data && watchedList.data.length > 0 ?
                                                watchedList.data
                                                    .map((item, index) => {
                                                        return (
                                                            <Link to={`/detail/${item.movie_id}/${item.slug}`} key={index} className="movie-item-style-2 movie-item-style-1">
                                                                <img src={item.poster} alt="" />
                                                                {
                                                                    item && item.episodes.length > 0 && (
                                                                        <div className="number-series">
                                                                            <p>{item.episodes.length}/{item.episodes.length}</p>
                                                                        </div>
                                                                    )
                                                                }
                                                                <div className="number-views">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                                                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                                                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                                                    </svg>
                                                                    <p>{item.view}</p>
                                                                </div>
                                                                {/* <div className="hvr-inner">
                            <Link to={`/detail/${item.movie_id}/${item.slug}/${item.slug}`}>Read more <i className="ion-android-arrow-dropright"></i></Link>
                        </div> */}

                                                                <div className="mv-item-infor">
                                                                    <h6>
                                                                        <Link to={`/detail/${item.movie_id}/${item.slug}`}>{item.name}</Link>
                                                                    </h6>
                                                                    <div className="flex">
                                                                        <p className="rate">
                                                                            <i className="ion-android-star"></i>
                                                                            <span>{item.rated}</span>
                                                                        </p>
                                                                        <div class="card-badge">{item.year}</div>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        )
                                                    })
                                                :
                                                <h1>Chưa có phim nào trong thư viện.</h1>
                                        }

                                    </div>

                                    :

                                    <div className="movie-list">
                                        {
                                            watchedList.data && watchedList.data.length > 0
                                            && watchedList.data.map((item, index) => {
                                                return (
                                                    <div key={index} className="movie-item-style-2">
                                                        <img src={item.poster} alt="" />
                                                        <div className="mv-item-infor">
                                                            <h6><a href="moviesingle.html">{item.name} <span>({item.released})</span></a></h6>
                                                            <p className="rate"><i className="ion-android-star"></i><span>{item.rated}</span></p>
                                                            <p className="describe">Earth's mightiest heroes must come together and learn to fight as a team if they are to stop the mischievous Loki and his alien army from enslaving humanity...</p>
                                                            <p className="run-time"> Run Time: {item.runtime}    .     <span>MMPA: PG-13 </span>    .     <span>Release: {item.year}</span></p>
                                                            <p>Director: <a href="#">Joss Whedon</a></p>
                                                            <p>Stars: {
                                                                item.actors && item.actors.length > 0 && item.actors.map((actor, i) => {
                                                                    return (
                                                                        <a href="#">{actor.name}, </a>
                                                                    )
                                                                })
                                                            }</p>
                                                        </div>
                                                    </div>
                                                )
                                            })

                                        }
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

        </>
    )
}

export default MovieList;
