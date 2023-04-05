import { useNavigate } from "react-router-dom";
import $ from "jquery";
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
  return (
    <div className="body">
      <div className="login">
        <h1 className="mb-5 !text-[25px]">Install Naran XXK</h1>
        <form method="post">
          <input
            type="text"
            name="u"
            placeholder="Нэвтрэх нэр"
            required="required"
          />
          <input
            type="password"
            name="p"
            placeholder="Нууц үг"
            required="required"
          />
          <button
            onClick={() => {
              navigate("/home");
              window.location.reload();
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
