import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { FC, useState } from "react";
import { Content } from "../../../../_metronic/layout/components/content";
import { PageLink, PageTitle } from "../../../../_metronic/layout/core";
import { dummyImage } from "../../../helper/helper";
import ModalWrapper from "../../../../_metronic/layout/components/content/ModalWrapper";
import Gap from "../../../../_metronic/layout/components/content/Gap";
import polygonImage from "../../../../../public/media/images/polygon.png";
import { KTIcon } from "../../../../_metronic/helpers";
import ModalDetailAcara from "./components/ModalDetailAcara";

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

const Home: FC = () => {
  const [modalDetailEvent, setModalDetailEvent] = useState({
    show: false,
    data: {},
  });
  const [typeCalendar, setTypeCalendar] = useState(0);
  const events = [
    {
      title: "Orchestra",
      start: "2024-07-24T10:00:00",
      end: "2024-07-25T12:00:00",
      image: dummyImage,
      tempat: "Teater Besar",
    },
  ];

  const handleEventClick = (arg: any) => {
    console.log("arg.start", arg.view.activeStart);
    console.log("arg.start", arg.view.activeEnd);

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
        <div className="card">
          {/* <SwitchTypeCalendar /> */}
          <div className="p-8 w-lg-25">
            <label htmlFor="switchCalendar" className="fw-bold mb-3 fs-3">
              Filter agenda
            </label>
            <select
              name="switchCalendar"
              id="switchCalendar"
              className="form-select"
            >
              <option value=""> Kalender Acara Ruang Latihan TJ</option>
              <option value=""> Kalender Acara Ruang Latihan TJ</option>
              <option value=""> Kalender Acara Teater Kecil</option>
              <option value=""> Kalender Acara Teater Besar</option>
              <option value=""> Kalender Acara PKJ TIM</option>
            </select>
          </div>
          <div className="p-8">
            <FullCalendar
              height={800}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              events={events}
              eventContent={renderEventContent}
              eventClick={handleEventClick}
            />
          </div>
        </div>
        <Gap height={25} />
        <ModalDetailAcara
          show={modalDetailEvent.show}
          data={modalDetailEvent.data}
          handleClose={() => {
            setModalDetailEvent({ show: false, data: {} });
          }}
        />
        <DetailCalendarPesanan />
      </Content>
    </>
  );
  function renderEventContent(eventInfo: any) {
    return (
      <>
        <i>{eventInfo.event.title}</i>
      </>
    );
  }
  function SwitchTypeCalendar() {
    let activeClass0, activeClass1, activeClass2, activeClass3, activeClass4;
    switch (typeCalendar) {
      case 0:
        activeClass0 = "bg-primary text-white";
        break;
      case 1:
        activeClass1 = "bg-primary text-white";
        break;
      case 2:
        activeClass2 = "bg-primary text-white";
        break;
      case 3:
        activeClass3 = "bg-primary text-white";
        break;
      case 4:
        activeClass4 = "bg-primary text-white";
        break;
    }

    return (
      <>
        <div
          className="row row-cols-1 row-cols-md-5 border-bottom m-0"
          style={{ height: "100%", width: "100%" }}
        >
          <div
            className={
              "col d-flex align-items-center justify-content-center border-end fs-5 " +
              activeClass0
            }
            style={{ height: "100px" }}
            role="button"
            onClick={() => setTypeCalendar(0)}
          >
            Kalender Acara PKJ TIM
          </div>
          <div
            className={
              "col d-flex align-items-center justify-content-center border-end fs-5 " +
              activeClass1
            }
            style={{ height: "100px" }}
            role="button"
            onClick={() => setTypeCalendar(1)}
          >
            Kalender Acara Teater Besar
          </div>
          <div
            className={
              "col d-flex align-items-center justify-content-center border-end fs-5 " +
              activeClass2
            }
            style={{ height: "100px" }}
            role="button"
            onClick={() => setTypeCalendar(2)}
          >
            Kalender Acara Teater Kecil
          </div>
          <div
            className={
              "col d-flex align-items-center justify-content-center border-end fs-5 " +
              activeClass3
            }
            style={{ height: "100px" }}
            role="button"
            onClick={() => setTypeCalendar(3)}
          >
            Kalender Acara Plaza Teater JKT
          </div>
          <div
            className={
              "col d-flex align-items-center justify-content-center fs-5 " +
              activeClass4
            }
            role="button"
            style={{ height: "100px" }}
            onClick={() => setTypeCalendar(4)}
          >
            Kalender Acara Ruang Latihan TJ
          </div>
        </div>
      </>
    );
  }
  function DetailCalendarPesanan() {
    return (
      <>
        <div className="card p-8">
          <div className="d-flex align-items-center justify-content-center">
            <div
              style={{
                backgroundImage: `url(${polygonImage})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center center",
                height: "200px",
                width: "200px",
              }}
              className="d-flex align-items-center justify-content-center flex-column"
            >
              <KTIcon iconName="user" className="fs-1 text-primary" />
              <p className="m-0 fs-1 fw-bold mt-2">100</p>
              <p className="m-0 fs-6 text-muted">Pengguna</p>
            </div>
            <Gap width={80} />
            <div
              style={{
                backgroundImage: `url(${polygonImage})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center center",
                height: "200px",
                width: "200px",
              }}
              className="d-flex align-items-center justify-content-center flex-column"
            >
              <KTIcon iconName="book" className="fs-1 text-success" />
              <p className="m-0 fs-1 fw-bold mt-2">50</p>
              <p className="m-0 fs-6 text-muted">Pesanan</p>
              <p className="m-0 fs-6 text-muted">Masuk</p>
            </div>
          </div>
        </div>
        <Gap height={25} />
      </>
    );
  }
};

export default Home;
