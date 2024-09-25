import React, { useState } from "react";
import ModalWrapper from "../../../../_metronic/layout/components/content/ModalWrapper";
import Gap from "../../../../_metronic/layout/components/content/Gap";
import { KTIcon } from "../../../../_metronic/helpers";
import ModalDetailPemesananUser from "./ModalDetailPemesananUser";
import ModalReason from "./ModalReason";
import globalVar from "../../../helper/globalVar";
import usePesanTempat from "../../../modules/hooks/pesan-tempat";
import Swal from "sweetalert2";

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

  console.log("modalTypeReason", modalTypeReason);

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
            changeStatus("Kurasi", payload);
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
          title="Surat hasil kurasi (Revisi)"
          //endpoint surat kurasi menyusul
          url={data?.suratPermohonan}
          withUpload={false}
        />
      );
    }

    if (data?.status === "DONE") {
      if (data?.kuratorName == undefined) {
        OthersContent = (
          <DetailItemFile
            title="Surat jawaban"
            //endpoint surat jawaban menyusul
            url={data?.suratPermohonan}
            withUpload={false}
          />
        );
      } else {
        OthersContent = (
          <>
            <DetailItemFile
              title="Surat hasil kurasi (Disetujui)"
              //endpoint surat kurasi menyusul
              url={data?.suratPermohonan}
              withUpload={false}
            />
            <DetailItemFile
              title="Surat jawaban"
              //endpoint surat jawaban menyusul
              url={data?.suratPermohonan}
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
          title="Surat hasil kurasi (Disetujui)"
          //endpoint surat kurasi menyusul
          url={data?.suratPermohonan}
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
            desc={data?.kodeBooking}
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
          {data?.status === "REJECT" && (
            <DetailItem
              iconName={"message-text"}
              title={"Alasan ditolak"}
              desc={data?.rejectNote}
            />
          )}
        </div>
        <h4>Berkas</h4>
        <Gap height={8} />
        <div className="row row-cols-3">
          <DetailItemFile
            title="Surat permohonan"
            id={"fileSuratPermohonan"}
            url={data?.suratPermohonan}
            withUpload={
              data?.status === "WAITING_ANSWER_LETTER" ||
              data?.status === "KURASI" ||
              data?.status === "REJECT" ||
              data?.status === "EXPIRED" ||
              data?.status === "DONE"
                ? false
                : true
            }
            handleChangeFile={(value) =>
              handleChange("fileSuratPermohonan", value)
            }
            fields={fields}
          />
          <DetailItemFile
            title="Surat proposal"
            id={"fileSuratProposal"}
            url={data?.proposal}
            withUpload={
              data?.status === "WAITING_ANSWER_LETTER" ||
              data?.status === "KURASI" ||
              data?.status === "REJECT" ||
              data?.status === "EXPIRED" ||
              data?.status === "DONE"
                ? false
                : true
            }
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
            onClick={() =>
              setModalDetailPesananUser({ show: true, data: data })
            }
          >
            <DetailItemFile title="Detail pemesan" url="" withUpload={false} />
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

            changeStatus(modalTypeReason?.type, payload);
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
  function DetailItem({ iconName, title, desc }: DetailItemProps) {
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
                <p className="m-0">{desc}</p>
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
              url != "" ? (
                <a
                  className="btn btn-sm btn-light-primary"
                  target="_blank"
                  href={url}
                >
                  Lihat {title}
                </a>
              ) : (
                "-"
              )
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
                    if (handleChangeFile) {
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
