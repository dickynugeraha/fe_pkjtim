import React, { FC, useState } from 'react';
import ModalWrapper from '../../../../../_metronic/layout/components/content/ModalWrapper';
import Gap from '../../../../../_metronic/layout/components/content/Gap';
import { Form, Col, InputGroup, Row, Button } from 'react-bootstrap';

type PropsModalAddEditSekilasInfo = {
  formAdd: boolean;
  isRoleKurator?: boolean;
  data: any;
  show: boolean;
  isLockedCheck: boolean;
  isValidated: boolean;
  handleIsValidated: (e: any) => void;
  handleIsCheckLocked: (e: any) => void;
  handleChange: (e: any) => void;
  handleClose: () => void;
  handleSubmit: (data: any) => void;
};

const ModalAddEditPengguna: FC<PropsModalAddEditSekilasInfo> = ({
  formAdd,
  show,
  isLockedCheck,
  isValidated,
  handleIsValidated,
  isRoleKurator = false,
  handleIsCheckLocked,
  handleChange,
  handleClose,
  handleSubmit,
  data,
}) => {
  const valueSelectOption = [
    { value: 'komite_seni_rupa', text: 'Komite Seni Rupa' },
    { value: 'komite_tari', text: 'Komite Tari' },
    { value: 'komite_musik', text: 'Komite Musik' },
    { value: 'komite_sastra', text: 'Komite Sastra' },
    { value: 'komite_film', text: 'Komite Film' },
    { value: 'komite_teater', text: 'Komite Teater' },
    { value: 'lintas_komite', text: 'Lintas Komite (komite bersama)' },
    { value: 'komisi_filantropi', text: 'Komisi Filantropi dan Simpul Seni' },
    { value: 'komisi_arsip', text: 'Komisi Arsip dan Riset' },
  ];

  const handleValidate = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    handleIsValidated(true);

    if (form.checkValidity() === true) {
      handleSubmit({});
    }
  };

  return (
    <ModalWrapper
      title={formAdd ? 'Tambah Pengguna' : 'Ubah Pengguna'}
      className='modal-md'
      attribute={{ centered: true }}
      show={show}
      handleClose={() => {
        handleClose();
      }}
      footerCustom={
        <Button
          type='submit'
          className='btn btn-sm btn-primary'
          form='form-pengguna'
        >
          Simpan
        </Button>
      }
    >
      <Form
        id='form-pengguna'
        noValidate
        validated={isValidated}
        onSubmit={handleValidate}
      >
        <Row className='mb-3'>
          <Form.Group as={Col} md={6}>
            <Form.Label htmlFor='fullName' className='fw-bold'>
              Nama Lengkap <span className='text-danger'>*</span>
            </Form.Label>
            <Form.Control
              type='text'
              name='fullName'
              id='fullName'
              value={data.fullName}
              className='form-control form-control-solid'
              onChange={(e) => handleChange(e)}
              required
            />
            <Form.Control.Feedback type='invalid'>
              Nama Lengkap Wajib Diisi!
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md={6}>
            <Form.Label htmlFor='email' className='fw-bold'>
              Email <span className='text-danger'>*</span>
            </Form.Label>
            <Form.Control
              type='email'
              name='email'
              id='email'
              value={data.email}
              className='form-control form-control-solid'
              onChange={(e) => handleChange(e)}
              required
            />
            <Form.Control.Feedback type='invalid'>
              Email Wajib Diisi!
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className='mb-3'>
          <Form.Group as={Col} md={6}>
            <Form.Label htmlFor='phoneNumber' className='fw-bold'>
              Nomor Handphone <span className='text-danger'>*</span>
            </Form.Label>
            <Form.Control
              type='number'
              name='phoneNumber'
              id='phoneNumber'
              value={data.phoneNumber}
              onChange={(e) => handleChange(e)}
              className='form-control form-control-solid'
              required
            />
            <Form.Control.Feedback type='invalid'>
              Nomor Handphone Wajib Diisi!
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md={6}>
            <Form.Label htmlFor='password' className='fw-bold'>
              Password <span className='text-danger'>*</span>
            </Form.Label>
            <Form.Control
              type='password'
              name='password'
              id='password'
              value={data.password}
              onChange={(e) => handleChange(e)}
              className='form-control form-control-solid'
              required={formAdd ? true : false}
            />
            <Form.Control.Feedback type='invalid'>
              Password Wajib Diisi!
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Form.Group className='form-group mb-3'>
          <Form.Label htmlFor='status' className='fw-bold'>
            Status <span className='text-danger'>*</span>
          </Form.Label>
          <Form.Select
            name='status'
            id='status'
            className='form-select'
            onChange={(e) => handleChange(e)}
            required
          >
            <option value=''>-- Pilih satu --</option>
            <option value='ACTIVE' selected={data.status === 'ACTIVE'}>
              Aktif
            </option>
            <option value='REQUEST' selected={data.status === 'REQUEST'}>
              Requested
            </option>
          </Form.Select>
        </Form.Group>
        <Form.Group className='form-group my-6'>
          <div className='d-flex'>
            <Form.Check className='form-check'>
              <input
                className='form-check-input'
                type='checkbox'
                name='isLocked'
                checked={isLockedCheck}
                onChange={(e) => {
                  const val = e.target.value === 'on' ? true : false;
                  handleIsCheckLocked(val);
                }}
              />
            </Form.Check>
            <Form.Label htmlFor='status' className='fw-bold me-3'>
              Kunci pengguna
            </Form.Label>
          </div>
        </Form.Group>
        <Form.Group className='form-group mb-3'>
          <Form.Label htmlFor='role' className='fw-bold'>
            Role <span className='text-danger'>*</span>
          </Form.Label>
          <Form.Select
            name='role'
            id='role'
            className='form-select'
            onChange={(e) => handleChange(e)}
            value={data.role}
            // required
          >
            <option value=''>-- Pilih role --</option>
            <option selected={data.roles === 'SUPER_ADMIN'} value='SUPER_ADMIN'>Super Admin</option>
            <option selected={data.roles === 'PENGELOLA'} value='PENGELOLA'>Pengelola</option>
            <option selected={data.roles === 'KURATOR'} value='KURATOR'>Kurator</option>
            <option selected={data.roles === 'USER'} value='USER'>User</option>
          </Form.Select>
        </Form.Group>

        {!formAdd && isRoleKurator && (
          <div className='form-group mb-3'>
            <label htmlFor='komite' className='fw-bold'>
              Komite <span className='text-danger'>*</span>
            </label>
            <Gap height={10} />
            <select name='komite' id='komite' className='form-select'>
              {valueSelectOption.map((data) => (
                <option value={data.value}>{data.text}</option>
              ))}
            </select>
          </div>
        )}
      </Form>
    </ModalWrapper>
  );
};

export default ModalAddEditPengguna;
