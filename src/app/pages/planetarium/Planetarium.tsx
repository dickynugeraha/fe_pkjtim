import { useEffect, useState } from "react";
import { Content } from "../../../_metronic/layout/components/content";
import Gap from "../../../_metronic/layout/components/content/Gap";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";
import Kegiatan from "./components/Kegiatan";
import { Button, Col, Row, Card, Modal } from "react-bootstrap";
import globalVar from "../../helper/globalVar";
import usePlanetarium from "../../modules/hooks/planetarium";
import DatePicker from "react-datepicker";
import TermCondition from "./components/TermCondition";
import CalendarPlanetarium from "./components/CalendarPlanetarium";
import image_assets from "../../utils/image_assets";
import { getDashboardPlanetarium } from "../../modules/requests/dashboard";
import { useAuth } from "../../modules/auth";
import Swal from "sweetalert2";
import { initReservation } from "../../modules/requests/planetarium";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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

export const Planetarium = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const nextStepHandler = async (
    indoor: any,
    outdoor: any,
    bookingDate: any
  ) => {
    if (!currentUser?.email) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Silahkan login terlebih dahulu!",
        showConfirmButton: false,
      });
      return;
    }
    if (!indoor) {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: "Pilih kegiatan Indoor",
        showConfirmButton: false,
      });
      return;
    }
    if (!outdoor.peneropongan_matahari && !outdoor.percobaan_roket_air) {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: "Pilih salah satu atau keduanya pada kegiatan Outdoor",
        showConfirmButton: false,
      });
      return;
    }
    if (!bookingDate) {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: "Masukkan tanggal booking",
        showConfirmButton: false,
      });
      return;
    }

    Swal.fire({
      title: "Apakah anda yakin",
      text: "Akan melakukan reservasi?!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve("Confirmed");
          }, 1000);
        });
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title:
            '<i class="ki-solid ki-gear fs-5x icon-spin"></i><span class="sr-only"> Menyimpan</span>',
          text: "Menyimpan, mohon tunggu",
          allowOutsideClick: false,
          showConfirmButton: false,
        });
        try {
          const payload = {
            UserCreatorId: currentUser?.id,
            TanggalKunjungan: bookingDate,
            IsPertunjukan: indoor === "planetarium_mini" ? true : false,
            IsDiskusi: indoor === "diskusi_astronomi" ? true : false,
            IsPeneropongan: outdoor.peneropongan_matahari ? true : false,
            IsRoketAir: outdoor.percobaan_roket_air ? true : false,
          };
          const res = await initReservation(payload);
          const dataReservation: any = res.data.data;

          Swal.fire({
            icon: "success",
            title: "Berhasil melakukan reservasi",
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            navigate(`/form-planetarium/${dataReservation.id}`, {
              state: { reservationDate: bookingDate },
            });
          });
        } catch (error: any) {
          Swal.fire({
            icon: "error",
            title: "ERROR",
            text: error.message,
            showConfirmButton: false,
          });
        }
      }
    });
  };

  const [bookingDate, setBookingDate] = useState<any>();
  const [termIsCheck, setTermIsCheck] = useState(false);

  const [indoor, setIndoor] = useState("");
  const [outdoor, setOutdoor] = useState({
    peneropongan_matahari: false,
    percobaan_roket_air: false,
  });

  return (
    <>
      <PageTitle
        icon="moon"
        breadcrumbs={Breadcrumbs}
        description="Astronomy Goes To School"
      >
        Astronomy Goes To School
      </PageTitle>
      <Content>
        <div className="d-flex justify-content-center">
          <img src={image_assets.Astronomy} className="rounded w-50" />
        </div>
        <Gap height={15} />
        <TermCondition />
        <Gap height={15} />
        <Card>
          <Card.Header className="d-flex align-items-center">
            <h4 className="m-0">Kalender Astronomy Goes To School</h4>
          </Card.Header>
          <CalendarPlanetarium />
        </Card>
        <Gap height={24} />
        <Persetujuan />
        <Gap height={24} />
        {termIsCheck && (
          <>
            <motion.div
              initial={{ opacity: 0, y: "50px" }}
              animate={{ opacity: 1, y: "0px" }}
              transition={{
                type: "spring",
                ease: "easeInOut",
                delay: 0.5,
              }}
            >
              <div>
                <div className="d-flex align-items-center justify-content-between"></div>
                <div>
                  <Kegiatan
                    indoor={indoor}
                    outdoor={outdoor}
                    setIndoor={(e) => setIndoor(e)}
                    setOutdoor={(e) => setOutdoor(e)}
                  />
                </div>
              </div>
            </motion.div>

            <Gap height={12} />
            <motion.div
              initial={{ opacity: 0, y: "50px" }}
              animate={{ opacity: 1, y: "0px" }}
              transition={{
                type: "spring",
                ease: "easeInOut",
                delay: 0.7,
              }}
            >
              <FormPlace />
            </motion.div>
          </>
        )}
      </Content>
    </>
  );

  function Persetujuan() {
    return (
      <div className="form-check d-flex align-items-center">
        <input
          type="checkbox"
          id="agree-terms-planet"
          className="form-check-input me-4"
          onChange={() => {
            setTermIsCheck(!termIsCheck);
            setTimeout(() => {
              window.scrollTo({
                top: 6000,
                behavior: "smooth",
              });
            }, 100);
            window.scrollTo(0, 1000000);
          }}
          checked={termIsCheck}
          defaultValue={""}
        />
        <label className="fs-5" htmlFor="agree-terms-planet">
          Saya sudah membaca dan menyetujui syarat dan ketentuan khusus
          Astronomy Goes to School diatas
        </label>
      </div>
    );
  }
  function FormPlace() {
    const [dataDates, setDataDates] = useState<any[]>([]);

    const getAllReservationDate = async () => {
      try {
        const res = await getDashboardPlanetarium(1, -1, "", ["OPEN"]);

        const dataReservationDate: any[] = res.data.data;

        const dataReserve: any[] = [];
        dataReservationDate.map((data) => {
          dataReserve.push(
            new Date(globalVar.formatInputDate(data.tanggalKunjungan))
          );
        });
        setDataDates(dataReserve);
      } catch (error) {
        throw error;
      }
    };

    useEffect(() => {
      getAllReservationDate();
    }, []);
    return (
      <Row>
        <Col lg={6}>
          <Card>
            <Card.Body>
              <div className="align-items-center mb-4">
                <Row>
                  <Col lg={8}>
                    <div className="form-group">
                      <h4>Pilih Tanggal</h4>
                      <Gap height={12} />
                      <div role="button">
                        <DatePicker
                          selected={bookingDate}
                          onChange={(date) =>
                            setBookingDate(globalVar.formatInputDate(date))
                          }
                          includeDates={dataDates}
                          // filterDate={isTuesdayOrThursday}
                          className="form-control form-control-solid" // Bootstrap class for input
                          wrapperClassName="input-group" // Bootstrap input group
                          calendarClassName="shadow border" // Optional: Add Bootstrap shadow and border to the calendar
                          placeholderText="dd/mm/yyyy"
                        />
                      </div>

                      <Gap height={10} />
                    </div>
                  </Col>
                </Row>
              </div>
              <Button
                variant="primary"
                type="button"
                onClick={() => {
                  nextStepHandler(indoor, outdoor, bookingDate);
                }}
              >
                Selanjutnya
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }
};
