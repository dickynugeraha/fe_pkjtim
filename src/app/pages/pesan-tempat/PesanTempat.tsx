import React, { FC, useState } from 'react';
import { Content } from '../../../_metronic/layout/components/content';
import { Link, useNavigate } from 'react-router-dom';
import Peraturan from './components/Peraturan';
import TarifSewa from './components/TarifSewa';
import { PageLink, PageTitle } from '../../../_metronic/layout/core';
import globalVar from '../../helper/globalVar';
import { Button, Col, Row } from 'react-bootstrap';
import { KTIcon } from '../../../_metronic/helpers';

const Breadcrumbs: Array<PageLink> = [
  {
    title: 'Pesan Tempat',
    path: '/pesan-tempat',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
];
const PesanTempat: FC = () => {
  const [termIsCheck, setTermIsCheck] = useState(false);
  const [pesanTempatval, setPesanTempatval] = useState('teater_jakarta');
  const [tanggalPesanVal, setTanggalPesanVal] = useState('');
  const [hargaTempat, setHargaTempat] = useState('50 jt');

  const [selectedDate, setSelectedDate] = useState('');

  // Array of disabled dates in 'YYYY-MM-DD' format
  const disabledDates = ['2024-10-2', '2024-10-3', '2024-10-4'];

  const handleDateChange = (event: { target: { value: any } }) => {
    const newDate = event.target.value;
    if (disabledDates.includes(newDate)) {
      alert('This date is disabled. Please choose another date.');
      setSelectedDate('');
    } else {
      setSelectedDate(newDate);
    }
  };

  // Disable specific dates
  const isDisabledDate = (date: string) => {
    return disabledDates.includes(date);
  };

  const navigate = useNavigate();

  const Persetujuan = () => {
    return (
      <div className='form-check'>
        <input
          type='checkbox'
          id='agree-terms'
          className='form-check-input'
          onClick={() => setTermIsCheck(!termIsCheck)}
          checked={termIsCheck}
        />
        <label
          className='form-check-label text-black theme-light-show'
          htmlFor='agree-terms'
        >
          Saya sudah membaca dan menyetujui peraturan pemesanan tempat diatas
        </label>
        <label
          className='form-check-label text-white theme-dark-show'
          htmlFor='agree-terms'
        >
          Saya sudah membaca dan menyetujui peraturan pemesanan tempat diatas
        </label>
      </div>
    );
  };
  const FormPlace = () => {
    return (
      <Row>
        <Col lg={6}>
          <div className='card'>
            <div className='card-header d-flex align-items-center'>
              <h4 className='m-0 fw-bolder'>Pilih Tempat dan Tanggal Acara</h4>
            </div>
            <div className='card-body'>
              <div className='mb-4'>
                <label className='form-label fs-6 fw-bold mb-1'>Pilih tempat</label>
                <div className='form-group'>
                  <div className='form-check d-flex align-items-center mb-2'>
                    <input
                      type='radio'
                      id='teater-jakarta'
                      name='pesan_tempat'
                      className='form-check-input'
                      value={pesanTempatval}
                      onClick={() => {
                        setPesanTempatval('teater_jakarta');
                        setHargaTempat('50 jt');
                      }}
                      checked={pesanTempatval === 'teater_jakarta'}
                    />
                    <label htmlFor='teater-jakarta' className='ms-1'>
                      Teater Jakarta
                    </label>
                  </div>
                  <div className='form-check d-flex align-items-center mb-2'>
                    <input
                      type='radio'
                      id='teater-kecil'
                      name='pesan_tempat'
                      value={pesanTempatval}
                      onClick={() => {
                        setPesanTempatval('teater_kecil');
                        setHargaTempat('12 jt');
                      }}
                      checked={pesanTempatval === 'teater_kecil'}
                      className='form-check-input'
                    />
                    <label htmlFor='teater-kecil' className='ms-1'>
                      Teater kecil
                    </label>
                  </div>
                  <div className='form-check d-flex align-items-center mb-2'>
                    <input
                      type='radio'
                      id='plaza-jakarta'
                      name='pesan_tempat'
                      value={pesanTempatval}
                      onClick={() => {
                        setPesanTempatval('plaza_jakarta');
                        setHargaTempat('1.5 jt');
                      }}
                      checked={pesanTempatval === 'plaza_jakarta'}
                      className='form-check-input'
                    />
                    <label htmlFor='plaza-jakarta' className='ms-1'>
                      Plaza Teater jakarta
                    </label>
                  </div>
                  <div className='form-check d-flex align-items-center mb-2'>
                    <input
                      type='radio'
                      id='ruang-latihan'
                      name='pesan_tempat'
                      value={pesanTempatval}
                      onClick={() => {
                        setPesanTempatval('ruang_latihan');
                        setHargaTempat('1 jt');
                      }}
                      checked={pesanTempatval === 'ruang_latihan'}
                      className='form-check-input'
                    />
                    <label htmlFor='ruang-latihan' className='ms-1'>
                      Ruang latihan
                    </label>
                  </div>
                  <div className='form-check d-flex align-items-center mb-2'>
                    <input
                      type='radio'
                      id='shooting'
                      name='pesan_tempat'
                      value={pesanTempatval}
                      onClick={() => {
                        setPesanTempatval('shooting');
                        setHargaTempat('2.7 jt');
                      }}
                      checked={pesanTempatval === 'shooting'}
                      className='form-check-input'
                    />
                    <label htmlFor='shooting' className='ms-1'>
                      Shooting/ Photo profesional
                    </label>
                  </div>
                  <div className='form-check d-flex align-items-center mb-2'>
                    <input
                      type='radio'
                      id='gladi'
                      name='pesan_tempat'
                      value={pesanTempatval}
                      onClick={() => {
                        setPesanTempatval('gladi');
                        setHargaTempat('50% dari tarif');
                      }}
                      checked={pesanTempatval === 'gladi'}
                      className='form-check-input'
                    />
                    <label htmlFor='gladi' className='ms-1'>
                      Persiapan/gladi
                    </label>
                  </div>
                </div>
              </div>
              <Row>
                <Col lg={6}>
                  <div className='mb-4'>
                    <label className='form-label fs-6 mb-1 fw-bold'>Pilih tanggal</label>
                    <input
                      type='date'
                      className='form-control form-control-solid'
                      value={selectedDate}
                      onChange={handleDateChange}
                      // value={tanggalPesanVal}
                      // onChange={(e) => setTanggalPesanVal(e.target.value)}
                      style={
                        disabledDates.includes(selectedDate)
                          ? { filter: 'grayscale(100%)' }
                          : {}
                      }
                      min={globalVar.getThreeMonthsFromToday()}
                      onKeyDown={(e) => e.preventDefault()}
                    />
                  </div>
                </Col>
              </Row>
              <Button
                variant='primary'
                type='button'
                onClick={() =>
                  navigate(`/pesan-tempat/${pesanTempatval}`, {
                    state: { hargaTempat: hargaTempat },
                  })
                }
              >
                Isi Form Pesan Tempat{' '}
                <KTIcon iconName='entrance-left' className='fs-2x'></KTIcon>
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    );
  };
  return (
    <>
      <PageTitle
        icon='geolocation'
        breadcrumbs={Breadcrumbs}
        description='Pesan Tempat'
      >
        Pesan Tempat
      </PageTitle>
      <Content>
        {/* <HeadPage
          icon="geolocation"
          title="Pesan Tempat"
          pages="Pesan Tempat"
        /> */}
        <div className='row g-8 mb-5'>
          <Peraturan />
          <TarifSewa />
        </div>
        <div className='d-flex mb-5'>
          <Persetujuan />
        </div>
        {termIsCheck && <FormPlace />}
      </Content>
    </>
  );
};

export default PesanTempat;
