import React, { useState } from "react";
import ModalWrapper from "../../../../_metronic/layout/components/content/ModalWrapper";
import Gap from "../../../../_metronic/layout/components/content/Gap";
import { KTIcon } from "../../../../_metronic/helpers";
import ModalDetailPemesananUser from "./ModalDetailPemesananUser";
import ModalReasonReject from "./ModalReasonReject";
import globalVar from "../../../helper/globalVar";

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
  console.log("dataaaa", data);

  const [modalShow, setModalShow] = useState({
    detail: {
      show: false,
      data: {},
    },
    revisi: { show: false },
    tolak: { show: false },
  });
  const [modalDetailPesananUser, setModalDetailPesananUser] = useState({
    show: false,
    data: {},
  });
  const [modalTolak, setModalTolak] = useState(false);
  const [modalSelesai, setModalSelesai] = useState(false);
  let statusDesc = "";
  switch (data?.status) {
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
        <div role="button" className="btn btn-sm btn-success">
          Selesai
        </div>
        <div
          role="button"
          className="btn btn-sm btn-danger mx-4"
          onClick={() => setModalTolak(true)}
        >
          Tolak
        </div>
        <div role="button" className="btn btn-sm btn-primary">
          Terima
        </div>
      </>
    );

    if (data?.status === "DONE" || data?.status === "REJECT") {
      ButtonShow = <></>;
    }
    if (data?.status === "REVISION") {
      ButtonShow = (
        <>
          <div role="button" className="btn btn-sm btn-success">
            Selesai
          </div>
          <div
            role="button"
            className="btn btn-sm btn-danger mx-4"
            onClick={() => setModalTolak(true)}
          >
            Tolak
          </div>
          <div role="button" className="btn btn-sm btn-primary">
            Revisi
          </div>
        </>
      );
    }
    if (data?.status === "PENDING") {
      ButtonShow = (
        <>
          <div role="button" className="btn btn-sm btn-success">
            Selesai
          </div>
          <div
            role="button"
            className="btn btn-sm btn-danger mx-4"
            onClick={() => setModalTolak(true)}
          >
            Tolak
          </div>
        </>
      );
    }

    if (data?.status === "REQUEST" || data?.status === "PENDING") {
      OthersContent = <></>;
    }
    if (data?.status === "REJECT") {
      OthersContent = (
        <div>
          <h6 className="m-0 mb-4">Alasan Ditolak</h6>
          <textarea
            className="form-control fs-7"
            disabled
            style={{ minHeight: "120px" }}
          >
            Alasan Ditolak bla bla Alasan Ditolak bla bla Alasan Ditolak bla bla
            Alasan Ditolak bla bla Alasan Ditolak bla bla
            {/* {data?.alasanDitolak} */}
          </textarea>
        </div>
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
            desc={globalVar.rupiahFormat(data?.priceTotal)}
          />
        </div>
        <h4>Berkas</h4>
        <Gap height={8} />
        <div className="row row-cols-3">
          <DetailItemFile
            title="Surat permohonan"
            url={data?.suratPermohonan}
            withUpload={true}
          />
          <DetailItemFile
            title="Tanda pengenal"
            url={data?.tandaPengenal}
            withUpload={true}
          />
          <DetailItemFile
            title="Proposal"
            url={data?.proposal}
            withUpload={true}
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
        {(modalTolak || modalDetailPesananUser.show) && (
          <div className="overlay" />
        )}

        <ModalDetailPemesananUser
          data={modalDetailPesananUser.data}
          show={modalDetailPesananUser.show}
          handleClose={() =>
            setModalDetailPesananUser({ show: false, data: {} })
          }
        />
        <ModalReasonReject
          show={modalTolak}
          handleClose={() => setModalTolak(false)}
          onSubmit={(reason) => {}}
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
    title: string;
    url: string;
    withUpload: boolean;
  };
  function DetailItemFile({ title, url, withUpload }: DetailItemFileProps) {
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
                <input type="file" className="form-control" />
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default ModalDetailPesananMasuk;
