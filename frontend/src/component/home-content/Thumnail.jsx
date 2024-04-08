import { useSelector } from "react-redux";
import "../css/homelistmusic.css";

const Thumnail = ({ thumbnail, encodeId, title, artistsNames }) => {
  const info = useSelector((state) => state.musicInfo.musicInfo?.data);

  return (
    <div className={ encodeId === `${info?.encodeId}` ? "background-content":"thumail-container"}>
        <div className="thumnail-img">
          <img className="thumnail-img-anh" src={thumbnail} alt="" />
        </div>
        <div className="thumnail-content">
          <div className="thumnail-title">{title}</div>
          <div className="thumnail-artistsNames">{artistsNames}</div>
        </div>
    </div>
  );
};

export default Thumnail;
