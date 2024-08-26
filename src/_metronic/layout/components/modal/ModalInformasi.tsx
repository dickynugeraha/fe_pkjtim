import React, { Component, FC } from "react";
import { Modal, Button } from "react-bootstrap";
import { KTIcon } from "../../../helpers";

const ModalInformasi: FC<{
  isShow: boolean;
  title: string;
  message: string;
  icon: string;
  type: string;
  handleClose: () => {};
}> = ({ isShow, title, message, icon, type, handleClose }) => {
  let iconComponent;
  switch (type) {
    case "success":
      iconComponent = (
        <i
          className="bi bi-check-circle-fill text-success"
          style={{ fontSize: "5rem" }}
        ></i>
      );
      break;
    case "failed":
      iconComponent = (
        <i
          className="bi bi-x-circle-fill text-danger"
          style={{ fontSize: "5rem" }}
        ></i>
      );
      break;
    case "info":
      iconComponent = (
        <i
          className="bi bi-info-circle-fill text-info"
          style={{ fontSize: "5rem" }}
        ></i>
      );
      break;
    default:
      break;
  }

  return (
    <>
      <Modal show={isShow} onHide={handleClose} centered={true}>
        <Modal.Body>
          <div className="d-flex justify-content-center align-items-center mb-4">
            {iconComponent}
          </div>
          <div className="text-center mb-4">
            <h6>{title}</h6>
          </div>
          <div className="text-center mb-4">
            <p>{message}</p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalInformasi;
