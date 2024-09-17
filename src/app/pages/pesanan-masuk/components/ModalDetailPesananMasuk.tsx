import React, { useState } from "react";
import ModalWrapper from "../../../../_metronic/layout/components/content/ModalWrapper";
import Gap from "../../../../_metronic/layout/components/content/Gap";
import { KTIcon } from "../../../../_metronic/helpers";
import ModalDetailPemesananUser from "./ModalDetailPemesananUser";
import ModalReason from "./ModalReason";
import globalVar from "../../../helper/globalVar";
import usePesanTempat from "../../../modules/hooks/pesan-tempat";

type Props = {
  show: boolean;
  data: any;
  handleClose: () => void;
};

const ModalDetailPesananMasuk: React.FC<Props> = ({
  show,
  data,
  handleClose,
}) => {
  const { changeStatus } = usePesanTempat();
  const [modalDetailPesananUser, setModalDetailPesananUser] = useState({
    show: false,
    data: {},
  });
  const [modalTypeReason, setModalTypeReason] = useState({
    show: false,
    type: "",
  });
  const [fields, setFields] = useState<any>({});
  const handleChange = (propertyId: string, value: any) => {
    setFields((prevFields: any) => ({
      ...prevFields,
      [propertyId]: value,
    }));
  };

  let statusDesc = "";
  switch (data?.status) {
    case "WAITING_ANSWER_LETTER":
      statusDesc = "Menunggu surat jawaban";
      break;
    case "KURASI":
      statusDesc = "Kurasi";
      break;
    case "PROSES":
      statusDesc = "Proses";
      break;
    case "DONE":
      statusDesc = "Selesai";
      break;
    case "PENDING":
      statusDesc = "Pesanan tertunda";
      break;
    case "REJECT":
      statusDesc = "Ditolak";
      break;
    case "REQUEST":
      statusDesc = "Menunggu persetujuan admin";
      break;
    case "EXPIRED":
      statusDesc = "Kadaluarsa";

      break;
  }

  const HandlerShowComponent = () => {
    let OthersContent = (
      <>
        <DetailItemFile
          title="Surat hasil kurasi"
          url="http"
          withUpload={false}
        />
      </>
    );
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
            setModalTypeReason({
              show: true,
              type: "Kurasi",
            });
          }}
        >
          Terima
        </div>
      </>
    );

    if (
      data?.status === "DONE" ||
      data?.status === "REQUEST" ||
      data?.status === "REJECT" ||
      data?.status === "PENDING"
    ) {
      ButtonShow = <></>;
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
          <DetailIten
            iconName={"home-2"}
            title={"Tipe Tempat"}
            desc={data?.tempat?.name}
          />
          <DetailIten
            iconName={"calendar-2"}
            title={"Tanggal pemesanan"}
            desc={globalVar.formatDate(data?.createdAt)}
          />
          <DetailIten
            iconName={"barcode"}
            title={"Kode booking"}
            desc={data?.kodeBooking}
          />
          <DetailIten iconName={"watch"} title={"Status"} desc={statusDesc} />
          <DetailIten
            iconName={"toggle-on-circle"}
            title={"Tangal mulai pentas"}
            desc={globalVar.formatDate(data?.startDate)}
          />
          <DetailIten
            iconName={"toggle-off-circle"}
            title={"Tanggal akhir pentas"}
            desc={globalVar.formatDate(data?.endDate)}
          />
          <DetailIten
            iconName={"mask"}
            title={"Judul Pentas"}
            desc={data?.judulPentas}
          />
          <DetailIten
            iconName={"home-2"}
            title={"Nama sanggar"}
            desc={data?.namaSanggar}
          />
          <DetailIten
            iconName={"geolocation"}
            title={"Alamat sanggar"}
            desc={data?.alamatSanggar}
          />

          <DetailIten
            iconName={"calculator"}
            title={"Total pembayaran"}
            desc={globalVar.formatRupiah(data?.priceTotal)}
          />
        </div>
        <h4>Berkas</h4>
        <Gap height={8} />
        <div className="row row-cols-3">
          <DetailItemFile
            title="Surat permohonan"
            id={"fileSuratPermohonan"}
            url={data?.suratPermohonan}
            withUpload={true}
            handleChangeFile={(value) =>
              handleChange("fileSuratPermohonan", value)
            }
            fields={fields}
          />
          <DetailItemFile
            title="Tanda pengenal"
            id={"fileTandaPengenal"}
            url={data?.tandaPengenal}
            withUpload={true}
            handleChangeFile={(value) =>
              handleChange("fileTandaPengenal", value)
            }
            fields={fields}
          />
          <DetailItemFile
            title="Proposal"
            id={"fileSuratProposal"}
            url={data?.proposal}
            withUpload={true}
            handleChangeFile={(value) =>
              handleChange("fileSuratProposal", value)
            }
            fields={fields}
          />
        </div>
        <Gap height={6} />
        <h4>Lainnya</h4>
        <Gap height={6} />
        <div className="row row-cols-3">
          <div
            role="button"
            onClick={() => setModalDetailPesananUser({ show: true, data: {} })}
          >
            <DetailItemFile
              title="Detail pemesanan"
              url=""
              withUpload={false}
            />
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
            setModalDetailPesananUser({ show: false, data: {} })
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
          onSubmit={(reason) => {
            const payload = {
              id: data.id,
              reason: reason,
              note: reason,
              ...fields,
            };
            changeStatus(modalTypeReason.type, payload);
            handleChange("reason", reason);
          }}
          type={modalTypeReason.type}
        />
      </>
    </ModalWrapper>
  );

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
    id?: string;
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
              <a
                className="btn btn-sm btn-light-primary"
                target="_blank"
                href={url}
              >
                Lihat {title}
              </a>
            ) : (
              <p className="m-0 btn btn-sm btn-light-primary">Lihat {title}</p>
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
                    if (id && handleChangeFile) {
                      handleChangeFile(e.target.files[0]);
                    }
                  }}
                />
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default ModalDetailPesananMasuk;
