import Login from "./core/Login";
import "./style/App.css";
import "./style/login.scss";
import "./style/home.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./core/Home";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
