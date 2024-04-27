import { useState, useEffect } from "react";
import axios from "axios";
import { getAllWithPaginate, getAllGenre } from "../../Function/ApiFunction";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
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

    const [movieList, setMovieList] = useState([])
    const [genreList, setGenreList] = useState([])

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

    const getAllGenres = async () => {
        let data = await getAllGenre()
        return data
    }
    const getAlls = async () => {
        let data = await getAllWithPaginate()
        return data
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

    // Hàm xử lý sự kiện khi form được gửi đi
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        try {
            const response = await axios.post('http://localhost:8080/movie/search', formData);
            console.log('Server response:', response.data);
            setMovieList(response.data)
            setStatusNotFound(false)
        } catch (error) {
            console.error('Error sending form data:', error);
            setMovieList([])
            setStatusNotFound(true)
        }
    };

    return (
        <>
            <Header />
            <div className="page-single movie_list">
                <div className="container">
                    <div className="row ipad-width2">
                        <div className="col-md-8 col-sm-12 col-xs-12">
                            <div className="topbar-filter">
                                {/* {
                                    movieList ?
                                        <p>Tìm thấy <span>{movieList.data.length} kết quả</span> liên quan</p>
                                        :
                                        <p>Không tìm thấy kết quả liên quan</p>

                                } */}
                                <label>Sort by:</label>
                                <select>
                                    <option value="popularity">Popularity Descending</option>
                                    <option value="popularity">Popularity Ascending</option>
                                    <option value="rating">Rating Descending</option>
                                    <option value="rating">Rating Ascending</option>
                                    <option value="date">Release date Descending</option>
                                    <option value="date">Release date Ascending</option>
                                </select>

                                {
                                    <a
                                        key={0}
                                        className={movieListStatus == true ? `list active` : `list`}
                                        onClick={() => handleTabClick(true)}
                                    >
                                        <i className={`ion-ios-list-outline`}></i>
                                    </a>
                                }
                                {
                                    <a
                                        key={1}
                                        className={movieListStatus == false ? `grid active` : `grid`}
                                        onClick={() => handleTabClick(false)}
                                    >
                                        <i className={`ion-grid`}></i>
                                    </a>
                                }
                            </div>
                            <div className={statusNotFound == true ? `middle-content middle-content-active` : `middle-content middle-content-none`}>
                                <img src="images/uploads/err-img.png" alt="" />
                                <h1>There are no results matching your search request</h1>
                            </div>
                            {
                                movieListStatus ?
                                    <div className="flex-wrap-movielist">
                                        {
                                            movieList.data && movieList.data.length > 0
                                            && movieList.data.map((item, index) => {
                                                return (
                                                    <Link to={`/detail/${item.movie_id}/${item.slug}`} key={index} className="movie-item-style-2 movie-item-style-1">
                                                        <img src={item.poster} alt="" />
                                                        {
                                                            item && item.type === "series" && item.episodes.length > 0 && (
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
                                                        <div className="mv-item-infor mv-item-infor-add">
                                                            <h6><a href="moviesingle.html">{item.name} <span>({item.year})</span></a></h6>
                                                            <p className="rate"><i className="ion-android-star"></i><span>{item.rated}</span> /10</p>
                                                            <p className="run-time">Lượt xem: {item.view} </p>
                                                            <p className="describe">{item.content}</p>
                                                            <p className="run-time"> Thời lượng: {item.runtime}    .     <span>MMPA: PG-13 </span>    .     <span>Ra mắt: {item.year}</span></p>
                                                            <p>Director: <a href="#">Joss Whedon</a></p>
                                                            <p>Cast: {
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
                            <div className="topbar-filter">
                                <label>Movies per page:</label>
                                <select>
                                    <option value="range">5 Movies</option>
                                    <option value="saab">10 Movies</option>
                                </select>
                                <div className="pagination2 pagination-movie">
                                    <span>Page 1 of 2:</span>

                                    {/* <a className="active" href="#">1</a>
                                    <a href="#">2</a> */}
                                    <a href="#"><i className="ion-arrow-left-b"></i></a>
                                    <input className="input-paginate" type="text" value={1} />
                                    <a href="#"><i className="ion-arrow-right-b"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-12 col-xs-12">
                            <div className="sidebar">
                                <div className="searh-form">
                                    <h4 className="sb-title">Tìm kiếm</h4>
                                    <form onSubmit={handleSubmit} className="form-style-1" >
                                        <div className="row">
                                            <div className="col-md-12 form-it">
                                                <label>Tên</label>
                                                <input
                                                    type="text"
                                                    name="movieName"
                                                    placeholder="Nhập từ khoá"
                                                    value={formData.movieName}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-md-12 form-it">
                                                <label>Thể loại</label>
                                                <div className="group-ip">
                                                    <select
                                                        name="genres" multiple=""
                                                        className="ui fluid dropdown"
                                                        value={formData.genres}
                                                        onChange={handleChange}
                                                    >
                                                        <option value="none">Chọn thể loại</option>

                                                        {
                                                            genreList && genreList.length > 0 && genreList.map((item, index) => {
                                                                return (
                                                                    <option key={index * 223} value={item.genre}>{item.genre_vie}</option>
                                                                )
                                                            })
                                                        }

                                                        {/* <option value="chill">Chill</option>
                                                        <option value="Action3">Action 3</option>
                                                        <option value="Action4">Action 4</option>
                                                        <option value="Action5">Action 5</option> */}
                                                    </select>
                                                </div>

                                            </div>
                                            <div className="col-md-12 form-it">
                                                <label>Đánh giá</label>

                                                <select
                                                    name="ratingRange"
                                                    value={formData.ratingRange}
                                                    onChange={handleChange}
                                                >
                                                    <option value="10">Đánh giá</option>
                                                    <option value="9">9 - 10</option>
                                                    <option value="7">7 - 9</option>
                                                    <option value="5">5-7</option>
                                                    <option value="0">Dưới 5</option>
                                                </select>

                                            </div>
                                            <div className="col-md-12 form-it">
                                                <label>Năm ra mắt</label>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <select
                                                            name="releaseYearStart"
                                                            value={formData.releaseYearStart}
                                                            onChange={handleChange}
                                                        >
                                                            <option value="0">Từ</option>

                                                            {renderYears()}
                                                        </select>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <select
                                                            name="releaseYearEnd"
                                                            value={formData.releaseYearEnd}
                                                            onChange={handleChange}
                                                        >
                                                            <option value="0">Đến</option>

                                                            {renderYears()}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12 ">
                                                {/* <a href="" className="submit"></a> */}
                                                <button className="submit" type="submit">Tìm kiếm</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
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
