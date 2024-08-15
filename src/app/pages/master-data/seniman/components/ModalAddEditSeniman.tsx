import React, { FC, useState } from "react";
import ModalWrapper from "../../../../../_metronic/layout/components/content/ModalWrapper";
import Gap from "../../../../../_metronic/layout/components/content/Gap";

type PropsModalAddEditSeniman = {
  fromAdd: boolean;
  data: any;
  show: boolean;
  onchangeVal: (e: any) => void;
  handleClose: () => void;
  handleSubmit: (data: any) => void;
  onChangeFile: (e: any) => void;
};

const ModalAddEditSeniman: FC<PropsModalAddEditSeniman> = ({
  fromAdd,
  show,
  handleClose,
  handleSubmit,
  data,
  onchangeVal,
  onChangeFile,
}) => {
  let gambarVal = "";
  if (!fromAdd) {
    gambarVal = data?.gambar?.dummyImage;
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
              <input
                className="form-control"
                type="file"
                required
                onChange={(e: any) => onChangeFile(e.target.files[0])}
              />
            </div>
            <div className="col"></div>
          </div>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="name" className="fw-bold mb-2">
            Nama Seniman
          </label>
          <input
            id="name"
            type="text"
            name="name"
            className="form-control form-control-solid"
            required
            onChange={(e) => onchangeVal(e)}
            value={data.name}
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
            required
            onChange={(e) => onchangeVal(e)}
            value={data.biografi}
          ></textarea>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="performanceDesc" className="fw-bold mb-2">
            Deskripsi Pentas
          </label>
          <textarea
            name="performanceDesc"
            id="performanceDesc"
            className="form-control form-control-solid"
            required
            onChange={(e) => onchangeVal(e)}
            value={data.performanceDesc}
          ></textarea>
        </div>
      </>
    </ModalWrapper>
  );
};

export default ModalAddEditSeniman;
