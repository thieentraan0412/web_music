import { useState } from "react";
import Input from "./input";
import "./css/register.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../redux/ApiRequest";
const Register = () => {
  const [taikhoan, setTaikhoan] = useState("");
  const [matkhau, setMatkhau] = useState("");
  const [email, setEmail] = useState("");

    const navigate = useNavigate()
    const dispatch = useDispatch();

  const HandleRegister = (e) => {
    e.preventDefault();
    const newUser = {
      username: taikhoan,
      email: email,
      password: matkhau,
    };
    console.log("aaa")
    register(newUser,dispatch,navigate)
  };
  return (
    <div className="register-container">
      <img
        src="https://png.pngtree.com/element_our/png_detail/20181112/black-and-white-music-background-png_227797.jpg"
        alt=""
        height="712px"
        width="100%"
      />
      <div className="register-input">
        <div className="regiser-header">Register</div>
        <form onSubmit={HandleRegister}>
          <Input
            label={"Tài khoản"}
            type={"text"}
            placeholder={""}
            data={taikhoan}
            setdata={setTaikhoan}
          />
          <Input
            label={"Gmail"}
            type={"text"}
            placeholder={""}
            data={email}
            setdata={setEmail}
          />
          <Input
            label={"Mật khẩu"}
            type={"password"}
            placeholder={""}
            data={matkhau}
            setdata={setMatkhau}
          />
          <button type="submit" class="button">
            <span> Register </span>
          </button>
          <Link to="/login">
            {" "}
            <button class="button1">
              <span> login </span>
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
