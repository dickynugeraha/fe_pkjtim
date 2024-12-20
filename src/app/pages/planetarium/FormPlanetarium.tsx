import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import InputCustom from "../../../_metronic/layout/components/content/InputCustom";
import { useFormik } from "formik";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Content } from "../../../_metronic/layout/components/content";
import HeadPage from "../../modules/widgets/components/HeadPage";
import Gap from "../../../_metronic/layout/components/content/Gap";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";
import globalVar from "../../helper/globalVar";
import usePlanetarium from "../../modules/hooks/planetarium";
import Remining from "../../../_metronic/layout/components/content/Remining";
import Swal from "sweetalert2";
import clsx from "clsx";

const Breadcrumbs: Array<PageLink> = [
  {
    title: "Astronomy Goes to School",
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
  alamatSekolah: Yup.string().required("Alamat sekolah harus diisi"),
  jumlahPeserta: Yup.number()
    .max(60, "Jumlah peserta maksimal 60 orang")
    .required("Jumlah peserta harus diisi"),
  daerah: Yup.string().required("Daerah harus dipilih"),
  fileSuratUndangan: Yup.mixed()
    .required("Surat undangan harus diupload")
    .test("fileFormat", "File wajib ber-format PDF", (value: any) => {
      if (value) {
        const supportedFormats = ["pdf"];
        return supportedFormats.includes(value.name.split(".").pop());
      }
      return true;
    })
    .test("fileSize", "Ukuran file maksimal 2mb", (value: any) => {
      if (value) {
        return value.size <= 2145728;
      }
      return true;
    }),
  fileLembarPernyataan: Yup.mixed()
    .required("Lembar pernyataan harus diupload")
    .test("fileFormat", "File wajib ber-format PDF", (value: any) => {
      if (value) {
        const supportedFormats = ["pdf"];
        return supportedFormats.includes(value.name.split(".").pop());
      }
      return true;
    })
    .test("fileSize", "Ukuran file maksimal 2mb", (value: any) => {
      if (value) {
        return value.size <= 2145728;
      }
      return true;
    }),
});

const initialValues = {
  namaSekolah: "",
  alamatSekolah: "",
  jumlahPeserta: "",
  daerah: "",
  fileSuratUndangan: "",
  fileLembarPernyataan: "",
};

const now: any = new Date();

export const FormPlanetarium = () => {
  const {
    requestReservationPlanetarium,
    getSingleReservationPlanetarium,
    singleReservationPlanetarium,
  } = usePlanetarium();
  const [fileLembarPernyataan, setFileLembarPernyataan] = useState(null);
  const [fileSuratUndangan, setFileSuratUndangan] = useState(null);

  const params = useParams();
  const formik = useFormik({
    initialValues,
    validationSchema: formPesanScheme,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      if (Number(values.jumlahPeserta) > 60) return;

      const data = {
        ...values,
        id: params.id,
        contact: "0896785146914651",
        fileLembarPernyataan: fileLembarPernyataan,
        fileSuratUndangan: fileSuratUndangan,
      };
      requestReservationPlanetarium(data);
    },
  });

  const handleChangeSuratUndangan = (e: any) => {
    formik.setFieldValue("fileSuratUndangan", e.target.files[0]);
    setFileSuratUndangan(e.target.files[0]);
  };

  const handleChangeLembarPernyataan = (e: any) => {
    formik.setFieldValue("fileLembarPernyataan", e.target.files[0]);
    setFileLembarPernyataan(e.target.files[0]);
  };

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

  useEffect(() => {
    getSingleReservationPlanetarium(params.id);
  }, [params.id]);

  const expired = new Date(singleReservationPlanetarium.expiredAt + "Z");

  if (now > expired) {
    Swal.fire({
      icon: "error",
      title: "EROR",
      text: "Pesanan anda sudah kadaluarsa",
      showConfirmButton: false,
    }).then(() => {
      navigate("/pesanan-saya");
    });
    return;
  }

  const checkingNumber = expired.getTime();

  return (
    <>
      <PageTitle
        icon="moon"
        breadcrumbs={Breadcrumbs}
        description="Form Astronomy Goes To School"
      >
        Form Astronomy Goes To School
      </PageTitle>
      <Content>
        <div className="card">
          <div className="p-8">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="fw-bold">Tanggal Pemesanan</p>
                <input
                  type="date"
                  disabled
                  className="p-2 rounded form-control form-control-solid"
                  style={{ width: "200px" }}
                  value={globalVar.formatInputDateFromDB(
                    singleReservationPlanetarium?.createdAt
                  )}
                />
              </div>
              {!isNaN(checkingNumber) && (
                <Remining
                  expired={expired}
                  now={now}
                  onFinishTime={() => {
                    Swal.fire({
                      icon: "error",
                      title: "EROR",
                      text: "Pesanan anda sudah kadaluarsa",
                      showConfirmButton: false,
                    }).then(() => {
                      navigate("/pesanan-saya");
                    });
                  }}
                />
              )}
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
                    <select
                      className="form-select"
                      name="daerah"
                      id="daerah"
                      value={formik.values.daerah}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option>--Pilih satu--</option>

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
                        id="startDate"
                        name="startDate"
                        type="date"
                        value={globalVar.formatInputDateFromDB(
                          singleReservationPlanetarium?.tanggalKunjungan
                        )}
                        readOnly
                        className="form-control form-control-solid"
                        style={{ width: "200px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <Gap height={24} />
              <div className="row">
                <label htmlFor="" className="fw-bold fs-3">
                  Unggah berkas
                </label>
                <p className="text-danger">
                  *) Ekstensi yang diperbolehkan adalah PDF, dengan ukuran maks
                  2MB
                </p>
                <Gap height={10} />

                <div className="d-flex flex-column flex-lg-row">
                  <div className="me-lg-4">
                    <label className="fw-bold">Surat undangan resmi</label>
                    <Gap height={10} />
                    <input
                      id="fileSuratUndangan"
                      name="fileSuratUndangan"
                      type="file"
                      onChange={handleChangeSuratUndangan}
                      className={clsx("form-control bg-transparent", {
                        "is-invalid": formik.errors.fileSuratUndangan,
                      })}
                    />
                    {formik.errors.fileSuratUndangan && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          <span role="alert">
                            {formik.errors.fileSuratUndangan}
                          </span>
                        </div>
                      </div>
                    )}
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
                    <input
                      id="fileLembarPernyataan"
                      name="fileLembarPernyataan"
                      type="file"
                      onChange={handleChangeLembarPernyataan}
                      className={clsx("form-control bg-transparent", {
                        "is-invalid": formik.errors.fileLembarPernyataan,
                      })}
                    />
                    {formik.errors.fileLembarPernyataan && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          <span role="alert">
                            {formik.errors.fileLembarPernyataan}
                          </span>
                        </div>
                      </div>
                    )}
                    <p className="text-muted m-0">
                      *) Formulir dapat diunduh di{" "}
                      <a href="http://bit.ly/pernyataanPGS" target="_blank">
                        bit.ly/pernyataanPGS
                      </a>
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
