import { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { toAbsoluteUrl } from "../../../_metronic/helpers";

const AuthLayout = () => {
  useEffect(() => {
    const root = document.getElementById("root");
    if (root) {
      root.style.height = "100%";
    }
    return () => {
      if (root) {
        root.style.height = "auto";
      }
    };
  }, []);

  return (
    <div
      className="d-flex flex-column flex-lg-row flex-column-fluid"
      style={{
        background: `url(${toAbsoluteUrl(
          "media/misc/auth-bg-pkjtim-2.png"
        )}) no-repeat center center fixed`,
        "-webkit-background-size": "cover",
        "-moz-background-size": "cover",
        "-o-background-size": "cover",
        "background-size": "cover",
        // backgroundRepeat: "no-repeat",
        // backgroundSize: "cover",
        // WebkitBackgroundSize: "cover",
        // MozBackgroundSize: "cover",
        // OBackgroundSize: "cover",
      }}
    >
      {/* begin::Aside */}
      <div className="d-flex flex-lg-row-fluid w-lg-50">
        {/* begin::Content */}
        <div className="d-flex flex-column flex-center py-12 px-5 px-md-15 w-100">
          {/* begin::Image */}
          <img
            className="mx-auto w-200px w-md-50 w-xl-300px mb-10 mb-lg-20"
            src={toAbsoluteUrl("media/logos/login-pkjtim.png")}
            alt=""
          />
        </div>
      </div>
      {/* end::Aside */}

      {/* begin::Body */}
      <div className="d-flex flex-column flex-lg-row-fluid w-lg-50 order-2 order-lg-1">
        {/* begin::Form */}
        <div className="d-flex flex-center flex-column flex-lg-row-fluid">
          {/* begin::Wrapper */}
          <Outlet />
          {/* end::Wrapper */}
        </div>
        {/* end::Form */}
      </div>
      {/* end::Body */}
    </div>
  );
};

export { AuthLayout };
