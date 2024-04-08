import { useState } from "react";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import React from "react";
import ReactPlayer from "react-player";
import Input from "./input";
import "./css/login.css";

const Login = () => {
  const [taikhoan, setTaikhoan] = useState("");
  const [matkhau, setMatkhau] = useState("");
  const naviagate = useNavigate();
  const handlelogin =() =>
  {
      naviagate("/")
  }
  return (
    <div className="container">
      {/* <img
        src="https://png.pngtree.com/element_our/png_detail/20181112/black-and-white-music-background-png_227797.jpg"
        alt=""
        height="712px"
        width="100%"
      /> */}
      <div className="login-left">
        <ReactPlayer
          width="100%"
          height="709.99px"
          loop='true'
          // controls='true'
          playing='true'
          pip='true'
          url="https://www.youtube.com/watch?v=DcCISK3sCYg"
        />
      </div>
      <div className="login-container">
        <div className="login-header"> Login </div>
        <Input
          label={"Tài khoản "}
          type={"text"}
          placeholder={"nhap tai khoan"}
          data={taikhoan}
          setdata={setTaikhoan}
        />
        <Input
          label={"Mật khẩu "}
          type={"password"}
          placeholder={""}
          data={matkhau}
          setdata={setMatkhau}
        />
        <button onClick={handlelogin} type="submit" class="button">
          <span> Login </span>
        </button>
        <Link to="/register">
          {" "}
          <button class="button1">
            <span> Register </span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
