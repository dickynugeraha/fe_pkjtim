import { useState } from "react";
import * as Yup from "yup";
import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";
import { replace, useFormik } from "formik";
import { getUserByToken, login } from "../core/_requests";
import { toAbsoluteUrl } from "../../../../_metronic/helpers";
import { useAuth } from "../core/Auth";
import ModalInformasi from "../../../../_metronic/layout/components/modal/ModalInformasi";
import { Card } from "react-bootstrap";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Format email tidak benar")
    .min(3, "Minimal 3 karakter")
    .max(50, "Maksimal 50 karakter")
    .required("Email harus diisi"),
  password: Yup.string()
    .min(3, "Minimal 3 karakter")
    .max(50, "Maksimal 50 karakter")
    .required("Password harus diisi"),
});

const initialValues = {
  email: "",
  password: "",
};
// const initialValues = {
//   password: "##Admin@1234",
//   email: "admin@gmail.com",
// };

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function Login() {
  const [loading, setLoading] = useState(false);
  const [showModalLupaPassword, setShowModalLupaPassword] = useState(false);
  const { saveAuth, setCurrentUser } = useAuth();

  // const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      try {
        const { data: auth } = await login(values.email, values.password);

        const userDecodeResult: any = jwtDecode(auth.data.accessToken);
        console.log("userDecodeResult ", userDecodeResult);
        const authData = {
          api_token: auth.data.accessToken,
          refreshToken: auth.data.refreshToken,
        };
        saveAuth(authData);
        const user = {
          id: userDecodeResult.Id,
          email: userDecodeResult.email,
          name: userDecodeResult.name,
          phoneNumber: userDecodeResult.phone_number,
        };
        setCurrentUser(user);
        setLoading(false);
      } catch (error: any) {
        console.log("error in view", error);

        saveAuth(undefined);
        setStatus("The login details are incorrect");
        setSubmitting(false);
        Swal.fire({
          icon: "error",
          title: "Gagal melakukan login",
          text: `${error.message}`,
        });

        setLoading(false);
      }
    },
  });

  return (
    <Card>
      <Card.Body>
        <form
          onSubmit={formik.handleSubmit}
          noValidate
          id="kt_login_signin_form"
        >
          {/* begin::Heading */}
          <div className="text-center">
            <h1 className="text-gray-900 fw-bolder">Masuk</h1>
          </div>
          {/* begin::Heading */}

          {/* begin::Separator */}
          <div className="separator separator-content my-10">
            <span className="w-lg-400px w-250px text-gray-500 fw-semibold fs-7">
              Selamat Datang di PKJ TIM!
            </span>
          </div>
          {/* end::Separator */}

          {/* begin::Form group */}
          <div className="fv-row mb-5">
            {/* <label className="form-label fs-6 fw-bolder text-gray-900">Email</label> */}
            <input
              placeholder="Email"
              {...formik.getFieldProps("email")}
              className={clsx(
                "form-control bg-transparent",
                { "is-invalid": formik.touched.email && formik.errors.email },
                {
                  "is-valid": formik.touched.email && !formik.errors.email,
                }
              )}
              type="email"
              name="email"
              autoComplete="off"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="fv-plugins-message-container">
                <span role="alert">{formik.errors.email}</span>
              </div>
            )}
          </div>
          {/* end::Form group */}

          {/* begin::Form group */}
          <div className="fv-row mb-5">
            {/* <label className="form-label fw-bolder text-gray-900 fs-6 mb-0">
          Password
        </label> */}
            <input
              placeholder="Password"
              type="password"
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
          {/* end::Form group */}

          <a
            className="btn btn-link btn-color-muted btn-active-color-primary ms-auto"
            onClick={() => setShowModalLupaPassword(true)}
          >
            Lupa password?
          </a>

          {/* begin::Action */}
          <div className="d-grid my-8">
            <button
              type="submit"
              id="kt_sign_in_submit"
              className="btn btn-primary"
              disabled={formik.isSubmitting || !formik.isValid}
            >
              {!loading && (
                <span className="indicator-label text-white">Masuk</span>
              )}
              {loading && (
                <span
                  className="indicator-progress text-white"
                  style={{ display: "block" }}
                >
                  Loading...
                  <span className="spinner-border spinner-border-sm align-middle ms-2 text-white"></span>
                </span>
              )}
            </button>
          </div>
          {/* end::Action */}
          <ModalInformasi
            handleClose={async () => setShowModalLupaPassword(false)}
            isShow={showModalLupaPassword}
            title="Lupa Password"
            message="Silahkan menghubungi nomor ini wa.me"
            type="info"
            icon=""
          />

          <div className="text-gray-500 text-center fw-semibold fs-6">
            Tidak memiliki akun?{" "}
            <Link to="/auth/registration" className="link-primary">
              Daftar
            </Link>
          </div>
        </form>
      </Card.Body>
    </Card>
  );
}
