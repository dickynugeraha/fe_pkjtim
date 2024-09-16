import React, { FC, useState } from "react";
import ModalWrapper from "../../../../_metronic/layout/components/content/ModalWrapper";
import globalVar from "../../../helper/globalVar";
import { Card, Col, Row } from "react-bootstrap";

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
          <div className="row row-cols-2">
            <div className="col-6 col-md-4">
              <ul>
                {tempat.map((val) => (
                  <li>{val.name}</li>
                ))}
              </ul>
            </div>
            <div>
              <ol className="m-0 p-0">
                {tempat.map((val) => (
                  <ul
                    className="text-primary"
                    role="button"
                    onClick={() =>
                      setModalDetailTarif({
                        show: true,
                        data: val,
                      })
                    }
                  >
                    Detail tarif
                  </ul>
                ))}
              </ol>
            </div>
          </div>
          <p className="text-danger">
            *) Berdasarkan Retribusi Sesuai Perda No. 1 Tahun 2024
          </p>
        </Card.Body>
      </Card>
      <ModalWrapper
        footerCustom={<></>}
        title={`Tarif Sewa ${modalDetailTarif?.data?.name}`}
        handleClose={() =>
          setModalDetailTarif({
            data: null,
            show: false,
          })
        }
        show={modalDetailTarif.show}
        className="modal-md"
        attribute={{ centered: true }}
      >
        <div className="row row-cols-2">
          <ol className="col-7">
            <ul className="mb-2">Harga Main Event (Hari kerja)</ul>
            <ul className="mb-2">Harga Main Event (Akhir pekan)</ul>
            <ul className="mb-2">Harga Pre Event (Hari kerja)</ul>
            <ul className="mb-2">Harga Pre Event (Akhir pekan)</ul>
          </ol>
          <ol className="col-5">
            <ul className="mb-2">
              :{" "}
              {globalVar.formatRupiah(
                modalDetailTarif?.data?.priceMainEventWeekDay
              )}
            </ul>
            <ul className="mb-2">
              :{" "}
              {globalVar.formatRupiah(
                modalDetailTarif?.data?.priceMainEventWeekEnd
              )}
            </ul>
            <ul className="mb-2">
              :{" "}
              {globalVar.formatRupiah(
                modalDetailTarif?.data?.pricePreEventWeekDay
              )}
            </ul>
            <ul className="mb-2">
              :{" "}
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
