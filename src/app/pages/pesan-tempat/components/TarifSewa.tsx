import React from "react";
import { Col, Row } from "react-bootstrap";

const TarifSewa = () => {
  return (
    <div className="col-12 col-lg-6">
      <div className="card">
        <div className="card-header d-flex align-items-center">
          <h4 className="m-0">Tarif Sewa</h4>
        </div>
        <div className="card-body">
          <Row>
            <Col>
              <ul>
                <li>Teater Jakarta</li>
                <li>Teater kecil</li>
                <li>Plaza teater besar</li>
                <li>Plaza teater kecil</li>
                <li>Ruang latihan</li>
                <li>Persiapan/gladi</li>
              </ul>
            </Col>
            <Col>
              <ol>
                <ul>Rp. 50 jt/hari</ul>
                <ul>Rp. 12 jt/hari</ul>
                <ul>Rp. 1.5 jt/hari</ul>
                <ul>Rp. 1.3 jt/hari</ul>
                <ul>Rp. 1 jt/hari</ul>
                <ul>50% dari tarif</ul>
              </ol>
            </Col>
          </Row>
          <p className="text-danger">
            *) Berdasarkan Retribusi Sesuai Perda No. 1 Tahun 2024
          </p>
        </div>
      </div>
    </div>
  );
};

export default TarifSewa;
