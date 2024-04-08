import { useEffect, useState } from "react";
import { getSong, getSongInfo } from "../../redux/ApiRequest";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
  Outlet,
} from "react-router-dom";
import { ApiGetList, ApiGetSong, ApiGetTop100, apiGetHome } from "../api.js";
import "../css/homelistmusic.css";
import Thumnail from "./Thumnail";
import ThumnailAbum from "./ThumnailAbum";
const HomeListMusic = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checkbuttion, setcheckbuttion] = useState(1);
  const [chill, setchill] = useState([]);
  const [chill2, setchill2] = useState([]);
  const [newRelease, setNewrelease] = useState({});
  const info = useSelector((state) => state.musicInfo.musicInfo?.data);
  useEffect(() => {
    const fecthnewrelease = async () => {
      const res = await apiGetHome();
      setchill(res[3]);
      setchill2(res[4]);
      setNewrelease(res[2]);
    };
    fecthnewrelease();
    navigate("/homelistmusic");
  }, []);
  const handlecheckbutton = (data) => {
    setcheckbuttion(data);
  };
  const CallApiSong = (sid) => {
    getSong(sid, dispatch);
    getSongInfo(sid, dispatch);
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
  return (
    <div className="homelistmusic-container">
      <div className="zzzz">
        <div className="homelistmusic-newrelease">
          <div className="homelistmusic-newrelease-title">
            {newRelease.title}
          </div>
        </div>
        <div className="homelistmusic-newrelease-select">
          <Link to="">
            <button
              onClick={() => handlecheckbutton(1)}
              className={
                checkbuttion === 1
                  ? "homelistmusic-newrelease-select-buttion-checked"
                  : "homelistmusic-newrelease-select-buttion"
              }
            >
              New
            </button>
          </Link>
          <Link to="">
            <button
              onClick={() => handlecheckbutton(2)}
              className={
                checkbuttion === 2
                  ? "homelistmusic-newrelease-select-buttion-checked"
                  : "homelistmusic-newrelease-select-buttion"
              }
            >
              Vpops
            </button>
          </Link>
          <Link to="">
            <button
              onClick={() => handlecheckbutton(3)}
              className={
                checkbuttion === 3
                  ? "homelistmusic-newrelease-select-buttion-checked"
                  : "homelistmusic-newrelease-select-buttion"
              }
            >
              Other
            </button>
          </Link>
          <Link to="all">
            <button
              onClick={() => handlecheckbutton(4)}
              className={
                checkbuttion === 4
                  ? "homelistmusic-newrelease-select-buttion-checked"
                  : "homelistmusic-newrelease-select-buttion"
              }
            >
              tất cả{" "}
            </button>
          </Link>
        </div>

        {/* begin music  */}
        <div
          className={
            checkbuttion === 1 ? "homelistmusic-ul" : "homelistmusic-ul-display"
          }
        >
          {newRelease?.items?.all
            ?.slice(newRelease?.items?.all.length % 4)
            .map((data, index) => (
              <div className={index < 20 ? "" : "display-content"}>
                <div
                  key={index}
                  onClick={() => handle(data.encodeId)}
                  className={
                    data.encodeId === `${info?.encodeId}`
                      ? "background-content"
                      : ""
                  }
                >
                  <div>
                    <Thumnail
                      thumbnail={data.thumbnail || null}
                      encodeId={data.encodeId || null}
                      title={data.title || null}
                      artistsNames={data.artistsNames || null}
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div
          className={
            checkbuttion === 2 ? "homelistmusic-ul" : "homelistmusic-ul-display"
          }
        >
          {newRelease?.items?.vPop?.map((data, index) => (
            <div className={index < 20 ? "" : "display-content"}>
              <div key={index} onClick={() => handle(data.encodeId)}>
                <div>
                  <Thumnail
                    thumbnail={data.thumbnail || null}
                    encodeId={data.encodeId || null}
                    title={data.title || null}
                    artistsNames={data.artistsNames || null}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          className={
            checkbuttion === 3 ? "homelistmusic-ul" : "homelistmusic-ul-display"
          }
        >
          {newRelease?.items?.others?.map((data, index) => (
            <div className={index < 20 ? "" : "display-content"}>
              <div
                key={index}
                onClick={() => handle(data.encodeId)}
                className={
                  data.encodeId === `${info?.encodeId}`
                    ? "background-content"
                    : ""
                }
              >
                <div>
                  <Thumnail
                    thumbnail={data.thumbnail || null}
                    encodeId={data.encodeId || null}
                    title={data.title || null}
                    artistsNames={data.artistsNames || null}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* end music  */}
        <div className={checkbuttion === 4 ? "" : "homelistmusic-ul-display"}>
          {" "}
          <Outlet />{" "}
        </div>
        <div className="homelistmusic-abum-container">
          <div>
            <h1>Abum Hot</h1>
          </div>
          <div className="abum-content">
            {chill?.items?.slice(3)?.map((data, index) => (
              <div key={index}>
                <ThumnailAbum encodeId={data.encodeId} />
              </div>
            ))}
          </div>
          <div className="abum-content">
            {chill2?.items?.map((data, index) => (
              <ThumnailAbum encodeId={data.encodeId} />
            ))}
          </div>
        </div>
      </div>

      <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default HomeListMusic;
