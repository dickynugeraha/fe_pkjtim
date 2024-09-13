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

  const navigate = useNavigate();
  const params = useParams();

  const bookingNow = globalVar.formatInputDateFromDB(
    singleReservationTempat.createdAt
  );
  const endDate = globalVar.formatInputDateFromDB(
    singleReservationTempat.endDate
  );
  const startDate = globalVar.formatInputDateFromDB(
    singleReservationTempat.startDate
  );
  useEffect(() => {
    getSinglePesanTempat(params.id);
  }, [params.id]);

  const expired = new Date(singleReservationTempat?.expiredDateTime + "Z");

  console.log("now > expired", now > expired);

  if (now > expired) {
    Swal.fire({
      icon: "error",
      title: "EROR",
      text: "Pesanan anda sudah kadaluarsa",
      showConfirmButton: false,
    }).then(() => {
      navigate("/pesanan-saya");
    });
  }

  const checkingNumber = expired.getTime();

  console.log("checkingNumber", checkingNumber);

  const createBookingCode = () => {
    const bookingCode = globalVar.createCodeBooking(
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
        priceTotal: tarifCalculation().tarif,
        startMainEventDate: startMainEventDate ?? startDate,
        days: mainEventDay,
      };

      requestReservationPesanTempat(payload);
    },
  });

  const tarifCalculation = () => {
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

    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
    const differenceInMilliseconds = start - end;
    const differentDay =
      Math.round(differenceInMilliseconds / oneDayInMilliseconds) + 1;
    const dayWeekday = differentDay - dayWeekend;

    // calculation
    let tarif =
      dayWeekend * singleReservationTempat?.tempat?.priceMainEventWeekEnd +
      dayWeekday * singleReservationTempat?.tempat?.priceMainEventWeekDay;

    if (
      singleReservationTempat?.tempat?.pricePreEventWeekDay !== 0 &&
      singleReservationTempat?.tempat?.pricePreEventWeekEnd !== 0
    ) {
      if (mainEventDay != 0 && startMainEventDate) {
        const startMainEvent: any = new Date(startMainEventDate);
        console.log("startMainEvent", startMainEvent);

        let futureDateMainEvent = new Date(
          startMainEvent.setDate(
            new Date(startMainEventDate).getDate() + mainEventDay
          )
        );
        console.log("mainEventDay1111111111111", mainEventDay);

        const cek = new Date(startMainEventDate).setDate(
          startMainEvent.getDate() + 1
        );
        console.log("cek", cek);

        // if (mainEventDay == 1) {
        //   futureDateMainEvent = startMainEvent;
        // }
        console.log("startMainEvent", startMainEvent);
        console.log("futureDateMainEvent", futureDateMainEvent);

        let dayWeekendMain = 0;
        // while (startMainEvent <= futureDateMainEvent) {
        //   const day = startMainEvent.getDay();
        //   if (day === 0 || day === 6) {
        //     dayWeekendMain += 1;
        //   }
        //   startMainEvent.setDate(startMainEvent.getDate());
        // }
        console.log("dayWeekendMain", dayWeekendMain);

        // const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
        // const differenceInMilliseconds = startMainEvent - futureDateMainEvent;
        // const differentDay =
        //   Math.round(differenceInMilliseconds / oneDayInMilliseconds) + 1;
        // const dayWeekdayMain = differentDay - dayWeekendMain;

        // let tarif =
        //   dayWeekendMain *
        //     singleReservationTempat?.tempat?.priceMainEventWeekEnd +
        //   dayWeekdayMain *
        //     singleReservationTempat?.tempat?.priceMainEventWeekDay;
        // const calculationDayWeekday = dayWeekday - dayWeekdayMain;
        // const calculationDayWeekend = dayWeekend - dayWeekendMain;
        // tarif =
        //   tarif +
        //   (calculationDayWeekend *
        //     singleReservationTempat?.tempat?.pricePreEventWeekEnd +
        //     calculationDayWeekday *
        //       singleReservationTempat?.tempat?.pricePreEventWeekDay);
      } else {
        tarif = 0;
      }
    }
    return { tarif };
  };

  // useEffect(() => {
  //   tarifCalculation();
  // }, [startMainEventDate, mainEventDay]);

  console.log("tarifCalculation().tarif", tarifCalculation().tarif);

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
                              // min={new Date(
                              //   singleReservationTempat?.startDate
                              // )?.toISOString()}
                              min={globalVar.getThreeMonthsFromToday()}
                              // max={singleReservationTempat?.endDate?.toISOString()}
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
                        <label htmlFor="tarif" className="fw-bold">
                          Kalkulasi Tarif
                        </label>
                        <Gap height={10} />

                        <h4>
                          {globalVar.rupiahFormat(tarifCalculation().tarif)}
                        </h4>
                        <Gap height={10} />
                        {/* <input
                          readOnly
                          disabled
                          id="tarif"
                          {...formik.getFieldProps("tarif")}
                          className={clsx("form-control form-control-solid")}
                          type="text"
                          name="tarif"
                          autoComplete="off"
                          value={tarifCalculation().tarif}
                        /> */}
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
                  <label htmlFor="tarif" className="fw-bold">
                    Kalkulasi Tarif
                  </label>
                  <Gap height={10} />
                  <input
                    readOnly
                    disabled
                    id="tarif"
                    {...formik.getFieldProps("tarif")}
                    className={clsx("form-control form-control-solid")}
                    type="text"
                    name="tarif"
                    autoComplete="off"
                  />
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
