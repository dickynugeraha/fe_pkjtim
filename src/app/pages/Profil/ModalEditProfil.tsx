import { FC, useState } from "react";
import { Modal } from "react-bootstrap";
import { KTSVG } from "../../../_metronic/helpers";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  IProfileDetails,
  // profileDetailsInitValues as initialValues,
} from "../../modules/accounts/components/settings/SettingsModel";
import { useAuth, UserModel } from "../../modules/auth";
import usePengguna from "../../modules/hooks/master-data/pengguna";

type Props = {
  show: boolean;
  singlePengguna: any;
  hideModal: () => void;
  onChangeProfile: () => void;
};

const profileDetailsSchema = Yup.object().shape({
  fullName: Yup.string().required("Nama lengkap harus diisi"),
  phoneNumber: Yup.string().required("Nomor handphone harus diisi"),
});

const ModalEditProfil: FC<Props> = ({
  show,
  hideModal,
  singlePengguna,
  onChangeProfile,
}) => {
  const { currentUser, setCurrentUser } = useAuth();
  const initialValues: IProfileDetails = {
    id: currentUser?.id as string,
    fullName: currentUser?.name as string,
    email: currentUser?.email as string,
    phoneNumber: currentUser?.phoneNumber as string,
    isLocked: singlePengguna?.isLocked,
    status: singlePengguna?.status,
    companySite: "",
    country: "",
    language: "",
    timeZone: "",
    currency: "",
    communications: {
      email: false,
      phone: false,
    },
    allowMarketing: false,
  };
  const { updatePengguna, loading } = usePengguna();

  const [data, setData] = useState<IProfileDetails>(initialValues);
  const updateData = (fieldsToUpdate: Partial<IProfileDetails>): void => {
    const updatedData = Object.assign(data, fieldsToUpdate);
    setData(updatedData);
  };

  // const [loading, setLoading] = useState(false);
  const formik = useFormik<IProfileDetails>({
    initialValues,
    validationSchema: profileDetailsSchema,
    onSubmit: (values) => {
      const payload = {
        id: values.id,
        fullName: values.fullName,
        phoneNumber: values.phoneNumber,
        email: currentUser?.email as string,
        status: singlePengguna.status,
      };
      updatePengguna(payload);
      const newCurrentUser = {
        id: values.id,
        name: values.fullName,
        phoneNumber: values.phoneNumber,
        email: currentUser?.email as string,
      };
      setCurrentUser(newCurrentUser as UserModel | undefined);

      const updatedData = Object.assign(data, values);

      setData(updatedData);
      onChangeProfile();
    },
  });

  return (
    <Modal show={show} onHide={hideModal} centered={true}>
      <Modal.Header>
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ width: "100%" }}
        >
          <h4 className="m-0 p-0">Ubah data diri</h4>
          <div
            className="btn btn-icon btn-sm btn-active-light-primary ms-2"
            onClick={hideModal}
            aria-label="Close"
          >
            <KTSVG
              path="media/icons/duotune/arrows/arr061.svg"
              className="svg-icon svg-icon-2x"
            />
          </div>
        </div>
      </Modal.Header>
      <form onSubmit={formik.handleSubmit} noValidate className="form">
        <Modal.Body>
          <div className="row mb-6">
            <label className="col-lg-5 col-form-label required fw-bold fs-6">
              Nama Lengkap
            </label>

            <div className="col-lg-7">
              <input
                type="text"
                className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                placeholder="Nama lengkap"
                {...formik.getFieldProps("fullName")}
              />
              {formik.touched.fullName && formik.errors.fullName && (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">{formik.errors.fullName}</div>
                </div>
              )}
            </div>
          </div>
          <div className="row mb-6">
            <label className="col-lg-5 col-form-label required fw-bold fs-6">
              Nomor Handphone
            </label>

            <div className="col-lg-7">
              <input
                type="text"
                className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                placeholder="Nomor handphone"
                {...formik.getFieldProps("phoneNumber")}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">
                    {formik.errors.phoneNumber}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="btn btn-sm btn-light" onClick={hideModal}>
            Batal
          </div>
          <button
            type="submit"
            className="btn btn-sm btn-primary"
            disabled={!!loading}
          >
            {loading ? `Loading...` : `Ubah`}
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalEditProfil;
