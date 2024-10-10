import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import React, { useEffect, useState } from "react";
import idLocale from "@fullcalendar/core/locales/id";
import { Card } from "react-bootstrap";
import axiosConfig from "../../../utils/services/axiosConfig";
import { ENDPOINTS } from "../../../constants/API";
import { DEFAULT_LIMIT, INITIAL_PAGE } from "../../../constants/PAGE";
import ModalDetailCalendar from "./ModalDetailCalendar";

const CalendarPlanetarium = () => {
  const [eventCalendar, setEventCalendar] = useState<any>();
  const [modalDetailCalendar, setModalDetailCalendar] = useState({
    show: false,
    data: {},
  });


  const getDataCalendar = async (reservation: any[]) => {
    const events: any[] = [];
    reservation.map((itm) => {
      const baseDate = new Date(itm?.date);
      const date = new Date(itm?.date);
      date.setDate(date.getDate() + 1);

      const data = {
        title: itm?.status === "OPEN" ? "Tersedia" : itm?.planetarium.status === "DONE" ? "Terjadwal" : "Menunggu Konfirmasi",
        start: date.toISOString().split("T")[0],
        end: date.toISOString().split("T")[0],
        eventDate: `${baseDate.toLocaleString("id", { weekday: "long",day:"2-digit",month:"long",year:"numeric" })}`,
        color: itm?.status === "OPEN" ? "#0d6efd" : itm?.planetarium.status === "DONE" ? "#198754" : "#6f42c1",
        namaSekolah: itm?.planetarium != null ? itm?.planetarium?.namaSekolah : undefined,
      };

      events.push(data);
    });

    setEventCalendar(events);
  };

  const getAllReservationDate = async (
    Status?: string,
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

  const handleEventClick = (arg: any) => {
    setModalDetailCalendar({
      show: true,
      data: arg,
    });
  };

  useEffect(() => {
    getAllReservationDate("");
  }, []);
  return (
    <>
    <Card className="p-8">
      <FullCalendar
        locale={idLocale}
        now={new Date()}
        height={555}
        initialDate={new Date}
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
