import { useEffect, useState } from "react";
import { apiGetHome,CallApiSong,ApiGetSong } from "../api";
import { getSong, getSongInfo } from "../../redux/ApiRequest";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
const ListALL = () => {
  const info = useSelector((state) => state.musicInfo.musicInfo?.data);
  const [Listall, setListall] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    function unique(list) {
      var newArr = [];
      for (var i = 0; i < list.length; i++) {
        if (newArr.every((n) => n.encodeId !== list[i].encodeId )){
          newArr.push(list[i]);
        }
      }
      return newArr;
    }
    const fectha = async () => {
      const res = await apiGetHome();
      var arraylist = res[2]?.items?.all
        .concat(res[2]?.items?.vPop)
        .concat(res[2]?.items?.others);
      setListall(unique(arraylist));
    };
    fectha();
  }, []);
  const handleplay = (sid) =>
  {
    const CallApiSong = (data) => {
      getSong(data, dispatch);
      getSongInfo(data, dispatch);
    };
    const fecthaa = async () => {
      const res = await ApiGetSong(sid);
      res?.msg === "Success"
        ? (CallApiSong(sid))
        : alert("chi danh cho tai khoan vip");
    };
    fecthaa();
  }
  return (
    <div className="listall-container">
        <div className="listall-navbar"> 
            <div>Bài Hát</div>
            <div>Phát Hành</div>
            <div>Thời Gian</div>
        </div>
      <div className="listall-ul">
      <ul>
        {Listall?.map((data, index) => (
          <li key={index} onClick={()=>handleplay(data.encodeId)}  className= {`${info?.encodeId}` === data.encodeId ? "listall-thumnail-checked":""}>
            <div className= "listall-thumnail">
               <div className="listall-content">
                  <div className="listall-img-img"><img className="listall-img" src={data.thumbnail} alt="" /></div>
                  <div className="listall-img-content">
                      <div className="listall-title">{data.title}</div>
                      <div className="listall-artistsNames">{data.artistsNames}</div>
                  </div>
               </div>
               <div className="listall-release">
                  aaaaaa
               </div>
               <div className="listall-time">
                <div className="listall-time-a">
                {moment.utc(data?.duration * 1000).format('mm:ss')}
                </div>
               </div>
            </div>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default ListALL;
