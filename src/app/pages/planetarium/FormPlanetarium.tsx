import React from "react";
import * as Yup from "yup";
import InputCustom from "../../../_metronic/layout/components/content/InputCustom";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { Content } from "../../../_metronic/layout/components/content";
import HeadPage from "../../modules/widgets/components/HeadPage";
import Gap from "../../../_metronic/layout/components/content/Gap";

const formPesanScheme = Yup.object().shape({
  namaSekolah: Yup.string().required("Nama sekolah harus diisi"),
  alamatSekolah: Yup.string().required("alamat sekolah harus diisi"),
  jumlahPeserta: Yup.string().required("Jumlah peserta harus diisi"),
  daerah: Yup.string().required("Daerah harus dipilih"),
  kodeBooking: Yup.string().required(
    "Kode booking harus diisi dengan menekan tombol buat kode"
  ),
  tanggalMulaiKunjungan: Yup.string().required(
    "Tanggal mulai kunjungan pentas harus diisi"
  ),
  tanggalSelesaiKunjungan: Yup.string().required(
    "Tanggal selesai kunjungan pentas harus diisi"
  ),
  keperluan: Yup.string().required("Keperluan harus dipilih"),
});

const initialValues = {
  namaSekolah: "",
  alamatSekolah: "",
  jumlahPeserta: "",
  daerah: "",
  tanggalMulaiKunjungan: "",
  tanggalSelesaiKunjungan: "",
  keperluan: "",
};

const FormPlanetarium = () => {
  const formik = useFormik({
    initialValues,
    validationSchema: formPesanScheme,
    onSubmit: async (values, { setStatus, setSubmitting }) => {},
  });

  const { state }: any = useLocation();

  const navigate = useNavigate();

  return (
    <Content>
      <HeadPage
        title="Form Planetarium"
        pages="Planetarium - Form"
        icon="moon"
      />
      <div className="card">
        <div className="p-8">
          <div>
            <p className="fw-bold">Tanggal Pemesanan</p>
            <input
              type="date"
              disabled
              className="p-2 rounded form-control form-control-solid"
              style={{ width: "200px" }}
              value={state.bookingDate}
            />
          </div>
          <Gap height={24} />
          <form onSubmit={formik.handleSubmit} noValidate>
            <div className="row cols-2">
              <div className="col">
                <InputCustom
                  formikIdName="namaSekolah"
                  label="Nama Sekolah"
                  touched={formik.touched.namaSekolah}
                  error={formik.errors.namaSekolah}
                  formikProps={formik.getFieldProps("namaSekolah")}
                  typed={"text"}
                />
              </div>
              <div className="col">
                <InputCustom
                  formikIdName="alamatSekolah"
                  label="Alamat Sekolah"
                  touched={formik.touched.alamatSekolah}
                  error={formik.errors.alamatSekolah}
                  formikProps={formik.getFieldProps("alamatSekolah")}
                  typed={"text"}
                />
              </div>
            </div>
            <div className="row row-cols-2">
              <div className="col">
                <InputCustom
                  formikIdName="daerah"
                  label="Daerah"
                  touched={formik.touched.daerah}
                  error={formik.errors.daerah}
                  formikProps={formik.getFieldProps("daerah")}
                  typed="number"
                />
              </div>
              <div className="col">
                <label htmlFor="kontakNarahubung" className="fw-bold">
                  Nomor Kontak Narahubung
                </label>
                <Gap height={10} />
                <input
                  className="form-control form-control-solid"
                  disabled
                  value={"0896785146914651"}
                />
              </div>
            </div>
            <div className="row cols-2">
              <div className="col">
                <InputCustom
                  formikIdName="jumlahPeserta"
                  label="Jumlah Peserta"
                  touched={formik.touched.jumlahPeserta}
                  error={formik.errors.jumlahPeserta}
                  formikProps={formik.getFieldProps("jumlahPeserta")}
                  typed="number"
                />
              </div>
              <div className="col">
                <div>
                  <p className="fw-bold m-0">Tanggal Kunjungan</p>
                  <Gap height={10} />
                  <div className="d-flex align-items-center">
                    <input
                      id="tanggalMulaiKunjungan"
                      name="tanggalMulaiKunjungan"
                      type="date"
                      value={formik.values.tanggalMulaiKunjungan}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control form-control-solid"
                      style={{ width: "200px" }}
                    />
                    <p className="m-0 mx-5">s/d</p>
                    <input
                      id="tanggalSelesaiKunjungan"
                      name="tanggalSelesaiKunjungan"
                      type="date"
                      value={formik.values.tanggalSelesaiKunjungan}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control form-control-solid"
                      style={{ width: "200px" }}
                    />
                  </div>
                </div>
                {(formik.errors.tanggalSelesaiKunjungan ||
                  formik.errors.tanggalMulaiKunjungan) && (
                  <div className="fv-plugins-message-container">
                    <span role="alert" className="text-danger">
                      {`${formik.errors.tanggalSelesaiKunjungan} ${formik.errors.tanggalMulaiKunjungan}`}
                    </span>
                  </div>
                )}
              </div>
            </div>
            {/* <div className="row">
              <div className="col">
                <div>
                  <p className="fw-bold">Keperluan</p>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type="radio"
                      name="keperluan"
                      id="peneropongan"
                      value={"peneropongan"}
                      checked={formik.values.keperluan === "peneropongan"}
                    />
                    <label className="form-check-label" htmlFor="peneropongan">
                      Peneropongan benda langit
                    </label>
                  </div>
                  <Gap height={12} />
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type="radio"
                      name="keperluan"
                      id="pengenalan"
                      value={"pengenalan"}
                      checked={formik.values.keperluan === "pengenalan"}
                    />
                    <label className="form-check-label" htmlFor="pengenalan">
                      Pengenalan benda langit
                    </label>
                  </div>
                </div>
                {formik.errors.keperluan && (
                  <div className="fv-plugins-message-container">
                    <span role="alert" className="text-danger">
                      {`${formik.errors.keperluan}`}
                    </span>
                  </div>
                )}
              </div>
            </div> */}
            <Gap height={24} />
            <div className="row">
              <label htmlFor="" className="fw-bold">
                Unggah berkas
              </label>
              <p className="text-danger">
                *) Ekstensi yang diperbolehkan pdf/png/jpg/jpeg, dengan ukuran
                maks 1MB
              </p>
              <div className="d-flex">
                <div className="me-4">
                  <label className="fw-bold">Surat undangan resmi</label>
                  <Gap height={10} />
                  <input type="file" className="form-control" />
                  <p className="text-muted m-0">
                    *) Surat Undangan Resmi WAJIB ditandatangani Kepala Sekolah
                  </p>
                </div>
                <div>
                  <label className="fw-bold">
                    Lembar Pernyataan Persetujuan Peserta
                  </label>
                  <Gap height={10} />
                  <input type="file" className="form-control" />
                  <p className="text-muted m-0">
                    *) Formulir dapat diunduh di bit.ly/pernyataanPGS
                  </p>
                </div>
              </div>
            </div>
            <Gap height={30} />

            <div className="d-flex justify-content-end">
              <div
                className="btn btn-light btn-sm"
                onClick={() => navigate(-1)}
              >
                Kembali
              </div>
              <button
                type="submit"
                className="btn btn-light-primary btn-sm ms-5"
              >
                Pesan
              </button>
            </div>
          </form>
        </div>
      </div>
    </Content>
  );
};

export default FormPlanetarium;
