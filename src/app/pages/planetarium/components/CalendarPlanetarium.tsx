import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import React, { useEffect, useState } from "react";
import idLocale from "@fullcalendar/core/locales/id";
import globalVar from "../../../helper/globalVar";
import usePlanetarium from "../../../modules/hooks/planetarium";
import { Card } from "react-bootstrap";

const CalendarPlanetarium = () => {
  const { allReservationPlanetarium } = usePlanetarium();
  const [eventCalendar, setEventCalendar] = useState<any>();

  const getDataCalendar = async (reservation: any[]) => {
    const events: any[] = [];
    reservation.map((itm) => {
      const date = new Date(itm.tanggalKunjungan);
      date.setDate(date.getDate() + 2);

      const data = {
        title: "Terpesan",
        start: itm?.tanggalKunjungan,
        color: "#0d6efd",
      };

      events.push(data);
    });

    setEventCalendar(events);
  };

  useEffect(() => {
    setTimeout(() => {
      getDataCalendar(allReservationPlanetarium);
    }, 200);
  }, []);

  return (
    <Card className="p-8">
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
        events={eventCalendar}
        eventContent={(eventInfo) => {
          return (
            <div role="button" className="fw-bold fst-italic p-1">
              {eventInfo.event.title}
            </div>
          );
        }}
      />
    </Card>
  );
};

export default CalendarPlanetarium;
