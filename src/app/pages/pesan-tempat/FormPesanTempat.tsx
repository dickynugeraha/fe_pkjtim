import React, { FC } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Content } from "../../../_metronic/layout/components/content";
import HeadPage from "../../modules/widgets/components/HeadPage";
import { useFormik } from "formik";
import clsx from "clsx";

const FormPesanTempat: FC = () => {
  const params = useParams();
  const { state } = useLocation();
  let title;
  switch (params.jenis_tempat) {
    case "teater_jakarta":
      title = "Teater Jakarta";
      break;
    case "ruang_latihan":
      title = "Ruang Latihan";
      break;
    case "gladi":
      title = "Gladi Bersih";
      break;
    case "shooting":
      title = "Shooting/ Photo profesional";
      break;
    case "plaza_jakarta":
      title = "Plaza Jakarta";
      break;
    case "teater_kecil":
      title = "Teater Kecil";
      break;

    default:
      break;
  }

  console.log(params.jenis_tempat);
  console.log(state.hargaTempat);

  return (
    <Content>
      <HeadPage
        icon="geolocation"
        title="Form Pesan Tempat"
        pages="Pesan Tempat > Form Pesan Tempat"
      />
      <div className="card p-8">
        <div className="d-flex">
          <div>
            <p className="fw-bold">Tarif {title} </p>
            <p>{state.hargaTempat} / hari</p>
          </div>
          <div className="ms-5">
            <p className="fw-bold">Tanggal Pemesanan</p>
            <input type="date" disabled className="p-2" />
          </div>
        </div>
        <form></form>
      </div>
    </Content>
  );
};

export default FormPesanTempat;
