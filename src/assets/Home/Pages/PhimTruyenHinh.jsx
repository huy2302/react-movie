import { useState, useEffect } from "react";
import axios from "axios";
import { getAllWithPaginate, getAllGenre, getMovieByGenre } from "../../Function/ApiFunction";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { ToastContainer, toast } from 'react-toastify';
import Header from "../Layouts/Header";
import Footer from "../Layouts/Footer";

const MovieList = () => {
    const handleTabClick = (status) => {
        if (status) {
            setMovieListStatus(true)
        } else {
            setMovieListStatus(false)
        }
    };
    const [displayCount, setDisplayCount] = useState(10);
    const [movieList, setMovieList] = useState([

    ])
    const [genreList, setGenreList] = useState([

    ])
    const [genreName, setGenreName] = useState("")
    const [movieListStatus, setMovieListStatus] = useState(true)
    const [statusNotFound, setStatusNotFound] = useState(false)
    // const itemsPerPage = 2; // Số lượng mục trên mỗi trang
    // const [currentPage, setCurrentPage] = useState(1);

    // const indexOfLastItem = currentPage * itemsPerPage;
    // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // const [currentItems, setCurrentItems] = useState([]);

    // Chuyển trang
    // const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const renderYears = () => {
        const result = []
        for (let i = 1990; i <= 2024; i++) {
            result.push(<option key={i} value={i}>{i}</option>)
        }
        return result
    }

    const getAlls = async () => {
        let data = await getMovieByGenre("", "series")
        return data
    }
    const getAllGenres = async () => {
        let data = await getAllGenre()
        return data
    }
    const getMovieByGenres = async (genre) => {
        let data = await getMovieByGenre(genre, "series")
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
    const changeMovieByGenre = (genre) => {
        getMovieByGenres(genre).then((data) => {
            setMovieList(data)
            setGenreName(genre)
        }).catch((e) => {
            if (e.message === "Error fetching room types") {
                handleLoginToastRegister("not_found")
            }
        })
    }
    useEffect(() => {
        // setIsLoading(true)
        getAlls().then((data) => {
            setMovieList(data)
        }).catch((e) => {
            // setError(error.message)
            // setIsLoading(false)
        })

        getAllGenres().then((data) => {
            setGenreList(data)
        }).catch((e) => {
            // setError(error.message)
            // setIsLoading(false)
        })

    }, [])

    // form search
    const [formData, setFormData] = useState({
        movieName: '',
        genres: 'none',
        ratingRange: '10',
        releaseYearStart: '',
        releaseYearEnd: '',

    });

    // Hàm xử lý sự kiện khi người dùng nhập vào các trường form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <>
            <Header />
            <ToastContainer />
            <div className="page-single movie_list">
                <div className="container-left">
                    <ul className="cate-list">
                        <li className="cate-item"><button onClick={() => changeMovieByGenre("")}>Tất cả</button></li>
                        {
                            genreList && genreList.length > 0 && genreList.map((item, index) => {
                                return (
                                    <li key={index * 273} className="cate-item"><button onClick={() => changeMovieByGenre(item.genre_vie)}>{item.genre_vie}</button></li>
                                )
                            })
                        }
                        {/* <li className="cate-item"><button>Phim tình cảm</button></li>
                        <li className="cate-item"><button>Phim viễn tưởng</button></li>
                        <li className="cate-item"><button>Phim hoạt hình</button></li>
                        <li className="cate-item"><button>Phim kinh dị</button></li> */}
                    </ul>
                </div>
                <div className="container">
                    <div className="row ipad-width2">
                        <div className="col-md-12 col-sm-12 col-xs-12 content-col-12">
                            <div class="title-hd"><h2>{
                                genreName === "" ? `Tất cả` : `${genreName}`
                            }</h2>

                            </div>
                            {
                                movieListStatus ?
                                    <div className="flex-wrap-movielist">
                                        {
                                            movieList.data && movieList.data.length > 0
                                            && movieList.data
                                                .slice(0, displayCount)
                                                .map((item, index) => {
                                                    return (
                                                        <Link to={`/detail/${item.movie_id}/${item.slug}`} key={index} className="movie-item-style-2 movie-item-style-1">
                                                            <img src={item.poster} alt="" />
                                                            {
                                                                item && item.type === "series" && item.episodes.length > 0 && (
                                                                    <>
                                                                        <div className="number-series">
                                                                            <p>{item.episodes.length}/{item.episodes.length}</p>
                                                                        </div>
                                                                    </>

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
                            <div className="">
                                <button onClick={() => setDisplayCount(prevCount => prevCount + 10)} className="load-more">Xem thêm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

        </>
    )
}

export default MovieList;
