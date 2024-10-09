import React, { useState } from "react";
import Gap from "../../../../_metronic/layout/components/content/Gap";
import ModalKegiatan from "./ModalKegiatan";

const dataPeraturan = [
  {
    title: "Detail Pertunjukan Planetarium Mini",
    desc: "Kegiatan berupa pemutaran simulasi langit di dalam kubah planetarium mini selama 15 s.d. 20 menit. Peserta mendapatkan penjelasan dari penceramah astronomi mengenai benda-benda langit apa saja yang terlihat serta pergerakannya di langit. Kuota peserta 20-25 orang tiap pertunjukan. Banyaknya sesi pertunjukan 3 s.d. 4 kali (tergantung waktu pelaksanaan).",
    syarat: [
      "Memiliki area tertutup (indoor) seluas minimal 6 x 6 meter.",
      "Memiliki daya listrik minimal 3.000 watt.",
      "Guru pendamping sebanyak 1 orang tiap pertunjukan untuk membantu mentertibkan peserta.",
    ],
    fasilitas: [
      "Penceramah Astronomi (1 orang) dan Teknisi (2 orang)",
      "Kubah Planetarium Mini berdiameter 5 meter dan tinggi 3 meter.",
      "Kipas blower (750 watt)",
      "Proyektor planetarium (550 watt)",
      "AC portable (1.135 watt)",
      "Laptop (180 watt)",
      "Sound system dan mic wireless (200 watt)",
    ],
  },
  {
    title: "Detail Diskusi Astronomi",
    desc: "Kegiatan berupa pemberian materi astronomi oleh penceramah astronomi di dalam kelas menggunakan power point. Pemaparan materi dilakukan selama 45 menit dan dilanjutkan dengan tanya jawab selama 15 menit. Kuota peserta maksimal 75 orang.",
    syarat: [
      "Memiliki ruang kelas yang dapat menampung sejumlah peserta.",
      "Menyediakan proyektor dan layar untuk presentasi.",
      "Menyediakan sound system.",
      "Guru pendamping di dalam kelas untuk membantu mentertibkan peserta.",
    ],
    fasilitas: [
      "Penceramah Astronomi (1 orang) dan Teknisi (1 orang).",
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
  // {
  //   title: "Detail Percobaan Roket Air",
  //   desc: "Kegiatan berupa penjelasan dari narasumber mengenai konsep peluncuran roket serta mendemonstrasikan peluncuran roket menggunakan model Roket Air. Kuota peserta 75 orang.",
  //   syarat: [
  //     "Memiliki area terbuka sejauh minimal 10-15 meter untuk area peluncuran roket. Pastikan roket tidak akan membentur bangunan atau tersangkut di pohon.",
  //     "Menyediakan air minimal 15 liter.",
  //     "Guru pendamping untuk membantu mentertibkan peserta.",
  //     "Menyediakan Sound System.",
  //   ],
  //   fasilitas: [
  //     "Narasumber (1 orang) dan Teknisi (1 orang). ",
  //     "Perangkat Roket Air (2 set).",
  //   ],
  // },
];

const Peraturan = () => {
  const [dataModalChoose, setDataModalChoose] = useState({
    title: "",
    desc: "",
    syarat: [],
    fasilitas: [],
  });
  const [showModal, setshowModal] = useState(false);

  const Indoor = () => {
    return (
      <div>
        <h5 className="m-0">Indoor</h5>
        <p className="text-muted">Pilih salah satu</p>
        <div>
          <div className="card p-5">
            <div className="d-flex align-items-center justify-content-between">
              <div className="form-check d-flex align-items-center me-8">
                <input
                  type="radio"
                  id="planetarium_mini"
                  name="indoor"
                  value="planetarium_mini"
                  className="form-check-input me-8"
                />
                <div>
                  <h6 className="fw-bold m-0">Pertunjukan Planetarium Mini</h6>
                  <p className="m-0">
                    Kegiatan berupa pemutaran simulasi langit di dalam kubah
                    planetarium mini selama 15 s.d. 20 menit. Peserta
                    mendapatkan penvm njelasan dari penceramah astronomi
                    mengenai benda-benda langit apa saja yang terlihat serta
                    pergerakannya di langit.
                  </p>
                </div>
              </div>
              <div>
                <div
                  className="btn btn-sm text-primary p-0 m-0"
                  onClick={() => {
                    setshowModal(true);
                    setDataModalChoose({
                      title: dataPeraturan[0].title,
                      desc: dataPeraturan[0].desc,
                      syarat: dataPeraturan[0].syarat as [],
                      fasilitas: dataPeraturan[0].fasilitas as [],
                    });
                  }}
                >
                  Detail
                </div>
              </div>
            </div>
          </div>
          <Gap height={12} />
          <div className="card p-5">
            <div className="d-flex align-items-center justify-content-between">
              <div className="form-check d-flex align-items-center me-8">
                <input
                  type="radio"
                  id="diskusi_astronomi"
                  name="indoor"
                  value="diskusi_astronomi"
                  className="form-check-input me-8"
                />
                <div>
                  <h6 className="fw-bold m-0">Diskusi Astronomi</h6>
                  <p className="m-0">
                    Kegiatan berupa pemberian materi astronomi oleh penceramah
                    astronomi di dalam kelas menggunakan power point.
                  </p>
                </div>
              </div>
              <div>
                <div
                  className="btn btn-sm text-primary p-0 m-0"
                  onClick={() => {
                    setshowModal(true);
                    setDataModalChoose({
                      title: dataPeraturan[1].title,
                      desc: dataPeraturan[1].desc,
                      syarat: dataPeraturan[1].syarat as [],
                      fasilitas: dataPeraturan[1].fasilitas as [],
                    });
                  }}
                >
                  Detail
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Outdoor = () => {
    return (
      <div>
        <h5 className="m-0">Outdoor</h5>
        <p className="text-muted">Dapat memilih keduanya</p>
        <div>
          <div className="card p-5">
            <div className="d-flex align-items-center justify-content-between">
              <div className="form-check d-flex align-items-center me-8">
                <input
                  type="checkbox"
                  id="peneropongan_matahari"
                  name="outdoor"
                  value="peneropongan_matahari"
                  className="form-check-input me-8"
                />
                <div>
                  <h6 className="fw-bold m-0">Peneropongan Matahari</h6>
                  <p className="m-0">
                    Kegiatan berupa pengamatan Matahari menggunakan teleskop
                    yang telah dilengkapi oleh filter matahari.
                  </p>
                </div>
              </div>
              <div>
                <div
                  className="btn btn-sm text-primary p-0 m-0"
                  onClick={() => {
                    setshowModal(true);
                    setDataModalChoose({
                      title: dataPeraturan[2].title,
                      desc: dataPeraturan[2].desc,
                      syarat: dataPeraturan[2].syarat as [],
                      fasilitas: dataPeraturan[2].fasilitas as [],
                    });
                  }}
                >
                  Detail
                </div>
              </div>
            </div>
          </div>
          <Gap height={12} />
          {/* <div className="card p-5">
            <div className="d-flex align-items-center justify-content-between">
              <div className="form-check d-flex align-items-center me-8">
                <input
                  type="checkbox"
                  id="percobaan_roket_air"
                  name="outdoor"
                  value="percobaan_roket_air"
                  className="form-check-input me-8"
                />
                <div>
                  <h6 className="fw-bold m-0">Percobaan Roket Air</h6>
                  <p className="m-0">
                    Kegiatan berupa penjelasan dari narasumber mengenai konsep
                    peluncuran roket serta mendemonstrasikan peluncuran roket
                    menggunakan model Roket Air
                  </p>
                </div>
              </div>
              <div>
                <div
                  className="btn btn-sm text-primary p-0 m-0"
                  onClick={() => {
                    setshowModal(true);
                    setDataModalChoose({
                      title: dataPeraturan[3].title,
                      desc: dataPeraturan[3].desc,
                      syarat: dataPeraturan[3].syarat as [],
                      fasilitas: dataPeraturan[3].fasilitas as [],
                    });
                  }}
                >
                  Detail
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    );
  };

  return (
    <div>
      <ModalKegiatan
        show={showModal}
        hideModal={() => setshowModal(false)}
        desc={dataModalChoose.desc}
        title={dataModalChoose.title}
        syarat={dataModalChoose.syarat as []}
        fasilitas={dataModalChoose.fasilitas as []}
      />
      <Indoor />
      <Gap height={32} />
      <Outdoor />
    </div>
  );
};

export default Peraturan;
