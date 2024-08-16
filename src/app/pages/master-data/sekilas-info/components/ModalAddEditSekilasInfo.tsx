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

const ModalAddEditSekilasInfo: FC<PropsModalAddEditSekilasInfo> = ({
  fromAdd,
  show,
  handleClose,
  handleSubmit,
  data,
}) => {
  const [placeIsClose, setPlaceIsClose] = useState(false);
  const [choosenLocation, setChoosenLocation] = useState("teater_besar");
  let gambarVal = "",
    judulInfoVal = "",
    detailInfoVal = "",
    statusVal = "draft",
    pilihTempatVal = choosenLocation,
    startServiceVal = new Date().toDateString(),
    endServiceVal = new Date().toDateString();
  if (!fromAdd) {
    gambarVal = data?.gambar?.dummyImage;
    judulInfoVal = data?.judul_info;
    detailInfoVal = data?.detail_info;
    statusVal = data?.status;
    pilihTempatVal = data?.pilih_tempat;
    startServiceVal = data?.start_service;
    endServiceVal = data?.end_service;
  }
  const [formValue, setFormValue] = useState({
    file: "",
    title: "",
    content: "",
    status: "",
    publishedAt: "",
    tempatId: "",
  });

  return (
    <ModalWrapper
      title={fromAdd ? "Tambah Info" : "Ubah Info"}
      className="modal-md"
      attribute={{ centered: true }}
      show={show}
      handleClose={handleClose}
      footerCustom={
        <button
          type="submit"
          className="btn btn-sm btn-primary"
          onClick={() => handleSubmit({})}
        >
          Simpan
        </button>
      }
    >
      <form>
        <div>
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
        <Gap height={20} />
        <div className="form-group mb-3">
          <label htmlFor="judulInfo" className="fw-bold">
            Judul Info
          </label>
          <Gap height={10} />
          <input
            value={judulInfoVal}
            type="text"
            name="judulInfo"
            id="judulInfo"
            className="form-control form-control-solid"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="detailInfo" className="fw-bold">
            Detail Info
          </label>
          <Gap height={10} />
          <textarea
            name="detailInfo"
            id="detailInfo"
            className="form-control form-control-solid"
            value={detailInfoVal}
          ></textarea>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="status" className="fw-bold mb-3">
            Status
          </label>
          <select name="status" id="status" className="form-select">
            <option value="1" selected={statusVal === "Terbit"}>
              Terbit
            </option>
            <option value="0" selected={statusVal === "Draft"}>
              Draft
            </option>
          </select>
        </div>
        <div className="my-5 d-flex align-items-center">
          <input
            id="placeIsClose"
            type="checkbox"
            className="form-check-input me-3"
            onChange={() => setPlaceIsClose(!placeIsClose)}
            checked={placeIsClose}
          />
          <label htmlFor="placeIsClose">Tutup Tempat</label>
        </div>
        {placeIsClose && (
          <>
            <div className="form-group mb-3">
              <label htmlFor="pilihTempat" className="fw-bold mb-3">
                Pilih Tempat
              </label>
              <select
                id="pilihTempat"
                className="form-select"
                onChange={(e) => setChoosenLocation(e.target.value)}
              >
                <option value="teater_besar">Teater Besar</option>
                <option value="teater_kecil">Teater Kecil</option>
                <option value="plaza_teater_besar">Plaza Teater Besar</option>
                <option value="plaza_teater_kecil">Plaza Teater Kecil</option>
                <option value="ruang_latihan">Ruang Latihan</option>
              </select>
            </div>
            <Gap height={24} />
            <label htmlFor="" className="fw-bold mb-3">
              Pilih Tanggal Tutup Layanan
            </label>
            <div className="d-flex align-items-center">
              <input
                type="date"
                name="start_service"
                className="form-control"
              />
              <p className="m-0 mx-3">s/d</p>
              <input type="date" name="end_service" className="form-control" />
            </div>
          </>
        )}
      </form>
    </ModalWrapper>
  );
};

export default ModalAddEditSekilasInfo;
