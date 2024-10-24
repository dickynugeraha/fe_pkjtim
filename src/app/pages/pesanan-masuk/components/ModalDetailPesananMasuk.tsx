import React, { useState } from "react";
import ModalWrapper from "../../../../_metronic/layout/components/content/ModalWrapper";
import Gap from "../../../../_metronic/layout/components/content/Gap";
import { KTIcon } from "../../../../_metronic/helpers";
import ModalDetailPemesananUser from "./ModalDetailPemesananUser";
import ModalReason from "./ModalReason";
import globalVar from "../../../helper/globalVar";
import usePesanTempat from "../../../modules/hooks/pesan-tempat";
import Swal from "sweetalert2";
import { API_URL, ENDPOINTS } from "../../../constants/API";

type Props = {
  isSuccessChangeStatus: boolean;
  show: boolean;
  data: any;
  handleClose: () => void;
  changeStatus: (status: any, payload: any) => any;
  setFalseSuccess: () => void;
};

const ModalDetailPesananMasuk: React.FC<Props> = ({
  isSuccessChangeStatus,
  show,
  data,
  handleClose,
  changeStatus,
  setFalseSuccess,
}) => {
  // const { changeStatus } = usePesanTempat();
  const [modalDetailPesananUser, setModalDetailPesananUser] = useState({
    show: false,
    data: {},
  });
  const [modalTypeReason, setModalTypeReason] = useState({
    show: false,
    type: "",
  });
  const [fields, setFields] = useState<any>({});
  const [valueInput, setValueInput] = useState({
    judulPentas: "",
    alamatSanggar: "",
    namaSanggar: "",
  });
  const handleChange = (propertyId: string, value: any) => {
    setFields((prevFields: any) => ({
      ...prevFields,
      [propertyId]: value,
    }));
  };

  const { statusDesc } = globalVar.exportStatusPesanTempatToTitle(data?.status);

  const HandlerShowComponent = () => {
    let OthersContent = <></>;
    let ButtonShow = (
      <>
        <div
          role="button"
          className="btn btn-sm btn-success"
          onClick={() => {
            setModalTypeReason({
              show: true,
              type: "Done",
            });
          }}
        >
          Selesai
        </div>
        <div
          role="button"
          className="btn btn-sm btn-danger mx-4"
          onClick={() => {
            setModalTypeReason({
              show: true,
              type: "Reject",
            });
          }}
        >
          Tolak
        </div>
        <div
          role="button"
          className="btn btn-sm btn-primary"
          onClick={() => {
            const payload = {
              ...fields,
              id: data.id,
              judulPentas: valueInput.judulPentas,
              namaSanggar: valueInput.namaSanggar,
              alamatSanggar: valueInput.alamatSanggar,
              reason: "",
              note: "",
            };
            const result: any = changeStatus("Kurasi", payload);
            // if (result) {
            //   setModalTypeReason({ ...modalTypeReason, show: false });
            //   handleClose();
            //   setFalseSuccess();
            // }

            // if (isSuccessChangeStatus) {
            //   setModalTypeReason({ ...modalTypeReason, show: false });
            //   handleClose();
            //   setFalseSuccess();
            // }
            setTimeout(() => {
              setModalTypeReason({ ...modalTypeReason, show: false });
              handleClose();
              setFalseSuccess();
            }, 3000);
          }}
        >
          {data?.status === "PROSES" || data?.status === "REVISE"
            ? "Menuju Kurasi"
            : "Terima"}
        </div>
      </>
    );

    if (
      data?.status === "DONE" ||
      data?.status === "REQUEST" ||
      data?.status === "REJECT" ||
      data?.status === "PENDING" ||
      data?.status === "KURASI" ||
      data?.status === "EXPIRED"
    ) {
      ButtonShow = <></>;
    }
    if (data?.status === "REVISE") {
      OthersContent = (
        <DetailItemFile
          id=""
          title="Surat hasil kurasi"
          isShowButton={true}
          url={`Pdf/File/SuratHasilKurasi/${data.id}`}
          withUpload={false}
        />
      );
    }

    if (data?.status === "REJECT" && data?.kuratorName != undefined) {
      OthersContent = (
        <DetailItemFile
          id=""
          title="Surat hasil kurasi"
          isShowButton={true}
          url={`Pdf/File/SuratHasilKurasi/${data.id}`}
          withUpload={false}
        />
      );
    }

    if (data?.status === "DONE") {
      if (data?.kuratorName == undefined) {
        OthersContent = (
          <DetailItemFile
            id=""
            title="Surat jawaban"
            isShowButton={true}
            url={`Pdf/File/SuratJawaban/${data.id}`}
            withUpload={false}
          />
        );
      } else {
        OthersContent = (
          <>
            <DetailItemFile
              id=""
              title="Surat hasil kurasi"
              isShowButton={true}
              url={`Pdf/File/SuratHasilKurasi/${data.id}`}
              withUpload={false}
            />
            <DetailItemFile
              id=""
              title="Surat jawaban"
              isShowButton={true}
              url={`Pdf/File/SuratJawaban/${data.id}`}
              withUpload={false}
            />
          </>
        );
      }
    }
    if (data?.status === "WAITING_ANSWER_LETTER") {
      ButtonShow = (
        <>
          <div
            role="button"
            className="btn btn-sm btn-success"
            onClick={() => {
              setModalTypeReason({
                show: true,
                type: "Done",
              });
            }}
          >
            Selesai
          </div>
          <div
            role="button"
            className="btn btn-sm btn-danger mx-4"
            onClick={() => {
              setModalTypeReason({
                show: true,
                type: "Reject",
              });
            }}
          >
            Tolak
          </div>
        </>
      );

      OthersContent = (
        <DetailItemFile
          id=""
          title="Surat hasil kurasi"
          isShowButton={true}
          url={`Pdf/File/SuratHasilKurasi/${data.id}`}
          withUpload={false}
        />
      );
    }

    return { ButtonShow, OthersContent };
  };

  return (
    <ModalWrapper
      title="Detail Pesanan"
      show={show}
      handleClose={handleClose}
      attribute={{ centered: true }}
      className="modal-lg"
      footerCustom={HandlerShowComponent().ButtonShow}
    >
      <>
        <div className="row row-cols-3">
          <DetailItem
            iconName={"home-2"}
            title={"Tipe Tempat"}
            desc={data?.tempat?.name}
          />
          <DetailItem
            iconName={"calendar-2"}
            title={"Tanggal pemesanan"}
            desc={globalVar.formatDate(data?.createdAt)}
          />
          <DetailItem
            iconName={"barcode"}
            title={"Kode booking"}
            desc={data?.kodeBooking != undefined ? data?.kodeBooking : "-"}
          />
          <DetailItem iconName={"watch"} title={"Status"} desc={statusDesc} />
          <DetailItem
            iconName={"toggle-on-circle"}
            title={"Tangal mulai pentas"}
            desc={globalVar.formatDate(data?.startDate)}
          />
          <DetailItem
            iconName={"toggle-off-circle"}
            title={"Tanggal akhir pentas"}
            desc={globalVar.formatDate(data?.endDate)}
          />
          <DetailItemWithEdit
            iconName={"mask"}
            title={"Judul Pentas"}
            withEdit={
              data?.status === "WAITING_ANSWER_LETTER" ||
              data?.status === "KURASI" ||
              data?.status === "REJECT" ||
              data?.status === "EXPIRED" ||
              data?.status === "PENDING" ||
              data?.status === "DONE"
                ? false
                : true
            }
            desc={
              valueInput?.judulPentas !== ""
                ? valueInput.judulPentas
                : data?.judulPentas == undefined
                ? "-"
                : data?.judulPentas
            }
            changeText={(val) =>
              setValueInput({ ...valueInput, judulPentas: val })
            }
          />
          <DetailItemWithEdit
            iconName={"home-2"}
            title={"Nama sanggar"}
            withEdit={
              data?.status === "WAITING_ANSWER_LETTER" ||
              data?.status === "KURASI" ||
              data?.status === "REJECT" ||
              data?.status === "EXPIRED" ||
              data?.status === "PENDING" ||
              data?.status === "DONE"
                ? false
                : true
            }
            desc={
              valueInput?.namaSanggar !== ""
                ? valueInput?.namaSanggar
                : data?.namaSanggar == undefined
                ? "-"
                : data?.namaSanggar
            }
            changeText={(val) =>
              setValueInput({ ...valueInput, namaSanggar: val })
            }
          />
          <DetailItemWithEdit
            iconName={"geolocation"}
            title={"Alamat sanggar"}
            withEdit={
              data?.status === "WAITING_ANSWER_LETTER" ||
              data?.status === "KURASI" ||
              data?.status === "REJECT" ||
              data?.status === "EXPIRED" ||
              data?.status === "PENDING" ||
              data?.status === "DONE"
                ? false
                : true
            }
            desc={
              valueInput?.alamatSanggar !== ""
                ? valueInput.alamatSanggar
                : data?.alamatSanggar == undefined
                ? "-"
                : data?.alamatSanggar
            }
            changeText={(val) =>
              setValueInput({ ...valueInput, alamatSanggar: val })
            }
          />

          <DetailItem
            iconName={"calculator"}
            title={"Total pembayaran"}
            desc={globalVar.formatRupiah(data?.priceTotal)}
          />
          {data.rejectNote && (
            <DetailItem
              iconName={"message-text"}
              title={"Alasan ditolak"}
              descTag={globalVar.htmlToTextWithTags(data?.rejectNote)}
              desc={globalVar.htmlToText(data?.rejectNote)}
            />
          )}
          {data.answerLetterNote && (
            <DetailItem
              iconName={"pencil"}
              title={"Catatan"}
              descTag={globalVar.htmlToTextWithTags(data?.answerLetterNote)}
              desc={globalVar.htmlToText(data?.answerLetterNote)}
            />
          )}
          <div className="col mb-6">
            <div className="d-flex align-items-center">
              <div>
                <div className="d-flex">
                  <KTIcon iconName={"user"} className="fs-3 me-3" />
                  <h6 className="m-0">Detail Pemesan</h6>
                </div>
                <Gap height={12} />
                <button
                  role="button"
                  onClick={() =>
                    setModalDetailPesananUser({ show: true, data: data })
                  }
                  className="btn btn-light-primary py-2"
                >
                  Lihat
                </button>
              </div>
            </div>
          </div>
        </div>
        <h4 className="text-decoration-underline">Berkas Pemesan</h4>
        <Gap height={8} />
        <div className="row row-cols-3">
          <div className="col mb-6">
            <div className="d-flex align-items-center">
              <div>
                <div className="d-flex">
                  <KTIcon iconName={"file"} className="fs-3 me-3" />
                  <h6 className="m-0">Surat permohonan</h6>
                </div>
                <Gap height={12} />
                {data.suratPermohonan !== null ? (
                  <button
                    role="button"
                    className="btn btn-light-primary py-2"
                    onClick={() =>
                      window.open(
                        `Pdf/File/SuratPermohonan/${data.id}`,
                        "_blank"
                      )
                    }
                  >
                    Lihat
                  </button>
                ) : (
                  <button
                    role="button"
                    className="btn btn-light-primary py-2"
                    disabled
                  >
                    Tidak ada file
                  </button>
                )}
                {(data?.status === "REVISE" || data?.status === "PROSES") && (
                  <>
                    <Gap height={12} />
                    <input
                      type="file"
                      className="form-control"
                      id={"fileSuratPermohonan"}
                      name={"fileSuratPermohonan"}
                      onChange={(e: any) => {
                        handleChange("fileSuratPermohonan", e.target.files[0]);
                      }}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="col mb-6">
            <div className="d-flex align-items-center">
              <div>
                <div className="d-flex">
                  <KTIcon iconName={"file"} className="fs-3 me-3" />
                  <h6 className="m-0">Proposal</h6>
                </div>
                <Gap height={12} />
                {data.proposal !== null ? (
                  <button
                    role="button"
                    className="btn btn-light-primary py-2"
                    onClick={() =>
                      window.open(`Pdf/File/Proposal/${data.id}`, "_blank")
                    }
                  >
                    Lihat
                  </button>
                ) : (
                  <button
                    role="button"
                    className="btn btn-light-primary py-2"
                    disabled
                  >
                    Tidak ada file
                  </button>
                )}
                {(data?.status === "REVISE" || data?.status === "PROSES") && (
                  <>
                    <Gap height={12} />
                    <input
                      type="file"
                      className="form-control"
                      id={"fileSuratProposal"}
                      name={"fileSuratProposal"}
                      onChange={(e: any) => {
                        handleChange("fileSuratProposal", e.target.files[0]);
                      }}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <Gap height={8} />
        <h4 className="text-decoration-underline">Berkas Pengelola</h4>
        <Gap height={8} />
        <div className="row row-cols-3">
          <div className="col mb-6">
            <div className="d-flex align-items-center">
              <div>
                <div className="d-flex">
                  <KTIcon iconName={"file"} className="fs-3 me-3" />
                  <h6 className="m-0">Surat permohonan</h6>
                </div>
                <Gap height={12} />
                {data.suratPermohonanByPengelola !== null ? (
                  <button
                    role="button"
                    className="btn btn-light-primary py-2"
                    onClick={() =>
                      window.open(
                        `Pdf/File/SuratPermohonanPengelola/${data.id}`,
                        "_blank"
                      )
                    }
                  >
                    Lihat
                  </button>
                ) : (
                  <button
                    role="button"
                    className="btn btn-light-primary py-2"
                    disabled
                  >
                    Tidak ada file
                  </button>
                )}
                {(data?.status === "REVISE" || data?.status === "PROSES") && (
                  <>
                    <Gap height={12} />
                    <input
                      type="file"
                      className="form-control"
                      id={"fileSuratPermohonanByPengelola"}
                      name={"fileSuratPermohonanByPengelola"}
                      onChange={(e: any) => {
                        handleChange(
                          "fileSuratPermohonanByPengelola",
                          e.target.files[0]
                        );
                      }}
                      required
                    />
                  </>
                )}
              </div>
            </div>
          </div>
          {HandlerShowComponent().OthersContent}
        </div>
        {(modalTypeReason.show || modalDetailPesananUser.show) && (
          <div className="overlay" />
        )}

        <ModalDetailPemesananUser
          data={modalDetailPesananUser.data}
          show={modalDetailPesananUser.show}
          handleClose={() =>
            setModalDetailPesananUser({
              ...modalDetailPesananUser,
              show: false,
            })
          }
        />
        <ModalReason
          show={modalTypeReason.show}
          handleClose={() =>
            setModalTypeReason({
              show: false,
              type: modalTypeReason.type,
            })
          }
          onSubmit={(reason: any) => {
            const payload = {
              ...fields,
              id: data.id,
              judulPentas: valueInput.judulPentas,
              namaSanggar: valueInput.namaSanggar,
              alamatSanggar: valueInput.alamatSanggar,
              reason: reason,
              note: reason,
            };
            handleChange("reason", reason);

            const result: any = changeStatus(modalTypeReason?.type, payload);
            // if (result) {
            //   setModalTypeReason({ ...modalTypeReason, show: false });
            //   handleClose();
            //   setFalseSuccess();
            // }
            // setTimeout(() => {
            //   setModalTypeReason({
            //     show: false,
            //     type: modalTypeReason.type,
            //   });
            //   handleClose();
            // }, 1000);
            setTimeout(() => {
              setModalTypeReason({ ...modalTypeReason, show: false });
              handleClose();
              setFalseSuccess();
            }, 3000);
          }}
          type={modalTypeReason.type}
        />
      </>
    </ModalWrapper>
  );

  type DetailItemProps = {
    iconName: string;
    title: string;
    descTag?: string;
    desc: string;
  };
  function DetailItem({ iconName, title, desc, descTag }: DetailItemProps) {
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
            {descTag ? (
              <div dangerouslySetInnerHTML={{ __html: descTag }} />
            ) : (
              <div className="m-0 text-gray-600">{desc}</div>
            )}
          </div>
        </div>
      </div>
    );
  }

  type DetailItemWithEditProps = {
    iconName: string;
    title: string;
    desc: string;
    withEdit: boolean;
    changeText: (val: string) => void;
  };
  function DetailItemWithEdit({
    iconName,
    title,
    desc,
    withEdit,
    changeText,
  }: DetailItemWithEditProps) {
    const [isEdit, setIsEdit] = useState(false);
    const [textChange, setTextChange] = useState("");
    return (
      <div className="col mb-6">
        <div className="d-flex align-items-center">
          <div>
            <KTIcon iconName={iconName} className="fs-3" />
          </div>
          <Gap width={18} />
          <div>
            <h6 className="m-0">{title}</h6>
            <Gap height={8} />
            <div className="d-flex">
              {isEdit ? (
                <input
                  type="text"
                  value={textChange}
                  className="form-control"
                  onChange={(e) => setTextChange(e.target.value)}
                />
              ) : (
                <p className="m-0 text-gray-600">{desc}</p>
              )}
              <Gap width={8} />

              {!isEdit && withEdit && (
                <span role="button" onClick={() => setIsEdit(true)}>
                  <KTIcon iconName="pencil" />
                </span>
              )}
              {isEdit && withEdit && (
                <span
                  role="button"
                  onClick={() => {
                    // setIsEdit(false);
                    changeText(textChange);
                  }}
                >
                  <KTIcon iconName="file" />
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  type DetailItemFileProps = {
    isShowButton?: boolean;
    id: string;
    title: string;
    handleChangeFile?: (value: any) => void;
    fields?: any;
    url: string;
    withUpload: boolean;
  };

  function DetailItemFile({
    id,
    title,
    url,
    withUpload,
    isShowButton,
    fields,
    handleChangeFile,
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
              url !== "" && isShowButton ? (
                <button
                  role="button"
                  className="btn btn-light-primary py-2"
                  onClick={() => window.open(url, "_blank")}
                >
                  Lihat
                </button>
              ) : (
                <button
                  role="button"
                  className="btn btn-light-primary py-2"
                  disabled
                >
                  Tidak ada file
                </button>
              )
            ) : (
              <p className="m-0 btn btn-light-primary py-2">Lihat</p>
            )}

            {withUpload && (
              <>
                <Gap height={12} />
                <input
                  type="file"
                  className="form-control"
                  id={id}
                  name={id}
                  onChange={(e: any) => {
                    if (handleChangeFile) {
                      handleChangeFile(e.target.files[0]);
                    }
                  }}
                />
                {fields[id] ? (
                  <p className="mt-2">
                    Selected file: <strong>{fields[id].name}</strong>
                  </p>
                ) : (
                  <p className="mt-2 text-muted">No file chosen</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default ModalDetailPesananMasuk;
