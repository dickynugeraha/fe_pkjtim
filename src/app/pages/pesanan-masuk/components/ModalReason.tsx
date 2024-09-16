import { useState } from "react";
import ModalWrapper from "../../../../_metronic/layout/components/content/ModalWrapper";

type ModalReasonProps = {
  type: string;
  onSubmit: (reason: string) => void;
  show: boolean;
  handleClose: () => void;
};
const ModalReason = ({
  onSubmit,
  show,
  type,
  handleClose,
}: ModalReasonProps) => {
  const [textReason, setTextReason] = useState("");

  return (
    <ModalWrapper
      title="Tulis alasan"
      attribute={{ centered: true }}
      className="modal-md z-3"
      footerCustom={
        <div
          className="btn btn-sm btn-success"
          role="button"
          onClick={() => onSubmit(textReason)}
        >
          Kirim
        </div>
      }
      handleClose={handleClose}
      show={show}
    >
      <>
        <textarea
          className="form-control"
          style={{ minHeight: "200px" }}
          onChange={(e) => setTextReason(e.target.value)}
        >
          {textReason}
        </textarea>
      </>
    </ModalWrapper>
  );
};

export default ModalReason;
