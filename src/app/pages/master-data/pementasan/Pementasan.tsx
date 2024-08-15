import React, { useMemo, useState } from "react";
import {
  PageTitle,
  PageLink,
} from "../../../../_metronic/layout/core/PageData";
import { Content } from "../../../../_metronic/layout/components/content";
import Table from "../../../../_metronic/layout/components/table/Table";
import { KTIcon } from "../../../../_metronic/helpers";
import { dummyImage } from "../../../helper/helper";
import ModalAddEditPementasan from "./components/ModalAddEditPementasan";

const Breadcrumbs: Array<PageLink> = [
  {
    title: "Pementasan",
    path: "/master-data/pementasan",
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

export const Pementasan = () => {
  const [modaAddlEdit, setModalAddEdit] = useState({
    fromAdd: false,
    show: false,
    data: {},
  });

  const data = useMemo(
    () => [
      {
        id: "1",
        gambar: { dummyImage },
        detail_info: "4420 Valley Street, Garnerville, NY 10923",
        judul_sinopsis: "Kim Parrish",
        nama_sanggar: "Kim Parrish",
        sinopsis:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore laboriosam error praesentium asperiores, aspernatur quam quisquam, voluptatibus quod atque suscipit aliquam eos libero vero ad? Provident doloremque dolore perspiciatis mollitia?",
        status: "Terbit",
      },
      {
        id: "2",
        gambar: { dummyImage },
        detail_info: "637 Kyle Street, Fullerton, NE 68638",
        judul_sinopsis: "Michele Castillo",
        nama_sanggar: "Michele Castillo",
        sinopsis:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore laboriosam error praesentium asperiores, aspernatur quam quisquam, voluptatibus quod atque suscipit aliquam eos libero vero ad? Provident doloremque dolore perspiciatis mollitia?",
        status: "Draft",
      },
      {
        id: "3",
        gambar: { dummyImage },
        detail_info: "906 Hart Country Lane, Toccoa, GA 30577",
        judul_sinopsis: "Eric Ferris",
        nama_sanggar: "Eric Ferris",
        sinopsis:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore laboriosam error praesentium asperiores, aspernatur quam quisquam, voluptatibus quod atque suscipit aliquam eos libero vero ad? Provident doloremque dolore perspiciatis mollitia?",

        status: "Terbit",
      },
      {
        id: "4",
        gambar: { dummyImage },
        detail_info: "2403 Edgewood Avenue, Fresno, CA 93721",
        judul_sinopsis: "Gloria Noble",
        nama_sanggar: "Gloria Noble",
        sinopsis:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore laboriosam error praesentium asperiores, aspernatur quam quisquam, voluptatibus quod atque suscipit aliquam eos libero vero ad? Provident doloremque dolore perspiciatis mollitia?",

        status: "Terbit",
      },
      {
        id: "5",
        gambar: { dummyImage },
        detail_info: "882 Hide A Way Road, Anaktuvuk Pass, AK 99721",
        judul_sinopsis: "Darren Daniels",
        nama_sanggar: "Darren Daniels",
        sinopsis:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore laboriosam error praesentium asperiores, aspernatur quam quisquam, voluptatibus quod atque suscipit aliquam eos libero vero ad? Provident doloremque dolore perspiciatis mollitia?",

        status: "Draft",
      },
      {
        id: "6",
        gambar: { dummyImage },
        detail_info: "796 Bryan Avenue, Minneapolis, MN 55406",
        judul_sinopsis: "Ted McDonald",
        nama_sanggar: "Ted McDonald",
        sinopsis:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore laboriosam error praesentium asperiores, aspernatur quam quisquam, voluptatibus quod atque suscipit aliquam eos libero vero ad? Provident doloremque dolore perspiciatis mollitia?",
        status: "Terbit",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: "Gambar",
        accessor: "gambar",
        sortType: "alphanumeric",
        Cell: (props: any) => {
          let singleData = props.cell.row.original;

          return (
            <div style={{ width: "150px" }}>
              <img
                src={singleData.gambar.dummyImage}
                className="rounded"
                style={{ width: "100%" }}
              />
            </div>
          );
        },
      },
      {
        Header: "Nama Sanggar",
        sortType: "alphanumeric",
        accessor: "nama_sanggar",
      },
      {
        Header: "Judul",
        sortType: "alphanumeric",
        accessor: "judul_sinopsis",
      },
      {
        Header: "Sinopsis",
        sortType: "alphanumeric",
        accessor: "sinopsis",
      },
      {
        Header: "Status",
        accessor: "status",
        sortType: "alphanumeric",
        Cell: (props: any) => {
          let singleData = props.cell.row.original;
          const className =
            singleData.status === "Draft"
              ? "m-0 text-danger bg-light-danger text-center rounded p-2"
              : "m-0 text-success bg-light-success text-center rounded p-2";
          return <p className={className}>{singleData.status}</p>;
        },
      },

      {
        Header: "Aksi",
        Cell: (props: any) => {
          let singleData = props.cell.row.original;

          return (
            <>
              <div className="input-group mb-3">
                <button
                  className="btn btn-sm btn-primary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Pilih
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <button
                      className="dropdown-item d-flex align-items-center"
                      onClick={() =>
                        setModalAddEdit({
                          show: true,
                          data: singleData,
                          fromAdd: false,
                        })
                      }
                    >
                      <KTIcon iconName="pencil" className="me-3 fs-3" />
                      <p className="m-0">Ubah</p>
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item d-flex align-items-center">
                      <KTIcon iconName="trash-square" className="me-3 fs-3" />
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
      <PageTitle icon="data" breadcrumbs={Breadcrumbs} description="Pementasan">
        Pementasan
      </PageTitle>
      <Content>
        <Table
          columns={columns}
          data={data}
          addData={() =>
            setModalAddEdit({
              show: true,
              data: {},
              fromAdd: true,
            })
          }
        />
        <ModalAddEditPementasan
          show={modaAddlEdit.show}
          data={modaAddlEdit.data}
          fromAdd={modaAddlEdit.fromAdd}
          handleClose={() =>
            setModalAddEdit({
              fromAdd: false,
              show: false,
              data: {},
            })
          }
          handleSubmit={(data) => console.log(data)}
        />
      </Content>
    </>
  );
};
