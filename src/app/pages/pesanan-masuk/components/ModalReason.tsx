import { useState } from "react";
import ModalWrapper from "../../../../_metronic/layout/components/content/ModalWrapper";

import { SlashCommand } from "ckeditor5-premium-features";

import {
  ClassicEditor,
  Undo,
  Mention,
  Context,
  Bold,
  Essentials,
  Italic,
  Paragraph,
  ContextWatchdog,
} from "ckeditor5";
import { CKEditor, CKEditorContext } from "@ckeditor/ckeditor5-react";

import "ckeditor5/ckeditor5.css";
import "ckeditor5/ckeditor5.css";
import "ckeditor5-premium-features/ckeditor5-premium-features.css";

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
        <CKEditorContext
          context={Context}
          contextWatchdog={ContextWatchdog}
          onChangeInitializedEditors={(editors) => {
            console.info(editors.editor1?.instance);
          }}
        >
          <CKEditor
            editor={ClassicEditor}
            config={{
              plugins: [Essentials, Bold, Italic, Paragraph],
              toolbar: [
                "undo",
                "redo",
                "|",
                "bold",
                "italic",
                "|",
                "heading",
                "|",
                "bulletedList",
                "numberedList",
              ],
            }}
            data="<p></p>"
            contextItemMetadata={{
              name: "editor1",
              yourAdditionalData: 2,
            }}
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
              // console.log("Editor 1 is ready to use!", editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();

              setTextReason(data);
            }}
          />
        </CKEditorContext>

        {/* <textarea
          className="form-control"
          style={{ minHeight: "200px" }}
          onChange={(e) => setTextReason(e.target.value)}
        >
          {textReason}
        </textarea> */}
      </>
    </ModalWrapper>
  );
};

export default ModalReason;
