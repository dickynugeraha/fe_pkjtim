import React, { FC } from "react";
import ModalWrapper from "../../../../../_metronic/layout/components/content/ModalWrapper";
import Gap from "../../../../../_metronic/layout/components/content/Gap";
import { KTIcon } from "../../../../../_metronic/helpers";
import globalVar from "../../../../helper/globalVar";

type Props = {
  show: boolean;
  data: any;
  handleClose: () => void;
};

const ModalDetailAcara: FC<Props> = ({ show, data, handleClose }) => {
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
      {data?.event?.extendedProps?.image != undefined &&
        <>
          <img
          src={data?.event?.extendedProps?.image}
          style={{ width: "100%" }}
            className="rounded"
          />
          <Gap height={24} />
        </>
      }
        <div>
          <div className="d-flex align-items-center">
            <KTIcon iconName="notepad" className="text-primary fs-1 me-3" />
            <p className="m-0 fs-3 fw-bold">{data?.event?.title}</p>
          </div>
          <Gap height={20} />
          <div className="d-flex align-items-center">
            <KTIcon iconName={"to-right"} className="fs-1 text-success me-3" />
            <p className="fs-4 m-0 fw-bold me-3">Mulai</p>
            <p className="m-0 fs-4">
              {globalVar.formatDate(data?.event?.extendedProps?.startDate)}
            </p>
          </div>
          <Gap height={8} />
          <div className="d-flex align-items-center">
            <KTIcon iconName={"abstract-5"} className="fs-1 text-danger me-3" />
            <p className="fs-4 m-0 fw-bold me-3">
              Selesai
            </p>
            <p className="m-0 fs-4">
              {globalVar.formatDate(data?.event?.extendedProps?.endDate)}
            </p>
          </div>
          <Gap height={8} />
          <div className="d-flex align-items-center">
            <KTIcon iconName={"geolocation"} className="fs-1 me-3" />
            <p className="fs-4 m-0 fw-bold me-3">
              Tempat
            </p>
            <p className="m-0 fs-4">
              {data?.event?.extendedProps?.tempat}
            </p>
          </div>
          <Gap height={8} />
          <div className="d-flex align-items-center">
            <KTIcon
              iconName={"questionnaire-tablet"}
              className="fs-1 text-info me-3"
            />
            <p className="fs-4 m-0 fw-bold me-3">
              Status
            </p>
            <p className="fs-4 m-0">
              {data?.event?.extendedProps?.status}
            </p>
          </div>
        </div>
      </>
    </ModalWrapper>
  );
};

export default ModalDetailAcara;
