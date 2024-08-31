import React, { FC } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Content } from "../../../_metronic/layout/components/content";
import { useFormik } from "formik";
import clsx from "clsx";
import * as Yup from "yup";
import Gap from "../../../_metronic/layout/components/content/Gap";
import globalVar from "../../helper/globalVar";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";

const Breadcrumbs: Array<PageLink> = [
  {
    title: "Pesan Tempat",
    path: "/pesan-tempat",
    isSeparator: false,
    isActive: false,
  },
  {
    title: "",
    path: "",
    isSeparator: true,
    isActive: false,
  },
];

const formPesanScheme = Yup.object().shape({
  namaSanggar: Yup.string().required("Nama sanggar harus diisi"),
  judulPentas: Yup.string().required("Judul pentas harus diisi"),
  kodeBooking: Yup.string().required(
    "Kode booking harus diisi dengan menekan tombol buat kode"
  ),
  alamatSanggar: Yup.string().required("Alamat sanggar harus diisi"),
  tanggalMulaiPentas: Yup.string().required("Tanggal mulai pentas harus diisi"),
  tanggalSelesaiPentas: Yup.string().required(
    "Tanggal selesai pentas harus diisi"
  ),
});

const initialValues = {
  namaSanggar: "",
  judulPentas: "",
  kodeBooking: "",
  tarif: "",
  alamatSanggar: "",
  tanggalMulaiPentas: "",
  tanggalSelesaiPentas: "",
};

export const FormPesanTempat: FC = () => {
  const formik = useFormik({
    initialValues,
    validationSchema: formPesanScheme,
    onSubmit: async (values, { setStatus, setSubmitting }) => {},
  });

  const navigate = useNavigate();
  const params = useParams();
  // const { state }: any = useLocation();
  let title;
  switch (params.jenis_tempat) {
    case "teater_jakarta":
      title = "Teater Jakarta";
      break;
    case "ruang_latihan":
      title = "Ruang Latihan";
      break;
    case "gladi":
      title = "Gladi Bersih";
      break;
    case "shooting":
      title = "Shooting/ Photo profesional";
      break;
    case "plaza_jakarta":
      title = "Plaza Jakarta";
      break;
    case "teater_kecil":
      title = "Teater Kecil";
      break;

    default:
      break;
  }

  return (
    <Content>
      <PageTitle icon="geolocation" breadcrumbs={Breadcrumbs}>
        {`Form ${title}`}
      </PageTitle>
      <div className="card p-8">
        <div>
          <p className="fw-bold">Tanggal Pemesanan</p>
          <input
            type="date"
            disabled
            value={globalVar.formatInputDate(new Date())}
            className="p-2 rounded form-control form-control-solid"
            style={{ width: "200px" }}
          />
        </div>
        <Gap height={30} />
        <form onSubmit={formik.handleSubmit} noValidate>
          {/* nama sanggar dan alamat sanggar */}
          <div className="row row-cols-1 row-cols-lg-2">
            <div className="col">
              <div className="fv-row mb-5">
                <label htmlFor="namaSanggar" className="fw-bold">
                  Nama sanggar
                </label>
                <Gap height={10} />
                <input
                  id="namaSanggar"
                  {...formik.getFieldProps("namaSanggar")}
                  className={clsx(
                    "form-control form-control-solid",
                    {
                      "is-invalid":
                        formik.touched.namaSanggar && formik.errors.namaSanggar,
                    },
                    {
                      "is-valid":
                        formik.touched.namaSanggar &&
                        !formik.errors.namaSanggar,
                    }
                  )}
                  type="text"
                  name="namaSanggar"
                  autoComplete="off"
                />
                {formik.touched.namaSanggar && formik.errors.namaSanggar && (
                  <div className="fv-plugins-message-container">
                    <span role="alert" className="text-danger">
                      {formik.errors.namaSanggar}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="col">
              <label htmlFor="alamatSanggar" className="fw-bold">
                Alamat sanggar
              </label>
              <Gap height={10} />
              <input
                id="alamatSanggar"
                {...formik.getFieldProps("alamatSanggar")}
                className={clsx(
                  "form-control form-control-solid",
                  {
                    "is-invalid":
                      formik.touched.alamatSanggar &&
                      formik.errors.alamatSanggar,
                  },
                  {
                    "is-valid":
                      formik.touched.alamatSanggar &&
                      !formik.errors.alamatSanggar,
                  }
                )}
                type="text"
                name="alamatSanggar"
                autoComplete="off"
              />
              {formik.touched.alamatSanggar && formik.errors.alamatSanggar && (
                <div className="fv-plugins-message-container">
                  <span role="alert" className="text-danger">
                    {formik.errors.alamatSanggar}
                  </span>
                </div>
              )}
            </div>
          </div>
          <Gap height={10} />
          {/* judul pentas dan tanggal mulai pentas */}
          <div className="row row-cols-1 row-cols-lg-2">
            <div className="col">
              <div className="fv-row mb-5">
                <label htmlFor="judulPentas" className="fw-bold">
                  Judul pentas
                </label>
                <Gap height={10} />
                <input
                  id="judulPentas"
                  {...formik.getFieldProps("judulPentas")}
                  className={clsx(
                    "form-control form-control-solid",
                    {
                      "is-invalid":
                        formik.touched.judulPentas && formik.errors.judulPentas,
                    },
                    {
                      "is-valid":
                        formik.touched.judulPentas &&
                        !formik.errors.judulPentas,
                    }
                  )}
                  type="text"
                  name="judulPentas"
                  autoComplete="off"
                />
                {formik.touched.judulPentas && formik.errors.judulPentas && (
                  <div className="fv-plugins-message-container">
                    <span role="alert" className="text-danger">
                      {formik.errors.judulPentas}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="col">
              <div className="fv-row mb-5">
                <div>
                  <label htmlFor="tanggalMulaiPentas" className="fw-bold">
                    Tanggal Sewa
                  </label>
                  <Gap height={10} />
                  {/* mulai pentas dan selesai pentas */}
                  <div className="d-flex align-items-center">
                    <div style={{ width: "100%" }}>
                      <input
                        id="tanggalMulaiPentas"
                        {...formik.getFieldProps("tanggalMulaiPentas")}
                        className={clsx(
                          "form-control form-control-solid form-control-solid",
                          {
                            "is-invalid":
                              formik.touched.tanggalMulaiPentas &&
                              formik.errors.tanggalMulaiPentas,
                          },
                          {
                            "is-valid":
                              formik.touched.tanggalMulaiPentas &&
                              !formik.errors.tanggalMulaiPentas,
                          }
                        )}
                        type="date"
                        min={globalVar.getThreeMonthsFromToday()}
                        name="tanggalMulaiPentas"
                        autoComplete="off"
                      />
                      {formik.touched.tanggalMulaiPentas &&
                        formik.errors.tanggalMulaiPentas && (
                          <div className="fv-plugins-message-container">
                            <span role="alert" className="text-danger">
                              {formik.errors.tanggalMulaiPentas}
                            </span>
                          </div>
                        )}
                    </div>
                    <p className="m-0 mx-5">s/d</p>
                    <div style={{ width: "100%" }}>
                      <input
                        id="tanggalSelesaiPentas"
                        {...formik.getFieldProps("tanggalSelesaiPentas")}
                        className={clsx(
                          "form-control form-control-solid form-control-solid",
                          {
                            "is-invalid":
                              formik.touched.tanggalSelesaiPentas &&
                              formik.errors.tanggalSelesaiPentas,
                          },
                          {
                            "is-valid":
                              formik.touched.tanggalSelesaiPentas &&
                              !formik.errors.tanggalSelesaiPentas,
                          }
                        )}
                        min={globalVar.getThreeMonthsFromToday()}
                        type="date"
                        name="tanggalSelesaiPentas"
                        autoComplete="off"
                      />
                      {formik.touched.tanggalSelesaiPentas &&
                        formik.errors.tanggalSelesaiPentas && (
                          <div className="fv-plugins-message-container">
                            <span role="alert" className="text-danger">
                              {formik.errors.tanggalSelesaiPentas}
                            </span>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Gap height={10} />
          {/* kode booking dan generate kode */}
          <div className="row row-cols-1 row-cols-lg-2">
            <div className="col">
              <div className="fv-row mb-5">
                <label htmlFor="kodeBooking" className="fw-bold">
                  Kode booking
                </label>
                <Gap height={10} />
                <div className="input-group mb-3">
                  <input
                    readOnly
                    id="kodeBooking"
                    {...formik.getFieldProps("kodeBooking")}
                    className={clsx(
                      "form-control form-control-solid",
                      {
                        "is-invalid":
                          formik.touched.kodeBooking &&
                          formik.errors.kodeBooking,
                      },
                      {
                        "is-valid":
                          formik.touched.kodeBooking &&
                          !formik.errors.kodeBooking,
                      }
                    )}
                    type="text"
                    name="kodeBooking"
                    autoComplete="off"
                    placeholder="Recipient's username"
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                  />
                  <button
                    className="btn btn-light-primary"
                    type="button"
                    id="button-addon2"
                  >
                    Button
                  </button>
                </div>
                {formik.touched.kodeBooking && formik.errors.kodeBooking && (
                  <div className="fv-plugins-message-container">
                    <span role="alert" className="text-danger">
                      {formik.errors.kodeBooking}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="col">
              <div className="fv-row">
                <div>
                  <div className="row row-cols-1 row-cols-lg-2">
                    <div className="col">
                      <label
                        htmlFor="start_main_event"
                        className="fw-bold mb-3"
                      >
                        Tanggal mulai main event
                      </label>
                      <div style={{ width: "100%" }}>
                        <input
                          id="tanggalSelesaiPentas"
                          {...formik.getFieldProps("tanggalSelesaiPentas")}
                          className={clsx(
                            "form-control form-control-solid form-control-solid",
                            {
                              "is-invalid":
                                formik.touched.tanggalSelesaiPentas &&
                                formik.errors.tanggalSelesaiPentas,
                            },
                            {
                              "is-valid":
                                formik.touched.tanggalSelesaiPentas &&
                                !formik.errors.tanggalSelesaiPentas,
                            }
                          )}
                          min={globalVar.getThreeMonthsFromToday()}
                          type="date"
                          name="tanggalSelesaiPentas"
                          autoComplete="off"
                        />
                        {formik.touched.tanggalSelesaiPentas &&
                          formik.errors.tanggalSelesaiPentas && (
                            <div className="fv-plugins-message-container">
                              <span role="alert" className="text-danger">
                                {formik.errors.tanggalSelesaiPentas}
                              </span>
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="col mt-4 mt-md-0">
                      <label
                        htmlFor="start_main_event"
                        className="fw-bold mb-3"
                      >
                        Jumlah hari main event
                      </label>
                      <div style={{ width: "100%" }}>
                        <input
                          id="tanggalSelesaiPentas"
                          {...formik.getFieldProps("tanggalSelesaiPentas")}
                          className={clsx(
                            "form-control form-control-solid form-control-solid",
                            {
                              "is-invalid":
                                formik.touched.tanggalSelesaiPentas &&
                                formik.errors.tanggalSelesaiPentas,
                            },
                            {
                              "is-valid":
                                formik.touched.tanggalSelesaiPentas &&
                                !formik.errors.tanggalSelesaiPentas,
                            }
                          )}
                          min={globalVar.getThreeMonthsFromToday()}
                          type="number"
                          name="tanggalSelesaiPentas"
                          autoComplete="off"
                        />
                        {formik.touched.tanggalSelesaiPentas &&
                          formik.errors.tanggalSelesaiPentas && (
                            <div className="fv-plugins-message-container">
                              <span role="alert" className="text-danger">
                                {formik.errors.tanggalSelesaiPentas}
                              </span>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Gap height={10} />
          <div className="row row-cols-1 row-cols-lg-2">
            <div className="col"></div>
            <div className="col">
              <label htmlFor="tarif" className="fw-bold">
                Kalkulasi Tarif
              </label>
              <Gap height={10} />
              <input
                readOnly
                disabled
                id="tarif"
                {...formik.getFieldProps("tarif")}
                className={clsx(
                  "form-control form-control-solid",
                  {
                    "is-invalid": formik.touched.tarif && formik.errors.tarif,
                  },
                  {
                    "is-valid": formik.touched.tarif && !formik.errors.tarif,
                  }
                )}
                type="text"
                name="tarif"
                autoComplete="off"
              />
            </div>
          </div>
          <Gap height={10} />
          {/* Upload berkas */}
          <div className="row">
            <div className="col">
              <p className="fw-bold mb-1 fs-3">Unggah berkas</p>
              <span className="text-danger">
                *) Ekstensi yang diperbolehkan png/jpg/jpeg, dengan ukuran maks
                1MB
              </span>
              <Gap height={20} />
              <div className="d-flex flex-wrap">
                <div className="mb-5 me-5">
                  <p className="fw-bold mb-1">Surat permohonan</p>
                  <input type="file" className="form-control bg-transparant" />
                </div>
                <div className="mb-5 me-5">
                  <p className="fw-bold mb-1">Tanda pengenal</p>
                  <input type="file" className="form-control bg-transparant" />
                </div>
                <div className="mb-5">
                  <p className="fw-bold mb-1">Proposal</p>
                  <input type="file" className="form-control bg-transparant" />
                </div>
              </div>
            </div>
          </div>
          {/* Button */}
          <Gap height={30} />

          <div className="d-flex justify-content-end">
            <div className="btn btn-light btn-sm" onClick={() => navigate(-1)}>
              Kembali
            </div>
            <button type="submit" className="btn btn-primary ms-5 btn-sm">
              Pesan
            </button>
          </div>
        </form>
      </div>
    </Content>
  );
};
