import React, { FC } from "react";

import { Button, Modal } from "react-bootstrap";

type Props = {
  show: boolean;
  variant: string;
  title: string;
  desc: string;
  onHide: () => void;
};

const ModalInformationCustom: FC<Props> = ({ show, title, desc, onHide }) => {
  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{desc}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalInformationCustom;
