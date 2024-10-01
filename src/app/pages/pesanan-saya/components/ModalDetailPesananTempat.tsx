import React, { useEffect, useState } from "react";
import ModalWrapper from "../../../../_metronic/layout/components/content/ModalWrapper";
import Gap from "../../../../_metronic/layout/components/content/Gap";
import { KTIcon } from "../../../../_metronic/helpers";
import globalVar from "../../../helper/globalVar";
import usePlanetarium from "../../../modules/hooks/planetarium";

type Props = {
  fromAdmin?: boolean;
  show: boolean;
  data: any;
  handleClose: () => void;
};

const ModalDetailPesananTempat: React.FC<Props> = ({
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
  const [validateUrl, setValidateUrl] = useState<{
    permohonan: boolean;
    proposal: boolean;
  }>({
    proposal: false,
    permohonan: false,
  });
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
  switch (data?.status) {
    case "WAITING_ANSWER_LETTER":
      statusKey = "Menunggu surat jawaban";
      break;
    case "PROSES":
      statusKey = "Proses";
      break;
    case "REVISE":
      statusKey = "Revisi";
      break;
    case "KURASI":
      statusKey = "Kurasi";
      break;
    case "DONE":
      statusKey = "Selesai";
      break;
    case "REQUEST":
      statusKey = "Request";
      break;
    case "PENDING":
      statusKey = "Pesanan tertunda";
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
      title="Detail Pesanan Tempat"
      show={show}
      handleClose={handleClose}
      attribute={{ centered: true }}
      className="modal-lg"
      footerCustom={
        data?.status === "REQUEST" && fromAdmin ? (
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
            iconName={"home"}
            title={"Tipe tempat"}
            desc={data?.tempat?.name}
          />
          <DetailItem
            iconName={"mask"}
            title={"Judul pentas"}
            desc={data?.judulPentas}
          />
          <DetailItem
            iconName={"home"}
            title={"Nama sanggar"}
            desc={data?.namaSanggar}
          />
          <DetailItem
            iconName={"geolocation"}
            title={"Alamat sanggar"}
            desc={data?.alamatSanggar}
          />
          <DetailItem
            iconName={"calendar-2"}
            title={"Tanggal pemesanan"}
            desc={globalVar.formatDate(data.createdAt)}
          />
          <DetailItem
            iconName={"notification"}
            title={"Total pembayaran"}
            desc={globalVar.formatRupiah(data?.priceTotal)}
          />
          <DetailItem iconName={"filter"} title={"Status"} desc={statusKey} />
          <DetailItem
            iconName={"toggle-on"}
            title={"Tanggal mulai pentas"}
            desc={globalVar.formatDate(data?.startDate)}
          />
          <DetailItem
            iconName={"toggle-off"}
            title={"Tanggal akhir pentas"}
            desc={globalVar.formatDate(data?.endDate)}
          />
          <DetailItem
            iconName={"barcode"}
            title={"Kode booking"}
            desc={data?.kodeBooking}
          />
          {data.rejectNote && (
            <DetailItem
              iconName={"pencil"}
              title={"Alasan"}
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
        </div>
        <div className="row row-cols-3">
            <DetailItem
              iconName={"file"}
              title={"Surat Permohonan"}
              desc={statusKey}
              isFile
              isShowButton={data?.suratPermohonan !== null}
              urlFile={`Pdf/File/SuratPermohonan/${data.id}`}
            />
            <DetailItem
              iconName={"file"}
              title={"Proposal"}
              desc={statusKey}
              isFile
              isShowButton={data?.proposal !== null}
              urlFile={`Pdf/File/Proposal/${data.id}`}
            />
          {data?.kuratorName != undefined && (
            (data?.status == "WAITING_ANSWER_LETTER" ||
            data?.status == "REJECT" ||
            data?.status == "REVISE" ||
            data?.status == "DONE") &&
              <DetailItem
                iconName={"file"}
                title={"Surat Hasil Kurasi"}
                desc={statusKey}
                isShowButton={true}
                isFile
                urlFile={`Pdf/File/SuratHasilKurasi/${data.id}`}
              />
            )}
          {data?.pengelolaName && (
            <DetailItem
              iconName={"file"}
              title={"Surat Jawaban"}
              desc={statusKey}
              isFile
              isShowButton={true}
              urlFile={`Pdf/File/SuratJawaban/${data.id}`}
            />
          )}
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
            <textarea
              name="alasan"
              id="alasan"
              className="form-control"
              rows={8}
              onChange={(e: any) => setAlasan(e.target.value)}
            ></textarea>
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
    desc,
    descTag,
    isFile = false,
    isShowButton = false,
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
            {!isFile && (desc != undefined ? (
              descTag ? (
                <div dangerouslySetInnerHTML={{ __html: descTag }} />
              ) : (
                <div className="m-0 text-gray-600">{desc}</div>
              )
            )
            : <p className="m-0 text-gray-600">-</p>
            )}
            {isFile && (isShowButton ?
              <button
                role="button"
                className="btn btn-light-primary py-2"
                onClick={() => window.open(urlFile, "_blank")}
              >
                Lihat
              </button>
             :

            <button
                role="button"
                className="btn btn-light-primary py-2"
                disabled
              >
                Tidak ada file
              </button>

          )
          }
          </div>
        </div>
      </div>
    );
  }
};

export default ModalDetailPesananTempat;
