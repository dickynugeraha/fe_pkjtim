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

const ModalKegiatan: FC<Props> = ({
  show,
  hideModal,
  title,
  desc,
  syarat,
  fasilitas,
}) => {
  return (
    <Modal show={show} onHide={hideModal} centered={true} size="lg">
      <Modal.Header>
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ width: "100%" }}
        >
          <h3 className="m-0 p-0">{title}</h3>
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
        <p className="fs-4">{desc}</p>
        <p className="fs-3 fw-bolder text-decoration-underline">Syarat dan Ketentuan Khusus :</p>
        <div className="fs-4">
          <ol>
            {syarat.map((val) => (
              <li>{val}</li>
            ))}
          </ol>
        </div>
        <p className="fs-3 fw-bolder text-decoration-underline">
          Fasilitas dari Planetarum Jakarta:
        </p>
        <div className="fs-4">
          <ol>
            {fasilitas.map((val) => (
              <li>{val}</li>
            ))}
          </ol>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="btn btn-sm btn-light" onClick={hideModal}>
          Kembali
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalKegiatan;
