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
import { WEB_LOCAL_URL } from "../../../constants/API";
import useDashboard from "../../../modules/hooks/master-data/dashboard";
import usePesanTempat from "../../../modules/hooks/pesan-tempat";
import globalVar from "../../../helper/globalVar";
import useTempat from "../../../modules/hooks/master-data/tempat";

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
  const [chooseTempat, setchooseTempat] = useState<string>("");
  const { allReservationPesanTempat } = usePesanTempat();
  const { tempat } = useTempat();
  const { loading, getDataDashboard, dataStatus, dataReservasi } =
    useDashboard();

  useEffect(() => {
    getDataDashboard();
  }, []);

  const events: any[] = [];

  allReservationPesanTempat.map((itm) => {
    const date = new Date(itm.endDate);
    date.setDate(date.getDate() + 2);
    let backgroundColor = "#3788d8";
    switch (itm?.tempat?.name) {
      case "Teater Kecil":
        backgroundColor = "#ef9a28";
        break;
      case "Teater Besar":
        backgroundColor = "#5bc0de";
        break;
      case "Plaza":
        backgroundColor = "#5cb85c";
        break;

      default:
        break;
    }
    const data = {
      title: itm?.judulPentas,
      start: itm?.startDate,
      startDate: itm?.startDate,
      end: date.toISOString().split("T")[0],
      endDate: itm?.endDate,
      image: itm?.file,
      tempat: itm?.tempat?.name,
      bgColor: backgroundColor,
    };
    events.push(data);
  });

  const handleEventClick = (arg: any) => {
    setModalDetailEvent({
      show: true,
      data: arg,
    });
  };

  return (
    <>
      <PageTitle icon="home" breadcrumbs={Breadcrumbs} description="Home">
        Home
      </PageTitle>
      <Content>
        <div className="p-0">
          <Row>
            <Col md={8}>
              <Card>
                <Card.Header className="d-flex align-items-center">
                  <h4 className="m-0">Kalender</h4>
                  <div className="card-toolbar">
                    <select
                      name="switchCalendar"
                      id="switchCalendar"
                      className="form-select"
                      onChange={(e) => {
                        setchooseTempat(e.target.value);
                      }}
                    >
                      <option value="all">Acara PKJ TIM</option>
                      {tempat.map((tmt) => {
                        return (
                          <option key={tmt.id} value={tmt.id}>
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
                    now={globalVar.getThreeMonthsFromToday()}
                    height={555}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                      left: "title",
                      center: "",
                      right: "prev,today,next",
                    }}
                    events={events}
                    eventContent={(eventInfo) => {
                      console.log(
                        "eventInfo.event.extendedProps",
                        eventInfo.event.extendedProps
                      );

                      return (
                        <div
                          style={{
                            backgroundColor:
                              eventInfo.event.extendedProps.bgColor ||
                              "#3788d8",
                            padding: "5px",
                            borderRadius: "0px",
                          }}
                        >
                          {eventInfo.event.title}
                        </div>
                      );
                    }}
                    // eventContent={renderEventContent}
                    eventClick={handleEventClick}
                  />
                </div>
              </Card>
            </Col>
            <Col md={4}>
              <div>
                <CardJumlahPengguna
                  className="mb-5"
                  description="Pengguna Aktif"
                  color="#F1416C"
                  dataStatus={dataStatus}
                  img={toAbsoluteUrl("media/patterns/vector-1.png")}
                />
                <CardJumlahAcara
                  className="mb-2"
                  dataReservasi={dataReservasi}
                />
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
  function renderEventContent(eventInfo: any) {
    return (
      <>
        <i role="button">{eventInfo.event.title}</i>
      </>
    );
  }
};
