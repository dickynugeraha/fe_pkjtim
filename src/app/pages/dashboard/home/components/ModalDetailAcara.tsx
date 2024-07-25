import React, { FC } from "react";
import ModalWrapper from "../../../../../_metronic/layout/components/content/ModalWrapper";
import Gap from "../../../../../_metronic/layout/components/content/Gap";
import { KTIcon } from "../../../../../_metronic/helpers";

type Props = {
  show: boolean;
  data: any;
  handleClose: () => void;
};

const ModalDetailAcara: FC<Props> = ({ show, data, handleClose }) => {
  function convertDate(str: any) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  return (
    <ModalWrapper
      title="Detail Acara"
      show={show}
      handleClose={handleClose}
      attribute={{ centered: true }}
      className="modal-md"
      footerCustom={<></>}
    >
      <>
        <img
          src={data?.event?.extendedProps?.image}
          style={{ width: "100%" }}
          className="rounded"
        />
        <Gap height={24} />
        <div>
          <div className="d-flex align-items-center">
            <KTIcon iconName="calendar" className="text-primary fs-1 me-3" />
            <p className="m-0 fs-3 fw-bold">{data?.event?.title}</p>
          </div>
          <Gap height={18} />
          <div className="d-flex align-items-center">
            <KTIcon
              iconName={"toggle-on-circle"}
              className="fs-1 text-success me-3"
            />
            <p className="fs-4 m-0 fw-bold me-3">Mulai</p>
            <p className="m-0 fs-4">{convertDate(data?.view?.activeStart)}</p>
          </div>
          <Gap height={8} />
          <div className="d-flex align-items-center">
            <KTIcon
              iconName={"toggle-off-circle"}
              className="fs-1 text-danger me-3"
            />
            <p className="fs-4 m-0 fw-bold me-3">Selesai</p>
            <p className="m-0 fs-4">{convertDate(data?.view?.activeEnd)}</p>
          </div>
          <Gap height={18} />
          <div className="d-flex align-items-center">
            <KTIcon iconName={"geolocation"} className="fs-1 me-3" />
            <p className="fs-4 m-0 fw-bold">
              {data?.event?.extendedProps?.tempat}
            </p>
          </div>
        </div>
      </>
    </ModalWrapper>
  );
};

export default ModalDetailAcara;
