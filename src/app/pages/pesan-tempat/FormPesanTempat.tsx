import React, { FC, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Content } from "../../../_metronic/layout/components/content";
import { useFormik } from "formik";
import clsx from "clsx";
import * as Yup from "yup";
import Gap from "../../../_metronic/layout/components/content/Gap";
import globalVar from "../../helper/globalVar";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";
import usePesanTempat from "../../modules/hooks/pesan-tempat";
import Remining from "../../../_metronic/layout/components/content/Remining";
import Swal from "sweetalert2";

const now: any = new Date();

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
  alamatSanggar: Yup.string().required("Alamat sanggar harus diisi"),
});

const initialValues = {
  namaSanggar: "",
  judulPentas: "",
  alamatSanggar: "",
};

export const FormPesanTempat: FC = () => {
  const {
    getSinglePesanTempat,
    singleReservationTempat,
    loading,
    requestReservationPesanTempat,
  } = usePesanTempat();
  const [codeBooking, setCodeBooking] = useState<string>("");
  const [fileProposal, setFileProposal] = useState<any>(null);
  const [fileSuratPermohonan, setFileSuratPermohonan] = useState<any>(null);
  const [fileTandaPengenal, setFileTandaPengenal] = useState<any>(null);
  const [startMainEventDate, setStartMainEventDate] = useState<any>(null);
  const [mainEventDay, setMainEventDay] = useState<any>(0);
  const [tarifCalculation, setTarifCalculation] = useState<any>(0);

  const navigate = useNavigate();
  const params = useParams();

  const bookingNow: any = globalVar.formatInputDateFromDB(
    singleReservationTempat.createdAt
  );
  const endDate: any = globalVar.formatInputDateFromDB(
    singleReservationTempat.endDate
  );
  const startDate: any = globalVar.formatInputDateFromDB(
    singleReservationTempat.startDate
  );
  useEffect(() => {
    getSinglePesanTempat(params.id);
  }, [params.id]);

  const expired = new Date(singleReservationTempat?.expiredDateTime + "Z");

  const checkingNumber = expired.getTime();

  const createBookingCode = () => {
    const bookingCode = globalVar.createCodeBooking(
      singleReservationTempat?.tempat?.name,
      bookingNow,
      startDate,
      endDate,
      singleReservationTempat.id
    );
    setCodeBooking(bookingCode);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: formPesanScheme,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      const payload = {
        ...values,
        id: singleReservationTempat.id,
        kodeBooking: codeBooking,
        fileProposal,
        fileSuratPermohonan,
        fileTandaPengenal,
        priceTotal: tarifCalculation,
        startMainEventDate: startMainEventDate ?? startDate,
        days: mainEventDay,
      };

      requestReservationPesanTempat(payload);
    },
  });

  const tarifCalculationNoPreEvent = () => {
    const start: any = new Date(startDate);
    const end: any = new Date(endDate);

    let dayWeekend = 0;
    while (start <= end) {
      const day = start.getDay();
      if (day === 0 || day === 6) {
        dayWeekend += 1;
      }
      start.setDate(start.getDate() + 1);
    }
    const differenceDay = globalVar.differenceInDays(startDate, endDate);
    setMainEventDay(differenceDay);

    const dayWeekday = differenceDay - dayWeekend;

    let tarif =
      dayWeekend * singleReservationTempat?.tempat?.priceMainEventWeekEnd +
      dayWeekday * singleReservationTempat?.tempat?.priceMainEventWeekDay;
    setTarifCalculation(tarif);
  };

  const tarifCalculationWithPreEvent = () => {
    if (!startMainEventDate || !mainEventDay) {
      Swal.fire({
        title: "Gagal",
        text: "Tolong pilih tanggal mulai main event dan jumlah hari main event",
      });
      return;
    }
    const start: any = new Date(startDate);
    const end: any = new Date(endDate);

    const mainEvent = new Date(startMainEventDate);
    const dateIncludeMain: any[] = [];

    for (let i = 0; i < mainEventDay; i++) {
      if (mainEventDay == 1) {
        dateIncludeMain.push(new Date(startMainEventDate));
      } else {
        const futureDate = new Date(startMainEventDate);
        futureDate.setDate(mainEvent.getDate() + i);
        const date = futureDate.toISOString().split("T")[0];

        dateIncludeMain.push(new Date(date));
      }
    }

    const isExcluded = (date: any) => {
      return dateIncludeMain.some(
        (targetDate) => targetDate.getTime() === date.getTime()
      );
    };

    const generateDateArray = (start: any, end: any) => {
      const dates = [];
      let currentDate = new Date(start);

      while (currentDate <= end) {
        if (!isExcluded(currentDate)) {
          dates.push(new Date(currentDate));
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }

      return dates;
    };

    const dateExcludeMain = generateDateArray(start, end);
    console.log("dateExcludeMain", dateExcludeMain);
    console.log("dateIncludeMain", dateIncludeMain);

    let tarif = 0;
    while (start <= end) {
      for (let i = 0; i < dateIncludeMain.length; i++) {
        if (start.getTime() == dateIncludeMain[i].getTime()) {
          let dayOfWeek = start.getDay(); // Mendapatkan hari dalam seminggu (0 = Minggu, 6 = Sabtu)
          let isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // Cek apakah hari Sabtu/Minggu
          let formattedDate = start.toISOString().split("T")[0]; // Format tanggal

          if (isWeekend) {
            tarif += singleReservationTempat?.tempat.priceMainEventWeekEnd;
          } else {
            tarif += singleReservationTempat?.tempat.priceMainEventWeekDay;
          }
        }
      }

      for (let i = 0; i < dateExcludeMain.length; i++) {
        if (start.getTime() == dateExcludeMain[i].getTime()) {
          let dayOfWeek = start.getDay(); // Mendapatkan hari dalam seminggu (0 = Minggu, 6 = Sabtu)
          let isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // Cek apakah hari Sabtu/Minggu
          if (isWeekend) {
            tarif += singleReservationTempat?.tempat.pricePreEventWeekEnd;
          } else {
            tarif += singleReservationTempat?.tempat.pricePreEventWeekDay;
          }
        }
      }

      start.setDate(start.getDate() + 1);
    }

    setTarifCalculation(tarif);
  };

  return (
    <Content>
      <PageTitle icon="geolocation" breadcrumbs={Breadcrumbs}>
        {`Form ${loading ? "..." : singleReservationTempat?.tempat?.name}`}
      </PageTitle>
      <div className="card p-8">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <p className="fw-bold">Tanggal Pemesanan</p>
            <input
              type="date"
              disabled
              value={bookingNow}
              className="p-2 rounded form-control form-control-solid"
              style={{ width: "200px" }}
            />
          </div>
          {!isNaN(checkingNumber) && (
            // <></>
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
                          "form-control form-control-solid form-control-solid"
                        )}
                        value={startDate}
                        type="date"
                        min={globalVar.getThreeMonthsFromToday()}
                        name="tanggalMulaiPentas"
                        autoComplete="off"
                        readOnly
                      />
                    </div>
                    <p className="m-0 mx-5">s/d</p>
                    <div style={{ width: "100%" }}>
                      <input
                        id="tanggalSelesaiPentas"
                        {...formik.getFieldProps("tanggalSelesaiPentas")}
                        className={clsx(
                          "form-control form-control-solid form-control-solid"
                        )}
                        min={globalVar.getThreeMonthsFromToday()}
                        type="date"
                        name="tanggalSelesaiPentas"
                        autoComplete="off"
                        value={endDate}
                        readOnly
                      />
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
                    className={clsx("form-control form-control-solid")}
                    type="text"
                    name="kodeBooking"
                    autoComplete="off"
                    aria-describedby="button-addon2"
                    value={codeBooking}
                  />
                  <button
                    className="btn btn-light-primary"
                    type="button"
                    id="button-addon2"
                    onClick={createBookingCode}
                  >
                    Buat kode
                  </button>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="fv-row">
                {singleReservationTempat?.tempat?.pricePreEventWeekDay !== 0 &&
                  singleReservationTempat?.tempat?.pricePreEventWeekEnd !==
                    0 && (
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
                              id="tanggalMainEvent"
                              {...formik.getFieldProps("tanggalMainEvent")}
                              className={clsx(
                                "form-control form-control-solid form-control-solid"
                              )}
                              min={globalVar.formatInputDateFromDB(
                                singleReservationTempat?.startDate
                              )}
                              max={globalVar.formatInputDateFromDB(
                                singleReservationTempat?.endDate
                              )}
                              type="date"
                              name="tanggalMainEvent"
                              autoComplete="off"
                              onChange={(e: any) =>
                                setStartMainEventDate(e.target.value)
                              }
                            />
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
                              id="jumlahHari"
                              {...formik.getFieldProps("jumlahHari")}
                              className={clsx(
                                "form-control form-control-solid form-control-solid"
                              )}
                              min={globalVar.getThreeMonthsFromToday()}
                              type="number"
                              onChange={(e: any) =>
                                setMainEventDay(e.target.value)
                              }
                              name="jumlahHari"
                              autoComplete="off"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                {singleReservationTempat?.tempat?.pricePreEventWeekDay === 0 &&
                  singleReservationTempat?.tempat?.pricePreEventWeekEnd ===
                    0 && (
                    <div className="row row-cols-1">
                      <div className="col"></div>
                      <div className="col">
                        <div className="fv-row mb-5">
                          <label htmlFor="totalTarif" className="fw-bold">
                            Total tarif
                          </label>
                          <Gap height={10} />
                          <div className="input-group mb-3">
                            <input
                              readOnly
                              id="totalTarif"
                              {...formik.getFieldProps("totalTarif")}
                              className={clsx(
                                "form-control form-control-solid"
                              )}
                              type="text"
                              name="totalTarif"
                              autoComplete="off"
                              aria-describedby="button-addon2"
                              value={tarifCalculation}
                            />
                            <button
                              className="btn btn-light-primary"
                              type="button"
                              id="button-addon2"
                              onClick={tarifCalculationNoPreEvent}
                            >
                              Lihat tarif
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
          <Gap height={10} />
          {singleReservationTempat?.tempat?.pricePreEventWeekDay !== 0 &&
            singleReservationTempat?.tempat?.pricePreEventWeekEnd !== 0 && (
              <div className="row row-cols-1 row-cols-lg-2">
                <div className="col"></div>
                <div className="col">
                  <div className="fv-row mb-5">
                    <label htmlFor="totalTarif" className="fw-bold">
                      Total tarif
                    </label>
                    <Gap height={10} />
                    <div className="input-group mb-3">
                      <input
                        readOnly
                        id="totalTarif"
                        className={clsx("form-control form-control-solid")}
                        type="text"
                        name="totalTarif"
                        autoComplete="off"
                        aria-describedby="button-addon2"
                        value={tarifCalculation}
                      />
                      <button
                        className="btn btn-light-primary"
                        type="button"
                        id="button-addon2"
                        onClick={tarifCalculationWithPreEvent}
                      >
                        Lihat tarif
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

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
                  <input
                    type="file"
                    className="form-control bg-transparant"
                    onChange={(e: any) =>
                      setFileSuratPermohonan(e.target.files[0])
                    }
                  />
                </div>
                <div className="mb-5 me-5">
                  <p className="fw-bold mb-1">Tanda pengenal</p>
                  <input
                    type="file"
                    className="form-control bg-transparant"
                    onChange={(e: any) =>
                      setFileTandaPengenal(e.target.files[0])
                    }
                  />
                </div>
                <div className="mb-5">
                  <p className="fw-bold mb-1">Proposal</p>
                  <input
                    type="file"
                    className="form-control bg-transparant"
                    onChange={(e: any) => setFileProposal(e.target.files[0])}
                  />
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
