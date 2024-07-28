import React from "react";
import * as Yup from "yup";
import InputCustom from "../../../_metronic/layout/components/content/InputCustom";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { Content } from "../../../_metronic/layout/components/content";
import HeadPage from "../../modules/widgets/components/HeadPage";
import Gap from "../../../_metronic/layout/components/content/Gap";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";

const Breadcrumbs: Array<PageLink> = [
  {
    title: "Planetarium Goes to School",
    path: "/planetarium",
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

  const optionRegion = [
    { name: "Jakarta Pusat", value: "jakarta_pusat" },
    { name: "Jakarta Timur", value: "jakarta_timur" },
    { name: "Jakarta Selatan", value: "jakarta_selatan" },
    { name: "Jakarta Barat", value: "jakarta_barat" },
    { name: "Jakarta Utara", value: "jakarta_utara" },
    { name: "Bogor", value: "bogor" },
    { name: "Depok", value: "depok" },
    { name: "Tangerang", value: "tangerang" },
    { name: "Bekasi", value: "bekasi" },
  ];

  return (
    <>
      <PageTitle
        icon="moon"
        breadcrumbs={Breadcrumbs}
        description="Form Planetarium Goes To School"
      >
        Form Planetarium Goes To School
      </PageTitle>
      <Content>
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
              <div className="row row-cols-1 row-cols-lg-2">
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
              <div className="row row-cols-1 row-cols-lg-2">
                <div className="col">
                  <div className="w-md-50">
                    <label htmlFor="daerah" className="fw-bold">
                      Daerah
                    </label>
                    <Gap height={10} />
                    <select className="form-select" name="daerah" id="daerah">
                      {optionRegion.map((region) => (
                        <option value={region.value}>{region.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col mt-4 mt-lg-0">
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
              <Gap height={15} />

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
                <label htmlFor="" className="fw-bold fs-3">
                  Unggah berkas
                </label>
                <p className="text-danger">
                  *) Ekstensi yang diperbolehkan pdf/png/jpg/jpeg, dengan ukuran
                  maks 1MB
                </p>
                <Gap height={10} />

                <div className="d-flex flex-column flex-lg-row">
                  <div className="me-lg-4">
                    <label className="fw-bold">Surat undangan resmi</label>
                    <Gap height={10} />
                    <input type="file" className="form-control" />
                    <p className="text-muted m-0">
                      *) Surat Undangan Resmi WAJIB ditandatangani Kepala
                      Sekolah
                    </p>
                  </div>
                  <div className="mt-4 mt-lg-0">
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
                <button type="submit" className="btn btn-primary btn-sm ms-5">
                  Pesan
                </button>
              </div>
            </form>
          </div>
        </div>
      </Content>
    </>
  );
};

export default FormPlanetarium;
