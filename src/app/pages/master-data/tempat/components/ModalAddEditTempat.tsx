import React, { FC, useState } from "react";
import ModalWrapper from "../../../../../_metronic/layout/components/content/ModalWrapper";
import Gap from "../../../../../_metronic/layout/components/content/Gap";
import { Col, Form, Row } from "react-bootstrap";

type PropsModalAddEditSekilasInfo = {
  fromAdd: boolean;
  data: any;
  fileValue: any;
  show: boolean;
  isPreEvent: boolean;
  setIsPreEvent: () => void;
  onChangeFile: (e: any) => void;
  handleChange: (e: any) => void;
  handleClose: () => void;
  handleSubmit: (data: any) => void;
};

const ModalAddEditTempat: FC<PropsModalAddEditSekilasInfo> = ({
  fromAdd,
  isPreEvent,
  show,
  fileValue,
  onChangeFile,
  handleClose,
  setIsPreEvent,
  handleSubmit,
  handleChange,
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
      title={fromAdd ? "Tambah Tempat" : "Ubah Tempat"}
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
        <Row className="mb-3">
          <Form.Group>
            <Form.Label htmlFor="" className="fw-bold mb-2">
              Gambar <span className="text-danger">*</span>
            </Form.Label>
            <Row>
              <Col md={6}>
                {!fromAdd && !fileValue && (
                  <img
                    className="rounded"
                    style={{ height: "150px", width: "100%" }}
                    src={data.photo}
                  />
                )}
                {fileValue && (
                  <img
                    className="rounded"
                    style={{ height: "150px", width: "100%" }}
                    src={imagePreview}
                  />
                )}
                <Gap height={10} />
              </Col>
            </Row>
            <Row>
              <Form.Group>
                <Form.Control
                  type="file"
                  onChange={(e: any) => onChangeFile(e.target.files[0])}
                />
              </Form.Group>
            </Row>
          </Form.Group>
        </Row>

        <div className="form-group mb-3">
          <label htmlFor="name" className="fw-bold">
            Nama Tempat <span className="text-danger">*</span>
          </label>
          <Gap height={10} />
          <input
            type="text"
            name="name"
            id="name"
            value={data.name}
            className="form-control form-control-solid"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="priceMainEventWeekDay" className="fw-bold">
            Harga Main Event (Hari Kerja) <span className="text-danger">*</span>
          </label>
          <Gap height={10} />
          <input
            type="text"
            name="priceMainEventWeekDay"
            id="priceMainEventWeekDay"
            className="form-control form-control-solid"
            value={data.priceMainEventWeekDay}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="priceMainEventWeekEnd" className="fw-bold">
            Harga Main Event (Akhir Pekan){" "}
            <span className="text-danger">*</span>
          </label>
          <Gap height={10} />
          <input
            type="text"
            name="priceMainEventWeekEnd"
            id="priceMainEventWeekEnd"
            value={data.priceMainEventWeekEnd}
            className="form-control form-control-solid"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="my-5 d-flex align-items-center">
          <label htmlFor="placeIsClose" className="me-3 fw-bold">
            Pre-Event
          </label>
          <div className="form-check">
            <input
              id="placeIsClose"
              type="checkbox"
              className="form-check-input me-3"
              onChange={() => setIsPreEvent()}
              checked={isPreEvent}
            />
          </div>
        </div>
        {isPreEvent && (
          <>
            <div className="form-group mb-3">
              <label htmlFor="pricePreEventWeekDay" className="fw-bold">
                Harga Pre-Event (Hari Kerja)
              </label>
              <Gap height={10} />
              <input
                type="text"
                name="pricePreEventWeekDay"
                value={data.pricePreEventWeekDay}
                id="pricePreEventWeekDay"
                className="form-control form-control-solid"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="pricePreEventWeekEnd" className="fw-bold">
                Harga Pre-Event (Akhir Pekan)
              </label>
              <Gap height={10} />
              <input
                type="text"
                name="pricePreEventWeekEnd"
                value={data.pricePreEventWeekEnd}
                id="pricePreEventWeekEnd"
                className="form-control form-control-solid"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </>
        )}
      </form>
    </ModalWrapper>
  );
};

export default ModalAddEditTempat;
