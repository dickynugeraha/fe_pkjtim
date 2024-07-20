import React, { useState } from "react";
import ModalWrapper from "../../../../_metronic/layout/components/content/ModalWrapper";
import Gap from "../../../../_metronic/layout/components/content/Gap";
import { KTIcon } from "../../../../_metronic/helpers";

type Props = {
  show: boolean;
  data: any;
  handleClose: () => void;
};

const ModalDetailKurasiPentas: React.FC<Props> = ({
  show,
  data,
  handleClose,
}) => {
  const [modalShowRevisi, setModalShowRevisi] = useState(false);
  const [modalShowTerima, setModalShowTerima] = useState(false);

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
            className="btn btn-sm btn-danger mx-4"
            onClick={() => setModalShowRevisi(true)}
          >
            Revisi
          </div>
          <div
            role="button"
            className="btn btn-sm btn-success"
            onClick={() => setModalShowTerima(true)}
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
            title={"Keperluan"}
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
        <ModalWrapper
          title="Tulis alasan"
          show={modalShowRevisi}
          handleClose={() => setModalShowRevisi(false)}
          attribute={{ centered: true }}
          className="modal-md"
          footerCustom={
            <div role="button" className="btn btn-sm btn-danger mx-4">
              Revisi
            </div>
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
          show={modalShowTerima}
          handleClose={() => setModalShowTerima(false)}
          attribute={{ centered: true }}
          className="modal-md"
          footerCustom={
            <div role="button" className="btn btn-sm btn-danger mx-4">
              Terima
            </div>
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

  type ModalReasonRejectProps = {
    onSubmit: (reason: string) => void;
    show: boolean;
    handleClose: () => void;
  };

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

export default ModalDetailKurasiPentas;
