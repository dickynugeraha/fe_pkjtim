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
  console.log("show", show);

  return (
    <ModalWrapper
      title={`Tulis Alasan ${type === "Reject" ? "Penolakan" : "Diterima"}`}
      attribute={{ centered: true }}
      className="modal-md z-5"
      footerCustom={
        <div
          className={`btn btn-sm btn-${
            type === "Reject" ? "danger" : "success"
          }`}
          role="button"
          onClick={() => onSubmit(textReason)}
        >
          {type === "Reject" ? "Tolak" : "Terima"}
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
