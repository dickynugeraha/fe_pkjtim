import React, { FC } from "react";
import ModalWrapper from "../../../../_metronic/layout/components/content/ModalWrapper";
import Gap from "../../../../_metronic/layout/components/content/Gap";
import { KTIcon } from "../../../../_metronic/helpers";
import globalVar from "../../../helper/globalVar";

type Props = {
  show: boolean;
  data: any;
  handleClose: () => void;
};


const ModalDetailCalendar: FC<Props> = ({ show, data, handleClose }) => {
  return (
    <ModalWrapper
      title={data?.event?.extendedProps?.status == "Tempat Tutup" ? "Detail Tempat Tutup" : "Detail Acara"}
      show={show}
      handleClose={handleClose}
      attribute={{ centered: true }}
      className="modal-md"
      footerCustom={<></>}
    >
      <>
        <div>
          <div className="d-flex align-items-center">
            <KTIcon
              iconName={"questionnaire-tablet"}
              className="fs-1 text-info me-3"
            />
            <p className="m-0 fs-3 fw-bold">{data?.event?.title}</p>
          </div>
          <Gap height={20} />
          {data?.event?.extendedProps?.namaSekolah &&
            <div className="d-flex align-items-center">
              <KTIcon iconName={"home-1"} className="fs-1 text-danger me-3" />
              <p className="fs-4 m-0 fw-bold me-3">
                Nama Sekolah
              </p>
              <p className="m-0 fs-4">
                {data?.event?.extendedProps?.namaSekolah}
              </p>
            </div>
          }
          <Gap height={8} />
          <div className="d-flex align-items-center">
            <KTIcon iconName={"to-right"} className="fs-1 text-success me-3" />
            <p className="fs-4 m-0 fw-bold me-3">Tanggal</p>
            <p className="m-0 fs-4">
              {data?.event?.extendedProps?.eventDate}
            </p>
          </div>
        </div>
      </>
    </ModalWrapper>
  );
};

export default ModalDetailCalendar;
