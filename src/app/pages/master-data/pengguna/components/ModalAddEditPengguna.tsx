import React, { FC, useState } from "react";
import ModalWrapper from "../../../../../_metronic/layout/components/content/ModalWrapper";
import Gap from "../../../../../_metronic/layout/components/content/Gap";

type PropsModalAddEditSekilasInfo = {
  fromAdd: boolean;
  isRoleKurator: boolean;
  data: any;
  show: boolean;
  handleClose: () => void;
  handleSubmit: (data: any) => void;
};

const ModalAddEditPengguna: FC<PropsModalAddEditSekilasInfo> = ({
  fromAdd,
  show,
  isRoleKurator,
  handleClose,
  handleSubmit,
  data,
}) => {
  const [isPreEvent, setIsPreEvent] = useState(false);
  let gambarVal = "",
    judulInfoVal = "",
    detailInfoVal = "",
    statusVal = "draft",
    startServiceVal = new Date().toDateString(),
    endServiceVal = new Date().toDateString();
  if (!fromAdd) {
    gambarVal = data?.gambar?.dummyImage;
    judulInfoVal = data?.judul_info;
    detailInfoVal = data?.detail_info;
    statusVal = data?.status;
    startServiceVal = data?.start_service;
    endServiceVal = data?.end_service;
  }

  const valueSelectOption = [
    { value: "komite_seni_rupa", text: "Komite Seni Rupa" },
    { value: "komite_tari", text: "Komite Tari" },
    { value: "komite_musik", text: "Komite Musik" },
    { value: "komite_sastra", text: "Komite Sastra" },
    { value: "komite_film", text: "Komite Film" },
    { value: "komite_teater", text: "Komite Teater" },
    { value: "lintas_komite", text: "Lintas Komite (komite bersama)" },
    { value: "komisi_filantropi", text: "Komisi Filantropi dan Simpul Seni" },
    { value: "komisi_arsip", text: "Komisi Arsip dan Riset" },
  ];

  return (
    <ModalWrapper
      title={fromAdd ? "Tambah Tutup Tempat" : "Ubah Tutup Tempat"}
      className="modal-md"
      attribute={{ centered: true }}
      show={show}
      handleClose={handleClose}
      footerCustom={
        <button
          type="submit"
          className="btn btn-sm btn-light-primary"
          onClick={() => handleSubmit("data")}
        >
          Simpan
        </button>
      }
    >
      <form>
        <div className="form-group mb-3">
          <label htmlFor="namaLengkap" className="fw-bold">
            Nama Lengkap
          </label>
          <Gap height={10} />
          <input
            type="text"
            name="namaLengkap"
            id="namaLengkap"
            className="form-control form-control-solid"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="email" className="fw-bold">
            Email
          </label>
          <Gap height={10} />
          <input
            type="email"
            name="email"
            id="email"
            className="form-control form-control-solid"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="noHp" className="fw-bold">
            Nomor Handphone
          </label>
          <Gap height={10} />
          <input
            type="number"
            name="noHp"
            id="noHp"
            className="form-control form-control-solid"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="status" className="fw-bold">
            Status
          </label>
          <Gap height={10} />
          <select name="status" id="status" className="form-select">
            <option value="user">User</option>
            <option value="pengelola">Pengelola</option>
            <option value="kurator">Kurator</option>
          </select>
        </div>

        {!fromAdd && isRoleKurator && (
          <div className="form-group mb-3">
            <label htmlFor="komite" className="fw-bold">
              Komite
            </label>
            <Gap height={10} />
            <select name="komite" id="komite" className="form-select">
              {valueSelectOption.map((data) => (
                <option value={data.value}>{data.text}</option>
              ))}
            </select>
          </div>
        )}
      </form>
    </ModalWrapper>
  );
};

export default ModalAddEditPengguna;
