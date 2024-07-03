import React, { FC } from "react";
import { Modal } from "react-bootstrap";
import { KTSVG } from "../../../../_metronic/helpers";

type Props = {
  title: string;
  desc: string;
  syarat: [];
  fasilitas: [];
  show: boolean;
  hideModal: () => void;
};

const ModalPeraturan: FC<Props> = ({
  show,
  hideModal,
  title,
  desc,
  syarat,
  fasilitas,
}) => {
  return (
    <Modal show={show} onHide={hideModal} centered={true}>
      <Modal.Header>
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ width: "100%" }}
        >
          <h4 className="m-0 p-0">{title}</h4>
          <div
            className="btn btn-icon btn-sm btn-active-light-primary ms-2"
            onClick={hideModal}
            aria-label="Close"
          >
            <KTSVG
              path="media/icons/duotune/arrows/arr061.svg"
              className="svg-icon svg-icon-2x"
            />
          </div>
        </div>
      </Modal.Header>
      <Modal.Body>
        <p>{desc}</p>
        <p className="fw-bold text-underline">Syarat dan Ketentuan Khusus :</p>
        <ol>
          {syarat.map((val) => (
            <li>{val}</li>
          ))}
        </ol>
        <p className="fw-bold text-underline">
          Fasilitas dari Planetarum Jakarta:
        </p>
        <ol>
          {fasilitas.map((val) => (
            <li>{val}</li>
          ))}
        </ol>
      </Modal.Body>
      <Modal.Footer>
        <div className="btn btn-sm btn-light" onClick={hideModal}>
          Kembali
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalPeraturan;
