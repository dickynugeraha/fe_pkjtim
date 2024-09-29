import React, { useState } from "react";
import ModalWrapper from "../../../../_metronic/layout/components/content/ModalWrapper";
import Gap from "../../../../_metronic/layout/components/content/Gap";
import { KTIcon } from "../../../../_metronic/helpers";
import globalVar from "../../../helper/globalVar";
import usePesanTempat from "../../../modules/hooks/pesan-tempat";
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

type Props = {
  show: boolean;
  data: any;
  handleClose: () => void;
};

const ModalDetailKurasiPentas: React.FC<Props> = ({
  show,
  data,
  handleClose,
}) => {
  const { changeStatus } = usePesanTempat();
  const [modalShowRevisi, setModalShowRevisi] = useState(false);
  const [modalShowTerima, setModalShowTerima] = useState(false);
  const [reason, setReason] = useState("");

  return (
    <ModalWrapper
      title="Detail Pesanan"
      show={show}
      handleClose={handleClose}
      attribute={{ centered: true }}
      className="modal-lg"
      footerCustom={
        <>
          <div
            role="button"
            className="btn btn-sm btn-warning mx-4"
            onClick={() => setModalShowRevisi(true)}
          >
            Rekomendasi
          </div>
          <div
            role="button"
            className="btn btn-sm btn-success"
            onClick={() => setModalShowTerima(true)}
          >
            Terima
          </div>
        </>
      }
    >
      <>
        <div className="row row-cols-3">
          <DetailIten
            iconName={"calendar-2"}
            title={"Tanggal pemesanan"}
            desc={globalVar.formatDate(data.createdAt)}
          />
          <DetailIten
            iconName={"home-2"}
            title={"Nama Sanggar"}
            desc={data.namaSanggar}
          />
          <DetailIten
            iconName={"geolocation"}
            title={"Alamat Sanggar"}
            desc={data.alamatSanggar}
          />
          <DetailIten
            iconName={"book"}
            title={"Pentas"}
            desc={data.judulPentas}
          />
          <DetailIten
            iconName={"toggle-on-circle"}
            title={"Tangal mulai kunjungan"}
            desc={globalVar.formatDate(data.startDate)}
          />
          <DetailIten
            iconName={"toggle-off-circle"}
            title={"Tanggal akhir kunjungan"}
            desc={globalVar.formatDate(data.endDate)}
          />

          {data.suratPermohonan && (
            <DetailItemFile
              title="Surat Permohonan"
              url={data.suratPermohonan}
            />
          )}
          {data.proposal && (
            <DetailItemFile title="proposal" url={data.proposal} />
          )}
        </div>
        {(modalShowRevisi || modalShowTerima) && <div className="overlay" />}

        <ModalWrapper
          title="Tulis alasan"
          show={modalShowRevisi}
          handleClose={() => setModalShowRevisi(false)}
          attribute={{ centered: true }}
          className="modal-md"
          footerCustom={
            <div
              role="button"
              className="btn btn-sm btn-warning mx-4"
              onClick={() => {
                const payload = {
                  id: data.id,
                  note: reason,
                };
                setModalShowRevisi(false);
                handleClose();
                setTimeout(() => {
                  changeStatus("Revise", payload);
                }, 200);
              }}
            >
              Rekomendasi
            </div>
          }
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
                  ],
                }}
                data="<p></p>"
                contextItemMetadata={{
                  name: "editor1",
                  yourAdditionalData: 2,
                }}
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  console.log("Editor 1 is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();

                  setReason(data);
                }}
              />
            </CKEditorContext>
            {/* <textarea
              name="alasan"
              id="alasan"
              className="form-control"
              rows={8}
              onChange={(e) => setReason(e.target.value)}
            >
              {reason}
            </textarea> */}
          </>
        </ModalWrapper>
        <ModalWrapper
          title="Tulis alasan"
          show={modalShowTerima}
          handleClose={() => setModalShowTerima(false)}
          attribute={{ centered: true }}
          className="modal-md"
          footerCustom={
            <div
              role="button"
              className="btn btn-sm btn-success mx-4"
              onClick={() => {
                const payload = {
                  id: data.id,
                  note: reason,
                };
                setModalShowTerima(false);
                handleClose();
                setTimeout(() => {
                  changeStatus("Answer-Letter", payload);
                }, 200);
              }}
            >
              Terima
            </div>
          }
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
                  ],
                }}
                data="<p></p>"
                contextItemMetadata={{
                  name: "editor1",
                  yourAdditionalData: 2,
                }}
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  console.log("Editor 1 is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();

                  setReason(data);
                }}
              />
            </CKEditorContext>
            {/* <textarea
              name="alasan"
              id="alasan"
              className="form-control"
              rows={8}
              onChange={(e) => setReason(e.target.value)}
            >
              {reason}
            </textarea> */}
          </>
        </ModalWrapper>
      </>
    </ModalWrapper>
  );

  type ModalReasonRejectProps = {
    onSubmit: (reason: string) => void;
    show: boolean;
    handleClose: () => void;
  };

  type DetailItemProps = {
    iconName: string;
    title: string;
    desc: string;
  };
  function DetailIten({ iconName, title, desc }: DetailItemProps) {
    return (
      <div className="col mb-6">
        <div className="d-flex align-items-center">
          <div>
            <KTIcon iconName={iconName} className="fs-3" />
          </div>
          <Gap width={18} />
          <div>
            <h6 className="m-0">{title}</h6>
            <p className="m-0">{desc}</p>
          </div>
        </div>
      </div>
    );
  }

  type DetailItemFileProps = {
    title: string;
    url: string;
    withUpload?: boolean;
  };
  function DetailItemFile({
    title,
    url,
    withUpload = false,
  }: DetailItemFileProps) {
    return (
      <div className="col mb-6">
        <div className="d-flex align-items-center">
          <div>
            <div className="d-flex">
              <KTIcon iconName={"file"} className="fs-3 me-3" />
              <h6 className="m-0">{title}</h6>
            </div>
            <Gap height={12} />
            {url ? (
              <a
                className="btn btn-sm btn-light-primary"
                href={url}
                target="_blank"
              >
                Lihat {title}
              </a>
            ) : (
              <p className="m-0 btn btn-sm btn-light-primary">Lihat {title}</p>
            )}

            {withUpload && (
              <>
                <Gap height={12} />
                <input type="file" className="form-control" />
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default ModalDetailKurasiPentas;
