import React, { FC, useState } from "react";
import ModalWrapper from "../../../../../_metronic/layout/components/content/ModalWrapper";
import Gap from "../../../../../_metronic/layout/components/content/Gap";

type PropsModalAddEditTutupTempat = {
  fromAdd: boolean;
  tempat: any;
  data: any;
  show: boolean;
  handleChange: (e: any) => void;
  handleClose: () => void;
  handleSubmit: (data: any) => void;
};

const ModalAddEditTutupTempat: FC<PropsModalAddEditTutupTempat> = ({
  fromAdd,
  show,
  handleChange,
  handleClose,
  handleSubmit,
  tempat,
  data,
}) => {
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
          className="btn btn-sm btn-primary"
          onClick={() => handleSubmit("data")}
        >
          Simpan
        </button>
      }
    >
      <form>
        <div className="form-group mb-3">
          <label htmlFor="tempatId" className="fw-bold">
            Nama Tempat
          </label>
          <Gap height={10} />
          <select
            name="tempatId"
            id="tempatId"
            className="form-select"
            onChange={(e) => handleChange(e)}
          >
            <option>--- Pilih tempat ---</option>
            {tempat.map((tmpt: any) => (
              <option value={tmpt.id} selected={data?.tempat?.id == tmpt.id}>
                {tmpt.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="" className="fw-bold mb-3">
            Pilih Tanggal Tutup Tempat
          </label>
          <div className="d-flex align-items-center">
            <input
              type="date"
              name="startDate"
              className="form-control"
              defaultValue={data.startDate}
              onChange={(e) => handleChange(e)}
            />
            <p className="m-0 mx-3">s/d</p>
            <input
              type="date"
              name="endDate"
              className="form-control"
              defaultValue={data.endDate}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default ModalAddEditTutupTempat;
