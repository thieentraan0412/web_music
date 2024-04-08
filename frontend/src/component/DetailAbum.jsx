import { useDispatch, useSelector } from "react-redux";
import "./css/detailabum.css";
import "./css/homelistmusic.css";
// import IconMusic from "./home-content/IconMusic";
import moment from "moment";
import { useState } from "react";
import { getSong, getSongInfo } from "../redux/ApiRequest";
import { ApiGetSong } from "./api";
const DetaiAbum = () => {
  const detail = useSelector((state) => state.detail.detailabum?.data);
  const info = useSelector((state) => state.musicInfo.musicInfo?.data);
  const music = useSelector((state) => state.music.music?.data);
  const [checked, setchecked] = useState(info?.encodeId);
  const dispatch =  useDispatch()
  const CallApiSong = (data) => {
    getSong(data, dispatch);
    getSongInfo(data, dispatch);
  };
  const handlechecked = (sid) =>
  {
    setchecked(sid);
    const fecthaa = async () => {
      const res = await ApiGetSong(sid);
      res?.msg === "Success"
        ? CallApiSong(sid)
        : alert("chi danh cho tai khoan vip");
    };
    fecthaa();
  }
  return (
    <div className="detailabum-container">
      <div className="detailabum-info">
        <div className="imgbum-img aaaa">
          <img className="imgbum-img-1" src={detail?.thumbnailM} alt="" />
        </div>
        <div>
          <div className="detail-title">
            <p>{detail?.title}</p>
            <p>{detail?.artistsNames} </p>
          </div>
        </div>
      </div>
      <div className="detail-listabum-container">
        <div className="navbar-abum">
              <div className="navbar-abum-title">Bài Hát</div>
              <div className="navbar-abum-abum">Ablum</div>
              <div className="navbar-abum-time">Thời gian</div>
        </div>
      <div className="detail-listabum">
        {detail?.song?.items?.map((data, index) => (
          <div className={data?.encodeId == info?.encodeId ? "aaaaaaaab":"aaaaaaaa"} onClick={()=>handlechecked(data?.encodeId)}  key={index}>
            <div className="detail-listabum-info">
              <img src={data?.thumbnail} alt="" />
              <div className="title-detail-abum">
              <div className="detail-abum-title-detail">
              {data?.title}
              </div>
              <div className="detail-abum-artistsNames">
              {data?.artistsNames}
              </div>
              </div>
              
            </div>
            <div className="detail-listabum-abum">         
              {data?.album?.title}
              </div>
            <div className="detail-listabum-time">
              {moment.utc(data?.duration * 1000).format("mm:ss")}
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default DetaiAbum;
