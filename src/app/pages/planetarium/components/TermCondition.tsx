import React, { useState } from "react";
import { Card, Col, Modal } from "react-bootstrap";
import Gap from "../../../../_metronic/layout/components/content/Gap";
import ModalKegiatan from "./ModalKegiatan";
import { KTSVG } from "../../../../_metronic/helpers";

const dataKegiatan = [
  {
    title: "Detail Pertunjukan Planetarium Mini",
    desc: "Kegiatan berupa pemutaran simulasi langit di dalam kubah planetarium mini selama 15 s.d. 20 menit. Peserta mendapatkan penjelasan dari penceramah astronomi mengenai benda-benda langit apa saja yang terlihat serta pergerakannya di langit. Kuota peserta 20-25 orang tiap pertunjukan. Banyaknya sesi pertunjukan 3 s.d. 4 kali (tergantung waktu pelaksanaan).",
    syarat: [
      "Memiliki area tertutup (indoor) seluas minimal 6 x 6 meter.",
      "Memiliki daya listrik minimal 3.000 watt.",
      "Guru pendamping sebanyak 1 orang tiap pertunjukan untuk membantu mentertibkan peserta.",
    ],
    fasilitas: [
      "Penceramah Astronomy (1 orang) dan Teknisi (2 orang)",
      "Kubah Planetarium Mini berdiameter 5 meter dan tinggi 3 meter.",
      "Kipas blower (750 watt)",
      "Proyektor planetarium (550 watt)",
      "AC portable (1.135 watt)",
      "Laptop (180 watt)",
      "Sound system dan mic wireless (200 watt)",
    ],
  },
  {
    title: "Detail Diskusi Astronomy",
    desc: "Kegiatan berupa pemberian materi astronomi oleh penceramah astronomi di dalam kelas menggunakan power point. Pemaparan materi dilakukan selama 45 menit dan dilanjutkan dengan tanya jawab selama 15 menit. Kuota peserta maksimal 75 orang.",
    syarat: [
      "Memiliki ruang kelas yang dapat menampung sejumlah peserta.",
      "Menyediakan proyektor dan layar untuk presentasi.",
      "Menyediakan sound system.",
      "Guru pendamping di dalam kelas untuk membantu mentertibkan peserta.",
    ],
    fasilitas: [
      "Penceramah Astronomy (1 orang) dan Teknisi (1 orang).",
      "Laptop.",
    ],
  },
  {
    title: "Detail Peneropongan Matahari",
    desc: "Kegiatan berupa pengamatan Matahari menggunakan teleskop yang telah dilengkapi oleh filter matahari. Peserta akan dipandu oleh petugas dalam melakukan pengamatan. Kuota peserta 75 orang.",
    syarat: [
      "Kegiatan hanya dapat dilakukan saat cuaca cerah. ",
      "Memiliki area terbuka untuk melihat ke arah Matahari tanpa terhalangi bangunan atau pepohonan.",
      "Guru pendamping untuk membantu mentertibkan peserta..",
    ],
    fasilitas: [
      "Pemandu Observasi (1 orang) dan Teknisi (1 orang) ",
      "Teleskop Sky Watcher BK 120 EQ 5 dan Solar Filter",
    ],
  },
  {
    title: "Detail Percobaan Roket Air",
    desc: "Kegiatan berupa penjelasan dari narasumber mengenai konsep peluncuran roket serta mendemonstrasikan peluncuran roket menggunakan model Roket Air. Kuota peserta 75 orang.",
    syarat: [
      "Memiliki area terbuka sejauh minimal 10-15 meter untuk area peluncuran roket. Pastikan roket tidak akan membentur bangunan atau tersangkut di pohon.",
      "Menyediakan air minimal 15 liter.",
      "Guru pendamping untuk membantu mentertibkan peserta.",
      "Menyediakan Sound System.",
    ],
    fasilitas: [
      "Narasumber (1 orang) dan Teknisi (1 orang). ",
      "Perangkat Roket Air (2 set).",
    ],
  },
];

const TermCondition = () => {
  const [dataModalChoose, setDataModalChoose] = useState({
    title: "",
    desc: "",
    syarat: [],
    fasilitas: [],
  });
  const [showModal, setshowModal] = useState(false);
  const [modalTermAndCondition, setModalTermAndCondition] =
    useState<boolean>(false);

  return (
    <div className="row rows-col-1 rows-col-lg-2">
      <Col className="me-lg-4 mt-4">
        <ModalKegiatan
          show={showModal}
          hideModal={() => setshowModal(false)}
          desc={dataModalChoose.desc}
          title={dataModalChoose.title}
          syarat={dataModalChoose.syarat as []}
          fasilitas={dataModalChoose.fasilitas as []}
        />
        <Card>
          <Card.Header className="d-flex align-items-center">
            <h4 className="m-0 p-0">Syarat dan Ketentuan</h4>
          </Card.Header>
          <Card.Body className="d-flex flex-column">
            <div
              className="btn btn-light-primary"
              onClick={() => setModalTermAndCondition(true)}
            >
              Syarat dan Ketentuan Umum
            </div>
            <Gap height={18} />
            <div
              className="btn btn-light-primary"
              onClick={() => {
                setshowModal(true);
                setDataModalChoose({
                  title: dataKegiatan[0].title,
                  desc: dataKegiatan[0].desc,
                  syarat: dataKegiatan[0].syarat as [],
                  fasilitas: dataKegiatan[0].fasilitas as [],
                });
              }}
            >
              Syarat dan Ketenuan Planetarium Mini
            </div>
            <Gap height={18} />
            <div
              className="btn btn-light-primary"
              onClick={() => {
                setshowModal(true);
                setDataModalChoose({
                  title: dataKegiatan[1].title,
                  desc: dataKegiatan[1].desc,
                  syarat: dataKegiatan[1].syarat as [],
                  fasilitas: dataKegiatan[1].fasilitas as [],
                });
              }}
            >
              Syarat dan Ketentuan Diskusi Astronomy
            </div>
            <Gap height={18} />
            <div
              className="btn btn-light-primary"
              onClick={() => {
                setshowModal(true);
                setDataModalChoose({
                  title: dataKegiatan[2].title,
                  desc: dataKegiatan[2].desc,
                  syarat: dataKegiatan[2].syarat as [],
                  fasilitas: dataKegiatan[2].fasilitas as [],
                });
              }}
            >
              Syarat dan Ketenuan Peneropongan Matahari
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col className="ps-lg-4 mt-4">
        <Card>
          <Card.Header className="d-flex align-items-center">
            <h4 className="m-0 p-0">Berkas Yang Perlu Disiapkan</h4>
          </Card.Header>
          <Card.Body>
            <h5>Surat Undangan Resmi</h5>
            <p className="text-muted">
              *) Surat Undangan Resmi WAJIB ditandatangani Kepala Sekolah
            </p>
            <Gap height={12} />
            <h5>Lembar Pernyataan Persetujuan Peserta</h5>
            <p className="text-muted">
              *) Formulir dapat diunduh di bit.ly/pernyataanPGS
            </p>
          </Card.Body>
        </Card>
      </Col>
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
            <li>Pihak sekolah WAJIB mendaftar sesuai Tata Cara Pendaftaran</li>
            <li>
              Pihak sekolah menyediakan fasilitas transportasi untuk mobilisasi
              petugas dan membawa peralatan yang dibutuhkan. Jenis transportasi
              bergantung dari kegiatan yang dipilih oleh pihak sekolah.
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
            atau Diskusi Astronomy. Sedangkan untuk kegiatan di luar ruangan
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
    </div>
  );
};

export default TermCondition;
