import React, { FC, useState } from "react";
import { Content } from "../../../_metronic/layout/components/content";
import { Link, useNavigate } from "react-router-dom";
import Peraturan from "./components/Peraturan";
import TarifSewa from "./components/TarifSewa";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";
import globalVar from "../../helper/globalVar";
import Gap from "../../../_metronic/layout/components/content/Gap";
import { Col, Row } from "react-bootstrap";

const Breadcrumbs: Array<PageLink> = [
  {
    title: "Pesan Tempat",
    path: "/pesan-tempat",
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
const PesanTempat: FC = () => {
  const [termIsCheck, setTermIsCheck] = useState(false);
  const [pesanTempatval, setPesanTempatval] = useState("teater_jakarta");
  const [startBook, setStartBook] = useState("");
  const [endBook, setEndBook] = useState("");
  const [hargaTempat, setHargaTempat] = useState("50 jt");

  const [selectedDate, setSelectedDate] = useState("");

  // Array of disabled dates in 'YYYY-MM-DD' format
  const disabledDates = ["2024-10-2", "2024-10-3", "2024-10-4"];

  const handleDateChange = (event: { target: { value: any } }) => {
    const newDate = event.target.value;
    if (disabledDates.includes(newDate)) {
      alert("This date is disabled. Please choose another date.");
      setSelectedDate("");
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
      <div className="form-check d-flex align-items-center">
        <input
          type="checkbox"
          id="agree-terms"
          className="form-check-input me-4"
          onClick={() => setTermIsCheck(!termIsCheck)}
          checked={termIsCheck}
        />
        <label htmlFor="agree-terms">
          Saya sudah membaca dan menyetujui peraturan pemesanan tempat diatas
        </label>
      </div>
    );
  };
  const FormPlace = () => {
    type InputRadioProps = {
      title: string;
      id: string;
      hargaTempat: string;
    };
    const InputRadio: React.FC<InputRadioProps> = ({
      title,
      id,
      hargaTempat,
    }) => {
      return (
        <div className="d-flex align-items-center mb-2">
          <input
            type="radio"
            id={id}
            name="pesan_tempat"
            className="form-check-input mx-3"
            value={pesanTempatval}
            onClick={() => {
              setPesanTempatval(id);
              setHargaTempat(hargaTempat);
            }}
            checked={pesanTempatval === id}
          />
          <label htmlFor={id} className="ms-1">
            {title}
          </label>
        </div>
      );
    };

    return (
      <div className="row">
        <div className="col-12 col-lg-6">
          <div className="card p-8">
            <div className="mb-4">
              <h6>Pilih tempat</h6>
              <InputRadio
                title={"Teater Jakarta"}
                id={"teater_jakarta"}
                hargaTempat="50 jt"
              />
              <InputRadio
                title={"Teater Kecil"}
                id={"teater_kecil"}
                hargaTempat="12 jt"
              />
              <InputRadio
                title={"Plaza Jakarta"}
                id={"plaza_jakarta"}
                hargaTempat="1.5 jt"
              />
              <InputRadio
                title={"Ruang Latihan"}
                id={"ruang_latihan"}
                hargaTempat="1 jt"
              />
              <InputRadio
                title={"Shooting/ Photo profesional"}
                id={"shooting"}
                hargaTempat="2.7 jt"
              />
              <InputRadio
                title={"Persiapan Gladi"}
                id={"gladi"}
                hargaTempat="50% dari gaji"
              />
            </div>
            <Gap height={12} />
            <h6>Pilih tanggal</h6>
            <div className="d-flex align-items-center">
              <input
                type="date"
                className="form-control form-control-solid w-lg-25"
                // value={selectedDate}
                // onChange={handleDateChange}
                value={startBook}
                onChange={(e) => setStartBook(e.target.value)}
                min={globalVar.getThreeMonthsFromToday()}
                onKeyDown={(e) => e.preventDefault()}
              />
              <div>
                <p className="m-0 mx-3">s/d</p>
              </div>
              <input
                type="date"
                className="form-control form-control-solid w-lg-25"
                // value={selectedDate}
                // onChange={handleDateChange}
                value={endBook}
                onChange={(e) => setEndBook(e.target.value)}
                min={globalVar.getThreeMonthsFromToday()}
                onKeyDown={(e) => e.preventDefault()}
              />
            </div>
            <Gap height={10} />
            <button
              type="button"
              className="btn btn-primary"
              style={{ width: "150px" }}
              onClick={() => {
                if (!hargaTempat || !startBook) {
                  return;
                }
                navigate(`/pesan-tempat/${pesanTempatval}`, {
                  state: {
                    hargaTempat: hargaTempat,
                    tanggalPesan: startBook,
                  },
                });
              }}
            >
              Selanjutnya
            </button>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      <PageTitle
        icon="geolocation"
        breadcrumbs={Breadcrumbs}
        description="Pesan Tempat"
      >
        Pesan Tempat
      </PageTitle>
      <Content>
        {/* <HeadPage
          icon="geolocation"
          title="Pesan Tempat"
          pages="Pesan Tempat"
        /> */}
        <div className="row g-8 mb-5">
          <Peraturan />
          <TarifSewa />
        </div>
        <div className="d-flex mb-5">
          <Persetujuan />
        </div>
        {termIsCheck && <FormPlace />}
      </Content>
    </>
  );
};

export default PesanTempat;
