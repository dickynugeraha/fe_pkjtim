import { FC, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { KTSVG } from '../../../_metronic/helpers';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  IProfileDetails,
  profileDetailsInitValues as initialValues,
} from '../../modules/accounts/components/settings/SettingsModel';

type Props = {
  show: boolean;
  hideModal: () => void;
};

const profileDetailsSchema = Yup.object().shape({
  fName: Yup.string().required('First name is required'),
  lName: Yup.string().required('Last name is required'),
  company: Yup.string().required('Company name is required'),
  contactPhone: Yup.string().required('Contact phone is required'),
  companySite: Yup.string().required('Company site is required'),
  country: Yup.string().required('Country is required'),
  language: Yup.string().required('Language is required'),
  timeZone: Yup.string().required('Time zone is required'),
  currency: Yup.string().required('Currency is required'),
});

const ModalEditProfil: FC<Props> = ({ show, hideModal }) => {
  const [data, setData] = useState<IProfileDetails>(initialValues);
  const updateData = (fieldsToUpdate: Partial<IProfileDetails>): void => {
    const updatedData = Object.assign(data, fieldsToUpdate);
    setData(updatedData);
  };

  const [loading, setLoading] = useState(false);
  const formik = useFormik<IProfileDetails>({
    initialValues,
    validationSchema: profileDetailsSchema,
    onSubmit: (values) => {
      setLoading(true);
      setTimeout(() => {
        values.communications.email = data.communications.email;
        values.communications.phone = data.communications.phone;
        values.allowMarketing = data.allowMarketing;
        const updatedData = Object.assign(data, values);
        setData(updatedData);
        setLoading(false);
      }, 1000);
    },
  });

  return (
    <Modal show={show} onHide={hideModal} centered={true}>
      <Modal.Header>
        <h4 className='m-0 p-0'>Ubah data diri</h4>
        <div
          className='btn btn-icon btn-sm btn-active-light-primary ms-2'
          onClick={hideModal}
          aria-label='Close'
        >
          <KTSVG
            path='media/icons/duotune/arrows/arr061.svg'
            className='svg-icon svg-icon-2x'
          />
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className='row mb-6'>
          <label className='col-lg-5 col-form-label required fw-bold fs-6'>
            Nama Lengkap
          </label>

          <div className='col-lg-7'>
            <input
              type='text'
              className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
              placeholder='First name'
              {...formik.getFieldProps('fName')}
            />
            {formik.touched.fName && formik.errors.fName && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>{formik.errors.fName}</div>
              </div>
            )}
          </div>
        </div>
        <div className='row mb-6'>
          <label className='col-lg-5 col-form-label required fw-bold fs-6'>
            Nomor Handphone
          </label>

          <div className='col-lg-7'>
            <input
              type='text'
              className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
              placeholder='First name'
              {...formik.getFieldProps('contactPhone')}
            />
            {formik.touched.fName && formik.errors.fName && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>{formik.errors.fName}</div>
              </div>
            )}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className='btn btn-sm btn-light' onClick={hideModal}>
          Batal
        </div>
        <div className='btn btn-sm btn-primary'>Ubah</div>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEditProfil;
