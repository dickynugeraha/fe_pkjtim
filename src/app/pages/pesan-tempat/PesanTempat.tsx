import React, { FC, useState } from "react";
import { Content } from "../../../_metronic/layout/components/content";
import { Link, useNavigate } from "react-router-dom";
import Peraturan from "./components/Peraturan";
import TarifSewa from "./components/TarifSewa";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";
import globalVar from "../../helper/globalVar";
import Gap from "../../../_metronic/layout/components/content/Gap";
import { Col, Row } from "react-bootstrap";
import useTempat from "../../modules/hooks/master-data/tempat";
import usePesanTempat from "../../modules/hooks/pesan-tempat";

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
export const PesanTempat: FC = () => {
  const [choosenTempat, setChoosenTempat] = useState<any>();
  const [startDate, setStartDate] = useState<any>();
  const [endDate, setEndDate] = useState<any>();

  const { tempat, loading } = useTempat();
  const { nextStepHandler } = usePesanTempat();
  const [termIsCheck, setTermIsCheck] = useState(false);

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
      onClick: () => void;
      data: any;
    };
    const InputRadio: React.FC<InputRadioProps> = ({
      title,
      onClick,
      data,
    }) => {
      return (
        <div className="d-flex align-items-center mb-2">
          <input
            defaultChecked={false}
            type="radio"
            id={data.id.toString()}
            name={data.id}
            className="form-check-input mx-3"
            value={data.id}
            onChange={onClick}
            checked={choosenTempat?.id === data.id}
            readOnly
          />
          <label htmlFor={data.id} className="ms-1">
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
              {tempat.map((val) => (
                <InputRadio
                  title={val.name}
                  onClick={() => setChoosenTempat(val)}
                  data={val}
                />
              ))}
            </div>
            <Gap height={12} />
            <h6>Pilih tanggal</h6>
            <div className="d-flex align-items-center">
              <input
                type="date"
                className="form-control form-control-solid"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min={globalVar.getThreeMonthsFromToday()}
                onKeyDown={(e) => e.preventDefault()}
              />
              <div>
                <p className="m-0 mx-3">s/d</p>
              </div>
              <input
                type="date"
                className="form-control form-control-solid"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={globalVar.getThreeMonthsFromToday()}
                onKeyDown={(e) => e.preventDefault()}
              />
            </div>
            <Gap height={10} />
            <button
              type="button"
              className="btn btn-primary"
              style={{ width: "150px" }}
              onClick={() => nextStepHandler(choosenTempat, startDate, endDate)}
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
        <div className="row g-8 mb-5">
          <Peraturan />
          <TarifSewa tempat={tempat} loading={loading} />
        </div>
        <div className="d-flex mb-5">
          <Persetujuan />
        </div>
        {termIsCheck && <FormPlace />}
      </Content>
    </>
  );
};
