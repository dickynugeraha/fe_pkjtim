import React, { useState } from "react";
import { Content } from "../../../_metronic/layout/components/content";
import ModalEditProfil from "./ModalEditProfil";
import * as Yup from "yup";
import Gap from "../../../_metronic/layout/components/content/Gap";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";
import { KTIcon } from "../../../_metronic/helpers";
import {
  IUpdateEmail,
  IUpdatePassword,
  updateEmail,
  updatePassword,
} from "../../modules/accounts/components/settings/SettingsModel";
import { useFormik } from "formik";

const Breadcrumbs: Array<PageLink> = [
  {
    title: "Profil Saya",
    path: "/profil-saya",
    isSeparator: false,
    isActive: true,
  },
  {
    title: "",
    path: "",
    isSeparator: true,
    isActive: true,
  },
];

const emailFormValidationSchema = Yup.object().shape({
  newEmail: Yup.string()
    .email("Wrong email format")
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Email is required"),
  confirmPassword: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Password is required"),
});

const passwordFormValidationSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Password is required"),
  newPassword: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Password is required"),
  passwordConfirmation: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Password is required")
    .oneOf([Yup.ref("newPassword")], "Passwords must match"),
});

const ProfilSaya = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [emailUpdateData, setEmailUpdateData] =
    useState<IUpdateEmail>(updateEmail);
  const [passwordUpdateData, setPasswordUpdateData] =
    useState<IUpdatePassword>(updatePassword);

  const [showEmailForm, setShowEmailForm] = useState<boolean>(false);
  const [showPasswordForm, setPasswordForm] = useState<boolean>(false);

  const [loading1, setLoading1] = useState(false);

  const formik1 = useFormik<IUpdateEmail>({
    initialValues: {
      ...emailUpdateData,
    },
    validationSchema: emailFormValidationSchema,
    onSubmit: (values) => {
      setLoading1(true);
      setTimeout(() => {
        setEmailUpdateData(values);
        setLoading1(false);
        setShowEmailForm(false);
      }, 1000);
    },
  });

  const [loading2, setLoading2] = useState(false);

  const formik2 = useFormik<IUpdatePassword>({
    initialValues: {
      ...passwordUpdateData,
    },
    validationSchema: passwordFormValidationSchema,
    onSubmit: (values) => {
      setLoading2(true);
      setTimeout(() => {
        setPasswordUpdateData(values);
        setLoading2(false);
        setPasswordForm(false);
      }, 1000);
    },
  });
  return (
    <>
      <PageTitle
        icon="user"
        breadcrumbs={Breadcrumbs}
        description="Profil saya"
      >
        Profil Saya
      </PageTitle>
      <Content>
        {/* alert jika email belum terverifikasi */}
        <div className="alert alert-dismissible bg-light-warning border border-warning d-flex flex-column flex-sm-row p-5">
          <span className="svg-icon svg-icon-2hx svg-icon-primary me-4 mb-5 mb-sm-0">
            <KTIcon
              iconName="information-2"
              className="fs-2x text-warning justify-content-center"
            ></KTIcon>
          </span>
          <div className="d-flex flex-column text-warning pe-0 pe-sm-10">
            <h5 className="mb-1">Email anda belum terverifikasi!</h5>
            <span>
              Silahkan melakukan verifikasi email untuk dapat melakukan
              pemesanan tempat
            </span>
          </div>
          <button
            type="button"
            className="btn btn-sm btn-warning position-absolute position-sm-relative m-2 m-sm-0 top-0 end-0 ms-sm-auto"
          >
            Kirim email verifikasi
          </button>
        </div>
        <div className="card shadow-sm">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h4 className="m-0">Detail Profil Saya</h4>
            <a
              className="btn btn-light-primary btn-sm"
              onClick={() => setShowModal(true)}
              role="button"
            >
              Ubah data
            </a>
          </div>
          <div className="p-8">
            <div className="row mb-7">
              <label className="col-lg-4 fw-bold text-gray-600">
                Nama Lengkap
              </label>

              <div className="col-lg-8 fv-row">
                <span className="fs-6">Kale Pramono</span>
              </div>
            </div>
            <div className="row mb-7">
              <label className="col-lg-4 fw-bold text-gray-600">
                Nomor handphone
              </label>

              <div className="col-lg-8 fv-row">
                <span className="fs-6">08963214785</span>
              </div>
            </div>
            <div className="row mb-7">
              <label className="col-lg-4 fw-bold text-gray-600">Email</label>

              <div className="col-lg-8 d-flex align-items-center">
                <span className="fs-6">kale@gmail.com</span>
                <Gap width={5} />
                <span className="badge badge-success">Verified</span>
              </div>
            </div>
          </div>
        </div>
        <Gap height={15} />
        {/* <div className='card'>
          <div className='card-header d-flex justify-content-between align-items-center'>
            <h4 className='m-0'>Detail Login</h4>
          </div>
          <div className='p-8'>
            <div className='row row-cols-1 row-cols-md-2'>
              <div className='col'>
                <div className='mb-3'>
                  <p className='fw-bold'>Email</p>
                  <input
                    type='email'
                    className='form-control transparant'
                    required
                  />
                </div>
              </div>
              <div className='col'>
                <div className='mb-3'>
                  <p className='fw-bold'>Konfirmasi kata sandi</p>
                  <input
                    type='password'
                    className='form-control transparant'
                    required
                  />
                </div>
              </div>
            </div>
            <Gap height={10} />
            <div className='d-flex'>
              <div
                className='btn btn-sm btn-primary'
                style={{ width: '180px' }}
              >
                Perbaharui email
              </div>
              <Gap width={12} />
              <div
                className='btn btn-sm btn-secondary'
                style={{ width: '100px' }}
              >
                Cancel
              </div>
            </div>
            <Gap height={42} />
            <div className='row row-cols-1 row-cols-md-3'>
              <div className='col'>
                <div className='mb-3'>
                  <p className='fw-bold'>Kata sandi saat ini</p>
                  <input
                    type='password'
                    className='form-control transparant'
                    required
                  />
                </div>
              </div>
              <div className='col'>
                <div className='mb-3'>
                  <p className='fw-bold'>Kata sandi baru</p>
                  <input
                    type='password'
                    className='form-control transparant'
                    required
                  />
                </div>
              </div>
              <div className='col'>
                <div className='mb-3'>
                  <p className='fw-bold'>Konfirmasi kata sandi baru</p>
                  <input
                    type='password'
                    className='form-control transparant'
                    required
                  />
                </div>
              </div>
            </div>
            <Gap height={10} />
            <div className='d-flex'>
              <div
                className='btn btn-sm btn-primary'
                style={{ width: '180px' }}
              >
                Perbaharui kata sandi
              </div>
              <Gap width={12} />
              <div
                className='btn btn-sm btn-secondary'
                style={{ width: '100px' }}
              >
                Cancel
              </div>
            </div>
          </div>
        </div> */}
        <div className="card shadow-sm mb-5 mb-xl-10">
          <div className="card-header border-0">
            <div className="card-title m-0">
              <h3 className="m-0">Detail Login</h3>
            </div>
          </div>

          <div id="kt_account_signin_method" className="collapse show">
            <div className="card-body border-top p-9">
              <div className="d-flex flex-wrap align-items-center">
                <div
                  id="kt_signin_email"
                  className={" " + (showEmailForm && "d-none")}
                >
                  <div className="fs-6 fw-bold mb-1">Email Address</div>
                  <div className="fw-bold text-gray-600">kale@gmail.com</div>
                </div>

                <div
                  id="kt_signin_email_edit"
                  className={"flex-row-fluid " + (!showEmailForm && "d-none")}
                >
                  <form
                    onSubmit={formik1.handleSubmit}
                    id="kt_signin_change_email"
                    className="form"
                    noValidate
                  >
                    <div className="row mb-6">
                      <div className="col-lg-6 mb-4 mb-lg-0">
                        <div className="fv-row mb-0">
                          <label
                            htmlFor="emailaddress"
                            className="form-label fs-6 fw-bold mb-3"
                          >
                            Enter New Email Address
                          </label>
                          <input
                            type="email"
                            className="form-control form-control-lg form-control-solid"
                            id="emailaddress"
                            placeholder="Email Address"
                            {...formik1.getFieldProps("newEmail")}
                          />
                          {formik1.touched.newEmail &&
                            formik1.errors.newEmail && (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">
                                  {formik1.errors.newEmail}
                                </div>
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="fv-row mb-0">
                          <label
                            htmlFor="confirmemailpassword"
                            className="form-label fs-6 fw-bold mb-3"
                          >
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            className="form-control form-control-lg form-control-solid"
                            id="confirmemailpassword"
                            {...formik1.getFieldProps("confirmPassword")}
                          />
                          {formik1.touched.confirmPassword &&
                            formik1.errors.confirmPassword && (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">
                                  {formik1.errors.confirmPassword}
                                </div>
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                    <div className="d-flex">
                      <button
                        id="kt_signin_submit"
                        type="submit"
                        className="btn btn-primary  me-2 px-6"
                      >
                        {!loading1 && "Update Email"}
                        {loading1 && (
                          <span
                            className="indicator-progress"
                            style={{ display: "block" }}
                          >
                            Please wait...{" "}
                            <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                          </span>
                        )}
                      </button>
                      <button
                        id="kt_signin_cancel"
                        type="button"
                        onClick={() => {
                          setShowEmailForm(false);
                        }}
                        className="btn btn-color-gray-500 btn-active-light-primary px-6"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>

                <div
                  id="kt_signin_email_button"
                  className={"ms-auto " + (showEmailForm && "d-none")}
                >
                  <button
                    onClick={() => {
                      setShowEmailForm(true);
                    }}
                    className="btn btn-light-primary btn-sm"
                  >
                    Ganti Email
                  </button>
                </div>
              </div>

              <div className="separator separator-dashed my-6"></div>

              <div className="d-flex flex-wrap align-items-center mb-10">
                <div
                  id="kt_signin_password"
                  className={" " + (showPasswordForm && "d-none")}
                >
                  <div className="fs-6 fw-bold mb-1">Password</div>
                  <div className="fw-bold text-gray-600">************</div>
                </div>

                <div
                  id="kt_signin_password_edit"
                  className={
                    "flex-row-fluid " + (!showPasswordForm && "d-none")
                  }
                >
                  <form
                    onSubmit={formik2.handleSubmit}
                    id="kt_signin_change_password"
                    className="form"
                    noValidate
                  >
                    <div className="row mb-1">
                      <div className="col-lg-4">
                        <div className="fv-row mb-0">
                          <label
                            htmlFor="currentpassword"
                            className="form-label fs-6 fw-bold mb-3"
                          >
                            Current Password
                          </label>
                          <input
                            type="password"
                            className="form-control form-control-lg form-control-solid "
                            id="currentpassword"
                            {...formik2.getFieldProps("currentPassword")}
                          />
                          {formik2.touched.currentPassword &&
                            formik2.errors.currentPassword && (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">
                                  {formik2.errors.currentPassword}
                                </div>
                              </div>
                            )}
                        </div>
                      </div>

                      <div className="col-lg-4">
                        <div className="fv-row mb-0">
                          <label
                            htmlFor="newpassword"
                            className="form-label fs-6 fw-bold mb-3"
                          >
                            New Password
                          </label>
                          <input
                            type="password"
                            className="form-control form-control-lg form-control-solid "
                            id="newpassword"
                            {...formik2.getFieldProps("newPassword")}
                          />
                          {formik2.touched.newPassword &&
                            formik2.errors.newPassword && (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">
                                  {formik2.errors.newPassword}
                                </div>
                              </div>
                            )}
                        </div>
                      </div>

                      <div className="col-lg-4">
                        <div className="fv-row mb-0">
                          <label
                            htmlFor="confirmpassword"
                            className="form-label fs-6 fw-bold mb-3"
                          >
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            className="form-control form-control-lg form-control-solid "
                            id="confirmpassword"
                            {...formik2.getFieldProps("passwordConfirmation")}
                          />
                          {formik2.touched.passwordConfirmation &&
                            formik2.errors.passwordConfirmation && (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">
                                  {formik2.errors.passwordConfirmation}
                                </div>
                              </div>
                            )}
                        </div>
                      </div>
                    </div>

                    <div className="form-text mb-5">
                      Password must be at least 8 character and contain symbols
                    </div>

                    <div className="d-flex">
                      <button
                        id="kt_password_submit"
                        type="submit"
                        className="btn btn-primary me-2 px-6"
                      >
                        {!loading2 && "Update Password"}
                        {loading2 && (
                          <span
                            className="indicator-progress"
                            style={{ display: "block" }}
                          >
                            Please wait...{" "}
                            <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                          </span>
                        )}
                      </button>
                      <button
                        onClick={() => {
                          setPasswordForm(false);
                        }}
                        id="kt_password_cancel"
                        type="button"
                        className="btn btn-color-gray-500 btn-active-light-primary px-6"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>

                <div
                  id="kt_signin_password_button"
                  className={"ms-auto " + (showPasswordForm && "d-none")}
                >
                  <button
                    onClick={() => {
                      setPasswordForm(true);
                    }}
                    className="btn btn-light-primary btn-sm"
                  >
                    Ganti Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ModalEditProfil
          show={showModal}
          hideModal={() => setShowModal(false)}
        />
      </Content>
    </>
  );
};

export default ProfilSaya;
