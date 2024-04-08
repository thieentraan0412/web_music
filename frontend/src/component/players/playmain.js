import { useState, useRef, useEffect } from "react";
import Slider from "./slider/Slider";
import ControlPanel from "./controls/ControlPanel";
import { BsRepeat, BsPause, BsShuffle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { getSong, getSongInfo } from "../../redux/ApiRequest";
import { ApiGetSong } from "../api";
import { current } from "@reduxjs/toolkit";
function Playmain({ src }) {
  const detail = useSelector(
    (state) => state.detail.detailabum?.data?.song?.items
  );
  const music = useSelector((state) => state.music.music?.data);
  const info = useSelector((state) => state.musicInfo.musicInfo?.data);
  const [percentage, setPercentage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [last, setlast] = useState(music?.data["128"]);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);
  const dispatch = useDispatch();
  const onChange = (e) => {
    const audio = audioRef.current;
    audio.currentTime = (audio.duration / 100) * e.target.value;
    setPercentage(e.target.value);
  };
  const play = () => {
    const audio = audioRef.current;

    if (!isPlaying) {
      setIsPlaying(true);
      audio.play();
    }

    if (isPlaying) {
      setIsPlaying(false);
      audio.pause();
    }
  };
  const getCurrDuration = (e) => {
    const percent = (
      (e.currentTarget.currentTime / e.currentTarget.duration) *
      100
    ).toFixed(2);
    const time = e.currentTarget.currentTime;
    setPercentage(+percent);
    setCurrentTime(time.toFixed(2));
  };
  const CallApiSong = (sid) => {
    getSong(sid, dispatch);
    getSongInfo(sid, dispatch);
    setlast(music?.data["128"]);
  };
  const handle = (sid) => {
    const fecthaa = async () => {
      const res = await ApiGetSong(sid);
      res?.msg === "Success"
        ? CallApiSong(sid)
        : alert("chi danh cho tai khoan vip");
    };
    fecthaa();
  };
  useEffect(() => {
    if (last !== music?.data["128"]) setIsPlaying(true);
  }, [music?.data["128"]]);
  const changenext = () => {
    var listancodeablum = detail.map((data) => data.encodeId);
    console.log(listancodeablum);
    var srcCurrent = listancodeablum.indexOf(info.encodeId);

    const playlist = async () => {
      srcCurrent += 1;
      if (srcCurrent > listancodeablum.length) srcCurrent = 0;
      const res = await ApiGetSong(listancodeablum[srcCurrent]);
      res?.msg === "Success" ? handle(listancodeablum[srcCurrent]) : playlist();
    };
    playlist();
  };
  const changeprevious = () => {
    var listancodeablum = detail.map((data) => data.encodeId);
    console.log(listancodeablum);
    var srcCurrent = listancodeablum.indexOf(info.encodeId);

    const playlist = async () => {
      srcCurrent -= 1;
      if (srcCurrent < 0) srcCurrent = listancodeablum.length - 1;
      const res = await ApiGetSong(listancodeablum[srcCurrent]);
      res?.msg === "Success" ? handle(listancodeablum[srcCurrent]) : playlist();
    };
    playlist();
  };
  const changerepeat = () => {
    const audio = audioRef.current;
    audio.currentTime=0;
    audio.play();
  };
  
  return (
    <div className="playmain-container">
      <Slider percentage={percentage} onChange={onChange} />
      <audio
        ref={audioRef}
        autoPlay={isPlaying}
        onTimeUpdate={getCurrDuration}
        onLoadedData={(e) => {
          setDuration(e.currentTarget.duration.toFixed(2));
        }}
        src={music?.data["128"]}
      ></audio>
      <ControlPanel
        changerepeat={changerepeat}
        changeprevious={changeprevious}
        changenext={changenext}
        play={play}
        isPlaying={isPlaying}
        duration={duration}
        currentTime={currentTime}
      />
    </div>
  );
}

export default Playmain;
