import React, { FC, useState } from "react";
import { Content } from "../../../_metronic/layout/components/content";
import HeadPage from "../../modules/widgets/components/HeadPage";
import { Link, useNavigate } from "react-router-dom";

const PesanTempat: FC = () => {
  const [termIsCheck, setTermIsCheck] = useState(false);
  const [pesanTempatval, setPesanTempatval] = useState("teater_jakarta");
  const [tanggalPesanVal, setTanggalPesanVal] = useState("");
  const [hargaTempat, setHargaTempat] = useState("50 jt");

  const navigate = useNavigate();

  return (
    <Content>
      <HeadPage icon="geolocation" title="Pesan Tempat" pages="Pesan Tempat" />
      <div className="row g-8 mb-5">
        <div className="col-12 col-lg-6">
          <div className=" p-8 card">
            <h4 className="mb-5">Peraturan</h4>
            <ol>
              <li className="mb-4">
                <p className="fw-bold m-0">Kegiatan yang Dilarang</p>
                <ul>
                  <li>
                    Politik/Ormas/Sekolah/Kampus
                    <li>Melanggar Hukum/ Norma -Melanggar Hak Cipta</li>
                    <li>Melanggar Nilai Kemanusiaan</li>
                    <li>Bernafas SARA/ Ujaran</li>
                    <li>Kebencian -Keagamaan</li>
                  </li>
                </ul>
              </li>
              <li className="mb-4">
                <p className="m-0 fw-bold">Wajib mencantumkan</p>
                <ul>
                  <li>Nama Kegiatan</li>
                  <li>Genre Seni</li>
                  <li>Tujuan Kegiatan</li>
                  <li>Tanggal Waktu Kegiatan</li>
                  <li>Gedung Yang Digunakan</li>
                </ul>
              </li>
              <li>
                <p className="m-0 fw-bold">Wajib menyampaikan</p>
                <ul>
                  <li>Group Yang Akan Pentas</li>
                  <li>Rekam Jejak</li>
                  <li>Daftar Tim Artistik</li>
                  <li>Daftar Tim Produksi</li>
                  <li>Sumber Pendapatan</li>
                  <li>Budget Kegiatan</li>
                </ul>
              </li>
            </ol>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className=" p-8 card">
            <h4 className="mb-5">Tarif Sewa</h4>
            <table style={{ width: "65%", marginBottom: "8px" }}>
              <tr>
                <td>Teater Jakarta</td>
                <td>Rp. 50 jt/ hari</td>
              </tr>
              <tr>
                <td>Teater kecil</td>
                <td>Rp. 12 jt/ hari</td>
              </tr>
              <tr>
                <td>Plaza teater Jakarta</td>
                <td>Rp. 1.5 jt/ hari</td>
              </tr>
              <tr>
                <td>Ruang latihan</td>
                <td>Rp. 1 jt/ hari</td>
              </tr>
              <tr>
                <td>Shooting/ Photo profesional</td>
                <td>Rp. 2.7 jt/ hari</td>
              </tr>
              <tr>
                <td>Persiapan/gladi</td>
                <td>50% dari tarif</td>
              </tr>
            </table>
            <p className="text-danger">
              *) Berdasarkan Retribusi Sesuai Perda No. 1 Tahun 2024
            </p>
          </div>
        </div>
      </div>
      <div className="d-flex mb-5">
        <input
          type="checkbox"
          id="agree-terms"
          onClick={() => setTermIsCheck(!termIsCheck)}
          checked={termIsCheck}
        />
        <label className="ms-3" htmlFor="agree-terms">
          Saya sudah membaca dan menyetujui peraturan pemesanan tempat diatas
        </label>
      </div>
      {termIsCheck && (
        <div className="row">
          <div className="col-12 col-lg-6">
            <div className="card p-8">
              <div className="mb-4">
                <p className="fw-bold mb-1">Pilih tempat</p>
                <div className="d-flex align-items-center">
                  <input
                    type="radio"
                    id="teater-jakarta"
                    name="pesan_tempat"
                    className="ms-3"
                    value={pesanTempatval}
                    onClick={() => {
                      setPesanTempatval("teater_jakarta");
                      setHargaTempat("50 jt");
                    }}
                    checked={pesanTempatval === "teater_jakarta"}
                  />
                  <label htmlFor="teater-jakarta" className="ms-1">
                    Teater Jakarta
                  </label>
                </div>
                <div className="d-flex align-items-center">
                  <input
                    type="radio"
                    id="teater-kecil"
                    name="pesan_tempat"
                    value={pesanTempatval}
                    onClick={() => {
                      setPesanTempatval("teater_kecil");
                      setHargaTempat("12 jt");
                    }}
                    checked={pesanTempatval === "teater_kecil"}
                    className="ms-3"
                  />
                  <label htmlFor="teater-kecil" className="ms-1">
                    Teater kecil
                  </label>
                </div>
                <div className="d-flex align-items-center">
                  <input
                    type="radio"
                    id="plaza-jakarta"
                    name="pesan_tempat"
                    value={pesanTempatval}
                    onClick={() => {
                      setPesanTempatval("plaza_jakarta");
                      setHargaTempat("1.5 jt");
                    }}
                    checked={pesanTempatval === "plaza_jakarta"}
                    className="ms-3"
                  />
                  <label htmlFor="plaza-jakarta" className="ms-1">
                    Plaza Teater jakarta
                  </label>
                </div>
                <div className="d-flex align-items-center">
                  <input
                    type="radio"
                    id="ruang-latihan"
                    name="pesan_tempat"
                    value={pesanTempatval}
                    onClick={() => {
                      setPesanTempatval("ruang_latihan");
                      setHargaTempat("1 jt");
                    }}
                    checked={pesanTempatval === "ruang_latihan"}
                    className="ms-3"
                  />
                  <label htmlFor="ruang-latihan" className="ms-1">
                    Ruang latihan
                  </label>
                </div>
                <div className="d-flex align-items-center">
                  <input
                    type="radio"
                    id="shooting"
                    name="pesan_tempat"
                    value={pesanTempatval}
                    onClick={() => {
                      setPesanTempatval("shooting");
                      setHargaTempat("2.7 jt");
                    }}
                    checked={pesanTempatval === "shooting"}
                    className="ms-3"
                  />
                  <label htmlFor="shooting" className="ms-1">
                    Shooting/ Photo profesional
                  </label>
                </div>
                <div className="d-flex align-items-center">
                  <input
                    type="radio"
                    id="gladi"
                    name="pesan_tempat"
                    value={pesanTempatval}
                    onClick={() => {
                      setPesanTempatval("gladi");
                      setHargaTempat("50% dari tarif");
                    }}
                    checked={pesanTempatval === "gladi"}
                    className="ms-3"
                  />
                  <label htmlFor="gladi" className="ms-1">
                    Persiapan/gladi
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <p className="mb-1 fw-bold">Pilih tanggal</p>
                <input
                  type="date"
                  className="form-control"
                  onChange={(e) => setTanggalPesanVal(e.target.value)}
                  style={{ width: "200px" }}
                />
              </div>
              <button
                type="button"
                className="btn btn-primary"
                style={{ width: "150px" }}
                onClick={() =>
                  navigate(`/pesan-tempat/${pesanTempatval}`, {
                    state: { hargaTempat: hargaTempat },
                  })
                }
              >
                Selanjutnya
              </button>
            </div>
          </div>
        </div>
      )}
    </Content>
  );
};

export default PesanTempat;
