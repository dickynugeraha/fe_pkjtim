import React, { useEffect, useMemo, useState } from "react";
import {
  PageTitle,
  PageLink,
} from "../../../../_metronic/layout/core/PageData";
import { Content } from "../../../../_metronic/layout/components/content";
import Table from "../../../../_metronic/layout/components/table/Table";
import { KTIcon } from "../../../../_metronic/helpers";
import ModalAddEditPengguna from "./components/ModalAddEditPengguna";
import usePengguna from "../../../modules/hooks/master-data/pengguna";
import ModalWrapper from "../../../../_metronic/layout/components/content/ModalWrapper";
import Skeleton from "react-loading-skeleton";
import { API_URL, ENDPOINTS } from "../../../constants/API";
import Gap from "../../../../_metronic/layout/components/content/Gap";

const Breadcrumbs: Array<PageLink> = [
  {
    title: "Pengguna",
    path: "/master-data/pengguna",
    isSeparator: false,
    isActive: true,
  },
  {
    title: "",
    path: "",
    isSeparator: true,
    isActive: true,
  },
];

export const Pengguna = () => {
  const {
    addPengguna,
    deletePengguna,
    fetchAllPengguna,
    loading,
    pengguna,
    updatePengguna,
    approveRequestRegisterFromAdmin,
    closeModal,
    formData,
    formFile,
    setFormFile,
    handleChange,
    isEdit,
    isLockedCheck,
    isModalOpen,
    openModal,
    setIsLockedCheck,
    setQuery,
    isValidated,
    setIsValidated,
  } = usePengguna();

  const [ktpValue, setKtpValue] = useState();
  const [modalKtp, setModalKtp] = useState<{ url: string; show: boolean }>({
    url: "",
    show: false,
  });
  const [modalDetailPengguna, setModalDetailPengguna] = useState<{
    data: any;
    show: boolean;
  }>({ data: {}, show: false });

  const data = useMemo(
    () => pengguna,
    [updatePengguna, addPengguna, deletePengguna, fetchAllPengguna]
  );

  useEffect(() => {
    fetchAllPengguna();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Nama Lengkap",
        accessor: "fullName",
        sortType: "alphanumeric",
      },
      {
        Header: "Email",
        accessor: "email",
        sortType: "alphanumeric",
      },
      {
        Header: "Nomor Telepon",
        accessor: "phoneNumber",
        sortType: "alphanumeric",
      },
      {
        Header: "Role",
        accessor: "role",
        sortType: "alphanumeric",
        Cell: (props: any) => {
          let singleData = props.cell.row.original;
          let className = "";
          let title = "";

          if (singleData.role === "SUPER_ADMIN") {
            className = "badge badge-light-success fs-6";
            title = "Super Admin";
          } else if (singleData.role === "PENGELOLA") {
            className = "badge badge-light-info fs-6";
            title = "Pengelola";
          } else if (singleData.role === "KURATOR") {
            className = "badge badge-light-warning fs-6";
            title = "Kurator";
          } else if (singleData.role === "USER") {
            className = "badge badge-light-primary fs-6";
            title = "User";
          }
          return <span className={className}>{title}</span>;
        },
      },
      {
        Header: "Status",
        accessor: "status",
        sortType: "alphanumeric",
        Cell: (props: any) => {
          let singleData = props.cell.row.original;
          let className = "";
          let title = "";

          if (singleData.status === "ACTIVE") {
            className = "badge badge-light-success fs-6";
            title = "Aktif";
          } else if (singleData.status === "REQUEST") {
            className = "badge badge-light-warning fs-6";
            title = "Request";
          } else {
            className = "badge badge-light-success fs-6";
            title = "Tidak aktif";
          }

          return <span className={className}>{title}</span>;
        },
      },
      {
        Header: "Aksi",
        Cell: (props: any) => {
          let singleData = props.cell.row.original;
          let actionButton = (
            <>
              <div className="input-group">
                <button
                  className="btn btn-sm btn-primary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Aksi
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <button
                      className="dropdown-item d-flex align-items-center"
                      onClick={() => openModal(singleData)}
                    >
                      <KTIcon iconName="pencil" className="me-3 fs-3" />
                      <p className="m-0">Ubah</p>
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item d-flex align-items-center"
                      onClick={() => deletePengguna(singleData.id)}
                    >
                      <KTIcon iconName="trash" className="me-3 fs-3" />
                      <p className="m-0">Hapus</p>
                    </button>
                  </li>
                </ul>
              </div>
            </>
          );

          if (singleData.status === "REQUEST") {
            actionButton = (
              <div className="d-flex align-items-center">
                <div
                  role="button"
                  onClick={() => approveRequestRegisterFromAdmin(singleData.id)}
                >
                  <KTIcon
                    iconName="check-square"
                    className="fs-1 text-success me-3"
                  />
                </div>
                <div
                  role="button"
                  onClick={() => deletePengguna(singleData.id)}
                >
                  <KTIcon
                    iconName="delete-folder"
                    className="fs-1 text-danger me-3"
                  />
                </div>
                <div
                  role="button"
                  onClick={() => {
                    setModalDetailPengguna({ data: singleData, show: true });
                  }}
                >
                  <KTIcon
                    iconName="burger-menu"
                    className="fs-1 text-warning"
                  />
                </div>
              </div>
            );
          }

          return actionButton;
        },
      },
    ],
    []
  );

  return (
    <>
      <PageTitle icon="data" breadcrumbs={Breadcrumbs} description="Pengguna">
        Pengguna
      </PageTitle>
      <Content>
        <Table
          loading={loading}
          searchData={(val: string) => setQuery(val)}
          columns={columns}
          data={data}
          addData={() => openModal()}
        />
        <ModalWrapper
          handleClose={() => setModalKtp({ show: false, url: "" })}
          title="Foto KTP"
          className="modal-md"
          attribute={{ centered: true }}
          footerCustom={<></>}
          show={modalKtp.show}
        >
          <img src={modalKtp.url} />
        </ModalWrapper>
        <ModalAddEditPengguna
          isLockedCheck={isLockedCheck}
          handleIsCheckLocked={() => setIsLockedCheck(!isLockedCheck)}
          handleChange={(e) => handleChange(e)}
          handleChangeKTP={(val) => setKtpValue(val)}
          show={isModalOpen}
          data={formData}
          formAdd={!isEdit}
          fileValue={formFile}
          onChangeFile={(e) => setFormFile(e)}
          handleClose={() => closeModal()}
          isValidated={isValidated}
          handleIsValidated={setIsValidated}
          handleSubmit={() => {
            const formAll = {
              ...formData,
              ktp: formFile,
              isLocked: isLockedCheck,
            };
            if (isEdit) {
              updatePengguna(formAll);
            } else {
              addPengguna(formAll);
            }
          }}
        />
        <ModalWrapper
          title={"Detail Pengguna"}
          className="modal-lg"
          attribute={{ centered: true }}
          show={modalDetailPengguna.show}
          handleClose={() => {
            setModalDetailPengguna({ ...modalDetailPengguna, show: false });
          }}
          footerCustom={<></>}
        >
          <>
            <h5>Foto Identitas</h5>
            <Gap height={8} />
            <img
              src={`${API_URL}/${ENDPOINTS.PENGGUNA.MANAGEMENT_PENGGUNA}/${modalDetailPengguna.data.id}/Attachment/TandaPengenal`}
              style={{ width: "100%", borderRadius: 8 }}
            />
            <Gap height={16} />
            <div className="d-flex justify-content-between">
              <div>
                <h5>Nama Lengkap</h5>
                <p>{modalDetailPengguna.data.fullName}</p>
              </div>
              <div>
                <h5>Nomor Handphone</h5>
                <p>{modalDetailPengguna.data.phoneNumber}</p>
              </div>
              <div>
                <h5>Email</h5>
                <p>{modalDetailPengguna.data.email}</p>
              </div>
            </div>
          </>
        </ModalWrapper>
      </Content>
    </>
  );
};
