import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import { getUserByToken, register } from "../core/_requests";
import { Link, useNavigate } from "react-router-dom";
import { PasswordMeterComponent } from "../../../../_metronic/assets/ts/components";
import { useAuth } from "../core/Auth";
import Swal from "sweetalert2";
import ModalInformasi from "../../../../_metronic/layout/components/modal/ModalInformasi";

const initialValues = {
  fullname: "",
  ktp: "",
  email: "",
  phoneNumber: "",
  password: "",
  rePassword: "",
};

const registrationSchema = Yup.object().shape({
  fullname: Yup.string()
    .min(3, "Minimal 3 karakter")
    .max(50, "Maksimal 50 karakter")
    .required("Nama lengkap harus diisi"),
  ktp: Yup.mixed()
    .required("Foto ktp harus diupload")
    .test(
      "fileFormat",
      "File wajib gambar dengan format png|jpg|jpeg",
      (value: any) => {
        if (value) {
          const supportedFormats = ["png", "jpg", "jpeg"];
          return supportedFormats.includes(value.name.split(".").pop());
        }
        return true;
      }
    )
    .test("fileSize", "Ukuran file maksimal 3mb", (value: any) => {
      if (value) {
        return value.size <= 3145728;
      }
      return true;
    }),
  email: Yup.string()
    .email("Format email salah")
    .min(3, "Minimal 3 karakter")
    .max(50, "Maksimal 50 karakter")
    .required("Email harus diisi"),
  phoneNumber: Yup.string()
    .min(11, "Minimal 11 nomor")
    .max(13, "Maksimal 13 nomor")
    .required("Nomor handphone harus diisi"),
  password: Yup.string()
    .min(3, "Minimal 3 karakter")
    .max(50, "Maksimal 50 karakter")
    .required("Kata sandi harus diisi"),
  rePassword: Yup.string()
    .min(3, "Minimal 3 karakter")
    .max(50, "Maksimal 50 karakter")
    .required("Konfirmasi password harus diisi")
    .oneOf(
      [Yup.ref("password")],
      "Password dan Konfirmasi Password Tidak Sama"
    ),
});

export function Registration() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [modalError, setModalError] = useState({
    show: false,
    text: "",
  });
  const handleChangeKTP = (e: any) => {
    formik.setFieldValue("ktp", e.target.files[0]);
  };

  const { saveAuth } = useAuth();

  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      try {
        const payload = {
          ...values,
          // ktp: fileKtp,
        };

        await register(payload);

        Swal.fire({
          icon: "success",
          title: "Berhasil melakukan registrasi!",
          text: "Admin akan memverifikasi data kamu, Mohon menunggu info selanjutnya",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          navigate("/auth/login");
        });
        setLoading(false);
      } catch (error: any) {
        console.error(error);
        saveAuth(undefined);
        setStatus("The registration details is incorrect");
        setSubmitting(false);
        setLoading(false);
        Swal.fire({
          heightAuto: false,
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
      className="card p-8 form w-md-400px w-lg-500px m-6"
      noValidate
      id="kt_login_signup_form"
      onSubmit={formik.handleSubmit}
    >
      <ModalInformasi
        type="failed"
        handleClose={() => setModalError({ show: false, text: "" })}
        message={modalError.text}
        isShow={modalError.show}
        title="ERROR"
        icon={""}
      />
      <div>
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
        {/* ktp */}
        <div className="d-flex align-items-center justify-content-between">
          <div className="fv-row mb-5">
            <div className="input-group">
              <label className="input-group-text bg-primary text-white">
                Upload KTP
              </label>
              <input
                id="ktp"
                type="file"
                required
                // onChange={(e: any) => setFileKtp(e.target.files[0])}
                onChange={handleChangeKTP}
                title="Foto ktp"
                className={clsx("form-control bg-transparent", {
                  "is-invalid": formik.errors.ktp,
                })}
              />
            </div>
            {formik.errors.ktp && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert">{formik.errors.ktp}</span>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* end ktp */}
        <div className="fv-row mb-5">
          <input
            placeholder="Nomor Handphone"
            type="number"
            autoComplete="off"
            {...formik.getFieldProps("phoneNumber")}
            className={clsx(
              "form-control bg-transparent",
              {
                "is-invalid":
                  formik.touched.phoneNumber && formik.errors.phoneNumber,
              },
              {
                "is-valid":
                  formik.touched.phoneNumber && !formik.errors.phoneNumber,
              }
            )}
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                <span role="alert">{formik.errors.phoneNumber}</span>
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
            Gunakan 8 karakter atau lebih dengan huruf, angka, & simbol.
          </div>
        </div>
        {/* end::Form group */}

        {/* begin::Form group Confirm password */}
        <div className="fv-row mb-5">
          <input
            type="password"
            placeholder="Konfirmasi password  "
            autoComplete="off"
            {...formik.getFieldProps("rePassword")}
            className={clsx(
              "form-control bg-transparent",
              {
                "is-invalid":
                  formik.touched.rePassword && formik.errors.rePassword,
              },
              {
                "is-valid":
                  formik.touched.rePassword && !formik.errors.rePassword,
              }
            )}
          />
          {formik.touched.rePassword && formik.errors.rePassword && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                <span role="alert">{formik.errors.rePassword}</span>
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
            disabled={formik.isSubmitting || !formik.isValid}
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
        <div className="text-gray-500 text-center fw-semibold fs-6">
          Kembali ke{" "}
          <Link to="/dashboard/home" className="link-primary">
            Beranda
          </Link>
        </div>
      </div>
    </form>
  );
}
