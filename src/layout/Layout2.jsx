import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  useEffect(() => {
    const mobileScreen = window.matchMedia("(max-width: 990px )");
    setIsMobileScreen(mobileScreen.matches);
  }, []);

  const handleDropdownToggle = (e) => {
    const dropdown = e.currentTarget.closest(".dashboard-nav-dropdown");
    dropdown.classList.toggle("show");
    const dropdowns = dropdown.querySelectorAll(".dashboard-nav-dropdown");
    dropdowns.forEach((d) => d.classList.remove("show"));
    const siblings = e.currentTarget.parentNode.siblings;
    siblings.forEach((s) => s.classList.remove("show"));
  };

  const handleMenuToggle = () => {
    if (isMobileScreen) {
      const dashboardNav = document.querySelector(".dashboard-nav");
      dashboardNav.classList.toggle("mobile-show");
    } else {
      const dashboard = document.querySelector(".dashboard");
      dashboard.classList.toggle("dashboard-compact");
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-nav">
        <header>
          <button onClick={handleMenuToggle} className="menu-toggle">
            <i className="bi bi-list"></i>
          </button>
          <a href="#" className="brand-logo">
            <i className="bi bi-anchor"></i> <span>Install Naran XXK</span>
          </a>
        </header>
        <nav className="dashboard-nav-list">
          <button
            onClick={() => {
              navigate("/home");
            }}
            className={`cursor-pointer select-none dashboard-nav-item ${
              location.pathname == "/home" && "active"
            }`}
          >
            <i className="bi bi-house"></i>
            Нүүр{" "}
          </button>
          <button
            onClick={() => {
              navigate("/news");
            }}
            className={`cursor-pointer select-none dashboard-nav-item ${
              location.pathname == "/news" && "active"
            }`}
          >
            <i className="bi bi-speedometer2"></i> Мэдээ мэдээлэл
          </button>
          <button className="cursor-pointer select-none dashboard-nav-item">
            <i className="bi bi-collection-fill"></i> Ажил{" "}
          </button>
          <button className="cursor-pointer select-none dashboard-nav-item">
            <i className="bi bi-cloud-upload-fill"></i> CV{" "}
          </button>

          <button className="cursor-pointer select-none dashboard-nav-item">
            <i className="bi bi-people-fill"></i> Admin{" "}
          </button>
          {/* <button className="cursor-pointer select-none dashboard-nav-item">
            <i className="bi bi-gear-wide"></i> Settings{" "}
          </button> */}

          <div className="nav-item-divider"></div>
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/");
              window.location.reload();
            }}
            className="cursor-pointer select-none dashboard-nav-item"
          >
            <i className="bi bi-sign-out-alt"></i> Гарах{" "}
          </button>
        </nav>
      </div>
      <div className="dashboard-app">
        <header className="dashboard-toolbar !h-10">
          <button onClick={handleMenuToggle} className="menu-toggle">
            <i className="bi bi-speedometer2"></i> Мэдээ мэдээлэл
          </button>
          <button className="cursor-pointer select-none dashboard-nav-item">
            <i className="bi bi-collection-fill"></i> Ажил{" "}
          </button>
          <button className="cursor-pointer select-none dashboard-nav-item">
            <i className="bi bi-cloud-upload-fill"></i> CV{" "}
          </button>
          <button className="cursor-pointer select-none dashboard-nav-item">
            <i className="bi bi-people-fill"></i> Admin{" "}
          </button>
          {/* <button className="cursor-pointer select-none dashboard-nav-item">
            <i className="bi bi-gear-wide"></i> Settings{" "}
          </button> */}

          <div className="nav-item-divider"></div>
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/");
              window.location.reload();
            }}
            href="#"
            className="cursor-pointer select-none dashboard-nav-item"
          >
            <i className="bi bi-sign-out-alt"></i> Гарах{" "}
          </button>
        </header>
      </div>
      <div className="dashboard-app">
        <header className="dashboard-toolbar !h-10">
          <button onClick={handleMenuToggle} className="menu-toggle">
            <i className="bi bi-list"></i>
          </button>
        </header>
        <div className="w-full md:w-[calc(100vw-240px)] h-[calc(100vh-64px)] overflow-scroll overflow-x-hidden ">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
