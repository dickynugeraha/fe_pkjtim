import React, { FC, useState } from "react";
import ModalWrapper from "../../../../../_metronic/layout/components/content/ModalWrapper";
import Gap from "../../../../../_metronic/layout/components/content/Gap";

type PropsModalAddEditPementasan = {
  fromAdd: boolean;
  data: any;
  show: boolean;
  fileValue: any;
  tempat: any[];
  onChangeVal: (e: any) => void;
  onChangeFile: (e: any) => void;
  handleClose: () => void;
  handleSubmit: (data: any) => void;
};

const ModalAddEditPementasan: FC<PropsModalAddEditPementasan> = ({
  fromAdd,
  fileValue,
  show,
  tempat,
  onChangeFile,
  onChangeVal,
  handleClose,
  handleSubmit,
  data,
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
          <label htmlFor="title" className="fw-bold mb-2">
            Judul
          </label>
          <input
            id="title"
            name="title"
            type="text"
            className="form-control form-control-solid"
            value={data.title}
            onChange={(e) => onChangeVal(e)}
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
            value={data.sinopsis}
            onChange={(e) => onChangeVal(e)}
          ></textarea>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="namaSanggar" className="fw-bold mb-2">
            Nama Sanggar
          </label>
          <input
            id="namaSanggar"
            name="namaSanggar"
            type="text"
            className="form-control form-control-solid"
            value={data.namaSanggar}
            onChange={(e) => onChangeVal(e)}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="tempatId" className="fw-bold mb-2">
            Tipe Tempat
          </label>
          <select
            name="tempatId"
            id="tempatId"
            className="form-select"
            onChange={(e) => onChangeVal(e)}
          >
            <option>-- Pilih satu --</option>
            {tempat.map((tmpt) => (
              <option value={tmpt.id} selected={data?.tempat?.id === tmpt.id}>
                {tmpt.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="tipe_sanggar" className="fw-bold mb-2">
            Tanggal Pentas
          </label>
          <div className="d-flex align-items-center">
            <input
              type="date"
              className="form-control"
              name="startDate"
              value={data.startDate}
              onChange={(e) => onChangeVal(e)}
            />
            <p className="m-0 mx-3">s/d</p>
            <input
              type="date"
              className="form-control"
              name="endDate"
              value={data.endDate}
              onChange={(e) => onChangeVal(e)}
            />
          </div>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="jumlahPelakuSeni" className="fw-bold mb-2">
            Jumlah Pelaku Seni
          </label>
          <input
            id="jumlahPelakuSeni"
            name="jumlahPelakuSeni"
            type="text"
            className="form-control form-control-solid"
            value={data.jumlahPelakuSeni}
            onChange={(e) => onChangeVal(e)}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="jumlahPekerjaSeni" className="fw-bold mb-2">
            Jumlah Pekerja Seni
          </label>
          <input
            id="jumlahPekerjaSeni"
            name="jumlahPekerjaSeni"
            type="text"
            className="form-control form-control-solid"
            value={data.jumlahPekerjaSeni}
            onChange={(e) => onChangeVal(e)}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="jumlahPenonton" className="fw-bold mb-2">
            Jumlah Penonton
          </label>
          <input
            id="jumlahPenonton"
            name="jumlahPenonton"
            type="text"
            className="form-control form-control-solid"
            value={data.jumlahPenonton}
            onChange={(e) => onChangeVal(e)}
          />
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
            <option>-- Pilih satu --</option>
            <option value="Terbit" selected={data.status === "Terbit"}>
              Terbit
            </option>
            <option value="Draft" selected={data.status === "Draft"}>
              Draft
            </option>
          </select>
        </div>
      </>
    </ModalWrapper>
  );
};

export default ModalAddEditPementasan;
