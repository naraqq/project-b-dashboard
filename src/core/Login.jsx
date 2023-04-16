import { useNavigate } from "react-router-dom";
import $ from "jquery";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
const mobileScreen = window.matchMedia("(max-width: 990px )");
$(document).ready(function () {
  $(".dashboard-nav-dropdown-toggle").click(function () {
    $(this)
      .closest(".dashboard-nav-dropdown")
      .toggleClass("show")
      .find(".dashboard-nav-dropdown")
      .removeClass("show");
    $(this).parent().siblings().removeClass("show");
  });
  $(".menu-toggle").click(function () {
    if (mobileScreen.matches) {
      $(".dashboard-nav").toggleClass("mobile-show");
    } else {
      $(".dashboard").toggleClass("dashboard-compact");
    }
  });
});

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const data = {
    userName: username,
    password: password,
  };
  const handleLogin = () => {
    axios
      .post("http://installnaran.mn:9000/v1/Login/login", data)
      .then((res) => {
        console.log(res.data);
        if (res.data.isSuccess == true) {
          navigate("/home");
          window.location.reload();
        } else {
          toast.info(res.data.resultMessage, {
            position: "bottom-right",
          });
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="body">
      <ToastContainer />
      <div className="login">
        <h1 className="mb-5 !text-[25px]">Install Naran XXK</h1>
        <form method="post">
          <input
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            name="u"
            placeholder="Нэвтрэх нэр"
            required="required"
          />
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            name="p"
            placeholder="Нууц үг"
            required="required"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className="btn btn-primary btn-block btn-large"
          >
            Нэвтрэх
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
