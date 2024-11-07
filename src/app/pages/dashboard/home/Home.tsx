import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { FC, useEffect, useState } from "react";
import { Content } from "../../../../_metronic/layout/components/content";
import { PageLink, PageTitle } from "../../../../_metronic/layout/core";
import Gap from "../../../../_metronic/layout/components/content/Gap";
import { toAbsoluteUrl } from "../../../../_metronic/helpers";
import ModalDetailAcara from "./components/ModalDetailAcara";
import { Card, Col, Row } from "react-bootstrap";
import { CardJumlahAcara } from "./components/CardJumlahAcara";
import idLocale from "@fullcalendar/core/locales/id";
import { CardJumlahPengguna } from "./components/CardJumlahPengguna";
import { API_URL, ENDPOINTS, WEB_LOCAL_URL } from "../../../constants/API";
import useDashboard from "../../../modules/hooks/master-data/dashboard";
import usePesanTempat from "../../../modules/hooks/pesan-tempat";
import globalVar from "../../../helper/globalVar";
import useTempat from "../../../modules/hooks/master-data/tempat";
import { getAllReservationByStatus } from "../../../modules/requests/pesan-tempat";
import { DEFAULT_LIMIT, INITIAL_PAGE } from "../../../constants/PAGE";
import { getAll } from "../../../modules/requests/master-data/tempat-tutup";
import { getDashboardReservation } from "../../../modules/requests/dashboard";
import { motion } from "framer-motion";

const Breadcrumbs: Array<PageLink> = [
  {
    title: "Dashboard",
    path: "/dashboard/home",
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

export const Home: FC = () => {
  const [modalDetailEvent, setModalDetailEvent] = useState({
    show: false,
    data: {},
  });
  const [chooseTempat, setChooseTempat] = useState<string>("");
  const [filterCalendar, setFilterCalendar] = useState<any[]>([]);
  const [eventCalendar, setEventCalendar] = useState<any[]>([]);
  const { tempat } = useTempat();
  const { loading, getDataDashboard, dataStatus, dataReservasi } =
    useDashboard();

  const getDataCalendar = async (reservation: any[]) => {
    const events: any[] = [];
    reservation.map((itm) => {
      const date = new Date(itm.endDate);
      date.setDate(date.getDate() + 2);

      const data = {
        title: itm?.judulPentas,
        start: itm?.startDate,
        startDate: itm?.startDate,
        end: date.toISOString().split("T")[0],
        endDate: itm?.endDate,
        image: `${ENDPOINTS.PENTAS.PENTAS_IMAGE}/Tempat/${
          itm?.tempatId
        }/Image?isStream=true&startDate=${globalVar.formatInputDate(
          itm?.startDate
        )}&endDate=${globalVar.formatInputDate(itm?.endDate)}`,
        tempat: itm?.tempatName,
        tempatId: itm?.tempatId,
        color: "",
        status: itm?.status,
      };
      if (data.status == "PENDING") {
        data.title = "Tanggal dalam permintaan";
      }
      events.push(data);
    });

    events.map((item) => {
      switch (item.status) {
        case "PENDING":
          item.status = "Permintaan";
          break;
        case "PROSES":
          item.status = "Proses";
          break;
        case "KURASI":
          item.status = "Kurasi";
          break;
        case "REVISE":
          item.status = "Selesai Kurasi";
          break;
        case "WAITING_ANSWER_LETTER":
          item.status = "Selesai Kurasi";
          break;
        case "DONE":
          item.status = "Selesai";
          break;
        case "CLOSED":
          item.status = "Tempat Tutup";
          break;
        default:
          break;
      }
    });

    setEventCalendar(events);
  };

  const getDataReservasiByStatus = async () => {
    try {
      const res = await getDashboardReservation(
        INITIAL_PAGE,
        DEFAULT_LIMIT,
        "",
        "",
        [
          "DONE",
          "WAITING_ANSWER_LETTER",
          "PROSES",
          "KURASI",
          "PENDING",
          "REVISE",
        ]
      );

      let allReservation: any[] = res.data.data;
      let allResrvationWithFile: any[] = [];
      allReservation.map((data) => {
        const singleReserve = {
          ...data,
          suratPermohonan: data.suratPermohonan
            ? `${API_URL}/${ENDPOINTS.PESAN_TEMPAT.LIST_UPDATE_ADD_DELETE_PESAN_TEMPAT}/${data.id}/Attachment/SuratPermohonan`
            : null,
          proposal: data.proposal
            ? `${API_URL}/${ENDPOINTS.PESAN_TEMPAT.LIST_UPDATE_ADD_DELETE_PESAN_TEMPAT}/${data.id}/Attachment/Proposal`
            : null,
          statusDesc: globalVar.exportStatusPesanTempatToTitle(data.status),
        };

        allResrvationWithFile.push(singleReserve);
      });

      getDataCalendar(allResrvationWithFile);
    } catch (error) {}
  };

  const tempatColor: any[] = [];
  tempat.map((b: any, index: any) => {
    let backgroundColor =
      "#" + Math.floor(Math.random() * 16777215).toString(16); //random color
    switch (index) {
      case 0:
        backgroundColor = "#0d6efd";
        break;
      case 1:
        backgroundColor = "#6610f2";
        break;
      case 2:
        backgroundColor = "#fd7e14";
        break;
      case 3:
        backgroundColor = "#ffc107";
        break;
      case 4:
        backgroundColor = "#198754";
        break;
      case 5:
        backgroundColor = "#20c997";
        break;
      default:
        break;
    }
    var data = {
      id: b?.id,
      tempat: b?.name,
      color: backgroundColor,
    };
    tempatColor.push(data);
  });
  eventCalendar.map(
    (b) => (b.color = tempatColor.find((c) => c.tempat == b.tempat)?.color)
  );

  useEffect(() => {
    getDataDashboard();
    getDataReservasiByStatus();
  }, []);

  const handleEventClick = (arg: any) => {
    setModalDetailEvent({
      show: true,
      data: arg,
    });
  };

  useEffect(() => {
    const results =
      chooseTempat != ""
        ? eventCalendar.filter((evt) => evt.tempatId == chooseTempat)
        : eventCalendar;

    setFilterCalendar(results);
  }, [chooseTempat, eventCalendar]);

  return (
    <>
      <PageTitle icon="home" breadcrumbs={Breadcrumbs} description="Home">
        Home
      </PageTitle>
      <Content>
        <div className="p-0">
          <Row>
            <Col md={8}>
              <motion.div
                initial={{ opacity: 0, y: "200px" }}
                animate={{ opacity: 1, y: "0px" }}
                transition={{
                  type: "spring",
                  ease: "easeInOut",
                  delay: 1,
                }}
              >
                <Card>
                  <Card.Header className="d-flex align-items-center">
                    <h4 className="m-0">Kalender</h4>
                    <div className="card-toolbar">
                      <select
                        name="switchCalendar"
                        id="switchCalendar"
                        className="form-select"
                        onChange={(e) => {
                          setChooseTempat(e.target.value);
                        }}
                      >
                        <option value="">Acara PKJ TIM</option>
                        {tempat.map((tmt) => {
                          return (
                            <option
                              key={tmt.id}
                              value={tmt.id}
                              style={{
                                color: tempatColor.find(
                                  (b) => b.tempat == tmt.name
                                )?.color,
                              }}
                            >
                              {tmt.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </Card.Header>
                  <div className="p-8">
                    <FullCalendar
                      locale={idLocale}
                      now={new Date()}
                      height={555}
                      initialDate={globalVar.getThreeMonthsFromToday()}
                      plugins={[
                        dayGridPlugin,
                        timeGridPlugin,
                        interactionPlugin,
                      ]}
                      initialView="dayGridMonth"
                      headerToolbar={{
                        left: "title",
                        center: "",
                        right: "prev,today,next",
                      }}
                      events={filterCalendar}
                      eventContent={(eventInfo) => {
                        return (
                          <div role="button" className="fw-bold fst-italic p-1">
                            {eventInfo.event.title}
                          </div>
                        );
                      }}
                      eventClick={handleEventClick}
                    />
                  </div>
                </Card>
              </motion.div>
            </Col>
            <Col md={4}>
              <div>
                <motion.div
                  initial={{ opacity: 0, y: "200px" }}
                  animate={{ opacity: 1, y: "0px" }}
                  transition={{
                    type: "spring",
                    ease: "easeInOut",
                    delay: 1.2,
                  }}
                >
                  <CardJumlahPengguna
                    className="mb-5"
                    description="Pengguna Aktif"
                    color="#F1416C"
                    dataStatus={dataStatus}
                    img={toAbsoluteUrl("media/patterns/vector-1.png")}
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: "200px" }}
                  animate={{ opacity: 1, y: "0px" }}
                  transition={{
                    type: "spring",
                    ease: "easeInOut",
                    delay: 1.4,
                  }}
                >
                  <CardJumlahAcara
                    className="mb-2"
                    dataReservasi={dataReservasi}
                    dataColor={tempatColor}
                  />
                </motion.div>
              </div>
            </Col>
          </Row>
        </div>
        <Gap height={25} />
        <ModalDetailAcara
          show={modalDetailEvent.show}
          data={modalDetailEvent.data}
          handleClose={() => {
            setModalDetailEvent({ show: false, data: {} });
          }}
        />
      </Content>
    </>
  );
};
