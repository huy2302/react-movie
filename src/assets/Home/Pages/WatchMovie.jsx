import '../../../../public/css/watchingPage.css'
import React, { useState, useEffect, } from 'react';
import { getMovieDetails, updateView } from "../../Function/ApiFunction";
import 'react-tabs/style/react-tabs.css';
import { Link, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player'

const WatchMovie = () => {
    const { id } = useParams()

    const [linkEmbed, setLinkEmbed] = useState('')

    const [episodes, setEpisodes] = useState([])

    const [movie, setMovie] = useState({})
    const [isReload, setIsReload] = useState("")
    const [user, setUser] = useState({})

    const [isHideContent, setIsHideContent] = useState(false);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [activeButton, setActiveButton] = useState(null);

    const handleButtonClick = (slug) => {
        setActiveButton(slug);
        getLinkEmbed(slug);
        setIsReload(slug)
    };
    const getUser = () => {
        const storedUserInfo = localStorage.getItem('userInfo');
        if (storedUserInfo) {
            const parsedUserInfo = JSON.parse(storedUserInfo);
            updateView(movie.movie_id, parsedUserInfo.username.id)
        }
    }
    const getLinkEmbed = (slug) => {
        if (episodes) {
            const foundItem = episodes.find(item => item.slug === slug);
            if (foundItem) {
                console.log(foundItem);
                setLinkEmbed(foundItem.link_embed)
                getUser()
            }

            // movie.episodes.forEach((item) => {
            //     if (item.slug === slug) {
            //         console.log(item.link_embed)
            //         // setLinkEmbed(item.link_embed)
            //         getUser()
            //     }
            // })
        }
    }
    const showBox = () => {
        setIsHideContent(true);
    };
    const hideBox = () => {
        setIsHideContent(false);
    };
    const getMovie = async () => {
        let data = await getMovieDetails(id)
        // console.log(data)
        setEpisodes(data.episodes)
        setMovie(data)
        getLinkEmbed(isReload);
        setTimeout(() => {
            setIsHideContent(false)
        }, 1000);
        setIsDataLoaded(true)
    }
    // const updateViewFunc = async (movie_id, user_id) => {
    //     let data = await updateView(movie_id, user_id)
    // }
    useEffect(() => {
        getMovie()

        document.addEventListener('mouseleave', () => {
            setTimeout(() => {
                setIsHideContent(false)
            }, 2000);
        });

    }, []);

    return (
        <>
            <div id="container">
                <div
                    className={`hide-content ${isHideContent ? 'hidden-box' : ''}`}

                >
                    <div className="content">
                        <Link to={`/detail/${id}/${movie.slug}`} className='back-btn'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-circle " viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
                            </svg>
                        </Link>
                        <h2>Danh sách tập phim</h2>
                        <ul>
                            {
                                movie.episodes && movie.episodes.length > 0 && movie.episodes.map((item, index) => {
                                    return (
                                        <li key={index * 237} className={item.slug === activeButton ? "movie-active" : ""}>
                                            <Link className="btn-episodes" to={item.link_embed} target="_blank">
                                                <div className="content-header">
                                                    <div>
                                                        <h2>{item.name}</h2>
                                                    </div>
                                                    <h2 className="h2-right"></h2>
                                                </div>
                                            </Link>
                                            {/* <button className="btn-episodes" onClick={() => handleButtonClick(item.slug)}>
                                                <div className="content-header">
                                                    <div>
                                                        <h2>{item.name}</h2>
                                                    </div>
                                                    <h2 className="h2-right"></h2>
                                                </div>
                                            </button> */}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
                {/* <ReactPlayer
                    className="iframe-video"
                    id="myFrame"
                    onMouseEnter={hideBox}
                    onMouseOut={showBox}
                    url='https://player.phimapi.com/player/?url=https://s3.phim1280.tv/20240323/D5TCfWya/index.m3u8' /> */}
                <iframe
                    onMouseEnter={hideBox}
                    onMouseOut={showBox}
                    id="myFrame" className="iframe-video"
                    // src={linkEmbed}
                    allow="fullscreen"
                // sandbox="allow-same-origin"
                ></iframe>

            </div>
        </>
    )
}

export default WatchMovie;
