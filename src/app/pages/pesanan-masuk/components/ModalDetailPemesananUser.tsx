import { KTIcon } from "../../../../_metronic/helpers";
import Gap from "../../../../_metronic/layout/components/content/Gap";
import ModalWrapper from "../../../../_metronic/layout/components/content/ModalWrapper";
import { API_URL, ENDPOINTS } from "../../../constants/API";

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
      className="modal-lg"
      footerCustom={<></>}
      handleClose={handleClose}
      show={show}
      title="Detail Pemesan User"
    >
      <>
        <div className="row">
          <div className="col">
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
          </div>
          <div className="col">
          <div className="d-flex align-items-center">
            <KTIcon iconName="message-notif" className="fs-3 me-3" />
            <div>
              <h6 className="m-0">Email</h6>
              <Gap height={5} />
                <p
                  className="m-0"
                >
                  {data.creatorEmail}
                </p>
            </div>
          </div>
          </div>
          <div className="col">
          <div className="d-flex align-items-center">
            <KTIcon iconName="user" className="fs-3 me-3" />
            <div>
              <h6 className="m-0">Nomor hp</h6>
              <Gap height={5} />
              <p className="m-0">{data.creatorPhone}</p>
            </div>
          </div>
          </div>
        </div>
        <Gap height={32} />
        <div>
          <h6>Tanda pengenal</h6>
          <Gap height={6} />
          <div className="row row-cols-lg-2 ">
            <div className="col">
              <img
                src={`${API_URL}/${ENDPOINTS.PENGGUNA.MANAGEMENT_PENGGUNA}/${data?.creatorId}/Attachment/TandaPengenal`}
                style={{
                  width: "100%",
                  borderRadius: "10px",
                }}
              />
            </div>
            <div className="col"></div>
          </div>
        </div>
      </>
    </ModalWrapper>
  );
};

export default ModalDetailPemesananUser;
