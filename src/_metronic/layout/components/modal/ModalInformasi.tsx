import React, { Component, FC } from "react";
import { Modal, Button } from "react-bootstrap";
import { KTIcon } from "../../../helpers";

const ModalInformasi: FC<{
  isShow: boolean;
  title: string;
  message: string;
  icon: string;
  type: string;
  handleShow: () => {};
  handleClose: () => {};
}> = ({ isShow, title, message, icon, type, handleClose }) => {
  let iconComponent;
  switch (type) {
    case "success":
      iconComponent = (
        <i
          className="bi bi-check-circle-fill text-success"
          style={{ fontSize: "3rem" }}
        ></i>
      );
      break;
    case "failed":
      iconComponent = (
        <i
          className="bi bi-x-circle-fill text-danger"
          style={{ fontSize: "3rem" }}
        ></i>
      );
      break;
    case "info":
      iconComponent = (
        <i
          className="bi bi-info-circle-fill text-info"
          style={{ fontSize: "3rem" }}
        ></i>
      );
      break;
    default:
      break;
  }

  return (
    <>
      <Modal show={isShow} onHide={handleClose}>
        <Modal.Body>
          <div className="d-flex justify-content-center align-items-center mb-4">
            {iconComponent}
          </div>
          <div className="text-center mb-4">
            <h6>{message}</h6>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="btn btn-sm btn-secondary" onClick={handleClose}>
            Close
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalInformasi;
