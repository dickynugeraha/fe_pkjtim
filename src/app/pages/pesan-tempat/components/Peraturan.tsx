import React from 'react';

const Peraturan = () => {
  return (
    <div className='col-12 col-lg-6'>
      <div className='card shadow-sm'>
        <div className='card-header d-flex align-items-center'>
          <h4 className='m-0 p-0 fw-bolder'>Peraturan</h4>
        </div>
        <div className='p-4'>
          <ol>
            <li className='mb-4'>
              <p className='fw-bold m-0'>Kegiatan yang Dilarang</p>
              <ul>
                <li>Politik/Ormas/Sekolah/Kampus</li>
                <li>Melanggar Hukum/ Norma -Melanggar Hak Cipta</li>
                <li>Melanggar Nilai Kemanusiaan</li>
                <li>Bernafas SARA/ Ujaran</li>
                <li>Kebencian -Keagamaan</li>
              </ul>
            </li>
            <li className='mb-4'>
              <p className='m-0 fw-bold'>Wajib mencantumkan</p>
              <ul>
                <li>Nama Kegiatan</li>
                <li>Genre Seni</li>
                <li>Tujuan Kegiatan</li>
                <li>Tanggal Waktu Kegiatan</li>
                <li>Gedung Yang Digunakan</li>
              </ul>
            </li>
            <li>
              <p className='m-0 fw-bold'>Wajib menyampaikan</p>
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
    </div>
  );
};

export default Peraturan;
