import React, { useEffect, useMemo, useState } from "react";
import {
  PageTitle,
  PageLink,
} from "../../../../_metronic/layout/core/PageData";
import { Content } from "../../../../_metronic/layout/components/content";
import Table from "../../../../_metronic/layout/components/table/Table";
import { KTIcon } from "../../../../_metronic/helpers";
import ModalAddEditContactPerson from "./components/ModalAddEditContactPerson";
import Skeleton from "react-loading-skeleton";
import useContactPerson from "../../../modules/hooks/master-data/contact-person";
import globalVar from "../../../helper/globalVar";

const Breadcrumbs: Array<PageLink> = [
  {
    title: "Kontak Person",
    path: "/master-data/contact-person",
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

export const ContactPerson = () => {
  const {
    loading,
    closeModal,
    formData,
    handleChange,
    isEdit,
    isModalOpen,
    openModal,
    addContact,
    contact,
    deleteContact,
    fetchAllContact,
    updateContact,
  } = useContactPerson();

  const data = useMemo(
    () => contact,
    [loading, addContact, updateContact, deleteContact]
  );

  useEffect(() => {
    fetchAllContact();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Nama Kontak",
        sortType: "alphanumeric",
        accessor: "name",
      },
      {
        Header: "Nomor handphone",
        sortType: "alphanumeric",
        accessor: "phone",
      },
      {
        Header: "Untuk Kontent",
        sortType: "alphanumeric",
        accessor: "forContent",
      },
      {
        Header: "Aksi",
        Cell: (props: any) => {
          let singleData = props.cell.row.original;

          return (
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
                      onClick={() => deleteContact(singleData.id, contact)}
                    >
                      <KTIcon iconName="trash" className="me-3 fs-3" />
                      <p className="m-0">Hapus</p>
                    </button>
                  </li>
                </ul>
              </div>
            </>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <PageTitle
        icon="data"
        breadcrumbs={Breadcrumbs}
        description="Kontak Person"
      >
        Kontak Person
      </PageTitle>
      <Content>
        <Table
          loading={loading}
          searchData={() => {}}
          columns={columns}
          data={data}
          addData={() => openModal()}
        />
        <ModalAddEditContactPerson
          fileValue={formData}
          handleChangeVal={(e: any) => handleChange(e)}
          show={isModalOpen}
          data={formData}
          fromAdd={!isEdit}
          handleClose={() => closeModal()}
          handleSubmit={() => {
            if (isEdit) {
              updateContact(formData, contact);
            } else {
              const data = {
                ...formData,
                id: globalVar.generateRandomId(),
              };
              addContact(data);
            }
          }}
        />
      </Content>
    </>
  );
};
