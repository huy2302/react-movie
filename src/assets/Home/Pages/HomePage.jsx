import ReactPlayer from "react-player";
import { getMoviesByRated, getAllWithPaginate, getMovieAdvance } from "../../Function/ApiFunction";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Header from "../Layouts/Header";
import Footer from "../Layouts/Footer";

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setIsLoading] = useState(true);

    const [moviesRecommend, setMoviesRecommend] = useState([])
    const [moviesNew, setmoviesNew] = useState([])
    const [newSeries, setNewSeries] = useState([])
    const [newSingleMovie, setNewSingleMovie] = useState([])
    const buttonContainerRef = useRef(null);


    // phim đề xuất
    const getMoviesRecommend = async () => {
        let data = await getMovieAdvance("recommended", "")
        // console.log(data.data[2].rated.toString().includes('.'))
        return data
    }
    // phim mới
    const getMoviesNew = async () => {
        let data = await getMovieAdvance("year", "")
        // console.log(data.data[2].rated.toString().includes('.'))
        return data
    }
    // phim bộ mới
    const getMoviesSeriesNew = async () => {
        let data = await getMovieAdvance("year", "series")
        // console.log(data.data[2].rated.toString().includes('.'))
        return data
    }
    // phim lẻ mới
    const getMoviesSingleNew = async () => {
        let data = await getMovieAdvance("year", "single")
        // console.log(data.data[2].rated.toString().includes('.'))
        return data
    }
    useEffect(() => {
        // lấy ra phim đề xuất
        getMoviesRecommend().then((data) => {
            setMoviesRecommend(data)
            setTimeout(() => {
                setIsLoading(false)
            }, 2000)
            setTimeout(() => {
                handleButtonClick()
            }, 1000);
        }).catch((e) => {
            setIsLoading(true)
        })
        // lấy ra phim mới nhất
        getMoviesNew().then((data) => {
            setmoviesNew(data)
            setTimeout(() => {
                setIsLoading(false)
            }, 2000)
            setTimeout(() => {
                handleButtonClick()
            }, 1000);
        }).catch((e) => {
            setIsLoading(true)
        })
        // lấy ra phim bộ mới
        getMoviesSeriesNew().then((data) => {
            setNewSeries(data)
            setTimeout(() => {
                setIsLoading(false)
            }, 2000)
            setTimeout(() => {
                handleButtonClick()
            }, 1000);
        }).catch((e) => {
            setIsLoading(true)
        })
        // lấy ra phim lẻ mới
        getMoviesSingleNew().then((data) => {
            setNewSingleMovie(data)
            setTimeout(() => {
                setIsLoading(false)
            }, 2000)
            setTimeout(() => {
                handleButtonClick()
            }, 1000);
        }).catch((e) => {
            setIsLoading(true)
        })



        const handleButtonClick = () => {
            if (buttonContainerRef.current) {
                // Lấy ra tất cả các nút button trong slider-control
                const elements = Array.from(buttonContainerRef.current.querySelectorAll('.slider-element'))
                const buttons = Array.from(buttonContainerRef.current.querySelectorAll('.slider-control .poster-box'));

                buttons.forEach((item, index) => {
                    item.addEventListener('click', () => {
                        buttons.forEach(e => {
                            if (e.classList.contains('active')) {
                                e.classList.remove('active')
                            }
                        })
                        elements.forEach(e => {
                            if (e.classList.contains('active')) {
                                e.classList.remove('active')
                            }
                        })
                        elements[index].classList.add('active')
                        item.classList.add('active')
                    })
                })
            }
        };
    }, [])
    const getAllMovies = async () => {
        try {
            setIsLoading(true);
            const data = await getMoviesByRated();
            // console.log(data)
            setMovies(data);
        } catch (error) {
            // Xử lý lỗi nếu cần
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    // kiểm tra rated 7.1 => 7.1 | 7 => 7.0
    const checkIfIncludes = (value) => {
        return value.toString().includes('.');
    };

    // viết hoa chữ cái đầu
    const capitalizeFirstLetter = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
    const styles = {
        paddingTop: '9em',
        important: true // This will mark the style as important
    };

    // scroll
    const [dragging, setDragging] = useState(false);
    const [dragStartX, setDragStartX] = useState(0);
    const [scrollStartX, setScrollStartX] = useState(0);
    const containerRef = useRef(null);

    const handleMouseDown = (e) => {
        setDragging(true);
        setDragStartX(e.clientX);
        setScrollStartX(containerRef.current.scrollLeft);
    };

    const handleMouseMove = (e) => {
        if (dragging) {
            const deltaX = e.clientX - dragStartX;
            containerRef.current.scrollLeft = scrollStartX - deltaX;
        }
    };

    const handleMouseUp = () => {
        setDragging(false);
    };
    return (
        <>
            <Header />
            {
                loading ?
                    <div id="preloader">
                        <div id="status">
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    :
                    null
            }
            <div className="movie-items pd-10" style={styles}>
                <section className="banner" aria-label="Popular Movies" ref={buttonContainerRef}>
                    <div className="banner-slider">
                        {
                            moviesRecommend.data && moviesRecommend.data.length > 0
                            && moviesRecommend.data.map((item, index) => {
                                return (
                                    <div className={`slider-item slider-element ${index === 0 ? 'active' : ''}`} slider-item="" key={index * 2938}>
                                        <img src={item.thumb} className="img-cover" loading="eager" />

                                        <div className="banner-content">

                                            <h2 className="heading">{item.name}</h2>

                                            <div className="meta-list">
                                                <div className="meta-item">{item.year}</div>

                                                <div className="meta-item card-badge">{checkIfIncludes(item.rated) ? item.rated : `${item.rated}.0`}</div>
                                            </div>

                                            <p className="genre">
                                                {
                                                    item.genres && item.genres.length > 0 && item.genres.map((e, index) => {
                                                        const capitalizedGenre = capitalizeFirstLetter(e);
                                                        return (
                                                            index === item.genres.length - 1 ? capitalizedGenre : `${capitalizedGenre}, `
                                                        );
                                                    }).join('')
                                                }

                                            </p>

                                            <p className="banner-text">{item.content}</p>

                                            <Link to={`/detail/${item.movie_id}/${item.slug}/`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-play-circle" viewBox="0 0 16 16">
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                    <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445" />
                                                </svg>
                                                <span className="span">Xem ngay</span>
                                            </Link>
                                            {/* <a href="./detail.html" className="" onclick="getMovieDetail(1096197)">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-play-circle" viewBox="0 0 16 16">
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                    <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445" />
                                                </svg>
                                                <span className="span">Watch Now</span>
                                            </a> */}

                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className="slider-control horizontal-drag-scroll"
                    ref={containerRef}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    >
                        <div className="control-inner">
                            {
                                moviesRecommend.data && moviesRecommend.data.length > 0
                                && moviesRecommend.data.map((item, index) => {
                                    return (
                                        <button className={`poster-box slider-item ${index === 0 ? 'active' : ''}`} slider-control="0" key={index * 324}>
                                            <img src={item.poster} alt="Slide to No Way Up" loading="lazy" draggable="false" className="img-cover" />
                                        </button>
                                    )
                                })
                            }
                        </div>
                    </div>
                </section>
                <div className="container">
                    <div className="row ipad-width">
                        <div className="col-md-12">
                            {/* phim đề cử */}
                            <div className="title-hd">
                                <h2>phim đề cử</h2>
                                {/* <a href="#" className="viewall">xem thêm <i className="ion-ios-arrow-right"></i></a> */}
                            </div>
                            <div class="flex-wrap-movielist">
                                {
                                    moviesRecommend.data && moviesRecommend.data.length > 0
                                    && moviesRecommend.data.map((item, index) => {
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
                            {/* phim mới cập nhật */}
                            <div className="title-hd">
                                <h2>phim mới cập nhật</h2>
                                {/* <a href="#" className="viewall">xem thêm <i className="ion-ios-arrow-right"></i></a> */}
                            </div>
                            <div class="flex-wrap-movielist">
                                {
                                    moviesNew.data && moviesNew.data.length > 0
                                    && moviesNew.data.map((item, index) => {
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
                            {/* phim bộ mới */}
                            <div className="title-hd">
                                <h2>phim bộ mới</h2>
                                {/* <a href="#" className="viewall">xem thêm <i className="ion-ios-arrow-right"></i></a> */}
                            </div>
                            <div class="flex-wrap-movielist">
                                {
                                    newSeries.data && newSeries.data.length > 0
                                    && newSeries.data.map((item, index) => {
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
                            {/* phim lẻ mới */}
                            <div className="title-hd">
                                <h2>phim lẻ mới</h2>
                                {/* <a href="#" className="viewall">xem thêm <i className="ion-ios-arrow-right"></i></a> */}
                            </div>
                            <div class="flex-wrap-movielist">
                                {
                                    newSingleMovie.data && newSingleMovie.data.length > 0
                                    && newSingleMovie.data.map((item, index) => {
                                        return (
                                            <Link key={index} to={`/detail/${item.movie_id}/${item.slug}`} className="movie-item-style-2 movie-item-style-1">
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
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer />

        </>
    )
}

export default HomePage;
