import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
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
      .post("http://installnaran.mn:9000/v1/Login/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.data.isSuccess == true) {
          localStorage.setItem("token", res.data.access_token);
          navigate("/home");
          window.location.reload();
        } else {
          toast.error(res.data.resultMessage, {
            position: "top-right",
          });
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="body">
      <ToastContainer />
      <div className="login">
        <h1 className="mb-5 !text-[25px] flex items-center text-center">
          <img className="w-10 mr-2" src="logo.svg" />
          Install Naran XXK
        </h1>
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
