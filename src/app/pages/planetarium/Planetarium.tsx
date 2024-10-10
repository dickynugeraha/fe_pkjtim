import { useEffect, useState } from "react";
import { Content } from "../../../_metronic/layout/components/content";
import Gap from "../../../_metronic/layout/components/content/Gap";
import ModalInformationCustom from "../../../_metronic/layout/components/content/ModalInformationCustom";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";
import Kegiatan from "./components/Kegiatan";
import { Button, Col, Row, Card, Modal } from "react-bootstrap";
import globalVar from "../../helper/globalVar";
import usePlanetarium from "../../modules/hooks/planetarium";
import DatePicker from "react-datepicker";
import TermCondition from "./components/TermCondition";
import CalendarPlanetarium from "./components/CalendarPlanetarium";
import image_assets from "../../utils/image_assets";
import axiosConfig from "../../utils/services/axiosConfig";
import { ENDPOINTS } from "../../constants/API";
import { DEFAULT_LIMIT, INITIAL_PAGE } from "../../constants/PAGE";

const Breadcrumbs: Array<PageLink> = [
  {
    title: "Astronomi Goes to School",
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
  const { nextStepHandler } = usePlanetarium();
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
        description="Astronomi Goes To School"
      >
        Astronomi Goes To School
      </PageTitle>
      <Content>
        <Gap height={24} />
        <div className="d-flex justify-content-center">
          <img src={image_assets.Astronomi} className="rounded w-50" />
        </div>
        <Gap height={24} />
        <TermCondition />
        <Gap height={24} />
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
            <Gap height={12} />
            <FormPlace />
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
          onChange={() => setTermIsCheck(!termIsCheck)}
          checked={termIsCheck}
          defaultValue={""}
        />
        <label htmlFor="agree-terms-planet">
          Saya sudah membaca dan menyetujui syarat dan ketentuan khusus
          Astronomi Goes to School diatas
        </label>
      </div>
    );
  }
  function FormPlace() {
    const [dataDates, setDataDates] = useState<any[]>([]);

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
        const dataReservationDate: any[] = res.data.data.data;
        const dataReserve: any[] = [];
        dataReservationDate.map((data) => {
          dataReserve.push(new Date(globalVar.formatInputDate(data.date)));
        });
        setDataDates(dataReserve);
      } catch (error) {
        throw error;
      }
    };

    useEffect(() => {
      getAllReservationDate("OPEN");
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
                      <h6>Pilih Tanggal</h6>
                      <Gap height={12} />
                      <div role="button">
                        <DatePicker
                          selected={bookingDate}
                          onChange={(date) =>
                            setBookingDate(globalVar.formatInputDate(date))
                          }
                          includeDates={dataDates}
                          // filterDate={isTuesdayOrThursday}
                          minDate={new Date()}
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
