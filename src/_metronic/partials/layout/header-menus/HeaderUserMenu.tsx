import { FC } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../app/modules/auth";
import { toAbsoluteUrl } from "../../../helpers";
import { ROLE } from "../../../../app/constants/ROLE";

const HeaderUserMenu: FC = () => {
  const { currentUser, logout } = useAuth();

  return (
    <div
      className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px"
      data-kt-menu="true"
    >
      <div className="menu-item px-3">
        <div className="menu-content d-flex align-items-center px-3">
          {/* <div className="symbol symbol-50px me-5">
            <img alt="Logo" src={toAbsoluteUrl("media/avatars/300-3.jpg")} />
          </div> */}

          <div className="d-flex flex-column ms-5">
            <div className="fw-bolder d-flex align-items-center fs-5">
              {currentUser?.name}
            </div>
            {/* <div className="fw-bolder d-flex align-items-center fs-5">
              {currentUser?.first_name} {currentUser?.first_name}
            </div> */}
            <a href="#" className="fw-bold text-muted text-hover-primary fs-7">
              {currentUser?.email}
            </a>
          </div>
        </div>
      </div>

      <div className="separator my-2"></div>

      <div className="menu-item px-5">
        <Link to={"/profil-saya"} className="menu-link px-5">
          Profil Saya
        </Link>
      </div>
      {(currentUser?.role === ROLE.USER ||
        currentUser?.role === ROLE.SUPER_ADMIN) && (
        <div className="menu-item px-5">
          <Link to="/pesanan-saya" className="menu-link px-5">
            Pesanan Saya
          </Link>
        </div>
      )}

      <div className="separator my-2"></div>

      <div className="menu-item px-5">
        <a onClick={logout} className="menu-link px-5">
          Sign Out
        </a>
      </div>
    </div>
  );
};

export { HeaderUserMenu };
