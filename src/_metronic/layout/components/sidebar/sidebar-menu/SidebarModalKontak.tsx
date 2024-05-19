import React, { FC } from "react";
import { Modal, Button } from "react-bootstrap";
import { KTIcon } from "../../../../helpers";

const SidebarModalKontak: FC<{
  isShow: boolean;
  handleShow: () => {};
  handleClose: () => {};
}> = ({ isShow, handleClose }) => {
  return (
    <>
      <Modal show={isShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Kontak Person</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex align-items-center mb-4">
            <KTIcon iconName="whatsapp" className="fs-1 success" />
            <div className="ms-5">
              <h6>Bapak Didin</h6>
              <p className="m-0">wa.me/62</p>
            </div>
          </div>
          <div className="d-flex align-items-center mb-4">
            <KTIcon iconName="whatsapp" className="fs-1 success" />
            <div className="ms-5">
              <h6>Bapak Sularto</h6>
              <p className="m-0">wa.me/62</p>
            </div>
          </div>
          <div className="d-flex align-items-center mb-4">
            <KTIcon iconName="whatsapp" className="fs-1 success" />
            <div className="ms-5">
              <h6>Kantor UP PKJ TIM</h6>
              <p className="m-0">wa.me/62</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SidebarModalKontak;
