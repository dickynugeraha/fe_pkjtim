import React from "react";
import { Modal } from "react-bootstrap";
import { KTIcon } from "../../../_metronic/helpers";

const ModalEditProfil = ({ show, hideModal }) => {
  return (
    <Modal show={show} onHide={hideModal}>
      <Modal.Header>
        <h4>Ubah data diri</h4>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-between mb-5">
          <p className="m-0">Nama lengkap</p>
          <input
            className="form-control transparant"
            style={{ width: "60%" }}
            type="text"
            value={"Kale Pramono"}
          />
        </div>
        <div className="d-flex justify-content-between mb-5">
          <p className="m-0">Nomor handphone</p>
          <input
            className="form-control transparant"
            style={{ width: "60%" }}
            type="text"
            value={"089675379948"}
          />
        </div>
        <div className="d-flex justify-content-between">
          <p className="m-0">Email</p>
          <input
            className="form-control transparant"
            style={{ width: "60%" }}
            type="text"
            value={"dicky.dian1@gmail.com"}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="btn btn-sm btn-light" onClick={hideModal}>
          Cancel
        </div>
        <div className="btn btn-sm btn-primary">Ubah</div>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEditProfil;
