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
import { toAbsoluteUrl } from "../../../../_metronic/helpers";
import ModalDetailAcara from "./components/ModalDetailAcara";
import { Card, Col, Row } from "react-bootstrap";
import { CardJumlahAcara } from "./components/CardJumlahAcara";
import idLocale from "@fullcalendar/core/locales/id";
import { CardJumlahPengguna } from "./components/CardJumlahPengguna";
import usePentas from "../../../modules/hooks/master-data/pentas";

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
  const { loading, pementasan } = usePentas();

  console.log("pementasan", pementasan);

  const events: any[] = [];

  pementasan.map((itm) => {
    const data = {
      title: itm?.title,
      start: itm?.startDate,
      end: itm?.endDate,
      image: itm?.file,
      tempat: itm?.tempat?.name,
    };
    events.push(data);
  });

  console.log("events", events);

  // const events = [
  //   {
  //     title: "Orchestra",
  //     start: "2024-07-24T10:00:00",
  //     end: "2024-07-25T12:00:00",
  //     image: dummyImage,
  //     tempat: "Teater Besar",
  //   },
  // ];

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
                    >
                      <option value="">Acara PKJ TIM</option>
                      <option value="">Acara Ruang Latihan TJ</option>
                      <option value="">Acara Teater Kecil</option>
                      <option value="">Acara Teater Besar</option>
                    </select>
                  </div>
                </Card.Header>
                <div className="p-8">
                  <FullCalendar
                    locale={idLocale}
                    height={555}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                      left: "title",
                      center: "",
                      right: "prev,today,next",
                    }}
                    events={events}
                    eventContent={renderEventContent}
                    eventClick={handleEventClick}
                  />
                </div>
              </Card>
            </Col>
            <Col md={4}>
              <CardJumlahPengguna
                className="mb-5"
                description="Pengguna Aktif"
                color="#F1416C"
                img={toAbsoluteUrl("media/patterns/vector-1.png")}
              />
              <CardJumlahAcara className="mb-2" />
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
  // function SwitchTypeCalendar() {
  //   let activeClass0, activeClass1, activeClass2, activeClass3, activeClass4;
  //   switch (typeCalendar) {
  //     case 0:
  //       activeClass0 = "bg-primary text-white";
  //       break;
  //     case 1:
  //       activeClass1 = "bg-primary text-white";
  //       break;
  //     case 2:
  //       activeClass2 = "bg-primary text-white";
  //       break;
  //     case 3:
  //       activeClass3 = "bg-primary text-white";
  //       break;
  //     case 4:
  //       activeClass4 = "bg-primary text-white";
  //       break;
  //   }

  //   return (
  //     <>
  //       <div
  //         className="row row-cols-1 row-cols-md-5 border-bottom m-0"
  //         style={{ height: "100%", width: "100%" }}
  //       >
  //         <div
  //           className={
  //             "col d-flex align-items-center justify-content-center border-end fs-5 " +
  //             activeClass0
  //           }
  //           style={{ height: "100px" }}
  //           role="button"
  //           onClick={() => setTypeCalendar(0)}
  //         >
  //           Kalender Acara PKJ TIM
  //         </div>
  //         <div
  //           className={
  //             "col d-flex align-items-center justify-content-center border-end fs-5 " +
  //             activeClass1
  //           }
  //           style={{ height: "100px" }}
  //           role="button"
  //           onClick={() => setTypeCalendar(1)}
  //         >
  //           Kalender Acara Teater Besar
  //         </div>
  //         <div
  //           className={
  //             "col d-flex align-items-center justify-content-center border-end fs-5 " +
  //             activeClass2
  //           }
  //           style={{ height: "100px" }}
  //           role="button"
  //           onClick={() => setTypeCalendar(2)}
  //         >
  //           Kalender Acara Teater Kecil
  //         </div>
  //         <div
  //           className={
  //             "col d-flex align-items-center justify-content-center border-end fs-5 " +
  //             activeClass3
  //           }
  //           style={{ height: "100px" }}
  //           role="button"
  //           onClick={() => setTypeCalendar(3)}
  //         >
  //           Kalender Acara Plaza Teater JKT
  //         </div>
  //         <div
  //           className={
  //             "col d-flex align-items-center justify-content-center fs-5 " +
  //             activeClass4
  //           }
  //           role="button"
  //           style={{ height: "100px" }}
  //           onClick={() => setTypeCalendar(4)}
  //         >
  //           Kalender Acara Ruang Latihan TJ
  //         </div>
  //       </div>
  //     </>
  //   );
  // }

  // function DetailCalendarPesanan() {
  //   return (
  // <>
  //   <div className="card p-8">
  //     <div className="d-flex align-items-center justify-content-center">
  //       <div
  //         style={{
  //           backgroundImage: `url(${polygonImage})`,
  //           backgroundRepeat: "no-repeat",
  //           backgroundSize: "cover",
  //           backgroundPosition: "center center",
  //           height: "200px",
  //           width: "200px",
  //         }}
  //         className="d-flex align-items-center justify-content-center flex-column"
  //       >
  //         <KTIcon iconName="user" className="fs-1 text-primary" />
  //         <p className="m-0 fs-1 fw-bold mt-2">100</p>
  //         <p className="m-0 fs-6 text-muted">Pengguna</p>
  //       </div>
  //       <Gap width={80} />
  //       <div
  //         style={{
  //           backgroundImage: `url(${polygonImage})`,
  //           backgroundRepeat: "no-repeat",
  //           backgroundSize: "cover",
  //           backgroundPosition: "center center",
  //           height: "200px",
  //           width: "200px",
  //         }}
  //         className="d-flex align-items-center justify-content-center flex-column"
  //       >
  //         <KTIcon iconName="book" className="fs-1 text-success" />
  //         <p className="m-0 fs-1 fw-bold mt-2">50</p>
  //         <p className="m-0 fs-6 text-muted">Pesanan</p>
  //         <p className="m-0 fs-6 text-muted">Masuk</p>
  //       </div>
  //     </div>
  //   </div>
  //   <Gap height={25} />
  // </>

  //     <div
  //       className={`card card-flush bgi-no-repeat bgi-size-contain bgi-position-x-end bg-primary mb-2`}
  //       // style={{
  //       //   backgroundColor: color,
  //       //   backgroundImage: `url('${img}')`,
  //       // }}
  //     >
  //       <div className='card-header pt-5'>
  //         <div className='card-title d-flex flex-column'>
  //           <span className='fs-2hx fw-bold text-white me-2 lh-1 ls-n2'>
  //             69
  //           </span>

  //           <span className='text-white opacity-75 pt-1 fw-semibold fs-6'>
  //             {/* {description} */}
  //             Test
  //           </span>
  //         </div>
  //       </div>
  //       <div className='card-body d-flex align-items-end pt-0'>
  //         <div className='d-flex align-items-center flex-column mt-3 w-100'>
  //           <div className='d-flex justify-content-between fw-bold fs-6 text-white opacity-75 w-100 mt-auto mb-2'>
  //             <span>43 Pending</span>
  //             <span>72%</span>
  //           </div>

  //           <div className='h-8px mx-3 w-100 bg-white bg-opacity-50 rounded'>
  //             <div
  //               className='bg-white rounded h-8px'
  //               role='progressbar'
  //               style={{ width: '72%' }}
  //               aria-valuenow={50}
  //               aria-valuemin={0}
  //               aria-valuemax={100}
  //             ></div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
};
