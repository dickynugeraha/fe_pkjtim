import React, { useMemo, useState } from "react";
import {
  PageTitle,
  PageLink,
} from "../../../../_metronic/layout/core/PageData";
import { Content } from "../../../../_metronic/layout/components/content";
import Table from "../../../../_metronic/layout/components/table/Table";
import { KTIcon } from "../../../../_metronic/helpers";
import { dummyImage } from "../../dashboard/helper";
import ModalAddEditKoleksiSeni from "./components/ModalAddEditKoleksiSeni";

const Breadcrumbs: Array<PageLink> = [
  {
    title: "Koleksi Seni",
    path: "/master-data/koleksi-seni",
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

const KoleksiSeni = () => {
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
        nama_seniman: "Kim Parrish",
        detail_seni:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore laboriosam error praesentium asperiores, aspernatur quam quisquam, voluptatibus quod atque suscipit aliquam eos libero vero ad? Provident doloremque dolore perspiciatis mollitia?",
      },
      {
        id: "2",
        gambar: { dummyImage },
        nama_seniman: "Michele Castillo",
        detail_seni:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore laboriosam error praesentium asperiores, aspernatur quam quisquam, voluptatibus quod atque suscipit aliquam eos libero vero ad? Provident doloremque dolore perspiciatis mollitia?",
      },
      {
        id: "3",
        gambar: { dummyImage },
        nama_seniman: "Eric Ferris",
        detail_seni:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore laboriosam error praesentium asperiores, aspernatur quam quisquam, voluptatibus quod atque suscipit aliquam eos libero vero ad? Provident doloremque dolore perspiciatis mollitia?",
      },
      {
        id: "4",
        gambar: { dummyImage },
        nama_seniman: "Gloria Noble",
        detail_seni:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore laboriosam error praesentium asperiores, aspernatur quam quisquam, voluptatibus quod atque suscipit aliquam eos libero vero ad? Provident doloremque dolore perspiciatis mollitia?",
      },
      {
        id: "5",
        gambar: { dummyImage },
        nama_seniman: "Darren Daniels",
        detail_seni:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore laboriosam error praesentium asperiores, aspernatur quam quisquam, voluptatibus quod atque suscipit aliquam eos libero vero ad? Provident doloremque dolore perspiciatis mollitia?",
      },
      {
        id: "6",
        gambar: { dummyImage },
        nama_seniman: "Ted McDonald",
        detail_seni:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore laboriosam error praesentium asperiores, aspernatur quam quisquam, voluptatibus quod atque suscipit aliquam eos libero vero ad? Provident doloremque dolore perspiciatis mollitia?",
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
        Header: "Nama Seniman",
        sortType: "alphanumeric",
        accessor: "nama_seniman",
      },
      {
        Header: "Detail Seni",
        sortType: "alphanumeric",
        accessor: "detail_seni",
      },
      {
        Header: "Aksi",
        Cell: (props: any) => {
          let singleData = props.cell.row.original;

          return (
            <>
              <div className="input-group mb-3">
                <button
                  className="btn btn-sm btn-light-primary dropdown-toggle"
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
      <PageTitle
        icon="data"
        breadcrumbs={Breadcrumbs}
        description="Koleksi Seni"
      >
        Koleksi Seni
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
        <ModalAddEditKoleksiSeni
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
          handleSubmit={(data: any) => console.log(data)}
        />
      </Content>
    </>
  );
};

export default KoleksiSeni;
