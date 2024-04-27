import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, updateFavorite, checkFavorite, getCommentsByMovieID, postComment, postEvaluate } from "../../Function/ApiFunction";
import { Link } from "react-router-dom";
import Modal from 'react-modal';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { ToastContainer, toast } from 'react-toastify';
import Header from "../Layouts/Header";
import Footer from "../Layouts/Footer";
import moment from 'moment';
import { color } from "chart.js/helpers";

const MovieDetails = (props) => {
    const { id, slug } = useParams()
    const [movie, setMovie] = useState([])
    const [comments, setComments] = useState([])
    const [loading, setIsLoading] = useState(true);
    const [linkMovie, setLinkMovie] = useState("")
    const getMovie = async () => {
        let data = await getMovieDetails(id)
        // console.log(data.actors)
        return data
    }
    const getComments = async () => {
        let data = await getCommentsByMovieID(id)
        console.log(data)
        return data
    }
    // bình luận
    const [comment, setComment] = useState('');

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    };

    const handleChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmit = (event) => {
        // event.preventDefault();
        if (user === null || Object.keys(user).length === 0) {
            handleLoginToastRegister("")
        }

        if (comment != "") {
            postComment(movie.movie_id, user.id, 0, comment);

            // lấy comment mới sau khi click
            setTimeout(() => {
                getComments().then((data) => {
                    setComments(data)
                }).catch((e) => {
                    console.log(`Error: ${e}`)
                })
            }, 500);
        }
    };
    // đánh giá
    const [evaluate, setEvaluate] = useState(0);

    const updateEvaluate = async (event) => {
        if (user === null || Object.keys(user).length === 0) {
            handleLoginToastRegister("")
        }
        postEvaluate(movie.movie_id, user.id, evaluate);
        handleLoginToastRegister("UPDATE_SUCCESS")
    }

    const handleEvaluate = (event) => {
        setEvaluate(event.target.value);
    };

    // user
    const [user, setUser] = useState({})
    const [favoBtn, setFavoBtn] = useState()

    const handleLoginToastRegister = (strMessage) => {
        if (strMessage === "ERR_NETWORK") {
            toast.error("Connection failed, please check network connection.", {

            });
        } else if (strMessage === "UPDATE_SUCCESS") {
            toast.success("Cập nhật thành công.", {

            });
        } else if (strMessage === "watch") {
            toast.warning("Vui lòng đăng nhập để xem phim!", {

            });
        } else {
            toast.error("Vui lòng đăng nhập để thực hiện thao tác!", {

            });
        }
    };

    // cập nhật yêu thích 
    const updateFavo = async () => {
        if (user.id) {
            let data = await updateFavorite(id, user.id)
            setFavoBtn(!favoBtn)
            // console.log(favoBtn)
            handleLoginToastRegister("UPDATE_SUCCESS")
            return data
        } else {
            handleLoginToastRegister("")
        }

    }
    const checkFavo = async (movieID, userID) => {
        let data = await checkFavorite(movieID, userID)
        console.log(data.data)
        if (data) {
            setFavoBtn(data.data)
            console.log(favoBtn)
        }
    }
    // convert time comment
    function convertDateTime(dateTimeString) {
        return moment(dateTimeString).format("DD [tháng] MM, YYYY [lúc] HH:mm");
    }
    const [ratedConvert, setRatedConvert] = useState(0)
    const [actors, setActors] = useState([])
    const [directors, setDirectors] = useState([])
    const renderStars = () => {
        const stars = [];
        for (let i = 0; i < ratedConvert; i++) {
            stars.push(<i key={i} className="ion-ios-star"></i>);
        }
        for (let i = 0; i < (10 - ratedConvert); i++) {
            stars.push(<i key={i} className="ion-ios-star-outline"></i>);
        }

        return stars;
    };

    const handleLinkClick = (event) => {
        // Kiểm tra xem user có tồn tại hay không
        if (Object.keys(user).length > 0) {
        } else {
            event.preventDefault();
            handleLoginToastRegister("watch");
        }
    };

    setTimeout(() => {
        setIsLoading(false)
    }, 2000)
    useEffect(() => {

        getMovie().then((data) => {
            setMovie(data)
            let ratedValue = Math.round(parseInt(data.rated, 10));

            const storedUserInfo = localStorage.getItem('userInfo');
            if (storedUserInfo) {
                const parsedUserInfo = JSON.parse(storedUserInfo);
                // console.log(parsedUserInfo.username)
                setUser(parsedUserInfo.username);
                checkFavo(id, parsedUserInfo.username.id)
            }
            setRatedConvert(ratedValue)
            setActors(data.actors)
            setDirectors(data.directors)
            fetchMovieContent(data)
            setLinkMovie(data.episodes[0].link_embed)
            // setTimeout(() => {
            //     setIsLoading(false)
            // }, 1500)
        }).catch((e) => {
            // setError(error.message)
            // setIsLoading(false)
            setIsLoading(true)
        })

        // get comment
        getComments().then((data) => {
            setComments(data)
        }).catch((e) => {
            console.log(`Error: ${e}`)
        })

    }, [])

    const [formattedContent, setFormattedContent] = useState('');

    const fetchMovieContent = async (movie) => {
        if (movie) {
            // Thực hiện xử lý nếu movieContent tồn tại
            const formatted = movie.content.replace(/<br\s*\/?>/g, "<br/>");
            setFormattedContent(formatted);
        }
    };

    // 
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }
    return (
        <>
            <Header />
            <ToastContainer />
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                overlayClassName="react-modal-overlay"
                className="react-modal-content"
            >
                {/* <iframe width="100%" height="100%" src={movie.trailer} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
                <iframe width="100%" height="100%" src={"https://www.youtube.com/embed/" + movie.trailer} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </Modal>
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

            <div className="hero mv-single-hero" style={{ background: `url('${movie.thumb}') center/cover no-repeat` }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">

                        </div>
                    </div>
                </div>
            </div>

            <div className="page-single movie-single movie_single">
                <div className="container">
                    <div className="row ipad-width2">
                        <div className="col-md-4 col-sm-12 col-xs-12">
                            <div className="movie-img">
                                <img src={movie.poster} alt="" />
                                <div className="movie-btn">
                                    <div className="btn-transform transform-vertical red">
                                        <div>
                                            <a href="#" className="item item-1 redbtn"> <i className="ion-play"></i> Trailer</a>
                                        </div>
                                        <div>
                                            <button onClick={openModal} className="item item-2 redbtn hvr-grow"><i className="ion-play"></i></button>
                                        </div>
                                    </div>
                                    <div className="btn-transform transform-vertical">
                                        <div>
                                            <a href="#" className="item item-1 redbtn"> <i className="ion-play"></i> Xem phim</a>
                                        </div>
                                        <div>
                                            {
                                                movie.episodes && movie.episodes.length > 0 ?
                                                    <Link
                                                        to={{
                                                            pathname: `/movie/watching/${movie.movie_id}`,
                                                            state: { slug: movie.slug }
                                                        }}
                                                        onClick={handleLinkClick}
                                                        className="item item-2 redbtn fancybox-media hvr-grow"><i className="ion-play"></i>
                                                    </Link>
                                                    :
                                                    <Link className="item item-2 redbtn fancybox-media hvr-grow"><i className="ion-play"></i></Link>
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 col-sm-12 col-xs-12">
                            <div className="movie-single-ct main-content">
                                <h1 className="bd-hd">{movie.name} <span>{movie.year}</span></h1>
                                <div className="social-btn">
                                    <button onClick={() => updateFavo()} href="#" className="parent-btn parent-favo">
                                        {
                                            favoBtn ?
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill active" viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                                                </svg>
                                                :
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart active" viewBox="0 0 16 16">
                                                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                                                </svg>
                                        }
                                        Yêu thích
                                    </button>
                                    <div className="hover-bnt">
                                        <a href="#" className="parent-btn parent-favo">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-share-fill active" viewBox="0 0 16 16">
                                                <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5" />
                                            </svg>
                                            Chia sẻ
                                        </a>
                                        <div className="hvr-item">
                                            <a href="#" className="hvr-grow"><i className="ion-social-facebook"></i></a>
                                            <a href="#" className="hvr-grow"><i className="ion-social-twitter"></i></a>
                                            <a href="#" className="hvr-grow"><i className="ion-social-googleplus"></i></a>
                                            <a href="#" className="hvr-grow"><i className="ion-social-youtube"></i></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="movie-rate">
                                    <div className="rate">
                                        <i className="ion-android-star"></i>
                                        <p><span>{movie.rated}</span> /10<br />
                                            <span className="rv">{movie.view} lượt xem</span>
                                        </p>
                                    </div>
                                    <div className="rate-star">
                                        <p>Đánh giá phim:  </p>
                                        {renderStars()}
                                    </div>
                                </div>

                                <Tabs style={{paddingTop: "0.5em"}}>
                                    <TabList>
                                    </TabList>

                                    {/* tổng quan */}
                                    <TabPanel>
                                        <div id="overview" className="tab active">
                                            <div className="row">
                                                <div className="col-md-8 col-sm-12 col-xs-12">
                                                    <p dangerouslySetInnerHTML={{ __html: formattedContent }} />
                                                    {/* <div className="title-hd-sm">
                                                        <h4>Videos & Photos</h4>
                                                        <a href="#" className="time">All 5 Videos & 245 Photos <i className="ion-ios-arrow-right"></i></a>
                                                    </div> */}
                                                    <div className="mvsingle-item ov-item">
                                                        <a className="img-lightbox" data-fancybox-group="gallery" href="images/uploads/image11.jpg" ><img src="images/uploads/image1.jpg" alt="" /></a>
                                                        <a className="img-lightbox" data-fancybox-group="gallery" href="images/uploads/image21.jpg" ><img src="images/uploads/image2.jpg" alt="" /></a>
                                                        <a className="img-lightbox" data-fancybox-group="gallery" href="images/uploads/image31.jpg" ><img src="images/uploads/image3.jpg" alt="" /></a>
                                                        <div className="vd-it">
                                                            <img className="vd-img" src="images/uploads/image4.jpg" alt="" />
                                                            <a className="fancybox-media hvr-grow" href="https://www.youtube.com/embed/o-0hcF97wy0"><img src="images/uploads/play-vd.png" alt="" /></a>
                                                        </div>
                                                    </div>
                                                    {/* <label htmlFor="comment">Bình luận</label> */}
                                                    <div id="reviews" className="tab review">
                                                        <div style={{ display: "flex", borderTop: "1px solid #233a50" }}>
                                                            <input
                                                                type="number"
                                                                name="evaluate"
                                                                id="comment"
                                                                defaultValue={evaluate}
                                                                onChange={handleEvaluate}
                                                                placeholder="Thêm đánh giá"
                                                            />

                                                            <button className="button-evaluate" onClick={updateEvaluate}>
                                                                Thêm đánh giá
                                                            </button>
                                                        </div>
                                                        <div style={{ paddingTop: "2em" }}></div>
                                                        {/* bình luận */}

                                                        <div style={{ display: "flex", borderTop: "1px solid #233a50" }}>
                                                            <input
                                                                type="text"
                                                                name="comment"
                                                                id="comment"
                                                                placeholder="Thêm bình luận"
                                                                defaultValue={comment}
                                                                onChange={handleChange}
                                                                onKeyDown={handleKeyDown}
                                                            />

                                                            <button className="button-comment" onClick={handleSubmit}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send-fill" viewBox="0 0 16 16">
                                                                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        <div className="row comment-content">
                                                            {
                                                                comments && comments.length > 0 && comments.map((item, index) => {
                                                                    return (
                                                                        <div className="mv-user-review-item" style={{ paddingLeft: "1em" }}>
                                                                            <div className="user-infor">
                                                                                <img src={`../../../../public/images/user/user-${item.user.avatar}.jpg`} alt="Avatar" />
                                                                                <div>
                                                                                    <h3 style={{ marginBottom: "0.4em" }}>{item.user.name}</h3>
                                                                                    <p className="time">
                                                                                        {convertDateTime(item.time)}
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                            <p style={{ color: "#fff" }}>{item.comment}</p>
                                                                            {/* <button className="reply-comment">Phản hồi</button> */}
                                                                        </div>
                                                                    )
                                                                })

                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 col-xs-12 col-sm-12">
                                                    <div className="sb-it">
                                                        <h6>Director: </h6>
                                                        <p>
                                                            {
                                                                directors && directors.length > 0 && directors.map((item, index) => {
                                                                    return (
                                                                        <Link key={(index + 1) * 434} >{item}, </Link>
                                                                    )
                                                                })
                                                            }
                                                        </p>
                                                    </div>
                                                    <div className="sb-it">
                                                        <h6>Cast: </h6>
                                                        <p>
                                                            {
                                                                actors && actors.length > 0 && actors.map((item, index) => {
                                                                    return (
                                                                        <Link key={(index + 1) * 44} >{item}, </Link>
                                                                    )
                                                                })
                                                            }
                                                        </p>
                                                    </div>
                                                    <div className="sb-it">
                                                        <h6>Thể loại:</h6>
                                                        <p>
                                                            {
                                                                movie.genres && movie.genres.length > 0 && movie.genres.map((actor, i) => {
                                                                    return (
                                                                        <a >{actor}, </a>
                                                                    )
                                                                })
                                                            }
                                                        </p>
                                                    </div>
                                                    <div className="sb-it">
                                                        <h6>Năm ra mắt:</h6>
                                                        <p>{movie.released}</p>
                                                    </div>
                                                    <div className="sb-it">
                                                        <h6>Thời lượng:</h6>
                                                        <p>
                                                            {movie && movie.type === "series" ? (
                                                                <span>{movie.runtime}</span>
                                                            ) : (
                                                                <span>{movie.runtime}</span>
                                                            )}
                                                        </p>
                                                    </div>
                                                    <div className="ads">
                                                        <img src="images/uploads/ads1.png" alt="" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>
                                </Tabs>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

        </>
    )
}

export default MovieDetails
