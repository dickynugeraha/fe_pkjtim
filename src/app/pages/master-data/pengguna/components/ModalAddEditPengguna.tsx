import React, { FC, useState, useEffect } from "react";
import ModalWrapper from "../../../../../_metronic/layout/components/content/ModalWrapper";
import Gap from "../../../../../_metronic/layout/components/content/Gap";
import { Form, Col, Row, Button } from "react-bootstrap";
import { API_URL, ENDPOINTS } from "../../../../constants/API";
import { useAuth } from "../../../../modules/auth";

type PropsModalAddEditPengguna = {
  formAdd: boolean;
  isRoleKurator?: boolean;
  data: any;
  show: boolean;
  isLockedCheck: boolean;
  isValidated: boolean;
  fileValue: any;
  onChangeFile: (e: any) => void;
  handleIsValidated: (e: any) => void;
  handleIsCheckLocked: (e: any) => void;
  handleChange: (e: any) => void;
  handleChangeKTP: (e: any) => void;
  handleClose: () => void;
  handleSubmit: (data: any) => void;
};

const ModalAddEditPengguna: FC<PropsModalAddEditPengguna> = ({
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
  fileValue,
  onChangeFile,
  data,
}) => {
  const { auth } = useAuth();
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    undefined
  );
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);

  const valueSelectOption = [
    { value: "KOMITE_SENI_RUPA", text: "Komite Seni Rupa" },
    { value: "KOMITE_TARI", text: "Komite Tari" },
    { value: "KOMITE_MUSIK", text: "Komite Musik" },
    { value: "KOMITE_SASTRA", text: "Komite Sastra" },
    { value: "KOMITE_FILM", text: "Komite Film" },
    { value: "KOMITE_TEATER", text: "Komite Teater" },
    { value: "LINTAS_KOMITE", text: "Lintas Komite (komite bersama)" },
    {
      value: "KOMISI_FILANTROPI_DAN_SIMPUL_SENI",
      text: "Komisi Filantropi dan Simpul Seni",
    },
    { value: "KOMISI_ARSIP_DAN_RISET", text: "Komisi Arsip dan Riset" },
  ];

  useEffect(() => {
    if (fileValue) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(fileValue);
    }
  }, [fileValue]);

  useEffect(() => {
    // Fetch image with bearer token if `data.id` exists and no new file selected
    if (!fileValue && data?.id) {
      const fetchImage = async () => {
        const response = await fetch(
          `${API_URL}/${ENDPOINTS.PENGGUNA.MANAGEMENT_PENGGUNA}/${data.id}/Attachment/TandaPengenal`,
          {
            headers: {
              Authorization: `Bearer ${auth?.api_token}`, // Replace with actual token
            },
          }
        );
        const blob = await response.blob();
        setImageSrc(URL.createObjectURL(blob));
      };
      fetchImage();
    }
  }, [data, fileValue]);

  const handleValidate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleIsValidated(true);
    if ((event.currentTarget as HTMLFormElement).checkValidity()) {
      handleSubmit({});
    }
  };

  return (
    <ModalWrapper
      title={formAdd ? "Tambah Pengguna" : "Ubah Pengguna"}
      className="modal-md"
      attribute={{ centered: true }}
      show={show}
      handleClose={handleClose}
      footerCustom={
        <Button
          type="submit"
          className="btn btn-sm btn-primary"
          form="form-pengguna"
        >
          Simpan
        </Button>
      }
    >
      <Form
        id="form-pengguna"
        noValidate
        validated={isValidated}
        onSubmit={handleValidate}
      >
        <Row className="mb-3">
          <Form.Group>
            <Form.Label htmlFor="" className="fw-bold mb-2">
              Identitas pengguna <span className="text-danger">*</span>
            </Form.Label>
            <Row>
              <Col md={6}>
                {!formAdd && !fileValue && imageSrc && (
                  <img
                    className="rounded"
                    style={{ height: "150px", width: "100%" }}
                    src={imageSrc}
                  />
                )}
                {fileValue && imagePreview && (
                  <img
                    className="rounded"
                    style={{ height: "150px", width: "100%" }}
                    src={imagePreview}
                  />
                )}
                <Gap height={10} />
              </Col>
            </Row>
            <Row>
              <Form.Group>
                <Form.Control
                  type="file"
                  onChange={(e: any) => onChangeFile(e.target.files[0])}
                />
              </Form.Group>
            </Row>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md={6}>
            <Form.Label htmlFor="fullName" className="fw-bold">
              Nama Lengkap <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="fullName"
              id="fullName"
              value={data.fullName}
              className="form-control form-control-solid"
              onChange={(e) => handleChange(e)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Nama Lengkap Wajib Diisi!
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md={6}>
            <Form.Label htmlFor="email" className="fw-bold">
              Email <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="email"
              name="email"
              id="email"
              value={data.email}
              className="form-control form-control-solid"
              onChange={(e) => handleChange(e)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Email Wajib Diisi!
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md={6}>
            <Form.Label htmlFor="phoneNumber" className="fw-bold">
              Nomor Handphone <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="number"
              name="phoneNumber"
              id="phoneNumber"
              value={data.phoneNumber}
              onChange={(e) => handleChange(e)}
              className="form-control form-control-solid"
              required
            />
            <Form.Control.Feedback type="invalid">
              Nomor Handphone Wajib Diisi!
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md={6}>
            <Form.Label htmlFor="password" className="fw-bold">
              Password <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="password"
              name="password"
              id="password"
              value={data.password}
              onChange={(e) => handleChange(e)}
              className="form-control form-control-solid"
              required={formAdd ? true : false}
            />
            <Form.Control.Feedback type="invalid">
              Password Wajib Diisi!
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group className="form-group ">
              <Form.Label htmlFor="status" className="fw-bold">
                Status <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                name="status"
                id="status"
                className="form-select"
                onChange={(e) => handleChange(e)}
                required
              >
                <option value="">-- Pilih satu --</option>
                <option value="ACTIVE" selected={data.status === "ACTIVE"}>
                  Aktif
                </option>
                <option value="REQUEST" selected={data.status === "REQUEST"}>
                  Requested
                </option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="form-group my-6">
          <div className="d-flex">
            <Form.Check className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="isLocked"
                checked={isLockedCheck}
                onChange={(e) => {
                  const val = e.target.value === "on" ? true : false;
                  handleIsCheckLocked(val);
                }}
              />
            </Form.Check>
            <Form.Label htmlFor="status" className="fw-bold me-3">
              Kunci pengguna
            </Form.Label>
          </div>
        </Form.Group>

        <Form.Group className="form-group mb-3">
          <Form.Label htmlFor="role" className="fw-bold">
            Role <span className="text-danger">*</span>
          </Form.Label>
          <Form.Select
            name="role"
            id="role"
            className="form-select"
            onChange={(e) => handleChange(e)}
            required
          >
            <option value="">-- Pilih role --</option>
            <option selected={data.role === "SUPER_ADMIN"} value="SUPER_ADMIN">
              Super Admin
            </option>
            <option selected={data.role === "PENGELOLA"} value="PENGELOLA">
              Pengelola
            </option>
            <option selected={data.role === "KURATOR"} value="KURATOR">
              Kurator
            </option>
            <option selected={data.role === "USER"} value="USER">
              User
            </option>
          </Form.Select>
        </Form.Group>

        {data.role === "KURATOR" && (
          <Form.Group className="form-group mb-3">
            <Form.Label htmlFor="role" className="fw-bold">
              Komite <span className="text-danger">*</span>
            </Form.Label>
            <select
              name="komite"
              id="komite"
              className="form-select"
              onChange={(e) => handleChange(e)}
              required
            >
              <option value="">-- Pilih komite --</option>
              {valueSelectOption.map((item) => (
                <option
                  selected={data.komite === item.value}
                  value={item.value}
                >
                  {item.text}
                </option>
              ))}
            </select>
          </Form.Group>
        )}
      </Form>
    </ModalWrapper>
  );
};

export default ModalAddEditPengguna;
