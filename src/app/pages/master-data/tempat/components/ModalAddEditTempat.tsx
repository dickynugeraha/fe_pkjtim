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

const ModalAddEditTempat: FC<PropsModalAddEditSekilasInfo> = ({
  fromAdd,
  show,
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

  return (
    <ModalWrapper
      title={fromAdd ? "Tambah Tempat" : "Ubah Tempat"}
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
          <label htmlFor="mainEventKerja" className="fw-bold">
            Harga Main Event (Hari Kerja)
          </label>
          <Gap height={10} />
          <input
            type="text"
            name="mainEventKerja"
            id="mainEventKerja"
            className="form-control form-control-solid"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="mainEventWeekend" className="fw-bold">
            Harga Main Event (Akhir Pekan)
          </label>
          <Gap height={10} />
          <input
            type="text"
            name="mainEventWeekend"
            id="mainEventWeekend"
            className="form-control form-control-solid"
          />
        </div>

        <div className="my-5 d-flex align-items-center">
          <input
            id="placeIsClose"
            type="checkbox"
            className="form-check-input me-3"
            onChange={() => setIsPreEvent(!isPreEvent)}
            checked={isPreEvent}
          />
          <label htmlFor="placeIsClose">Pre-Event</label>
        </div>
        {isPreEvent && (
          <>
            <div className="form-group mb-3">
              <label htmlFor="preEventKerja" className="fw-bold">
                Harga Pre-Event (Hari Kerja)
              </label>
              <Gap height={10} />
              <input
                type="text"
                name="preEventKerja"
                id="preEventKerja"
                className="form-control form-control-solid"
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="preEventWekeend" className="fw-bold">
                Harga Pre-Event (Akhir Pekan)
              </label>
              <Gap height={10} />
              <input
                type="text"
                name="preEventWekeend"
                id="preEventWekeend"
                className="form-control form-control-solid"
              />
            </div>
          </>
        )}
      </form>
    </ModalWrapper>
  );
};

export default ModalAddEditTempat;
