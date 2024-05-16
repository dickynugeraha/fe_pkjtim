import clsx from "clsx";
import { KTIcon, toAbsoluteUrl } from "../../../helpers";
import { HeaderUserMenu, ThemeModeSwitcher } from "../../../partials";
import { useLayout } from "../../core";

const itemClass = "ms-1 ms-md-4";
const btnClass =
  "btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px";
const userAvatarClass = "symbol-35px";
const btnIconClass = "fs-2";

const Navbar = () => {
  const { config } = useLayout();
  return (
    <div className="app-navbar flex-shrink-0">
      <div className={clsx("app-navbar-item", itemClass)}>
        <ThemeModeSwitcher
          toggleBtnClass={clsx("btn-active-light-primary btn-custom")}
        />
      </div>

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
    </div>
  );
};

export { Navbar };
