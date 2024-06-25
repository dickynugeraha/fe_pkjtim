import React, { useState } from "react";
import { Content } from "../../../_metronic/layout/components/content";
import HeadPage from "../../modules/widgets/components/HeadPage";
import ModalEditProfil from "./ModalEditProfil";

const ProfilSaya = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <Content>
      <HeadPage icon="user" title="Profil Saya" pages="Profil Saya" />
      <div className="card p-8">
        <div className="d-flex justify-content-between align-items-center mb-8">
          <h4 className="m-0">Detail profil saya</h4>
          <p
            className="m-0 text-primary"
            onClick={() => setShowModal(true)}
            role="button"
          >
            Ubah data
          </p>
        </div>
        <div className="mb-5">
          <div className="d-flex mb-1">
            <p className="fw-bold" style={{ width: "180px" }}>
              Nama lengkap
            </p>
            <p>Kale Pramono</p>
          </div>
          <div className="d-flex mb-1">
            <p className="fw-bold" style={{ width: "180px" }}>
              Username
            </p>
            <p>kale_pramono</p>
          </div>
          <div className="d-flex mb-1">
            <p className="fw-bold" style={{ width: "180px" }}>
              Nomor handphone
            </p>
            <p>08963214785</p>
          </div>
          <div className="d-flex mb-1">
            <p className="fw-bold" style={{ width: "180px" }}>
              Email
            </p>
            <p>kale@gmail.com</p>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-lg-2">
          <div className="col">
            <div className="card p-4">
              <h4 className="mb-5">Ubah kata sandi</h4>
              <div className="d-flex mb-3">
                <p className="fw-bold" style={{ width: "300px" }}>
                  Kata sandi saat ini
                </p>
                <input type="password" className="form-control transparant" />
              </div>
              <div className="d-flex mb-3">
                <p className="fw-bold" style={{ width: "300px" }}>
                  Kata sandi baru
                </p>
                <input type="password" className="form-control transparant" />
              </div>
              <div className="d-flex mb-5">
                <p className="fw-bold" style={{ width: "300px" }}>
                  Konfirmasi kata sandi baru
                </p>
                <input type="password" className="form-control transparant" />
              </div>
              <div
                className="btn btn-sm btn-primary ms-auto"
                style={{ width: "180px" }}
              >
                Ubah kata sandi
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalEditProfil show={showModal} hideModal={() => setShowModal(false)} />
    </Content>
  );
};

export default ProfilSaya;
