import React, { FC } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Content } from "../../../_metronic/layout/components/content";
import HeadPage from "../../modules/widgets/components/HeadPage";
import { useFormik } from "formik";
import clsx from "clsx";
import * as Yup from "yup";
import Gap from "../../../_metronic/layout/components/content/Gap";
import globalVar from "../../helper/globalVar";

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
  alamatSanggar: "",
  tanggalMulaiPentas: "",
  tanggalSelesaiPentas: "",
};

const FormPesanTempat: FC = () => {
  const formik = useFormik({
    initialValues,
    validationSchema: formPesanScheme,
    onSubmit: async (values, { setStatus, setSubmitting }) => {},
  });

  const navigate = useNavigate();
  const params = useParams();
  const { state }: any = useLocation();
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

  console.log(params.jenis_tempat);
  console.log(state.hargaTempat);

  return (
    <Content>
      <HeadPage
        icon="geolocation"
        title="Form Pesan Tempat"
        pages="Pesan Tempat - Form Pesan Tempat"
      />
      <div className="card p-8">
        <div className="d-flex">
          <div>
            <p className="fw-bold">Tarif {title} </p>
            <p>{state.hargaTempat} / hari</p>
          </div>
          <div className="ms-5">
            <p className="fw-bold">Tanggal Pemesanan</p>
            <input
              type="date"
              disabled
              className="p-2 rounded form-control form-control-solid"
            />
          </div>
        </div>
        <Gap height={30} />
        <form onSubmit={formik.handleSubmit} noValidate>
          {/* nama sanggar dan alamat sanggar */}
          <div className="row cols-2">
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
                    "form-control bg-transparent",
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
                  "form-control bg-transparent",
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
          <div className="row cols-2">
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
                    "form-control bg-transparent",
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
                <label htmlFor="tanggalMulaiPentas" className="fw-bold">
                  Tanggal mulai pentas
                </label>
                <Gap height={10} />
                {/* mulai pentas dan selesai pentas */}
                <div className="row cols-1 cols-md-2">
                  <div className="col">
                    <input
                      id="tanggalMulaiPentas"
                      {...formik.getFieldProps("tanggalMulaiPentas")}
                      className={clsx(
                        "form-control bg-transparent form-control-solid",
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
                  <div className="col">
                    <div className="d-md-flex">
                      <p className="mt-3">s/d</p>
                      <Gap width={25} />
                      <div style={{ width: "100%" }}>
                        <input
                          id="tanggalSelesaiPentas"
                          {...formik.getFieldProps("tanggalSelesaiPentas")}
                          className={clsx(
                            "form-control bg-transparent form-control-solid",
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
          </div>
          <Gap height={10} />
          {/* kode booking dan generate kode */}
          <div className="row cols-2">
            <div className="col">
              <div className="fv-row mb-5">
                <label htmlFor="judulPentas" className="fw-bold">
                  Kode booking
                </label>
                <Gap height={10} />
                <input
                  readOnly
                  id="kodeBooking"
                  {...formik.getFieldProps("kodeBooking")}
                  className={clsx(
                    "form-control bg-transparent",
                    {
                      "is-invalid":
                        formik.touched.kodeBooking && formik.errors.kodeBooking,
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
                />
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
              <div className="fv-row mb-5">
                <label htmlFor="judulPentas" className="fw-bold"></label>
                <Gap height={10} />
                <div className="btn btn-primary" style={{ width: "160px" }}>
                  Buat kode
                </div>
              </div>
            </div>
          </div>
          <Gap height={10} />
          {/* Upload berkas */}
          <div className="row">
            <div className="col">
              <p className="fw-bold mb-1">Unggah berkas</p>
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
            <div className="btn btn-light" onClick={() => navigate(-1)}>
              Kembali
            </div>
            <button type="submit" className="btn btn-primary ms-5">
              Pesan
            </button>
          </div>
        </form>
      </div>
    </Content>
  );
};

export default FormPesanTempat;
