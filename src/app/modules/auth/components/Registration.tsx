import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import { getUserByToken, register } from "../core/_requests";
import { Link } from "react-router-dom";
import { PasswordMeterComponent } from "../../../../_metronic/assets/ts/components";
import { useAuth } from "../core/Auth";
import Swal from "sweetalert2";
import CryptoJS from "crypto-js";
// import hmacSHA512 from "crypto-js/hmac-sha512";

const initialValues = {
  fullname: "Kale Pramono",
  email: "dicky.dian1@gmail.com",
  phone: "089675379948",
  password: "!23QwE123",
  passwordConfirm: "!23QwE123",
  acceptTerms: true,
};

const registrationSchema = Yup.object().shape({
  fullname: Yup.string()
    .min(3, "Minimal 3 karakter")
    .max(50, "Maksimal 50 karakter")
    .required("Nama lengkap harus diisi"),
  email: Yup.string()
    .email("Wrong email format")
    .min(3, "Minimal 3 karakter")
    .max(50, "Maksimal 50 karakter")
    .required("Email harus diisi"),

  phone: Yup.string()
    .min(11, "Minimal 11 nomor")
    .max(13, "Maksimal 13 nomor")
    .required("Nomor handphone garus diisi"),
  password: Yup.string()
    .min(3, "Minimal 3 karakter")
    .max(50, "Maksimal 50 karakter")
    .required("Kata sandi harus diisi"),
  passwordConfirm: Yup.string()
    .min(3, "Minimal 3 karakter")
    .max(50, "Maksimal 50 karakter")
    .required("Konfirmasi password harus diisi")
    .oneOf(
      [Yup.ref("password")],
      "Password dan Konfirmasi Password Tidak Sama"
    ),
  acceptTerms: Yup.bool().required("You must accept the terms and conditions"),
});

export function Registration() {
  const [loading, setLoading] = useState(false);
  const { saveAuth } = useAuth();
  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      console.log("values", values);
      try {
        const res = await register(
          values.email,
          values.fullname,
          values.phone,
          values.password,
          values.passwordConfirm
        );
        console.log("response register", res);

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Berhasil melakukan registrasi!",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error: any) {
        console.error(error);
        saveAuth(undefined);
        setStatus("The registration details is incorrect");
        setSubmitting(false);
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Gagal melakukan registrasi",
          text: `${error.message}`,
        });
      }
    },
  });

  useEffect(() => {
    PasswordMeterComponent.bootstrap();
  }, []);

  return (
    <form
      className="card p-8 form overflow-y-scroll w-md-400px w-lg-500px"
      noValidate
      id="kt_login_signup_form"
      onSubmit={formik.handleSubmit}
    >
      <div className="">
        <div className="text-center">
          <h1 className="text-gray-900 fw-bolder">Daftar</h1>
        </div>

        <div className="separator separator-content my-10">
          <span className="w-lg-400px text-gray-500 fw-semibold fs-7">
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

        <div className="fv-row mb-5">
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
          <input
            type="password"
            placeholder="Konfirmasi password  "
            autoComplete="off"
            {...formik.getFieldProps("passwordConfirm")}
            className={clsx(
              "form-control bg-transparent",
              {
                "is-invalid":
                  formik.touched.passwordConfirm &&
                  formik.errors.passwordConfirm,
              },
              {
                "is-valid":
                  formik.touched.passwordConfirm &&
                  !formik.errors.passwordConfirm,
              }
            )}
          />
          {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                <span role="alert">{formik.errors.passwordConfirm}</span>
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
        <div className="text-center d-grid">
          <button
            type="submit"
            id="kt_sign_up_submit"
            className="btn btn-lg btn-primary mb-5"
            disabled={
              formik.isSubmitting ||
              !formik.isValid ||
              !formik.values.acceptTerms
            }
          >
            {!loading && (
              <span className="indicator-label text-white">Daftar</span>
            )}
            {loading && (
              <span
                className="indicator-progress text-white"
                style={{ display: "block" }}
              >
                Please wait...
                <span className="spinner-border text-white spinner-border-sm align-middle ms-2"></span>
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
