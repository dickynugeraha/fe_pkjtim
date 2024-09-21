import React, { useState } from "react";
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
    setModalAlasan({
      show: false,
      type: "",
    });
  };

  let statusKey = "";
  switch (data?.status) {
    case "WAITING_ANSWER_LETTER":
      statusKey = "Menunggu surat jawaban";
      break;
    case "PROSES":
      statusKey = "Proses";
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
            desc={data?.alamatSanggar}
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
                desc={data.rejectNote}
              />
            )}
          </div>
          <div className="row row-cols-3">
            <DetailItem
              iconName={"file"}
              title={"Surat Permohonan"}
              desc={statusKey}
              isFile
              urlFile={data?.suratPermohonan}
            />
            <DetailItem
              iconName={"file"}
              title={"Proposal"}
              desc={statusKey}
              isFile
              urlFile={data?.proposal}
            />
            {data?.kuratorName && (
                <DetailItem
                  iconName={"file"}
                  title={"Surat Hasil Kurasi"}
                  desc={statusKey}
                  isFile
                  //api surat hasil kurasi menyusul
                  urlFile={data?.proposal}
                />
              )}
            {data?.pengelolaName && (
                <DetailItem
                  iconName={"file"}
                  title={"Surat Jawaban"}
                  desc={statusKey}
                  isFile
                  //api surat jawaban menyusul
                  urlFile={data?.proposal}
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
    isFile?: boolean;
    urlFile?: string;
  };
  function DetailItem({
    iconName,
    title,
    desc,
    isFile = false,
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
            {!isFile && <p className="m-0 text-gray-600">{desc}</p>}
            {isFile && (
              <a
                role="button"
                className="badge badge-light-primary p-3"
                href={urlFile}
                target="_blank"
              >
                Lihat
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default ModalDetailPesananTempat;
