import React, { useState } from "react";
import ModalWrapper from "../../../../_metronic/layout/components/content/ModalWrapper";
import Gap from "../../../../_metronic/layout/components/content/Gap";
import { KTIcon } from "../../../../_metronic/helpers";
import globalVar from "../../../helper/globalVar";
import usePlanetarium from "../../../modules/hooks/planetarium";
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

type Props = {
  fromAdmin?: boolean;
  show: boolean;
  data: any;
  handleClose: () => void;
};

const ModalDetailPesananPlanetarium: React.FC<Props> = ({
  fromAdmin = false,
  show,
  data,
  handleClose,
}) => {
  const { rejectReservation, approveReservation } = usePlanetarium();
  const [modalAlasan, setModalAlasan] = useState({
    type: "",
    show: false,
  });
  const [alasan, setAlasan] = useState<string>("");

  const handleClickAlasan = () => {
    const payload = {
      id: data.id,
      reason: alasan,
    };
    if (modalAlasan.type === "Tolak") {
      rejectReservation(payload);
    } else {
      approveReservation(payload);
    }
    setTimeout(() => {
      setModalAlasan({
        show: false,
        type: "",
      });
    }, 1000);
  };

  let statusKey = "";
  switch (data.status) {
    case "DONE":
      statusKey = "Selesai";
      break;
    case "REQUEST":
      statusKey = "Proses";
      break;
    case "PENDING":
      statusKey = "Menunggu pemesan selesai";
      break;
    case "EXPIRED":
      statusKey = "Kadaluarsa";
      break;
    case "REJECT":
      statusKey = "Ditolak";
      break;
  }

  return (
    <ModalWrapper
      title="Detail Pesanan Astronomi"
      show={show}
      handleClose={handleClose}
      attribute={{ centered: true }}
      className="modal-lg"
      footerCustom={
        data.status === "REQUEST" && fromAdmin ? (
          <>
            <div
              role="button"
              className="btn btn-sm btn-danger me-4"
              onClick={() =>
                setModalAlasan({
                  show: true,
                  type: "Tolak",
                })
              }
            >
              Tolak
            </div>
            <div
              role="button"
              className="btn btn-sm btn-primary"
              onClick={() =>
                setModalAlasan({
                  show: true,
                  type: "Terima",
                })
              }
            >
              Terima
            </div>
          </>
        ) : (
          <></>
        )
      }
    >
      <>
        <div className="row row-cols-3">
          <DetailItem
            iconName={"calendar-2"}
            title={"Tanggal pemesanan"}
            desc={globalVar.formatDate(data.createdAt)}
          />
          <DetailItem
            iconName={"home-2"}
            title={"Nama sekolah"}
            desc={data.namaSekolah}
          />
          <DetailItem
            iconName={"geolocation"}
            title={"Alamat sekolah"}
            desc={data.alamatSekolah}
          />
          <div className="col mb-6">
            <div className="d-flex">
              <div>
                <KTIcon iconName={"book"} className="fs-3" />
              </div>
              <Gap width={18} />
              <div>
                <h6 className="m-0">{"Kegiatan"}</h6>
                <Gap height={6} />
                <ul className="text-gray-600">
                  {data.isPertunjukan && <li>Pertunjukan Planetarium Mini</li>}
                  {data.isDiskusi && <li>Diskusi Astronomi</li>}
                  {data.isPeneropongan && <li>Peneropongan Matahari</li>}
                  {data.isRoketAir && <li>Percobaan Roket Air</li>}
                </ul>
              </div>
            </div>
          </div>
          <DetailItem
            iconName={"toggle-on-circle"}
            title={"Tangal kunjungan"}
            desc={globalVar.formatDate(data.tanggalKunjungan)}
          />
          <DetailItem iconName={"filter"} title={"Status"} desc={statusKey} />
          <DetailItem iconName={"user"} title={"Kontak"} desc={data.contact} />
          {data.reason && (
            <DetailItem
              iconName={"pencil"}
              title={"Alasan"}
              descTag={data.reason}
              desc={data.reason}
            />
          )}
        </div>
        <h4>Berkas</h4>
        <Gap height={8} />
        <div className="row row-cols-3">
        <DetailItem
            iconName={"some-files"}
            title={"Surat Undangan"}
            desc={statusKey}
            isFile
            isShowButton={data.suratUndangan !== null}
            urlFile={`Pdf/File/SuratUndangan/${data.id}`}
          />
          <DetailItem
            iconName={"some-files"}
            title={"Pernyataan Persetujuan"}
            desc={statusKey}
            isFile
            isShowButton={data.pernyataanPersetujuan !== null}
            urlFile={`Pdf/File/PernyataanPersetujuan/${data.id}`}
          />
        </div>
        {modalAlasan.show && <div className="overlay" />}
        <ModalWrapper
          title="Tulis alasan"
          show={modalAlasan.show}
          handleClose={() =>
            setModalAlasan({
              show: false,
              type: "",
            })
          }
          attribute={{ centered: true }}
          className="modal-md"
          footerCustom={
            <>
              <div
                role="button"
                className={
                  modalAlasan.type === "Tolak"
                    ? "btn btn-sm btn-danger mx-4"
                    : "btn btn-sm btn-primary mx-4"
                }
                onClick={handleClickAlasan}
              >
                {modalAlasan.type}
              </div>
            </>
          }
        >
          <>
            <CKEditorContext
              context={Context}
              contextWatchdog={ContextWatchdog}
              onChangeInitializedEditors={(editors) => {
                // console.info(editors.editor1?.instance);
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

                  setAlasan(data);
                }}
              />
            </CKEditorContext>
            {/* <textarea
              name="alasan"
              id="alasan"
              className="form-control"
              rows={8}
              onChange={(e: any) => setAlasan(e.target.value)}
            ></textarea> */}
          </>
        </ModalWrapper>
      </>
    </ModalWrapper>
  );

  type DetailItemProps = {
    iconName: string;
    title: string;
    desc: string;
    descTag?: string;
    isFile?: boolean;
    isShowButton?: boolean;
    urlFile?: string;
  };
  function DetailItem({
    iconName,
    title,
    descTag,
    desc,
    isFile = false,
    isShowButton = true,
    urlFile,
  }: DetailItemProps) {
    return (
      <div className="col mb-6">
        <div className="d-flex">
          <div>
            <KTIcon iconName={iconName} className="fs-3" />
          </div>
          <Gap width={18} />
          <div>
            <h6 className="m-0">{title}</h6>
            <Gap height={6} />
            {!isFile &&
              (desc != undefined ? (
                descTag ? (
                  <div dangerouslySetInnerHTML={{ __html: descTag }} />
                ) : (
                  <div className="m-0 text-gray-600">{desc}</div>
                )
              ) : (
                <p className="m-0 text-gray-600">-</p>
              ))}
            {isFile &&
              (isShowButton ? (
                <button
                  role="button"
                  className="btn btn-light-primary py-2"
                  onClick={() => window.open(urlFile, "_blank")}
                >
                  Lihat
                </button>
              ) : (
                <button
                  role="button"
                  className="btn btn-light-primary py-2"
                  disabled
                >
                  File tidak ada
                </button>
              ))}
          </div>
        </div>
      </div>
    );
  }
};

export default ModalDetailPesananPlanetarium;
