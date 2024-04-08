import { useEffect, useState } from "react";
import { apiGetHome } from "../api";

const ListALL = () => {
  const [Listall, setListall] = useState(null);

  useEffect(() => {
    function unique(arr) {
      var newArr = [];
      for (var i = 0; i < arr.length; i++) {
        if (newArr.indexOf(arr[i]) === -1) {
          newArr.push(arr[i]);
        }
      }
      return newArr;
    }
    const fectha = async () => {
      const res = await apiGetHome();
      //   setListall(res[2]);
      var arraylist = res[2]?.items?.all
        .concat(res[2]?.items?.vPop)
        .concat(res[2]?.items?.others);
      setListall(unique(arraylist));
    };
    fectha();
  }, []);
  return (
    <div className="listall-container">
        <div className="listall-navbar"> 
            <div>Bài Hát</div>
            <div>Phát Hành</div>
            <div>Thời Gian</div>
        </div>
      <ul className="listall-ul">
        {Listall?.map((data, index) => (
          <li key={index}>
            <div className="list-thumnail">
                <div>{data.title}</div>
                <div></div>
                <div></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListALL;
