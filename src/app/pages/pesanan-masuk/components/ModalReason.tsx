import { useState } from "react";
import ModalWrapper from "../../../../_metronic/layout/components/content/ModalWrapper";
// import ReactSummernote from "react-summernote";

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
      title={`Tulis Alasan ${type === "Reject" ? "Penolakan" : "Diterima"}`}
      attribute={{ centered: true }}
      className="modal-md z-3"
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
        {/* <ReactSummernote
          options={{
            height: 200,
            dialogsInBody: true,
            toolbar: [
              ["style", ["style"]],
              ["font", ["bold", "underline", "clear"]],
              ["color", ["color"]],
              ["para", ["ul", "ol", "paragraph"]],
              ["table", ["table"]],
              ["insert", ["link", "picture", "video"]],
              ["view", ["fullscreen", "codeview"]],
            ],
          }}
          onChange={(value: any) => setTextReason(value)}
        /> */}
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
