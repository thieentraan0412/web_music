// import { useEffect, useState } from "react";
// import { getSong, getSongInfo } from "../redux/ApiRequest";
// import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, Outlet } from "react-router-dom";
import PlayMusic from "./Play";
import "./css/home.css";
// import { ApiGetList, ApiGetSong, ApiGetTop100, apiGetHome } from "./api.js";
import List from "./List";
import Narbar from "./Narbar";
const Home = () => {
  return (
    <div className="home-container">
      <div className="home-list-left">
        <List />
      </div>
      <div className="home-content">
        <Narbar />
       <div className="outlet-container">
       <div>
       <Outlet />
       </div>
       </div>
      </div>
      <div className="home-playmusic">
        <PlayMusic />
      </div>
    </div>
  );
};

export default Home;
