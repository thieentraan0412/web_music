import { useEffect, useRef, useState } from "react";
import { getSong, getSongInfo } from "../redux/ApiRequest";
import { useDispatch, useSelector } from "react-redux";
import "./css/play.css";
import { getplaymusic } from "../redux/MusicSlice";
import Playmain from "./players/playmain"
const PlayMusic = () => {
  const music = useSelector((state) => state.music.music?.data);
  const info = useSelector((state) => state.musicInfo.musicInfo?.data);
  const detail = useSelector((state) => state.detail.detailabum?.data?.song?.items);
  return (
    <div className="play-container">
      <div className="play-items">
        <img className="img-playaaa" src={info?.thumbnail} alt="thumbnail" />
        <div className="title-play-container">
          <p className="title-play">{info?.title.substr(0, 30)}</p>
          <p className="title-play">{info?.artistsNames}</p>
        </div>
      </div>
      <div className="play-items">
          {music?.msg !== "Bài hát chỉ dành cho tài khoản VIP, PRI" ? (
            <Playmain/>
          ) : (
            <Playmain/>
          )}
      </div>
      <div className="play-items">
      </div>
    </div>
  );
};


export default PlayMusic;
