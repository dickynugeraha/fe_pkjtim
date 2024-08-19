import React, { FC, useState } from "react";
import ModalWrapper from "../../../../../_metronic/layout/components/content/ModalWrapper";
import Gap from "../../../../../_metronic/layout/components/content/Gap";

type PropsModalAddEditSekilasInfo = {
  fromAdd: boolean;
  fileValue: any;
  data: any;
  tempat: any[];
  show: boolean;
  onChangeVal: (e: any) => void;
  onChangeFile: (e: any) => void;
  handleClose: () => void;
  handleSubmit: (data: any) => void;
};

const ModalAddEditSekilasInfo: FC<PropsModalAddEditSekilasInfo> = ({
  fromAdd,
  show,
  tempat,
  fileValue,
  onChangeVal,
  onChangeFile,
  handleClose,
  handleSubmit,
  data,
}) => {
  const [placeIsClose, setPlaceIsClose] = useState(false);
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
        <Gap height={20} />
        <div className="form-group mb-3">
          <label htmlFor="title" className="fw-bold">
            Judul Info
          </label>
          <Gap height={10} />
          <input
            type="text"
            id="title"
            className="form-control form-control-solid"
            name="title"
            value={data.title}
            onChange={(e) => onChangeVal(e)}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="content" className="fw-bold">
            Detail Info
          </label>
          <Gap height={10} />
          <textarea
            name="content"
            id="content"
            className="form-control form-control-solid"
            value={data.content}
            onChange={(e) => onChangeVal(e)}
          ></textarea>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="status" className="fw-bold mb-3">
            Status
          </label>
          <select
            name="status"
            id="status"
            className="form-select"
            onChange={(e) => onChangeVal(e)}
          >
            <option>--- Pilih satu ---</option>
            <option value="Terbit" selected={data.status === "Terbit"}>
              Terbit
            </option>
            <option value="Draft" selected={data.status === "Draft"}>
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
              <label htmlFor="tempatId" className="fw-bold mb-3">
                Pilih Tempat
              </label>
              <select
                name="tempatId"
                id="tempatId"
                className="form-select"
                onChange={(e) => onChangeVal(e)}
              >
                <option>-- Pilih satu --</option>
                {tempat.map((tmpt) => (
                  <option
                    value={tmpt.id}
                    selected={data?.tempat?.id === tmpt.id}
                  >
                    {tmpt.name}
                  </option>
                ))}
              </select>
            </div>
            <Gap height={24} />
            <label htmlFor="" className="fw-bold mb-3">
              Pilih Tanggal Tutup Layanan
            </label>
            <div className="d-flex align-items-center">
              <input
                type="date"
                name="startDate"
                onChange={(e) => onChangeVal(e)}
                className="form-control"
              />
              <p className="m-0 mx-3">s/d</p>
              <input
                type="date"
                name="endDate"
                className="form-control"
                onChange={(e) => onChangeVal(e)}
              />
            </div>
          </>
        )}
      </form>
    </ModalWrapper>
  );
};

export default ModalAddEditSekilasInfo;
