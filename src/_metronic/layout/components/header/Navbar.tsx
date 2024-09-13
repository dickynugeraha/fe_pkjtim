import clsx from "clsx";
import { KTIcon, toAbsoluteUrl } from "../../../helpers";
import { HeaderUserMenu, ThemeModeSwitcher } from "../../../partials";
import { useLayout } from "../../core";
import { useAuth } from "../../../../app/modules/auth";
import Gap from "../content/Gap";
import { useNavigate } from "react-router-dom";

const itemClass = "ms-1 ms-md-4";
const btnClass =
  "btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px";
const userAvatarClass = "symbol-35px";
const btnIconClass = "fs-2";

const Navbar = () => {
  const { config } = useLayout();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="app-navbar flex-shrink-0">
      <div className={clsx("app-navbar-item", itemClass)}>
        <ThemeModeSwitcher
          toggleBtnClass={clsx("btn-active-light-primary btn-custom")}
        />
      </div>
      <Gap width={18} />
      {currentUser?.email && (
        <>
          <div className={clsx("app-navbar-item", itemClass)}>
            <div
              className={clsx("cursor-pointer symbol", userAvatarClass)}
              data-kt-menu-trigger="{default: 'click'}"
              data-kt-menu-attach="parent"
              data-kt-menu-placement="bottom-end"
            >
              <img
                src={toAbsoluteUrl("media/avatars/blank.png")}
                alt=""
                className="rounded-circle"
              />
            </div>
            <HeaderUserMenu />
          </div>
        </>
      )}
      {!currentUser?.email && (
        <div
          className="btn btn-primary"
          onClick={() => {
            navigate("/auth");
          }}
        >
          Login
        </div>
      )}
    </div>
  );
};

export { Navbar };
