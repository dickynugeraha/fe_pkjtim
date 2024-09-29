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
        Header: "Gambar",
        accessor: "file",
        sortType: "alphanumeric",
        Cell: (props: any) => {
          const [loading, setLoading] = useState(true);
          let singleData = props.cell.row.original;

          const handleImageLoad = () => {
            setLoading(false);
          };

          let content = <Skeleton height={80} width={150} />;
          setTimeout(() => {
            setLoading(false);
          }, 1000);

          if (!loading) {
            content = (
              <div style={{ width: "150px" }}>
                <img
                  src={singleData.file}
                  className="rounded"
                  style={{ width: "100%" }}
                  onLoad={handleImageLoad}
                />
              </div>
            );
          }

          return content;
        },
      },
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
                    className="fs-1 text-danger"
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
  // console.log("pengguna", pengguna);

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
      </Content>
    </>
  );
};
