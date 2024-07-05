import React, { FC } from "react";
import { Modal } from "react-bootstrap";
import { KTIcon } from "../../../../_metronic/helpers";
import Gap from "../../../../_metronic/layout/components/content/Gap";

type Props = {
  show: boolean;
  hideModal: () => void;
  tipeTempat: string;
};

const ModalDetailPesanan: FC<Props> = ({ tipeTempat, show, hideModal }) => {
  return (
    <Modal show={show} onHide={hideModal} centered className="modal-xl">
      <Modal.Header>
        <h5>Detail Pesanan</h5>
      </Modal.Header>
      <Modal.Body>
        <div className="row row-cols-3">
          <div className="col">
            <div className="d-flex align-items-center">
              <div>
                <KTIcon iconName="home-2" className="fs-3" />
              </div>
              <Gap width={12} />
              <div>
                <p className="fw-bold m-0">Tipe Tempat</p>
                <p className="m-0">{tipeTempat}</p>
              </div>
            </div>
          </div>
          <div className="col"></div>
          <div className="col"></div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalDetailPesanan;
