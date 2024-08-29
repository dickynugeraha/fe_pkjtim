import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

const TarifSewa = () => {
  return (
    <div className='col-12 col-lg-6'>
      <Card>
        <Card.Header className='d-flex align-items-center'>
          <h4 className='m-0'>Tarif Sewa</h4>
        </Card.Header>
        <Card.Body>
          <div className='row row-cols-2'>
            <div className='col-6 col-md-4'>
              <ul>
                <li>Teater Jakarta</li>
                <li>Teater kecil</li>
                <li>Plaza teater besar</li>
                <li>Plaza teater kecil</li>
                <li>Ruang latihan</li>
                <li>Persiapan/gladi</li>
              </ul>
            </div>
            <div>
              <ol className='m-0 p-0'>
                <ul>Rp. 50 jt/hari</ul>
                <ul>Rp. 12 jt/hari</ul>
                <ul>Rp. 1.5 jt/hari</ul>
                <ul>Rp. 1.3 jt/hari</ul>
                <ul>Rp. 1 jt/hari</ul>
                <ul>50% dari tarif</ul>
              </ol>
            </div>
          </div>
          <p className='text-danger'>
            *) Berdasarkan Retribusi Sesuai Perda No. 1 Tahun 2024
          </p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default TarifSewa;
