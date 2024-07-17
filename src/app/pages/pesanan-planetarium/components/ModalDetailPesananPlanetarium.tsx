import React, { useState } from "react";
import ModalWrapper from "../../../../_metronic/layout/components/content/ModalWrapper";
import Gap from "../../../../_metronic/layout/components/content/Gap";
import { KTIcon } from "../../../../_metronic/helpers";

type Props = {
  show: boolean;
  data: any;
  handleClose: () => void;
};

const ModalDetailPesananPlanetarium: React.FC<Props> = ({
  show,
  data,
  handleClose,
}) => {
  const [modalShow, setModalShow] = useState({
    detail: {
      show: false,
      data: {},
    },
    revisi: { show: false },
    tolak: { show: false },
  });
  const [modalDetailPesananMasuk, setModalDetailPesananMasuk] = useState({
    show: false,
    data: {},
  });
  const [modalTolak, setModalTolak] = useState(false);
  const [modalSelesai, setModalSelesai] = useState(false);

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
        <div role="button" className="btn btn-sm btn-danger mx-4">
          Tolak
        </div>
        <div role="button" className="btn btn-sm btn-primary">
          Terima
        </div>
      </>
    );

    if (data.status === "Selesai" || data.status === "Ditolak") {
      ButtonShow = <></>;
    }
    if (data.status === "Revisi") {
      ButtonShow = (
        <>
          <div role="button" className="btn btn-sm btn-success">
            Selesai
          </div>
          <div role="button" className="btn btn-sm btn-danger mx-4">
            Tolak
          </div>
          <div role="button" className="btn btn-sm btn-primary">
            Revisi
          </div>
        </>
      );
    }
    if (data.status === "Pending") {
      ButtonShow = (
        <>
          <div role="button" className="btn btn-sm btn-success">
            Selesai
          </div>
          <div role="button" className="btn btn-sm btn-danger mx-4">
            Tolak
          </div>
        </>
      );
    }

    if (data.status === "Proses" || data.status === "Pending") {
      OthersContent = <></>;
    }
    if (data.status === "Ditolak") {
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
            {/* {data.alasanDitolak} */}
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
            desc={data.tipe_tempat}
          />
          <DetailIten
            iconName={"calendar-2"}
            title={"Tanggal pemesanan"}
            desc={data.tipe_tempat}
            // desc={data.tanggal pemesanan}
          />
          <DetailIten
            iconName={"barcode"}
            title={"Kode booking"}
            desc={data.tipe_tempat}
            // desc={data.kode_booking}
          />
          <DetailIten iconName={"watch"} title={"Status"} desc={data.status} />
          <DetailIten
            iconName={"toggle-on-circle"}
            title={"Tangal mulai pentas"}
            desc={data.tipe_tempat}
            // desc={data.tanggal_mulai_pentas}
          />
          <DetailIten
            iconName={"toggle-off-circle"}
            title={"Tanggal akhir pentas"}
            desc={data.tipe_tempat}
            // desc={data.tanggal_akhir_pentas}
          />
          <DetailIten
            iconName={"mask"}
            title={"Judul Pentas"}
            desc={data.tipe_tempat}
            // desc={data.judul_pentas}
          />
          <DetailIten
            iconName={"home-2"}
            title={"Nama sanggar"}
            desc={data.tipe_tempat}
            // desc={data.nama_sanggar}
          />
          <DetailIten
            iconName={"geolocation"}
            title={"Alamat sanggar"}
            desc={data.tipe_tempat}
            // desc={data.alamat_sangagr}
          />

          <DetailIten
            iconName={"calculator"}
            title={"Total pembayaran"}
            desc={data.tipe_tempat}
            // desc={data.total_pembayaran}
          />
        </div>
        <h6>Berkas</h6>
        <Gap height={8} />
        <div className="row row-cols-3">
          <DetailItemFile
            title="Surat permohonan"
            url="http"
            withUpload={true}
          />
          <DetailItemFile title="Tanda pengenal" url="http" withUpload={true} />
          <DetailItemFile title="Proposal" url="http" withUpload={true} />
        </div>
        <Gap height={6} />
        <h6>Lainnya</h6>
        <Gap height={6} />
        <div className="row row-cols-3">
          <div
            role="button"
            onClick={() => setModalDetailPesananMasuk({ show: true, data: {} })}
          >
            <DetailItemFile
              title="Detail pemesanan"
              url=""
              withUpload={false}
            />
          </div>
          {HandlerShowComponent().OthersContent}
        </div>
        <ModalDetailPemesananUser
          data={{}}
          show={modalDetailPesananMasuk.show}
          handleClose={() =>
            setModalDetailPesananMasuk({ show: false, data: {} })
          }
        />
        {/* <ModalReasonReject
          show={modalTolak}
          handleClose={() => setModalTolak(false)}
          onSubmit={(reason) => {
            console.log("reason tolak", reason);
          }}
        /> */}
      </>
    </ModalWrapper>
  );

  type ModalReasonRejectProps = {
    onSubmit: (reason: string) => void;
    show: boolean;
    handleClose: () => void;
  };
  function ModalReasonReject({ onSubmit }: ModalReasonRejectProps) {
    const [textReason, setTextReason] = useState("");

    return (
      <ModalWrapper
        title="Tulis alasan"
        attribute={{ centered: true }}
        className="modal-md z-3"
        footerCustom={
          <div
            className="btn btn-sm btn-success"
            role="button"
            onClick={() => onSubmit(textReason)}
          >
            Selesai
          </div>
        }
        handleClose={handleClose}
        show={show}
      >
        <>
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
  }

  type ModalDetailPemesananUserProps = {
    data: any;
    show: boolean;
    handleClose: () => void;
  };
  function ModalDetailPemesananUser({
    data,
    show,
    handleClose,
  }: ModalDetailPemesananUserProps) {
    return (
      <ModalWrapper
        attribute={{ centered: true }}
        className="modal-md z-2"
        footerCustom={<></>}
        handleClose={handleClose}
        show={show}
        title="Detail Pemesanan User"
      >
        <>
          <div className="row row-cols-3">
            <div className="d-flex align-items-center">
              <KTIcon iconName="user" className="fs-3 me-3" />
              <div>
                <h6 className="m-0">Nama lengkap</h6>
                <p className="m-0">Kale Pramono</p>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <KTIcon iconName="message-notif" className="fs-3 me-3" />
              <div>
                <h6 className="m-0">Email</h6>
                <p className="m-0">kale@gmail.com</p>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <KTIcon iconName="user" className="fs-3 me-3" />
              <div>
                <h6 className="m-0">Nomor hp</h6>
                <p className="m-0">08962125148616</p>
              </div>
            </div>
          </div>
          <Gap height={32} />
          <div>
            <h6>Tanda pengenal</h6>
            <Gap height={6} />
            <div className="row row-cols-lg-2 ">
              <div className="col">
                <div
                  className="bg-gray-200 rounded"
                  style={{ height: "100px" }}
                ></div>
              </div>
              <div className="col"></div>
            </div>
          </div>
        </>
      </ModalWrapper>
    );
  }

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
              <a className="btn btn-sm btn-light-primary" href={url}>
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

export default ModalDetailPesananPlanetarium;
