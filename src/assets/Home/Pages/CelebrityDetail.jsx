import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getActorDetail } from "../../Function/ApiFunction"
import Header from "../Layouts/Header";
import Footer from "../Layouts/Footer";
const Celebrity = () => {
    const { id } = useParams('id')

    const [celebrity, setCelebrity] = useState([])

    const getMovie = async (id) => {
        let data = await getActorDetail(id)
        return data
    }
    useEffect(() => {
        getMovie(id).then((data) => {
            setCelebrity(data)

        }).catch((e) => {
            // setError(error.message)
            // setIsLoading(false)
        })
    }, [])

    return (
        <>
        <Header />
            <div className="hero hero3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">

                        </div>
                    </div>
                </div>
            </div>
            <div className="page-single movie-single cebleb-single">
                <div className="container">
                    <div className="row ipad-width">
                        <div className="col-md-4 col-sm-12 col-xs-12">
                            <div className="mv-ceb">
                                <img src={celebrity.avt} alt="" />
                            </div>
                        </div>
                        <div className="col-md-8 col-sm-12 col-xs-12">
                            <div className="movie-single-ct">
                                <h1 className="bd-hd">{celebrity.name}</h1>
                                <p className="ceb-single">Actor  |  Producer</p>
                                <div className="social-link cebsingle-socail">
                                    <a href="#"><i className="ion-social-facebook"></i></a>
                                    <a href="#"><i className="ion-social-twitter"></i></a>
                                    <a href="#"><i className="ion-social-googleplus"></i></a>
                                    <a href="#"><i className="ion-social-linkedin"></i></a>
                                </div>
                                <div className="movie-tabs">
                                    <div className="tabs">
                                        <ul className="tab-links tabs-mv">
                                            <li className="active"><a href="#overviewceb">Overview</a></li>
                                            <li><a href="#biography"> biography</a></li>
                                            <li><a href="#mediaceb"> Media</a></li>
                                            <li><a href="#filmography">filmography</a></li>
                                        </ul>
                                        <div className="tab-content">
                                            <div id="overviewceb" className="tab active">
                                                <div className="row">
                                                    <div className="col-md-8 col-sm-12 col-xs-12">
                                                        <p>{celebrity.description}</p>
                                                        <p className="time"><a href="#">See full bio <i className="ion-ios-arrow-right"></i></a></p>
                                                        <div className="title-hd-sm">
                                                            <h4>Videos & Photos</h4>
                                                            <a href="#" className="time">All 5 Videos & 245 Photos <i className="ion-ios-arrow-right"></i></a>
                                                        </div>
                                                        <div className="mvsingle-item ov-item">
                                                            <a className="img-lightbox" data-fancybox-group="gallery" href="images/uploads/image11.jpg" ><img src="images/uploads/image1.jpg" alt="" /></a>
                                                            <a className="img-lightbox" data-fancybox-group="gallery" href="images/uploads/image21.jpg" ><img src="images/uploads/image2.jpg" alt="" /></a>
                                                            <a className="img-lightbox" data-fancybox-group="gallery" href="images/uploads/image31.jpg" ><img src="images/uploads/image3.jpg" alt="" /></a>
                                                            <div className="vd-it">
                                                                <img className="vd-img" src="images/uploads/image4.jpg" alt="" />
                                                                <a className="fancybox-media hvr-grow" href="https://www.youtube.com/embed/o-0hcF97wy0"><img src="images/uploads/play-vd.png" alt="" /></a>
                                                            </div>
                                                        </div>
                                                        <div className="title-hd-sm">
                                                            <h4>filmography</h4>
                                                            <a href="#" className="time">Full Filmography<i className="ion-ios-arrow-right"></i></a>
                                                        </div>
                                                        <div className="mvcast-item">
                                                            <div className="cast-it">
                                                                <div className="cast-left cebleb-film">
                                                                    <img src="images/uploads/film1.jpg" alt="" />
                                                                    <div>
                                                                        <a href="#">X-Men: Apocalypse </a>
                                                                        <p className="time">Logan</p>
                                                                    </div>

                                                                </div>
                                                                <p>...  2016</p>
                                                            </div>
                                                            <div className="cast-it">
                                                                <div className="cast-left cebleb-film">
                                                                    <img src="images/uploads/film2.jpg" alt="" />
                                                                    <div>
                                                                        <a href="#">Eddie the Eagle </a>
                                                                        <p className="time">Bronson Peary</p>
                                                                    </div>
                                                                </div>
                                                                <p>...  2015</p>
                                                            </div>
                                                            <div className="cast-it">
                                                                <div className="cast-left cebleb-film">
                                                                    <img src="images/uploads/film3.jpg" alt="" />
                                                                    <div>
                                                                        <a href="#">Me and Earl and the Dying Girl </a>
                                                                        <p className="time">Hugh Jackman</p>
                                                                    </div>
                                                                </div>
                                                                <p>...  2015</p>
                                                            </div>
                                                            <div className="cast-it">
                                                                <div className="cast-left cebleb-film">
                                                                    <img src="images/uploads/film4.jpg" alt="" />
                                                                    <div>
                                                                        <a href="#">Night at the Museum 3 </a>
                                                                        <p className="time">Blackbeard</p>
                                                                    </div>
                                                                </div>
                                                                <p>...  2014</p>
                                                            </div>
                                                            <div className="cast-it">
                                                                <div className="cast-left cebleb-film">
                                                                    <img src="images/uploads/film5.jpg" alt="" />
                                                                    <div>
                                                                        <a href="#">X-Men: Days of Future Past </a>
                                                                        <p className="time">Wolverine</p>
                                                                    </div>
                                                                </div>
                                                                <p>...  2012</p>
                                                            </div>
                                                            <div className="cast-it">
                                                                <div className="cast-left cebleb-film">
                                                                    <img src="images/uploads/film6.jpg" alt="" />
                                                                    <div>
                                                                        <a href="#">The Wolverine </a>
                                                                        <p className="time">Logan</p>
                                                                    </div>
                                                                </div>
                                                                <p>...  2011</p>
                                                            </div>
                                                            <div className="cast-it">
                                                                <div className="cast-left cebleb-film">
                                                                    <img src="images/uploads/film7.jpg" alt="" />
                                                                    <div>
                                                                        <a href="#">Rise of the Guardians </a>
                                                                        <p className="time">Bunny</p>
                                                                    </div>
                                                                </div>
                                                                <p>...  2011</p>
                                                            </div>
                                                            <div className="cast-it">
                                                                <div className="cast-left cebleb-film">
                                                                    <img src="images/uploads/film8.jpg" alt="" />
                                                                    <div>
                                                                        <a href="#">The Prestige </a>
                                                                        <p className="time">Robert Angier</p>
                                                                    </div>
                                                                </div>
                                                                <p>...  2010</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-xs-12 col-sm-12">
                                                        <div className="sb-it">
                                                            <h6>Fullname:  </h6>
                                                            <p><a href="#">{celebrity.name}</a></p>
                                                        </div>
                                                        <div className="sb-it">
                                                            <h6>Date of Birth: </h6>
                                                            <p>June 24, 1982</p>
                                                        </div>
                                                        <div className="sb-it">
                                                            <h6>Country:  </h6>
                                                            <p>{celebrity.country}</p>
                                                        </div>
                                                        <div className="sb-it">
                                                            <h6>Height:</h6>
                                                            <p>186 cm </p>
                                                        </div>
                                                        <div className="sb-it">
                                                            <h6>Keywords:</h6>
                                                            <p className="tags">
                                                                <span className="time"><a href="#">jackman</a></span>
                                                                <span className="time"><a href="#">wolverine</a></span>
                                                                <span className="time"><a href="#">logan</a></span>
                                                                <span className="time"><a href="#">blockbuster</a></span>
                                                                <span className="time"><a href="#">final battle</a></span>
                                                            </p>
                                                        </div>
                                                        <div className="ads">
                                                            <img src="images/uploads/ads1.png" alt="" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="biography" className="tab">
                                                <div className="row">
                                                    <div className="rv-hd">
                                                        <div>
                                                            <h3>Biography of</h3>
                                                            <h2>{celebrity.name}</h2>
                                                        </div>
                                                    </div>
                                                    <p>Hugh Michael Jackman is an Australian actor, singer, multi-instrumentalist, dancer and producer. Jackman has won international recognition for his roles in major films, notably as superhero, period, and romance characters. He is best known for his long-running role as Wolverine in the X-Men film series, as well as for his lead roles in the romantic-comedy fantasy Kate & Leopold (2001), the action-horror film Van Helsing (2004), the drama The Prestige and The Fountain (2006), the epic historical romantic drama Australia (2008), the film version of Les Misérables (2012), and the thriller Prisoners (2013). His work in Les Misérables earned him his first Academy Award nomination for Best Actor and his first Golden Globe Award for Best Actor - Motion Picture Musical or Comedy in 2013. In Broadway theatre, Jackman won a Tony Award for his role in The Boy from Oz. A four-time host of the Tony Awards themselves, he won an Emmy Award for one of these appearances. Jackman also hosted the 81st Academy Awards on 22 February 2009.</p>

                                                    <p>Jackman was born in Sydney, New South Wales, to Grace McNeil (Greenwood) and Christopher John Jackman, an accountant. He is the youngest of five children. His parents, both English, moved to Australia shortly before his birth. He also has Greek (from a great-grandfather) and Scottish (from a grandmother) ancestry.</p>
                                                    <p>Jackman has a communications degree with a journalism major from the University of Technology Sydney. After graduating, he pursued drama at the Western Australian Academy of Performing Arts, immediately after which he was offered a starring role in the ABC-TV prison drama Correlli (1995), opposite his future wife Deborra-Lee Furness. Several TV guest roles followed, as an actor and variety compere. An accomplished singer, Jackman has starred as Gaston in the Australian production of "Beauty and the Beast." He appeared as Joe Gillis in the Australian production of "Sunset Boulevard." In 1998, he was cast as Curly in the Royal National Theatre's production of Trevor Nunn's Oklahoma. Jackman has made two feature films, the second of which, Erskineville Kings (1999), garnered him an Australian Film Institute nomination for Best Actor in 1999. Recently, he won the part of Logan/Wolverine in the Bryan Singer- directed comic-book movie X-Men (2000). In his spare time, Jackman plays piano, golf, and guitar, and likes to windsurf.</p>
                                                    <p>On turning down the chance to play Richard Gere's character in the Harvey Weinstein-produced film Chicago (2002): I thought I was too young for the role. You have some 34-year-old guy up against Catherine Zeta-Jones and Renée Zellweger and it becomes a different movie. At one point, Harvey was telling me they were thinking of Kevin Spacey, and Ivtold him, 'That's exactly right. You should hire him.' Then I was in New York when the movie opened and the queue was around the block. I sat down and thought that I had probably made the biggest mistake. But I still honestly think that it was the right thing to do. I still think I was too young for that part.
                                                    </p>
                                                </div>
                                            </div>
                                            <div id="mediaceb" className="tab">
                                                <div className="row">
                                                    <div className="rv-hd">
                                                        <div>
                                                            <h3>Biography of</h3>
                                                            <h2>{celebrity.name}</h2>
                                                        </div>
                                                    </div>
                                                    <div className="title-hd-sm">
                                                        <h4>Videos <span>(8)</span></h4>
                                                    </div>
                                                    <div className="mvsingle-item media-item">
                                                        <div className="vd-item">
                                                            <div className="vd-it">
                                                                <img className="vd-img" src="images/uploads/vd-item1.jpg" alt="" />
                                                                <a className="fancybox-media hvr-grow" href="https://www.youtube.com/embed/o-0hcF97wy0"><img src="images/uploads/play-vd.png" alt="" /></a>
                                                            </div>
                                                            <div className="vd-infor">
                                                                <h6> <a href="#">Trailer:  Watch New Scenes</a></h6>
                                                                <p className="time"> 1: 31</p>
                                                            </div>
                                                        </div>
                                                        <div className="vd-item">
                                                            <div className="vd-it">
                                                                <img className="vd-img" src="images/uploads/vd-item2.jpg" alt="" />
                                                                <a className="fancybox-media hvr-grow" href="https://www.youtube.com/embed/o-0hcF97wy0"><img src="images/uploads/play-vd.png" alt="" /></a>
                                                            </div>
                                                            <div className="vd-infor">
                                                                <h6> <a href="#">Featurette: “Avengers Re-Assembled</a></h6>
                                                                <p className="time"> 1: 03</p>
                                                            </div>
                                                        </div>
                                                        <div className="vd-item">
                                                            <div className="vd-it">
                                                                <img className="vd-img" src="images/uploads/vd-item3.jpg" alt="" />
                                                                <a className="fancybox-media hvr-grow" href="https://www.youtube.com/embed/o-0hcF97wy0"><img src="images/uploads/play-vd.png" alt="" /></a>
                                                            </div>
                                                            <div className="vd-infor">
                                                                <h6> <a href="#">Interview: Robert Downey Jr</a></h6>
                                                                <p className="time"> 3:27</p>
                                                            </div>
                                                        </div>
                                                        <div className="vd-item">
                                                            <div className="vd-it">
                                                                <img className="vd-img" src="images/uploads/vd-item4.jpg" alt="" />
                                                                <a className="fancybox-media hvr-grow" href="https://www.youtube.com/embed/o-0hcF97wy0"><img src="images/uploads/play-vd.png" alt="" /></a>
                                                            </div>
                                                            <div className="vd-infor">
                                                                <h6> <a href="#">Interview: Scarlett Johansson</a></h6>
                                                                <p className="time"> 3:27</p>
                                                            </div>
                                                        </div>
                                                        <div className="vd-item">
                                                            <div className="vd-it">
                                                                <img className="vd-img" src="images/uploads/vd-item1.jpg" alt="" />
                                                                <a className="fancybox-media hvr-grow" href="https://www.youtube.com/embed/o-0hcF97wy0"><img src="images/uploads/play-vd.png" alt="" /></a>
                                                            </div>
                                                            <div className="vd-infor">
                                                                <h6> <a href="#">Featurette: Meet Quicksilver & The Scarlet Witch</a></h6>
                                                                <p className="time"> 1: 31</p>
                                                            </div>
                                                        </div>
                                                        <div className="vd-item">
                                                            <div className="vd-it">
                                                                <img className="vd-img" src="images/uploads/vd-item2.jpg" alt="" />
                                                                <a className="fancybox-media hvr-grow" href="https://www.youtube.com/embed/o-0hcF97wy0"><img src="images/uploads/play-vd.png" alt="" /></a>
                                                            </div>
                                                            <div className="vd-infor">
                                                                <h6> <a href="#">Interview: Director Joss Whedon</a></h6>
                                                                <p className="time"> 1: 03</p>
                                                            </div>
                                                        </div>
                                                        <div className="vd-item">
                                                            <div className="vd-it">
                                                                <img className="vd-img" src="images/uploads/vd-item3.jpg" alt="" />
                                                                <a className="fancybox-media hvr-grow" href="https://www.youtube.com/embed/o-0hcF97wy0"><img src="images/uploads/play-vd.png" alt="" /></a>
                                                            </div>
                                                            <div className="vd-infor">
                                                                <h6> <a href="#">Interview: Mark Ruffalo</a></h6>
                                                                <p className="time"> 3:27</p>
                                                            </div>
                                                        </div>
                                                        <div className="vd-item">
                                                            <div className="vd-it">
                                                                <img className="vd-img" src="images/uploads/vd-item4.jpg" alt="" />
                                                                <a className="fancybox-media hvr-grow" href="https://www.youtube.com/embed/o-0hcF97wy0"><img src="images/uploads/play-vd.png" alt="" /></a>
                                                            </div>
                                                            <div className="vd-infor">
                                                                <h6> <a href="#">Official Trailer #2</a></h6>
                                                                <p className="time"> 3:27</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="title-hd-sm">
                                                        <h4>Photos <span> (21)</span></h4>
                                                    </div>
                                                    <div className="mvsingle-item">
                                                        <a className="img-lightbox" data-fancybox-group="gallery" href="images/uploads/image11.jpg" ><img src="images/uploads/image1.jpg" alt="" /></a>
                                                        <a className="img-lightbox" data-fancybox-group="gallery" href="images/uploads/image21.jpg" ><img src="images/uploads/image2.jpg" alt="" /></a>
                                                        <a className="img-lightbox" data-fancybox-group="gallery" href="images/uploads/image31.jpg" ><img src="images/uploads/image3.jpg" alt="" /></a>
                                                        <a className="img-lightbox" data-fancybox-group="gallery" href="images/uploads/image41.jpg" ><img src="images/uploads/image4.jpg" alt="" /></a>
                                                        <a className="img-lightbox" data-fancybox-group="gallery" href="images/uploads/image51.jpg" ><img src="images/uploads/image5.jpg" alt="" /></a>
                                                        <a className="img-lightbox" data-fancybox-group="gallery" href="images/uploads/image61.jpg" ><img src="images/uploads/image6.jpg" alt="" /></a>
                                                        <a className="img-lightbox" data-fancybox-group="gallery" href="images/uploads/image71.jpg" ><img src="images/uploads/image7.jpg" alt="" /></a>
                                                        <a className="img-lightbox" data-fancybox-group="gallery" href="images/uploads/image81.jpg" ><img src="images/uploads/image8.jpg" alt="" /></a>
                                                        <a className="img-lightbox" data-fancybox-group="gallery" href="images/uploads/image91.jpg" ><img src="images/uploads/image9.jpg" alt="" /></a>
                                                        <a className="img-lightbox" data-fancybox-group="gallery" href="images/uploads/image101.jpg" ><img src="images/uploads/image10.jpg" alt="" /></a>
                                                        <a className="img-lightbox" data-fancybox-group="gallery" href="images/uploads/image111.jpg" ><img src="images/uploads/image1-1.jpg" alt="" /></a>
                                                        <a className="img-lightbox" data-fancybox-group="gallery" href="images/uploads/image121.jpg" ><img src="images/uploads/image12.jpg" alt="" /></a>
                                                        <a className="img-lightbox" data-fancybox-group="gallery" href="images/uploads/image131.jpg" ><img src="images/uploads/image13.jpg" alt="" /></a>
                                                        <a className="img-lightbox" data-fancybox-group="gallery" href="images/uploads/image141.jpg" ><img src="images/uploads/image14.jpg" alt="" /></a>
                                                        <a className="img-lightbox" data-fancybox-group="gallery" href="images/uploads/image151.jpg" ><img src="images/uploads/image15.jpg" alt="" /></a>
                                                        <a className="img-lightbox" data-fancybox-group="gallery" href="images/uploads/image161.jpg" ><img src="images/uploads/image16.jpg" alt="" /></a>
                                                        <a className="img-lightbox" data-fancybox-group="gallery" href="images/uploads/image171.jpg" ><img src="images/uploads/image17.jpg" alt="" /></a>
                                                        <a className="img-lightbox" data-fancybox-group="gallery" href="images/uploads/image181.jpg" ><img src="images/uploads/image18.jpg" alt="" /></a>
                                                        <a className="img-lightbox" data-fancybox-group="gallery" href="images/uploads/image191.jpg" ><img src="images/uploads/image19.jpg" alt="" /></a>
                                                        <a className="img-lightbox" data-fancybox-group="gallery" href="images/uploads/image201.jpg" ><img src="images/uploads/image20.jpg" alt="" /></a>
                                                        <a className="img-lightbox" data-fancybox-group="gallery" href="images/uploads/image211.jpg" ><img src="images/uploads/image2-1.jpg" alt="" /></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="filmography" className="tab">
                                                <div className="row">
                                                    <div className="rv-hd">
                                                        <div>
                                                            <h3>Biography of</h3>
                                                            <h2>Hugh Jackman</h2>
                                                        </div>

                                                    </div>
                                                    <div className="topbar-filter">
                                                        <p>Found <span>14 movies</span> in total</p>
                                                        <label>Filter by:</label>
                                                        <select>
                                                            <option value="popularity">Popularity Descending</option>
                                                            <option value="popularity">Popularity Ascending</option>
                                                            <option value="rating">Rating Descending</option>
                                                            <option value="rating">Rating Ascending</option>
                                                            <option value="date">Release date Descending</option>
                                                            <option value="date">Release date Ascending</option>
                                                        </select>
                                                    </div>
                                                    <div className="mvcast-item">
                                                        <div className="cast-it">
                                                            <div className="cast-left cebleb-film">
                                                                <img src="images/uploads/film1.jpg" alt="" />
                                                                <div>
                                                                    <a href="#">X-Men: Apocalypse </a>
                                                                    <p className="time">Logan</p>
                                                                </div>

                                                            </div>
                                                            <p>...  2016</p>
                                                        </div>
                                                        <div className="cast-it">
                                                            <div className="cast-left cebleb-film">
                                                                <img src="images/uploads/film2.jpg" alt="" />
                                                                <div>
                                                                    <a href="#">Eddie the Eagle </a>
                                                                    <p className="time">Bronson Peary</p>
                                                                </div>
                                                            </div>
                                                            <p>...  2015</p>
                                                        </div>
                                                        <div className="cast-it">
                                                            <div className="cast-left cebleb-film">
                                                                <img src="images/uploads/film3.jpg" alt="" />
                                                                <div>
                                                                    <a href="#">Me and Earl and the Dying Girl </a>
                                                                    <p className="time">Hugh Jackman</p>
                                                                </div>
                                                            </div>
                                                            <p>...  2015</p>
                                                        </div>
                                                        <div className="cast-it">
                                                            <div className="cast-left cebleb-film">
                                                                <img src="images/uploads/film4.jpg" alt="" />
                                                                <div>
                                                                    <a href="#">Night at the Museum 3 </a>
                                                                    <p className="time">Blackbeard</p>
                                                                </div>
                                                            </div>
                                                            <p>...  2014</p>
                                                        </div>
                                                        <div className="cast-it">
                                                            <div className="cast-left cebleb-film">
                                                                <img src="images/uploads/film5.jpg" alt="" />
                                                                <div>
                                                                    <a href="#">X-Men: Days of Future Past </a>
                                                                    <p className="time">Wolverine</p>
                                                                </div>
                                                            </div>
                                                            <p>...  2012</p>
                                                        </div>
                                                        <div className="cast-it">
                                                            <div className="cast-left cebleb-film">
                                                                <img src="images/uploads/film6.jpg" alt="" />
                                                                <div>
                                                                    <a href="#">The Wolverine </a>
                                                                    <p className="time">Logan</p>
                                                                </div>
                                                            </div>
                                                            <p>...  2011</p>
                                                        </div>
                                                        <div className="cast-it">
                                                            <div className="cast-left cebleb-film">
                                                                <img src="images/uploads/film7.jpg" alt="" />
                                                                <div>
                                                                    <a href="#">Rise of the Guardians </a>
                                                                    <p className="time">Bunny</p>
                                                                </div>
                                                            </div>
                                                            <p>...  2011</p>
                                                        </div>
                                                        <div className="cast-it">
                                                            <div className="cast-left cebleb-film">
                                                                <img src="images/uploads/film8.jpg" alt="" />
                                                                <div>
                                                                    <a href="#">The Prestige </a>
                                                                    <p className="time">Robert Angier</p>
                                                                </div>
                                                            </div>
                                                            <p>...  2010</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
export default Celebrity
