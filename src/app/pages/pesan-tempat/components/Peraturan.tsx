import React from "react";
import { Card } from "react-bootstrap";

const Peraturan = () => {
  return (
    <div className="col-12 col-lg-6">
      <Card>
        <Card.Header className="d-flex align-items-center">
          <h4 className="m-0 p-0">Peraturan</h4>
        </Card.Header>
        <Card.Body>
          <ol>
            <li className="mb-4">
              <h6 className="fw-bold m-0">Kegiatan yang Dilarang</h6>
              <ul>
                <li>Politik/Ormas/Sekolah/Kampus</li>
                <li>Melanggar Hukum/ Norma -Melanggar Hak Cipta</li>
                <li>Melanggar Nilai Kemanusiaan</li>
                <li>Bernafas SARA/ Ujaran</li>
                <li>Kebencian -Keagamaan</li>
              </ul>
            </li>
            <li className="mb-4">
              <h6 className="m-0 fw-bold">Wajib mencantumkan</h6>
              <ul>
                <li>Nama Kegiatan</li>
                <li>Genre Seni</li>
                <li>Tujuan Kegiatan</li>
                <li>Tanggal Waktu Kegiatan</li>
                <li>Gedung Yang Digunakan</li>
              </ul>
            </li>
            <li>
              <h6 className="m-0 fw-bold">Wajib menyampaikan</h6>
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
        </Card.Body>
      </Card>
    </div>
  );
};

export default Peraturan;
