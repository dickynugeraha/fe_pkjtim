import React, { useState } from "react";
import ModalWrapper from "../../../../_metronic/layout/components/content/ModalWrapper";
import Gap from "../../../../_metronic/layout/components/content/Gap";
import { KTIcon } from "../../../../_metronic/helpers";
import ModalDetailPemesananUser from "./ModalDetailPemesananUser";
import ModalReasonReject from "./ModalReasonReject";

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

    if (data.status === "Selesai" || data.status === "Ditolak") {
      ButtonShow = <></>;
    }
    if (data.status === "Revisi") {
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
    if (data.status === "Pending") {
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
        <h4>Berkas</h4>
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
          onSubmit={(reason) => {
            console.log("reason tolak", reason);
          }}
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

export default ModalDetailPesananMasuk;
