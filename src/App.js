import Login from "./core/Login";
import "./style/App.css";
import "./style/login.scss";
import "./style/home.scss";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./core/Home";
import { ProtectedRoute } from "./core/ProtectedRoute";
import { CheckLogin } from "./core/CheckLogin";
import News from "./pages/News";
import "bootstrap/dist/css/bootstrap.min.css";
import CV from "./pages/CV";
import Anket from "./pages/Anket";
import CVDetail from "./pages/CVDetail";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <CheckLogin>
              <Login />
            </CheckLogin>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/news"
          element={
            <ProtectedRoute>
              <News />
            </ProtectedRoute>
          }
        />
        <Route
          path="/job"
          element={
            <ProtectedRoute>
              <CV />
            </ProtectedRoute>
          }
        />
        <Route
          path="/CV"
          element={
            <ProtectedRoute>
              <Anket />
            </ProtectedRoute>
          }
        />
        <Route
          path="/CV-detail"
          element={
            <ProtectedRoute>
              <CVDetail />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
