import React, { useEffect, useState } from "react";
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
import usePengguna from "../../modules/hooks/master-data/pengguna";
import { useAuth } from "../../modules/auth";
import { Spinner } from "react-bootstrap";
import { API_URL, ENDPOINTS } from "../../constants/API";
import ModalWrapper from "../../../_metronic/layout/components/content/ModalWrapper";

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

export const ProfilSaya = () => {
  const {
    getSinglePengguna,
    singlePengguna,
    loading,
    profileChangePassword,
    sendEmailVerif,
    reqChangeEmail,
  } = usePengguna();
  const { currentUser, auth } = useAuth();
  const [showModal, setShowModal] = useState<boolean>(false);
  const updateEmailVal = {
    newEmail: singlePengguna?.email,
    confirmPassword: "",
  };
  const [emailUpdateData, setEmailUpdateData] = useState(updateEmailVal);
  const [passwordUpdateData, setPasswordUpdateData] =
    useState<IUpdatePassword>(updatePassword);

  const [showEmailForm, setShowEmailForm] = useState<boolean>(false);
  const [showPasswordForm, setPasswordForm] = useState<boolean>(false);
  const [modalPreviewImage, setModalPreviewImage] = useState<boolean>(false);

  const formik1 = useFormik<IUpdateEmail>({
    initialValues: {
      ...emailUpdateData,
    },
    validationSchema: emailFormValidationSchema,
    onSubmit: (values) => {
      const userId = currentUser ? currentUser.id : "";
      reqChangeEmail(userId, values.newEmail, values.confirmPassword);
    },
  });

  const formik2 = useFormik<IUpdatePassword>({
    initialValues: {
      ...passwordUpdateData,
    },
    validationSchema: passwordFormValidationSchema,
    onSubmit: (values) => {
      const payload = { ...values, id: currentUser?.id };
      profileChangePassword(payload);
      setPasswordUpdateData(values);
      setPasswordForm(false);
    },
  });

  const setRefresh = () => {};

  useEffect(() => {
    getSinglePengguna(currentUser?.id as string);
  }, [currentUser]);

  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(
          `${API_URL}/${ENDPOINTS.PENGGUNA.MANAGEMENT_PENGGUNA}/${singlePengguna?.id}/Attachment/TandaPengenal`,
          {
            headers: {
              Authorization: `Bearer ${auth?.api_token}`,
            },
          }
        );

        if (response.ok) {
          const blob = await response.blob();
          const objectUrl: any = URL.createObjectURL(blob);
          setImageSrc(objectUrl);
        } else {
          console.error("Failed to fetch image:", response.status);
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();

    // Clean up the object URL when the component unmounts
    return () => {
      if (imageSrc) URL.revokeObjectURL(imageSrc);
    };
  }, [auth?.api_token, singlePengguna]);

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
        {currentUser?.isEmailConfirm === false && (
          <div className="alert alert-dismissible bg-light-warning border border-warning p-5">
            <div className="d-flex flex-column flex-md-row justify-content-between ">
              <div className="d-flex align-items-center">
                <KTIcon
                  iconName="information-2"
                  className="fs-2x text-warning justify-content-center me-4"
                />
                <div>
                  <h5 className="mb-1">Email anda belum terverifikasi!</h5>
                  <span className="text-warning">
                    Silahkan melakukan verifikasi email untuk dapat melakukan
                    pemesanan tempat
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-sm btn-warning m-2"
                onClick={() => sendEmailVerif(singlePengguna?.id)}
              >
                Kirim email verifikasi
              </button>
            </div>
          </div>
        )}
        <div className="card">
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
              <label className="col-lg-3 fw-bold text-gray-600">
                Nama Lengkap
              </label>

              <div className="col-lg-9 fv-row">
                <span className="fs-6">{singlePengguna?.fullName}</span>
              </div>
            </div>
            <div className="row mb-7">
              <label className="col-lg-3 fw-bold text-gray-600">
                Nomor Handphone
              </label>
              <div className="col-lg-9 fv-row">
                <span className="fs-6">{singlePengguna?.phoneNumber}</span>
              </div>
            </div>
            <div className="row mb-7">
              <label className="col-lg-3 fw-bold text-gray-600">
                Foto Identitas
              </label>
              <div className="col-lg-9 fv-row">
                <img
                  onClick={() => {
                    setModalPreviewImage(true);
                  }}
                  src={imageSrc ? imageSrc : ""}
                  style={{
                    width: "300px",
                    height: "200px",
                    borderRadius: "10px",
                  }}
                />
              </div>
              <ModalWrapper
                title="Foto Identitas"
                show={modalPreviewImage}
                handleClose={() => setModalPreviewImage(false)}
                attribute={{ centered: true }}
                className="modal-lg"
                footerCustom={<></>}
              >
                <img
                  src={imageSrc ? imageSrc : ""}
                  style={{
                    width: "100%",
                    borderRadius: "10px",
                  }}
                />
              </ModalWrapper>
            </div>
            <div className="row mb-7">
              <label className="col-lg-3 fw-bold text-gray-600">Email</label>

              <div className="col-lg-9 d-flex align-items-center">
                <span className="fs-6">{singlePengguna?.email}</span>
                <Gap width={5} />
                {currentUser?.isEmailConfirm ? (
                  <span className="badge badge-success">Verified</span>
                ) : (
                  <span className="badge badge-danger">Not Verified</span>
                )}
              </div>
            </div>
          </div>
        </div>
        <Gap height={15} />

        <div className="card mb-5 mb-xl-10">
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
                  <div className="fw-bold text-gray-600">
                    {singlePengguna?.email}
                  </div>
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
                            Masukkan Email Baru
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
                            Konfirm Password
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
                        className="btn btn-sm btn-primary  me-2 px-6"
                      >
                        {!loading && "Ganti Email"}
                        {loading && (
                          <span
                            className="indicator-progress"
                            style={{ display: "block" }}
                          >
                            Loading...{" "}
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
                        className="btn btn-sm btn-color-gray-500 btn-light px-6"
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
                            Password Sekarang
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
                            Password Baru
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
                            Konfirmasi Password Baru
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
                        className="btn btn-sm btn-primary me-2 px-6"
                      >
                        {!loading && "Ganti Password"}
                        {loading && (
                          <span
                            className="indicator-progress"
                            style={{ display: "block" }}
                          >
                            Loading...{" "}
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
                        className="btn btn-sm btn-color-gray-500 btn-light px-6"
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
          singlePengguna={singlePengguna}
          onChangeProfile={setRefresh}
          hideModal={() => setShowModal(false)}
        />
      </Content>
    </>
  );
};
