import React, { FC, useState } from "react";
import ModalWrapper from "../../../../../_metronic/layout/components/content/ModalWrapper";
import Gap from "../../../../../_metronic/layout/components/content/Gap";

type PropsModalAddEditSeniman = {
  fromAdd: boolean;
  data: any;
  show: boolean;
  handleChangeFile: (e: any) => void;
  handleChangeVal: (e: any) => void;
  handleClose: () => void;
  handleSubmit: (data: any) => void;
  fileValue: any;
};

const ModalAddEditKoleksiSeni: FC<PropsModalAddEditSeniman> = ({
  fromAdd,
  show,
  handleChangeVal,
  handleChangeFile,
  handleClose,
  handleSubmit,
  data,
  fileValue,
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
          <label htmlFor="" className="fw-bold mb-2">
            Gambar
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
                onChange={(e: any) => handleChangeFile(e.target.files[0])}
              />
            </div>
            <div className="col"></div>
          </div>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="title" className="fw-bold mb-2">
            Nama Seniman
          </label>
          <input
            id="title"
            name="title"
            type="text"
            className="form-control form-control-solid"
            onChange={(e) => handleChangeVal(e)}
            value={data.title}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="desc" className="fw-bold mb-2">
            Detail Seni
          </label>
          <textarea
            name="desc"
            id="desc"
            className="form-control form-control-solid"
            onChange={(e) => handleChangeVal(e)}
            value={data.desc}
          ></textarea>
        </div>
      </>
    </ModalWrapper>
  );
};

export default ModalAddEditKoleksiSeni;
