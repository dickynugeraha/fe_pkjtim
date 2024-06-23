import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { Content } from "../../../_metronic/layout/components/content";
import HeadPage from "../../modules/widgets/components/HeadPage";
import InputCustom from "../../../_metronic/layout/components/content/InputCustom";
import Gap from "../../../_metronic/layout/components/content/Gap";
import clsx from "clsx";

const formPesanScheme = Yup.object().shape({
  namaSekolah: Yup.string().required("Nama sekolah harus diisi"),
  alamatSekolah: Yup.string().required("alamat sekolah harus diisi"),
  jumlahPeserta: Yup.string().required("Jumlah peserta harus diisi"),
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

  const { state } = useLocation();
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
            <input type="date" disabled className="p-2 rounded" />
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
                />
              </div>
              <div className="col">
                <InputCustom
                  formikIdName="alamatSekolah"
                  label="Alamat Sekolah"
                  touched={formik.touched.alamatSekolah}
                  error={formik.errors.alamatSekolah}
                  formikProps={formik.getFieldProps("alamatSekolah")}
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
                  <p className="fw-bold">Tanggal Kunjungan</p>
                  <div className="d-flex align-items-center">
                    <input
                      id="tanggalMulaiKunjungan"
                      name="tanggalMulaiKunjungan"
                      type="date"
                      value={formik.values.tanggalMulaiKunjungan}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control"
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
                      className="form-control"
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
            <div className="row">
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
            </div>
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
      </div>
    </Content>
  );
};

export default FormPlanetarium;
