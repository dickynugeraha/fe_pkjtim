import { useState } from "react";
import { Content } from "../../../_metronic/layout/components/content";
import Gap from "../../../_metronic/layout/components/content/Gap";
import ModalInformationCustom from "../../../_metronic/layout/components/content/ModalInformationCustom";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";
import Kegiatan from "./components/Kegiatan";
import { Button, Col, Row, Card, Modal } from "react-bootstrap";
import globalVar from "../../helper/globalVar";
import usePlanetarium from "../../modules/hooks/planetarium";
import ModalWrapper from "../../../_metronic/layout/components/content/ModalWrapper";
import { KTSVG } from "../../../_metronic/helpers";

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
  const { nextStepHandler } = usePlanetarium();
  const [bookingDate, setBookingDate] = useState("");
  const [termIsCheck, setTermIsCheck] = useState(false);
  const [modalTermAndCondition, setModalTermAndCondition] =
    useState<boolean>(false);
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
          <Card.Header className="d-flex align-items-center justify-content-between">
            <h4 className="m-0 p-0">Pilih Kegiatan</h4>
            <div
              className="btn btn-light-primary btn-sm"
              onClick={() => setModalTermAndCondition(true)}
            >
              Syarat & Ketentuan Umum
            </div>
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
        <Modal
          size="lg"
          show={modalTermAndCondition}
          onHide={() => setModalTermAndCondition(false)}
          centered={true}
        >
          <Modal.Header>
            <div
              className="d-flex justify-content-between align-items-center"
              style={{ width: "100%" }}
            >
              <h4 className="m-0 p-0">{"Syarat dan ketentuan Umum"}</h4>
              <div
                className="btn btn-icon btn-sm btn-active-light-primary ms-2"
                onClick={() => setModalTermAndCondition(false)}
                aria-label="Close"
              >
                <KTSVG
                  path="media/icons/duotune/arrows/arr061.svg"
                  className="svg-icon svg-icon-2x"
                />
              </div>
            </div>
          </Modal.Header>
          <Modal.Body>
            <p className="fw-bold text-decoration-underline mb-1">
              SYARAT DAN KETENTUAN UMUM
            </p>
            <ol>
              <li>
                Sekolah peserta kegiatan merupakan sekolah tingkat SD s.d. SMP
                (sederajat) yang berada di wilayah DKI Jakarta dan sekitarnya.
              </li>
              <li>
                Pihak sekolah WAJIB memenuhi seluruh Syarat dan Ketentuan
                kegiatan.
              </li>
              <li>
                Penentuan tanggal kegiatan WAJIB melalui kesepakatan dengan
                narahubung Planetarium Jakarta dan tidak dapat diubah secara
                sepihak.
              </li>
              <li>
                Pihak sekolah WAJIB mendaftar sesuai Tata Cara Pendaftaran
              </li>
              <li>
                Pihak sekolah menyediakan fasilitas transportasi untuk
                mobilisasi petugas dan membawa peralatan yang dibutuhkan. Jenis
                transportasi bergantung dari kegiatan yang dipilih oleh pihak
                sekolah.
              </li>
              <li>
                Kebutuhan transportasi dan makan siang petugas ditanggung oleh
                pihak sekolah
              </li>
              <li>
                Demi kelancaran dan keamanan kegiatan, seluruh Peserta WAJIB
                mematuhi arahan dari pihak Planetarium Jakarta
              </li>
            </ol>
            <Gap height={12} />
            <p className="fw-bold text-decoration-underline mb-1">
              WAKTU KEGIATAN
            </p>
            <div className="d-flex">
              <p className="m-0" style={{ width: "7rem" }}>
                Hari Kerja
              </p>
              <p className="m-0">: Selasa atau Kamis</p>
            </div>
            <div className="d-flex">
              <p style={{ width: "7rem" }}>Pukul</p>
              <p>: 10.00 s.d. 13.30 WIB</p>
            </div>
            <Gap height={12} />
            <p className="fw-bold text-decoration-underline mb-1">
              BENTUK KEGIATAN
            </p>
            <p>
              Bentuk kegiatan terbagi menjadi dua jenis yaitu kegiatan di dalam
              ruangan (indoor) dan kegiatan di luar ruangan (outdoor). Untuk
              kegiatan di dalam ruangan, pihak sekolah dapat memilih
              <strong> salah satu</strong> antara Pertunjukan Planetarium Mini
              atau Diskusi Astronomi. Sedangkan untuk kegiatan di luar ruangan
              terdiri dari Peneropongan Matahari dan Percobaan Roket Air di mana
              pihak sekolah dapat memilih salah satu atau keduanya.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <div
              className="btn btn-sm btn-light"
              onClick={() => setModalTermAndCondition(false)}
            >
              Kembali
            </div>
          </Modal.Footer>
        </Modal>
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
