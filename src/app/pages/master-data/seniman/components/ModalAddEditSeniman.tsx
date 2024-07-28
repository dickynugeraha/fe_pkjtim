import React, { FC } from "react";
import ModalWrapper from "../../../../../_metronic/layout/components/content/ModalWrapper";
import Gap from "../../../../../_metronic/layout/components/content/Gap";

type PropsModalAddEditSeniman = {
  fromAdd: boolean;
  data: any;
  show: boolean;
  handleClose: () => void;
  handleSubmit: (data: any) => void;
};

const ModalAddEditSeniman: FC<PropsModalAddEditSeniman> = ({
  fromAdd,
  show,
  handleClose,
  handleSubmit,
  data,
}) => {
  let gambarVal = "",
    judulSinopsis = "",
    namaSanggar = "",
    sinopsis = "",
    statusVal = "draft",
    startServiceVal = new Date().toDateString(),
    endServiceVal = new Date().toDateString();
  if (!fromAdd) {
    gambarVal = data?.gambar?.dummyImage;
    judulSinopsis = data?.judul_sinopsis;
    namaSanggar = data?.nama_sinopsis;
    // tipeSinopsis = data?.tipe_sinopsis;
    sinopsis = data?.detail_info;
    statusVal = data?.status;
    startServiceVal = data?.start_service;
    endServiceVal = data?.end_service;
  }
  return (
    <ModalWrapper
      title={fromAdd ? "Tambah Seniman" : "Ubah Seniman"}
      className="modal-md"
      attribute={{ centered: true }}
      show={show}
      handleClose={handleClose}
      footerCustom={
        <button
          type="submit"
          className="btn btn-sm btn-primary"
          onClick={() => handleSubmit("data")}
        >
          Simpan
        </button>
      }
    >
      <>
        <div className="form-group mb-3">
          <label htmlFor="" className="fw-bold mb-2">
            Gambar
          </label>
          <div className="row row-cols-lg-2">
            <div className="col">
              {!fromAdd && (
                <img
                  className="rounded"
                  style={{ height: "150px" }}
                  src={gambarVal}
                />
              )}
              <Gap height={12} />
              <input className="form-control" type="file" required />
            </div>
            <div className="col"></div>
          </div>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="nama_seniman" className="fw-bold mb-2">
            Nama Seniman
          </label>
          <input
            id="nama_seniman"
            type="text"
            className="form-control form-control-solid"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="biografi" className="fw-bold mb-2">
            Biografi
          </label>
          <textarea
            name="biografi"
            id="biografi"
            className="form-control form-control-solid"
          ></textarea>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="deskripsi_pentas" className="fw-bold mb-2">
            Deskripsi Pentas
          </label>
          <textarea
            name="deskripsi_pentas"
            id="deskripsi_pentas"
            className="form-control form-control-solid"
          ></textarea>
        </div>
      </>
    </ModalWrapper>
  );
};

export default ModalAddEditSeniman;
