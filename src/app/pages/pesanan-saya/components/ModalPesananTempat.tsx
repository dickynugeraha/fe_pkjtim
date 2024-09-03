import React, { FC } from "react";
import { KTIcon } from "../../../../_metronic/helpers";
import Gap from "../../../../_metronic/layout/components/content/Gap";
import ModalWrapper from "../../../../_metronic/layout/components/content/ModalWrapper";

type Props = {
  show: boolean;
  hideModal: () => void;
  data: any;
};

const ModalDetailPesanan: FC<Props> = ({ data, show, hideModal }) => {
  const iconNames = ["home-2", "mask", "home-2", "geolocation-home"];

  return (
    <ModalWrapper
      title="Detail pesanan"
      show={show}
      handleClose={hideModal}
      attribute={{ centered: true }}
      className="modal-lg"
      footerCustom={<></>}
    >
      <>
        <div className="row row-cols-3">
          <DetailIten
            iconName={"home-2"}
            title={"Tipe Tempat"}
            desc={data.tipe_tempat}
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
            iconName={"calendar-2"}
            title={"Tanggal pemesanan"}
            desc={data.tipe_tempat}
            // desc={data.tanggal pemesanan}
          />
          <DetailIten
            iconName={"calculator"}
            title={"Total pembayaran"}
            desc={data.tipe_tempat}
            // desc={data.total_pembayaran}
          />
          <DetailIten
            iconName={"watch"}
            title={"Status"}
            desc={data.tipe_tempat}
            // desc={data.status}
          />
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
            iconName={"barcode"}
            title={"Kode booking"}
            desc={data.tipe_tempat}
            // desc={data.kode_booking}
          />
        </div>
        <h6>Berkas</h6>
        <Gap height={8} />
        <div className="row row-cols-3">
          <DetailItemFile title="Surat permohonan" url="http" />
          <DetailItemFile title="Tanda pengenal" url="http" />
          <DetailItemFile title="Proposal" url="http" />
        </div>
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
  };
  function DetailItemFile({ title, url }: DetailItemFileProps) {
    return (
      <div className="col mb-6">
        <div className="d-flex align-items-center">
          <div>
            <div className="d-flex">
              <KTIcon iconName={"file"} className="fs-3 me-3" />
              <h6 className="m-0">{title}</h6>
            </div>
            <Gap height={12} />
            <a className="btn btn-sm btn-light-primary" href={url}>
              Lihat {title}
            </a>
          </div>
        </div>
      </div>
    );
  }
};

export default ModalDetailPesanan;
