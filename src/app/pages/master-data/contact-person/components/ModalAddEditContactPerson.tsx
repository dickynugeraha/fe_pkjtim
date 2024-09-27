import React, { FC, useState } from "react";
import ModalWrapper from "../../../../../_metronic/layout/components/content/ModalWrapper";
import Gap from "../../../../../_metronic/layout/components/content/Gap";

type PropsModalAddEditSeniman = {
  fromAdd: boolean;
  data: any;
  show: boolean;
  handleChangeVal: (e: any) => void;
  handleClose: () => void;
  handleSubmit: (data: any) => void;
  fileValue: any;
};

const ModalAddEditContactPerson: FC<PropsModalAddEditSeniman> = ({
  fromAdd,
  show,
  handleChangeVal,
  handleClose,
  handleSubmit,
  data,
  fileValue,
}) => {
  return (
    <ModalWrapper
      title={fromAdd ? "Tambah Koleksi Seni" : "Ubah Koleksi Seni"}
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
          <label htmlFor="name" className="fw-bold mb-2">
            Nama <span className="text-danger">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="form-control form-control-solid"
            onChange={(e) => handleChangeVal(e)}
            value={data.name}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="phone" className="fw-bold mb-2">
            Nomor handphone <span className="text-danger">*</span>
          </label>
          <input
            name="phone"
            id="phone"
            className="form-control form-control-solid"
            onChange={(e) => handleChangeVal(e)}
            value={data.phone}
            type="text"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="phone" className="fw-bold mb-2">
            Dipergunakan untuk <span className="text-danger">*</span>
          </label>
          <select
            name="forContent"
            id="forContent"
            className="form-select form-select-solid"
            onChange={(e) => handleChangeVal(e)}
          >
            <option value="">--- Pilih satu ---</option>
            <option
              value="dashboard"
              selected={data.forContent === "dashboard"}
            >
              Dashboard
            </option>
            <option
              value="reservation"
              selected={data.forContent === "reservation"}
            >
              Reservasi
            </option>
            <option
              value="forgotPassword"
              selected={data.forContent === "forgotPassword"}
            >
              Lupa Password
            </option>
          </select>
        </div>
      </>
    </ModalWrapper>
  );
};

export default ModalAddEditContactPerson;
