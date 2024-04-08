import axios from "axios";

export const apiGetHome = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "http://localhost:8000/api/home",
        method: "get",
      });
      resolve(response.data.data.items);
    } catch (err) {
      reject(err);
    }
  });
  export const ApiGetSong = (sid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "http://localhost:8000/api/song",
        method: "get",
        params: { id: sid },
      });
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
  export const Apigetinfo = (sid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "http://localhost:8000/api/infosong",
        method: "get",
        params: { id: sid },
      });
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
  export const ApiGetTop100 = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "http://localhost:8000/api/top100",
        method: "get",
      });
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
  export const ApiGetList = (sid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "http://localhost:8000/api/detailplaylist",
        method: "get",
        params: { id: sid },
      });
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });

  export const ApiGetDetailPlaylist = (sid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "http://localhost:8000/api/detailplaylist",
        method: "get",
        params: { id: sid },
      });
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });





  // export const getSong = async (sid, dispatch) => {
  //   try {
  //     await axios
  //       .get(`http://localhost:8000/api/song`, { params: { id: sid } })
  //       .then((res) => {
  //         dispatch(getMusicSuccess(res.data));
  //       });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };