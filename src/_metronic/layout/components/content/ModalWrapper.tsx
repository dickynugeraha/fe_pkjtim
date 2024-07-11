import React, { ReactElement, ReactNode } from "react";
import { Modal } from "react-bootstrap";

type Props = {
  show: boolean;
  title: string;
  className: string;
  children: ReactElement;
  footerCustom: ReactElement;
  attribute: any;
  handleClose: () => void;
};

const ModalWrapper: React.FC<Props> = ({
  show,
  title,
  handleClose,
  children,
  footerCustom,
  attribute,
  className,
}) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered={attribute.centered}
      className={className}
    >
      <Modal.Header>
        <h4 className="m-0">{title}</h4>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer className="d-flex justify-content-between align-items-center">
        <div
          className="btn btn-sm btn-light"
          role="button"
          onClick={handleClose}
        >
          Tutup
        </div>
        <div>{footerCustom}</div>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalWrapper;
