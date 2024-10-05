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
  const [chooseTempat, setChooseTempat] = useState<string>("");
  const [filterCalendar, setFilterCalendar] = useState<any[]>([]);
  const { eventCalendar } = usePesanTempat();
  const { tempat } = useTempat();
  const { loading, getDataDashboard, dataStatus, dataReservasi } =
    useDashboard();

  useEffect(() => {
    getDataDashboard();
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

  const tempatColor:any[] = [];
  tempat.map((b:any,index:any) => {
    let backgroundColor = "#" + Math.floor(Math.random() * 16777215).toString(16); //random color
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
      tempat : b?.name,
      color: backgroundColor
    }
    tempatColor.push(data);
  });
  eventCalendar.map(b => b.color = tempatColor.find(c => c.tempat == b.tempat)?.color)
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
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
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
                  dataColor={tempatColor}
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
};
