import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import React, { useEffect, useState } from "react";
import idLocale from "@fullcalendar/core/locales/id";
import globalVar from "../../../helper/globalVar";
import usePlanetarium from "../../../modules/hooks/planetarium";
import { Card } from "react-bootstrap";
import axiosConfig from "../../../utils/services/axiosConfig";
import { ENDPOINTS } from "../../../constants/API";
import { DEFAULT_LIMIT, INITIAL_PAGE } from "../../../constants/PAGE";

const CalendarPlanetarium = () => {
  const { allReservationPlanetarium } = usePlanetarium();
  const [eventCalendar, setEventCalendar] = useState<any>();

  const getDataCalendar = async (reservation: any[]) => {
    const events: any[] = [];
    reservation.map((itm) => {
      const date = new Date(itm.tanggalKunjungan);
      date.setDate(date.getDate() + 2);

      const data = {
        title: itm?.status === "OPEN" ? "Tersedia" : "Terpesan",
        start: itm?.date,
        end: itm?.date,
        backgroundColor: itm?.status === "OPEN" ? "#20c997" : "gray",
      };

      events.push(data);
    });

    setEventCalendar(events);
  };

  const getAllReservationDate = async (
    Status: any,
    IsIncludePlanetarium?: any
  ) => {
    try {
      const res = await axiosConfig.get(
        `${ENDPOINTS.PLANETARIUM.LIST_UPDATE_ADD_DELETE_PLANETARIUM}/Dates`,
        {
          Status,
          IsIncludePlanetarium: true,
          Page: INITIAL_PAGE,
          Limit: DEFAULT_LIMIT,
        }
      );
      const dataReservationDate = res.data.data.data;
      getDataCalendar(dataReservationDate);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getAllReservationDate("Done");
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
            <div
              className="fw-bold fst-italic px-4 py-2 rounded text-light"
              style={{
                width: "100%",
                backgroundColor: eventInfo.event.backgroundColor,
              }}
            >
              {eventInfo.event.title}
            </div>
          );
        }}
      />
    </Card>
  );
};

export default CalendarPlanetarium;
