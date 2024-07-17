import React, { FC, useState } from "react";
import ModalWrapper from "../../../../../_metronic/layout/components/content/ModalWrapper";
import Gap from "../../../../../_metronic/layout/components/content/Gap";

type PropsModalAddEditSekilasInfo = {
  fromAdd: boolean;
  data: any;
  show: boolean;
  handleClose: () => void;
  handleSubmit: (data: any) => void;
};

const ModalAddEditTutupTempat: FC<PropsModalAddEditSekilasInfo> = ({
  fromAdd,
  show,
  handleClose,
  handleSubmit,
  data,
}) => {
  console.log("dataaaaaaaaaa", data);

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
          <label htmlFor="namaTempat" className="fw-bold">
            Nama Tempat
          </label>
          <Gap height={10} />
          <input
            type="text"
            name="namaTempat"
            id="namaTempat"
            className="form-control form-control-solid"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="" className="fw-bold mb-3">
            Pilih Tanggal Tutup Tempat
          </label>
          <div className="d-flex align-items-center">
            <input type="date" name="start_service" className="form-control" />
            <p className="m-0 mx-3">s/d</p>
            <input type="date" name="end_service" className="form-control" />
          </div>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default ModalAddEditTutupTempat;
