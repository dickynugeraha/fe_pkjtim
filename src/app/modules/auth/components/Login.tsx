import { useEffect, useMemo, useState } from "react";
import * as Yup from "yup";
import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { login } from "../core/_requests";
import { useAuth } from "../core/Auth";
import ModalInformasi from "../../../../_metronic/layout/components/modal/ModalInformasi";
import { Card } from "react-bootstrap";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";
import { KTIcon } from "../../../../_metronic/helpers";
import useContactPerson from "../../hooks/master-data/contact-person";
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import Gap from "../../../../_metronic/layout/components/content/Gap";

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

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function Login() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showModalLupaPassword, setShowModalLupaPassword] = useState(false);
  const { saveAuth, setCurrentUser } = useAuth();
  const { contact, fetchAllContact } = useContactPerson();
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const RECAPTCHA_SITE_KEY = "6LfYQ4cqAAAAAKZHFk4NfpinJ3sWP9MXraLDC6Hw"; // v2

  const navigate = useNavigate();
  useEffect(() => {
    fetchAllContact();
  }, []);

  // Function to handle reCAPTCHA change
  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  const forgotPassword = () => {
    const specificContact = contact.find(
      (b) => b.forContent == "Lupa Password"
    );
    Swal.fire({
      title: "Jika lupa password silahkan hubungi " + specificContact.name,
      text: `Hubungi ${specificContact.name} melalui WA berikut ${specificContact.phone}`,
      icon: "warning",
      showCloseButton: true,
      heightAuto: false,
    });
  };

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      if (!captchaToken) {
        alert("Please complete the CAPTCHA");
        setLoading(false);
        return;
      }

      try {
        const { data: auth } = await login(values.email, values.password);

        const userDecodeResult: any = jwtDecode(auth.data.accessToken);
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
          role: userDecodeResult.role,
          isEmailConfirm:
            userDecodeResult.IsEmailConfirmed === "False" ? false : true,
        };
        setCurrentUser(user);
        navigate("/dashboard/home");
        setLoading(false);

        // Clear the CAPTCHA token after submission
        setCaptchaToken(null);
      } catch (error: any) {
        saveAuth(undefined);
        setStatus("The login details are incorrect");
        setSubmitting(false);
        Swal.fire({
          heightAuto: false,
          icon: "error",
          title: "Gagal melakukan login",
          text: `${error.message}`,
          showConfirmButton: false,
          timer: 2000,
        });

        setLoading(false);
      }
    },
  });

  return (
    <motion.div
      initial={{ y: "800px" }}
      animate={{ y: "0px" }}
      transition={{ type: "spring", ease: [0.34, 1.56, 0.64, 1], delay: 0.6 }}
    >
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
                  <div className="fv-help-block">
                    <span role="alert">{formik.errors.email}</span>
                  </div>
                </div>
              )}
            </div>
            {/* end::Form group */}

            {/* begin::Form group */}
            <div className="fv-row mb-5">
              {/* <label className="form-label fw-bolder text-gray-900 fs-6 mb-0">
            Password
          </label> */}
              <div className="input-group">
                <input
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
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
                <a
                  className="btn btn-secondary btn-outline"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <KTIcon
                    iconName={showPassword ? "eye-slash" : "eye"}
                    className="fs-1"
                    iconType="solid"
                  ></KTIcon>
                </a>
              </div>
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
              onClick={() => forgotPassword()}
            >
              Lupa password?
            </a>

            {/* begin::Action */}
            <div className="d-grid my-3">
              <ReCAPTCHA
                sitekey={RECAPTCHA_SITE_KEY}
                onChange={handleCaptchaChange}
                onExpired={() => setCaptchaToken(null)} // Reset on expiration
                type="image"
              />
              <Gap height={20} />
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
            <div className="text-gray-500 text-center fw-semibold fs-6">
              Kembali ke{" "}
              <Link to="/dashboard/home" className="link-primary">
                Beranda
              </Link>
            </div>
          </form>
        </Card.Body>
      </Card>
    </motion.div>
  );
}
