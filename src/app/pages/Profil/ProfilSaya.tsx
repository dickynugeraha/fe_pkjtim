import React, { useState } from "react";
import { Content } from "../../../_metronic/layout/components/content";
import HeadPage from "../../modules/widgets/components/HeadPage";
import ModalEditProfil from "./ModalEditProfil";
import Gap from "../../../_metronic/layout/components/content/Gap";

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
        <div>
          <div className="d-flex mb-1">
            <p className="fw-bold" style={{ width: "180px" }}>
              Nama lengkap
            </p>
            <p>Kale Pramono</p>
          </div>
          <div className="d-flex mb-1">
            <p className="fw-bold" style={{ width: "180px" }}>
              Nomor handphone
            </p>
            <p>08963214785</p>
          </div>
          <div className="d-flex">
            <p className="fw-bold" style={{ width: "180px" }}>
              Email
            </p>
            <p>kale@gmail.com</p>
          </div>
        </div>
      </div>
      <Gap height={32} />
      <div className="card p-8">
        <h4 className="mb-5">Ubah detail login</h4>
        <Gap height={24} />
        <div className="row row-cols-1 row-cols-md-2">
          <div className="col">
            <div className="mb-3">
              <p className="fw-bold">Email</p>
              <input
                type="email"
                className="form-control transparant"
                required
              />
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <p className="fw-bold">Konfirmasi kata sandi</p>
              <input
                type="password"
                className="form-control transparant"
                required
              />
            </div>
          </div>
        </div>
        <Gap height={10} />
        <div className="d-flex">
          <div className="btn btn-sm btn-primary" style={{ width: "180px" }}>
            Perbaharui email
          </div>
          <Gap width={12} />
          <div className="btn btn-sm btn-secondary" style={{ width: "100px" }}>
            Cancel
          </div>
        </div>
        <Gap height={42} />
        <div className="row row-cols-1 row-cols-md-3">
          <div className="col">
            <div className="mb-3">
              <p className="fw-bold">Kata sandi saat ini</p>
              <input
                type="password"
                className="form-control transparant"
                required
              />
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <p className="fw-bold">Kata sandi baru</p>
              <input
                type="password"
                className="form-control transparant"
                required
              />
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <p className="fw-bold">Konfirmasi kata sandi baru</p>
              <input
                type="password"
                className="form-control transparant"
                required
              />
            </div>
          </div>
        </div>
        <Gap height={10} />
        <div className="d-flex">
          <div className="btn btn-sm btn-primary" style={{ width: "180px" }}>
            Perbaharui kata sandi
          </div>
          <Gap width={12} />
          <div className="btn btn-sm btn-secondary" style={{ width: "100px" }}>
            Cancel
          </div>
        </div>
      </div>
      <ModalEditProfil show={showModal} hideModal={() => setShowModal(false)} />
    </Content>
  );
};

export default ProfilSaya;
