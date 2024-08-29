import { useState } from "react";
import { Content } from "../../../_metronic/layout/components/content";
import { useNavigate } from "react-router-dom";
import Gap from "../../../_metronic/layout/components/content/Gap";
import ModalInformationCustom from "../../../_metronic/layout/components/content/ModalInformationCustom";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";
import Kegiatan from "./components/Kegiatan";
import { KTIcon } from "../../../_metronic/helpers";
import { Button, Col, Row, Card } from "react-bootstrap";
import globalVar from "../../helper/globalVar";
import usePlanetarium from "../../modules/hooks/planetarium";

const Breadcrumbs: Array<PageLink> = [
  {
    title: "Planetarium Goes to School",
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
  const navigate = useNavigate();
  const { nextStepHandler } = usePlanetarium();
  const [bookingDate, setBookingDate] = useState("");
  const [termIsCheck, setTermIsCheck] = useState(false);
  const [showFailedNext, setShowFailedNext] = useState({
    isShow: false,
    title: "",
    desc: "",
    variant: "failed",
  });
  const [indoor, setIndoor] = useState("");
  const [outdoor, setOutdoor] = useState({
    peneropongan_matahari: false,
    percobaan_roket_air: false,
  });

  const nextButtonSubmit = () => {
    if (!bookingDate) {
      setShowFailedNext({
        isShow: true,
        title: "Gagal Melakukan Pesanan",
        desc: "Silahkan isi form booking",
        variant: "failed",
      });
      return;
    }

    navigate(`/form-planetarium`, {
      state: { bookingDate: bookingDate },
    });
  };

  return (
    <>
      <PageTitle
        icon="moon"
        breadcrumbs={Breadcrumbs}
        description="Planetarium Goes To School"
      >
        Planetarium Goes To School
      </PageTitle>
      <Content>
        <ModalInformationCustom
          title={showFailedNext.title}
          desc={showFailedNext.desc}
          show={showFailedNext.isShow}
          onHide={() => {
            setShowFailedNext((prevState) => ({
              ...prevState,
              isShow: false,
            }));
          }}
          variant={showFailedNext.variant}
        />
        <Card>
          <Card.Header className="d-flex align-items-center">
            <h4 className="m-0 p-0">Pilih Kegiatan</h4>
          </Card.Header>
          <Card.Body>
            <Kegiatan
              indoor={indoor}
              outdoor={outdoor}
              setIndoor={(e) => setIndoor(e)}
              setOutdoor={(e) => setOutdoor(e)}
            />
          </Card.Body>
        </Card>
        <Gap height={24} />
        <Persetujuan />
        <Gap height={24} />
        {termIsCheck && <FormPlace />}
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
          onClick={() => setTermIsCheck(!termIsCheck)}
          checked={termIsCheck}
        />
        <label htmlFor="agree-terms-planet">
          Saya sudah membaca dan menyetujui syarat dan ketentuan khusus
          Planetarium Goes to School diatas
        </label>
      </div>
    );
  }
  function FormPlace() {
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
                      <input
                        type="date"
                        className="form-control form-control-solid"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        min={globalVar.getThreeMonthsFromToday()}
                      />
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
