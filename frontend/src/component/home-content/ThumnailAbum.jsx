import { useEffect, useState } from "react";
import { ApiGetDetailPlaylist } from "../api";

import "../css/homelistmusic.css"
import { CiPlay1 } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { getDetailAbuma } from "../../redux/ApiRequest";
import { useNavigate } from "react-router-dom";


const ThumnailAbum = ({ encodeId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const detail = useSelector((state) => state.detail.detailabum?.data);
const [abum, setabum] = useState([]);
    useEffect(() => {   
        const fecth0 = async () =>
        {
            const res = await ApiGetDetailPlaylist(encodeId)
            setabum(res.data)   
        }
        fecth0()
    }, []);
    const handleclick = (sid) =>
    {
        getDetailAbuma(sid,dispatch,navigate)
    }
  return <div className="ThumnailAbum-container">
      <div className="imgbum-img">
        <img onClick={()=>handleclick(encodeId)} src={abum.thumbnail} className="imgbum-img-1" alt="" />
        <div className="img-play">
          <CiPlay1/>
        </div>
      </div>
      <div className="ThumnailAbum-description">
        <p className="ThumnailAbum-description-p" >{abum.sortDescription}</p>
      </div>
  </div>;
};

export default ThumnailAbum;
