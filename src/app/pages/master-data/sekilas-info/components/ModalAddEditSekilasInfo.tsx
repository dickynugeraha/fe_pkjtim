import React, { FC, useState } from 'react';
import ModalWrapper from '../../../../../_metronic/layout/components/content/ModalWrapper';
import Gap from '../../../../../_metronic/layout/components/content/Gap';
import { Col, Form, Row } from 'react-bootstrap';

type PropsModalAddEditSekilasInfo = {
  fromAdd: boolean;
  fileValue: any;
  data: any;
  tempat: any[];
  show: boolean;
  isValidated: boolean;
  handleIsValidated: (e: any) => void;
  onChangeVal: (e: any) => void;
  onChangeFile: (e: any) => void;
  handleClose: () => void;
  handleSubmit: (data: any) => void;
};

const ModalAddEditSekilasInfo: FC<PropsModalAddEditSekilasInfo> = ({
  fromAdd,
  show,
  tempat,
  fileValue,
  onChangeVal,
  onChangeFile,
  handleClose,
  handleSubmit,
  handleIsValidated,
  isValidated,
  data,
}) => {
  // const [placeIsClose, setPlaceIsClose] = useState(false);
  const [imagePreview, setImagePreview] = useState();

  const handleImageChange = (file: any) => {
    if (file) {
      const reader: any = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleValidate = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    handleIsValidated(true);

    if (form.checkValidity() === true) {
      handleSubmit({});
    }
  };

  handleImageChange(fileValue);
  return (
    <ModalWrapper
      title={fromAdd ? 'Tambah Info' : 'Ubah Info'}
      className='modal-md'
      attribute={{ centered: true }}
      show={show}
      handleClose={handleClose}
      footerCustom={
        <button
          type='submit'
          className='btn btn-sm btn-primary'
          form='form-info'
        >
          Simpan
        </button>
      }
    >
      <Form
        id='form-info'
        noValidate
        validated={isValidated}
        onSubmit={handleValidate}
      >
        <Row>
          <Form.Group>
            <Form.Label htmlFor='' className='fw-bold mb-2'>
              Gambar <span className='text-danger'>*</span>
            </Form.Label>
            <Row>
              <Col md={6}>
                {!fromAdd && !fileValue && (
                  <img
                    className='rounded'
                    style={{ height: '150px', width: '100%' }}
                    src={data.file}
                  />
                )}
                {fileValue && (
                  <img
                    className='rounded'
                    style={{ height: '150px', width: '100%' }}
                    src={imagePreview}
                  />
                )}
                <Gap height={10} />
              </Col>
            </Row>
            <Row>
              <Form.Group>
                <Form.Control
                  type='file'
                  required
                  onChange={(e: any) => onChangeFile(e.target.files[0])}
                />
                <Form.Control.Feedback type='invalid'>
                  Gambar Wajib Diisi!
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
          </Form.Group>
        </Row>
        <Gap height={10} />
        <Row>
          <Form.Group>
            <Form.Label htmlFor='title' className='fw-bold'>
              Judul Info <span className='text-danger'>*</span>
            </Form.Label>
            <Form.Control
              type='text'
              id='title'
              className='form-control form-control-solid'
              name='title'
              value={data.title}
              onChange={(e) => onChangeVal(e)}
              required
            />
            <Form.Control.Feedback type='invalid'>
              Judul Wajib Diisi!
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className='mt-3'>
          <Form.Group>
            <Form.Label htmlFor='content' className='fw-bold'>
              Detail Info <span className='text-danger'>*</span>
            </Form.Label>
            <Form.Control
              rows={4}
              as='textarea'
              name='content'
              id='content'
              className='form-control form-control-solid'
              value={data.content}
              onChange={(e) => onChangeVal(e)}
              required
            ></Form.Control>
          </Form.Group>
        </Row>
        <Row className='mt-3'>
          <Form.Group>
            <Form.Label htmlFor='status' className='fw-bold mb-3'>
              Status <span className='text-danger'>*</span>
            </Form.Label>
            <Form.Select
              name='status'
              id='status'
              className='form-select'
              onChange={(e) => onChangeVal(e)}
              required
            >
              <option value=''>--- Pilih satu ---</option>
              <option value='PUBLISHED' selected={data.status === 'PUBLISHED'}>
                Terbit
              </option>
              <option value='DRAFT' selected={data.status === 'DRAFT'}>
                Draft
              </option>
            </Form.Select>
          </Form.Group>
        </Row>
      </Form>
    </ModalWrapper>
  );
};

export default ModalAddEditSekilasInfo;
