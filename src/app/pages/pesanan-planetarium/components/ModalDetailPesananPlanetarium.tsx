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
  const [modalTolak, setModalTolak] = useState(false);
  const [modalTerima, setModalTerima] = useState(false);

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
            className="btn btn-sm btn-danger me-4"
            onClick={() => setModalTolak(true)}
          >
            Tolak
          </div>
          <div
            role="button"
            className="btn btn-sm btn-primary"
            onClick={() => setModalTerima(true)}
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
            desc={data.nama_sekolah}
            // desc={data.tanggal pemesanan}
          />
          <DetailIten
            iconName={"home-2"}
            title={"Nama sekolah"}
            desc={data.nama_sekolah}
            // desc={data.nama_sanggar}
          />
          <DetailIten
            iconName={"geolocation"}
            title={"Alamat sekolah"}
            desc={data.nama_sekolah}
            // desc={data.alamat_sangagr}
          />
          <DetailIten
            iconName={"book"}
            title={"Kegiatan"}
            desc={data.nama_sekolah}
            // desc={data.judul_pentas}
          />
          <DetailIten
            iconName={"toggle-on-circle"}
            title={"Tangal mulai kunjungan"}
            desc={data.nama_sekolah}
            // desc={data.tanggal_mulai_pentas}
          />
          <DetailIten
            iconName={"toggle-off-circle"}
            title={"Tanggal akhir kunjungan"}
            desc={data.nama_sekolah}
            // desc={data.tanggal_akhir_pentas}
          />
        </div>
        {(modalTolak || modalTerima) && <div className="overlay" />}
        <ModalWrapper
          title="Tulis alasan"
          show={modalTolak}
          handleClose={() => setModalTolak(false)}
          attribute={{ centered: true }}
          className="modal-md"
          footerCustom={
            <>
              <div role="button" className="btn btn-sm btn-danger mx-4">
                Tolak
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
            ></textarea>
          </>
        </ModalWrapper>
        <ModalWrapper
          title="Tulis alasan"
          show={modalTerima}
          handleClose={() => setModalTerima(false)}
          attribute={{ centered: true }}
          className="modal-md"
          footerCustom={
            <>
              <div role="button" className="btn btn-sm btn-primary">
                Terima
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
};

export default ModalDetailPesananPlanetarium;
