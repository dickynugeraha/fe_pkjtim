import { KTIcon } from "../../../../_metronic/helpers";
import Gap from "../../../../_metronic/layout/components/content/Gap";
import ModalWrapper from "../../../../_metronic/layout/components/content/ModalWrapper";

type ModalDetailPemesananUserProps = {
  data: any;
  show: boolean;
  handleClose: () => void;
};
const ModalDetailPemesananUser = ({
  data,
  show,
  handleClose,
}: ModalDetailPemesananUserProps) => {
  return (
    <ModalWrapper
      attribute={{ centered: true }}
      className="modal-md z-2"
      footerCustom={<></>}
      handleClose={handleClose}
      show={show}
      title="Detail Pemesan User"
    >
      <>
        <div className="row row-cols-3">
          <div className="d-flex align-items-center">
            <KTIcon iconName="user" className="fs-3 me-3" />
            <div>
              <h6 className="m-0">Nama lengkap</h6>
              <Gap height={5} />
              <div style={{ width: "120px" }}>
                <p
                  className="m-0"
                  style={{ textOverflow: "ellipsis", overflow: "hidden" }}
                >
                  {data.creatorName}
                </p>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <KTIcon iconName="message-notif" className="fs-3 me-3" />
            <div>
              <h6 className="m-0">Email</h6>
              <Gap height={5} />
              <div style={{ width: "120px" }}>
                <p
                  style={{ textOverflow: "ellipsis", overflow: "hidden" }}
                  className="m-0"
                >
                  {data.creatorEmail}
                </p>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <KTIcon iconName="user" className="fs-3 me-3" />
            <div>
              <h6 className="m-0">Nomor hp</h6>
              <p className="m-0">{data.creatorPhone}</p>
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
};

export default ModalDetailPemesananUser;
