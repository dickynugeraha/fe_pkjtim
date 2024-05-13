import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import { getUserByToken, register } from "../core/_requests";
import { Link } from "react-router-dom";
import { toAbsoluteUrl } from "../../../../_metronic/helpers";
import { PasswordMeterComponent } from "../../../../_metronic/assets/ts/components";
import { useAuth } from "../core/Auth";

const initialValues = {
  fullname: "",
  username: "",
  email: "",
  phone: "",
  password: "",
  changepassword: "",
  acceptTerms: false,
};

const registrationSchema = Yup.object().shape({
  fullname: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("First name is required"),
  email: Yup.string()
    .email("Wrong email format")
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Email is required"),
  username: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Username is required"),
  phone: Yup.number()
    .min(11, "Minimum 11 symbols")
    .max(13, "Maximum 13 symbols")
    .required("Phone number is required"),
  password: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Password is required"),
  changepassword: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Password confirmation is required")
    .oneOf([Yup.ref("password")], "Password and Confirm Password didn't match"),
  acceptTerms: Yup.bool().required("You must accept the terms and conditions"),
});

export function Registration() {
  const [loading, setLoading] = useState(false);
  const { saveAuth, setCurrentUser } = useAuth();
  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      try {
        const { data: auth } = await register(
          values.email,
          values.fullname,
          values.username,
          values.password,
          values.changepassword
        );
        saveAuth(auth);
        const { data: user } = await getUserByToken(auth.api_token);
        setCurrentUser(user);
      } catch (error) {
        console.error(error);
        saveAuth(undefined);
        setStatus("The registration details is incorrect");
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    PasswordMeterComponent.bootstrap();
  }, []);

  return (
    <form
      className="card p-8 form overflow-y-scroll"
      style={{ height: "600px" }}
      noValidate
      id="kt_login_signup_form"
      onSubmit={formik.handleSubmit}
    >
      <div className="">
        {/* begin::Heading */}
        <div className="text-center">
          {/* begin::Title */}
          <h1 className="text-gray-900 fw-bolder">Daftar</h1>
          {/* end::Title */}
        </div>
        {/* end::Heading */}

        <div className="separator separator-content my-10">
          <span className="w-400px text-gray-500 fw-semibold fs-7">
            Selamat Datang di PKJ TIM!
          </span>
        </div>

        {formik.status && (
          <div className="mb-lg-15 alert alert-danger">
            <div className="alert-text font-weight-bold">{formik.status}</div>
          </div>
        )}

        {/* begin::Form group fullname */}
        <div className="fv-row mb-5">
          {/* <label className="form-label fw-bolder text-gray-900 fs-6">
          First name
        </label> */}
          <input
            placeholder="Nama lengkap"
            type="text"
            autoComplete="off"
            {...formik.getFieldProps("fullname")}
            className={clsx(
              "form-control bg-transparent",
              {
                "is-invalid": formik.touched.fullname && formik.errors.fullname,
              },
              {
                "is-valid": formik.touched.fullname && !formik.errors.fullname,
              }
            )}
          />
          {formik.touched.fullname && formik.errors.fullname && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                <span role="alert">{formik.errors.fullname}</span>
              </div>
            </div>
          )}
        </div>
        {/* end::Form group */}
        <div className="fv-row mb-5">
          {/* begin::Form group Lastname */}
          {/* <label className="form-label fw-bolder text-gray-900 fs-6">
          Username
        </label> */}
          <input
            placeholder="Username"
            type="text"
            autoComplete="off"
            {...formik.getFieldProps("username")}
            className={clsx(
              "form-control bg-transparent",
              {
                "is-invalid": formik.touched.username && formik.errors.username,
              },
              {
                "is-valid": formik.touched.username && !formik.errors.username,
              }
            )}
          />
          {formik.touched.username && formik.errors.username && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                <span role="alert">{formik.errors.username}</span>
              </div>
            </div>
          )}
          <p className="mb-2 ms-1 text-xs text-start text-danger">
            *) Wajib nomor handphone yang terhubung dengan whatsapp
          </p>
          {/* end::Form group */}
        </div>

        <div className="fv-row mb-5">
          {/* begin::Form group Lastname */}
          {/* <label className="form-label fw-bolder text-gray-900 fs-6">
          Username
        </label> */}
          <input
            placeholder="Nomor Handphone"
            type="number"
            autoComplete="off"
            {...formik.getFieldProps("phone")}
            className={clsx(
              "form-control bg-transparent",
              {
                "is-invalid": formik.touched.phone && formik.errors.phone,
              },
              {
                "is-valid": formik.touched.phone && !formik.errors.phone,
              }
            )}
          />
          {formik.touched.phone && formik.errors.phone && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                <span role="alert">{formik.errors.phone}</span>
              </div>
            </div>
          )}
          {/* end::Form group */}
        </div>

        {/* begin::Form group Email */}
        <div className="fv-row mb-5">
          {/* <label className="form-label fw-bolder text-gray-900 fs-6">Email</label> */}
          <input
            placeholder="Email"
            type="email"
            autoComplete="off"
            {...formik.getFieldProps("email")}
            className={clsx(
              "form-control bg-transparent",
              { "is-invalid": formik.touched.email && formik.errors.email },
              {
                "is-valid": formik.touched.email && !formik.errors.email,
              }
            )}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                <span role="alert">{formik.errors.email}</span>
              </div>
            </div>
          )}
        </div>
        {/* end::Form group */}

        {/* begin::Form group Password */}
        <div className="fv-row mb-5" data-kt-password-meter="true">
          <div className="mb-1">
            {/* <label className="form-label fw-bolder text-gray-900 fs-6">
            Password
          </label> */}
            <div className="position-relative mb-5">
              <input
                type="password"
                placeholder="Password"
                autoComplete="off"
                {...formik.getFieldProps("password")}
                className={clsx(
                  "form-control bg-transparent",
                  {
                    "is-invalid":
                      formik.touched.password && formik.errors.password,
                  },
                  {
                    "is-valid":
                      formik.touched.password && !formik.errors.password,
                  }
                )}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">
                    <span role="alert">{formik.errors.password}</span>
                  </div>
                </div>
              )}
            </div>
            {/* begin::Meter */}
            <div
              className="d-flex align-items-center mb-5"
              data-kt-password-meter-control="highlight"
            >
              <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
              <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
              <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
              <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px"></div>
            </div>
            {/* end::Meter */}
          </div>
          <div className="text-muted">
            Use 8 or more characters with a mix of letters, numbers & symbols.
          </div>
        </div>
        {/* end::Form group */}

        {/* begin::Form group Confirm password */}
        <div className="fv-row mb-5">
          {/* <label className="form-label fw-bolder text-gray-900 fs-6">
          Confirm Password
        </label> */}
          <input
            type="password"
            placeholder="Password confirmation"
            autoComplete="off"
            {...formik.getFieldProps("changepassword")}
            className={clsx(
              "form-control bg-transparent",
              {
                "is-invalid":
                  formik.touched.changepassword && formik.errors.changepassword,
              },
              {
                "is-valid":
                  formik.touched.changepassword &&
                  !formik.errors.changepassword,
              }
            )}
          />
          {formik.touched.changepassword && formik.errors.changepassword && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                <span role="alert">{formik.errors.changepassword}</span>
              </div>
            </div>
          )}
        </div>
        {/* end::Form group */}

        {/* begin::Form group */}
        <div className="fv-row mb-5">
          <label
            className="form-check form-check-inline"
            htmlFor="kt_login_toc_agree"
          >
            <input
              className="form-check-input"
              type="checkbox"
              id="kt_login_toc_agree"
              {...formik.getFieldProps("acceptTerms")}
            />
            <span>
              I Accept the{" "}
              <a
                href="https://keenthemes.com/metronic/?page=faq"
                target="_blank"
                className="ms-1 link-primary"
              >
                Terms
              </a>
              .
            </span>
          </label>
          {formik.touched.acceptTerms && formik.errors.acceptTerms && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                <span role="alert">{formik.errors.acceptTerms}</span>
              </div>
            </div>
          )}
        </div>
        {/* end::Form group */}

        {/* begin::Form group */}
        <div className="text-center">
          <button
            type="submit"
            id="kt_sign_up_submit"
            className="btn btn-lg btn-primary w-100 mb-5"
            disabled={
              formik.isSubmitting ||
              !formik.isValid ||
              !formik.values.acceptTerms
            }
          >
            {!loading && <span className="indicator-label">Daftar</span>}
            {loading && (
              <span className="indicator-progress" style={{ display: "block" }}>
                Please wait...{" "}
                <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            )}
          </button>
        </div>
        {/* end::Form group */}

        <div className="text-gray-500 text-center fw-semibold fs-6">
          Sudah memiliki akun?{" "}
          <Link to="/auth/login" className="link-primary">
            Masuk
          </Link>
        </div>
      </div>
    </form>
  );
}
