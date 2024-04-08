import axios from "axios";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  registerStart,
  registerSuccess,
  registerFailed,
  logoutStart,
  logoutSuccess,
  logoutFailed,
} from "./AuthSlice";

import { getMusicSuccess } from "./MusicSlice";
import { getMusicInfoSuccess } from "./MusicInfoSlice";
import { getDetailAbum } from "./DetailAbumSlice";
export const login = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:8000/v1/auth/login", user);
    dispatch(loginSuccess(res.data));
    navigate("/");
  } catch {
    dispatch(loginFailed());
  }
};
export const register = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    await axios.post("http://localhost:8000/v1/auth/register", user);
    dispatch(registerSuccess());
    navigate("/login");
  } catch (err) {
    console.log(err);
    dispatch(registerFailed("Something is wrong"));
  }
};
export const getSong = async (sid, dispatch) => {
  try {
    await axios
      .get(`http://localhost:8000/api/song`, { params: { id: sid } })
      .then((res) => {
        dispatch(getMusicSuccess(res.data));
      });
  } catch (err) {
    console.log(err);
  }
};

export const getSongInfo = async (sid, dispatch) => {
  try {
    await axios
      .get(`http://localhost:8000/api/infosong`, { params: { id: sid } })
      .then((res) => {
        dispatch(getMusicInfoSuccess(res.data.data));
      });
  } catch (err) {
    console.log(err);
  }
};

export const getDetailAbuma = async (sid, dispatch,navigate) => {
  try {
    await axios
      .get(`http://localhost:8000/api/detailplaylist`, { params: { id: sid } })
      .then((res) => {
        dispatch(getDetailAbum(res.data.data));
        navigate("/detailabum")
      });
  } catch (err) {
    console.log(err);
  }
};
// export const getHome = async () => {
//   try {
//     await axios
//       .get(`http://localhost:8000/api/home`)
//       .then((res) => {
//         console.log(res.data.data.items)
//         return res.data.data.items});
//   } catch (err) {
//     console.log(err);
//   }
// };



// export const getSongInfo = (sid) =>
//   new Promise(async (resolve, reject) => {
//     try {
//       const response = await axios({
//         url: "http://localhost:8000/api/infosong",
//         method: "get",
//         params: { id: sid },
//       });
//       resolve(response);
//     } catch (err) {
//       reject(err);
//     }
//   });

// export const getSong = (sid) =>
//   new Promise(async (resolve, reject) => {
//     try {
//       const response = await axios({
//         url: "http://localhost:8000/api/song",
//         method: "get",
//         params: { id: sid },
//       });
//       resolve(response);
//     } catch (err) {
//       reject(err);
//     }
//   });
