import React, { ReactElement, ReactNode } from "react";
import { Modal } from "react-bootstrap";
import { KTSVG } from "../../../helpers";

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
      <Modal.Header className="d-flex align-items-center justify-content-between">
        <h4 className="m-0 p-0">{title}</h4>
        <div
          className="btn btn-icon btn-sm"
          onClick={handleClose}
          aria-label="Close"
        >
          <KTSVG
            path="media/icons/duotune/arrows/arr061.svg"
            className="svg-icon svg-icon-2x"
          />
        </div>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer className="d-flex justify-content-between align-items-center">
        <div
          className="btn btn-sm btn-light"
          role="button"
          style={{ width: "80px" }}
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
