import React, { FC, useState } from "react";
import ModalWrapper from "../../../../_metronic/layout/components/content/ModalWrapper";
import globalVar from "../../../helper/globalVar";
import { Card, Col, Row } from "react-bootstrap";
import Gap from "../../../../_metronic/layout/components/content/Gap";

type Props = {
  tempat: any[];
  loading: boolean;
};

const TarifSewa: FC<Props> = ({ tempat, loading }) => {
  const [modalDetailTarif, setModalDetailTarif] = useState<{
    show: boolean;
    data: any;
  }>({
    show: false,
    data: null,
  });
  return (
    <div className="col-12 col-lg-6">
      <Card>
        <Card.Header className="d-flex align-items-center">
          <h4 className="m-0">Tarif Sewa</h4>
        </Card.Header>
        <Card.Body>
          {tempat.map((val) => (
            <div className="row align-items-center">
              <div className="col">
                <a
                  className="btn btn-light-primary btn-sm mb-2 w-75"
                  role="button"
                  onClick={() =>
                    setModalDetailTarif({
                      show: true,
                      data: val,
                    })
                  }
                >
                  Detail tarif {val.name}
                </a>
              </div>
            </div>
          ))}
          <Gap height={12} />
          <p className="text-danger">
            *) Berdasarkan Retribusi Sesuai Perda No. 1 Tahun 2024
          </p>
        </Card.Body>
      </Card>
      <Gap height={15} />
      <Card>
        <Card.Header className="d-flex align-items-center">
          <h4 className="m-0 p-0">Berkas Yang Perlu Disiapkan</h4>
        </Card.Header>
        <Card.Body>
          <h5 className="">Surat Permohonan</h5>
          <p className="">Surat Permohonan resmi dari pihak pemesan</p>
          <Gap height={12} />
          <h5 className="">Proposal</h5>
          <p className="">
            Proposal dari pada acara yang akan di selenggarakan
          </p>
        </Card.Body>
      </Card>
      <ModalWrapper
        footerCustom={<></>}
        title={`Tarif Sewa ${modalDetailTarif?.data?.name}`}
        handleClose={() =>
          setModalDetailTarif({
            ...modalDetailTarif,
            show: false,
          })
        }
        show={modalDetailTarif.show}
        className="modal-md"
        attribute={{ centered: true }}
      >
        <div className="row">
          <ol className="col">
            <ul className="mb-2">
              Harga Main Event (Hari kerja) :{" "}
              {globalVar.formatRupiah(
                modalDetailTarif?.data?.priceMainEventWeekDay
              )}
            </ul>
            <ul className="mb-2">
              Harga Main Event (Akhir pekan) :{" "}
              {globalVar.formatRupiah(
                modalDetailTarif?.data?.priceMainEventWeekEnd
              )}
            </ul>
            <ul className="mb-2">
              Harga Pre Event (Hari kerja) :{" "}
              {globalVar.formatRupiah(
                modalDetailTarif?.data?.pricePreEventWeekDay
              )}
            </ul>
            <ul className="mb-2">
              Harga Pre Event (Akhir pekan) :{" "}
              {globalVar.formatRupiah(
                modalDetailTarif?.data?.pricePreEventWeekEnd
              )}
            </ul>
          </ol>
        </div>
      </ModalWrapper>
    </div>
  );
};

export default TarifSewa;
