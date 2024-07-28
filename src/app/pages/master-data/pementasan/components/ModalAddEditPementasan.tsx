import React, { FC } from "react";
import ModalWrapper from "../../../../../_metronic/layout/components/content/ModalWrapper";
import Gap from "../../../../../_metronic/layout/components/content/Gap";

type PropsModalAddEditPementasan = {
  fromAdd: boolean;
  data: any;
  show: boolean;
  handleClose: () => void;
  handleSubmit: (data: any) => void;
};

const ModalAddEditPementasan: FC<PropsModalAddEditPementasan> = ({
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
      title={fromAdd ? "Tambah Pementasan" : "Ubah Pementasan"}
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
                  // src={gambarVal}
                />
              )}
              <Gap height={12} />
              <input className="form-control" type="file" required />
            </div>
            <div className="col"></div>
          </div>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="judul" className="fw-bold mb-2">
            Judul
          </label>
          <input
            id="judul"
            type="text"
            className="form-control form-control-solid"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="sinopsis" className="fw-bold mb-2">
            Sinopsis
          </label>
          <textarea
            name="sinopsis"
            id="sinopsis"
            className="form-control form-control-solid"
          ></textarea>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="nama_sanggar" className="fw-bold mb-2">
            Nama Sanggar
          </label>
          <input
            id="nama_sanggar"
            type="text"
            className="form-control form-control-solid"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="tipe_sanggar" className="fw-bold mb-2">
            Tipe Sanggar
          </label>
          <input
            id="tipe_sanggar"
            type="text"
            className="form-control form-control-solid"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="tipe_sanggar" className="fw-bold mb-2">
            Tanggal Pentas
          </label>
          <div className="d-flex align-items-center">
            <input type="date" name="start_service" className="form-control" />
            <p className="m-0 mx-3">s/d</p>
            <input type="date" name="end_service" className="form-control" />
          </div>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="tipe_sanggar" className="fw-bold mb-2">
            Tipe Sanggar
          </label>
          <input
            id="tipe_sanggar"
            type="text"
            className="form-control form-control-solid"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="JumlahPelakuSeni" className="fw-bold mb-2">
            Jumlah Pelaku Seni
          </label>
          <input
            id="JumlahPelakuSeni"
            type="text"
            className="form-control form-control-solid"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="JumlahPekerjaSeni" className="fw-bold mb-2">
            Jumlah Pekerja Seni
          </label>
          <input
            id="JumlahPekerjaSeni"
            type="text"
            className="form-control form-control-solid"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="jumlah_penonton" className="fw-bold mb-2">
            Jumlah Penonton
          </label>
          <input
            id="jumlah_penonton"
            type="text"
            className="form-control form-control-solid"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="status" className="fw-bold mb-3">
            Status
          </label>
          <select name="status" id="status" className="form-select">
            <option value="1">
              {/* <option value="1" selected={statusVal === "Terbit"}> */}
              Terbit
            </option>
            <option value="0">
              {/* <option value="0" selected={statusVal === "Draft"}> */}
              Draft
            </option>
          </select>
        </div>
      </>
    </ModalWrapper>
  );
};

export default ModalAddEditPementasan;
