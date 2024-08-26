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
  fileValue: any;
};

const ModalAddEditSeniman: FC<PropsModalAddEditSeniman> = ({
  fromAdd,
  show,
  fileValue,
  handleClose,
  handleSubmit,
  data,
  onchangeVal,
  onChangeFile,
}) => {
  const [imagePreview, setImagePreview] = useState();

  const handleImageChange = (file: any) => {
    if (file) {
      const reader: any = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  handleImageChange(fileValue);

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
            Gambar <span className="text-danger">*</span>
          </label>
          <div className="row row-cols-lg-2">
            <div className="col">
              {!fromAdd && !fileValue && (
                <img
                  className="rounded"
                  style={{ height: "150px", width: "100%" }}
                  src={data.file}
                />
              )}
              {fileValue && (
                <img
                  className="rounded"
                  style={{ height: "150px", width: "100%" }}
                  src={imagePreview}
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
            Nama Seniman <span className="text-danger">*</span>
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
            Biografi <span className="text-danger">*</span>
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
            Deskripsi Pentas <span className="text-danger">*</span>
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
