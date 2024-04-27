import { useState } from 'react'
import { Routes, Route, Router, Outlet  } from 'react-router-dom'

import { SearchMovie, MovieDetails, CelebrityDetail, SeriesDetails, TestForm, Video, WatchMovie, Pagi, HomePage, PhimTruyenHinh, PhimCuaToi, PhimLe } from './assets/Function/Import';
import { HomePageAdmin } from './admin/functions/ImportAdmin'
import { lazy, Suspense } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
// css import
import '../public/css/add.css'
import '../public/css/plugins.css'
import '../public/css/style.css'

import ScrollToTop from './ScrollToTop';
import Profile from './assets/Home/Pages/Profile';
// import '../public/js/'

{/* <script type="module" src="/src/main.jsx"></script>
    <script src="js/jquery.js"></script>
    <script src="js/plugins.js"></script>
    <script src="js/plugins2.js"></script>
    <script src="js/custom.js"></script>
    <script src="js/movieList.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>

    <script src="./public/js/axiosCall.js"></script> */}

const MovieDetailsPage = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("./assets/Home/Pages/MovieDetails")), 2000);
  });
});

function App() {
  const [count, setCount] = useState(0)
  
  return (
    <>
      <ScrollToTop /> 
      <Routes>
        <Route path='/home' element={<HomePage />} />
        <Route path='/admin' element={<HomePageAdmin />} />
        <Route path='/tim-kiem' element={<SearchMovie />} />
        <Route path="/detail/:id/:slug" element={<MovieDetails />} />
        <Route path="/series/:id" element={<SeriesDetails />} />
        <Route path="/celebrity/:id" element={<CelebrityDetail  />} />
        <Route path='/phim-le' element={<PhimLe />} />
        <Route path='/phim-cuatoi' element={<PhimCuaToi />} />
        <Route path='/phim-truyenhinh' element={<PhimTruyenHinh />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/pagi' element={<Pagi />} />
        <Route path='/test-form' element={<TestForm />} />
        <Route path='/video' element={<Video />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/movie/watching/:id' element={<WatchMovie />} />

      </Routes>
    </>
  )
}

export default App
