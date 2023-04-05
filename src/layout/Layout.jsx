import { useNavigate } from "react-router-dom";

function Layout({ children }) {
  const navigate = useNavigate();
  return (
    <div className="dashboard">
      <div className="dashboard-nav">
        <header>
          <a href="#!" className="menu-toggle">
            <i className="bi bi-list"></i>
          </a>
          <a href="#" className="brand-logo">
            <i className="bi bi-anchor"></i> <span>Install Naran XXK</span>
          </a>
        </header>
        <nav className="dashboard-nav-list">
          <a href="#" className="dashboard-nav-item">
            <i className="bi bi-house"></i>
            Нүүр{" "}
          </a>
          <a href="#" className="dashboard-nav-item active">
            <i className="bi bi-speedometer2"></i> Удирдлага
          </a>
          <a href="#" className="dashboard-nav-item">
            <i className="bi bi-cloud-upload-fill"></i> CV{" "}
          </a>
          <div className="dashboard-nav-dropdown">
            <a
              href="#!"
              className="dashboard-nav-item dashboard-nav-dropdown-toggle"
            >
              <i className="bi bi-play-btn"></i>Media{" "}
            </a>
            <div className="dashboard-nav-dropdown-menu">
              <a href="#" className="dashboard-nav-dropdown-item">
                All
              </a>
              <a href="#" className="dashboard-nav-dropdown-item">
                Recent
              </a>
              <a href="#" className="dashboard-nav-dropdown-item">
                Images
              </a>
              <a href="#" className="dashboard-nav-dropdown-item">
                Video
              </a>
            </div>
          </div>
          <a href="#" className="dashboard-nav-item active">
            <i className="bi bi-people-fill"></i> Admin{" "}
          </a>
          <a href="#" className="dashboard-nav-item">
            <i className="bi bi-gear-wide"></i> Settings{" "}
          </a>
          <a href="#" className="dashboard-nav-item">
            <i className="bi bi-user"></i> Profile{" "}
          </a>
          <div className="nav-item-divider"></div>
          <a
            onClick={() => {
              navigate("/");
            }}
            href="#"
            className="dashboard-nav-item"
          >
            <i className="bi bi-sign-out-alt"></i> Гарах{" "}
          </a>
        </nav>
      </div>
      <div className="dashboard-app">
        <header className="dashboard-toolbar !h-10">
          <a href="#!" className="menu-toggle">
            <i className="bi bi-list"></i>
          </a>
        </header>
        <div className="">
          <div className="w-full h-[calc(100vh-64px)] overflow-scroll overflow-x-hidden ">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
