import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import React, { useEffect, useState } from "react";
import idLocale from "@fullcalendar/core/locales/id";
import { Card } from "react-bootstrap";
import ModalDetailCalendar from "./ModalDetailCalendar";
import { getDashboardPlanetarium } from "../../../modules/requests/dashboard";

const CalendarPlanetarium = () => {
  const [eventCalendar, setEventCalendar] = useState<any>();
  const [modalDetailCalendar, setModalDetailCalendar] = useState({
    show: false,
    data: {},
  });

  const getDataCalendar = async (reservation: any[]) => {
    const events: any[] = [];
    reservation.map((itm) => {
      const baseDate = new Date(itm?.tanggalKunjungan);
      const date = new Date(itm?.tanggalKunjungan);
      date.setDate(date.getDate() + 1);

      const data = {
        title:
          itm?.status === "OPEN"
            ? "Tersedia"
            : itm?.status === "CLOSED"
            ? "Terjadwal"
            : "Menunggu Konfirmasi",
        start: date.toISOString().split("T")[0],
        end: date.toISOString().split("T")[0],
        eventDate: `${baseDate.toLocaleString("id", {
          weekday: "long",
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}`,
        color:
          itm?.status === "OPEN"
            ? "#0d6efd"
            : itm?.status === "CLOSED"
            ? "#198754"
            : "#6f42c1",
        namaSekolah:
          itm?.namaSekolah != null ? itm?.namaSekolah : undefined,
      };

      events.push(data);
    });

    setEventCalendar(events);
  };

  const getAllReservationDate = async () => {
    try {
      const res = await getDashboardPlanetarium(1, -1, "", []);

      const dataReservationDate = res.data.data;
      getDataCalendar(dataReservationDate);
    } catch (error) {
      throw error;
    }
  };

  const handleEventClick = (arg: any) => {
    setModalDetailCalendar({
      show: true,
      data: arg,
    });
  };

  useEffect(() => {
    getAllReservationDate();
  }, []);
  return (
    <>
      <Card className="p-8">
        <FullCalendar
          locale={idLocale}
          now={new Date()}
          height={555}
          initialDate={new Date()}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "title",
            center: "",
            right: "prev,today,next",
          }}
          events={eventCalendar}
          eventContent={(eventInfo) => {
            return (
              <div role="button" className="fw-bold fst-italic p-1">
                {eventInfo.event.title}
              </div>
            );
          }}
          eventClick={handleEventClick}
        />
      </Card>
      <ModalDetailCalendar
        show={modalDetailCalendar.show}
        data={modalDetailCalendar.data}
        handleClose={() => {
          setModalDetailCalendar({ show: false, data: {} });
        }}
      />
    </>
  );
};

export default CalendarPlanetarium;
