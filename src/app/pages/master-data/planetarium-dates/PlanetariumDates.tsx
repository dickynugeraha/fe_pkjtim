import React, { useEffect, useMemo, useState } from "react";
import {
  PageTitle,
  PageLink,
} from "../../../../_metronic/layout/core/PageData";
import { Content } from "../../../../_metronic/layout/components/content";
import Table from "../../../../_metronic/layout/components/table/Table";
import { KTIcon, KTSVG } from "../../../../_metronic/helpers";
import globalVar from "../../../helper/globalVar";
import axiosConfig from "../../../utils/services/axiosConfig";
import { ENDPOINTS } from "../../../constants/API";
import { DEFAULT_LIMIT, INITIAL_PAGE } from "../../../constants/PAGE";
import ModalWrapper from "../../../../_metronic/layout/components/content/ModalWrapper";
import Gap from "../../../../_metronic/layout/components/content/Gap";
import { useAuth } from "../../../modules/auth";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";

const Breadcrumbs: Array<PageLink> = [
  {
    title: "Tanggal Astronomy",
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

export const PlanetariumDates = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [dates, setDates] = useState<any[]>([]);
  const [addDates, setAddDates] = useState<any[]>([]);
  const [availableDate, setAvailableDate] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<any>();

  const getAllReservationDate = async () => {
    setLoading(true);
    try {
      const res = await axiosConfig.get(
        `${ENDPOINTS.PLANETARIUM.LIST_UPDATE_ADD_DELETE_PLANETARIUM}/Dates`,
        {
          IsIncludePlanetarium: true,
          Page: INITIAL_PAGE,
          Limit: DEFAULT_LIMIT,
        }
      );

      const dataReservationDate: any[] = res.data.data.data;

      setDates(dataReservationDate);
      const dates: any[] = [];
      dataReservationDate.map((data) => {
        dates.push(new Date(globalVar.formatInputDate(data.date)));
      });
      setAvailableDate(dates);
    } catch (error) {
      throw error;
    }
    setLoading(false);
  };

  const addReservationDate = async () => {
    setLoading(true);

    try {
      Swal.fire({
        title: "Apakah anda yakin",
        text: "Akan melakukan penambaan data planetarium?!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve("Confirmed");
            }, 1000);
          });
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await axiosConfig.post(
              `${ENDPOINTS.PLANETARIUM.LIST_UPDATE_ADD_DELETE_PLANETARIUM}/Dates/Many`,
              {
                actor: currentUser?.email,
                date: addDates,
              }
            );
            if (res) {
              Swal.fire({
                icon: "success",
                title: "Berhasil menambahkan tanggal reservasi astronomy",
                showConfirmButton: false,
                timer: 2000,
              }).then(() => {
                setAddDates([]);
                setShowModal(false);
                getAllReservationDate();
              });
            }
          } catch (error: any) {
            Swal.fire({
              icon: "error",
              title: "ERROR",
              text: error.message,
              showConfirmButton: false,
            });
          }
        }
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: error.message,
        showConfirmButton: false,
      });
    }
    setLoading(false);
  };

  const deleteReservationDate = async (id: number) => {
    setLoading(true);
    try {
      Swal.fire({
        title: "Apakah anda yakin",
        text: "Akan melakukan hapus data planetarium?!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve("Confirmed");
            }, 1000);
          });
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await axiosConfig.delete(
              `${ENDPOINTS.PLANETARIUM.LIST_UPDATE_ADD_DELETE_PLANETARIUM}/Dates/${id}?actor=${currentUser?.email}`
            );
            if (res) {
              Swal.fire({
                icon: "success",
                title: "Berhasil menghapus tanggal reservasi astronomy",
                showConfirmButton: false,
                timer: 2000,
              }).then(() => {
                setAddDates([]);
                setShowModal(false);
                getAllReservationDate();
              });
            }
          } catch (error: any) {
            Swal.fire({
              icon: "error",
              title: "ERROR",
              text: error.message,
              showConfirmButton: false,
            });
          }
        }
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: error.message,
        showConfirmButton: false,
      });
    }
    setLoading(false);
  };

  const data = useMemo(
    () => dates,
    [loading, addReservationDate, deleteReservationDate]
  );

  useEffect(() => {
    getAllReservationDate();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Tanggal",
        sortType: "alphanumeric",
        accessor: "date",
        Cell: (props: any) => {
          let singleData = props.cell.row.original;

          return <p>{globalVar.formatDate(singleData.date)}</p>;
        },
      },
      {
        Header: "Status",
        sortType: "alphanumeric",
        accessor: "status",
        Cell: (props: any) => {
          let singleData = props.cell.row.original;

          return (
            <p>{singleData.status === "OPEN" ? "Tersedia" : "Terjadwal"}</p>
          );
        },
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
                      onClick={() => deleteReservationDate(singleData.id)}
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
        description="Tanggal Astronomy"
      >
        Tanggal Astronomy
      </PageTitle>
      <Content>
        <Table
          loading={loading}
          searchData={() => {}}
          columns={columns}
          data={data}
          isSearch={false}
          addData={() => setShowModal(true)}
        />
        <ModalWrapper
          title={"Tambah ketersediaan tanggal astronomy"}
          className="modal-md"
          attribute={{ centered: true }}
          show={showModal}
          handleClose={() => setShowModal(false)}
          footerCustom={
            <div
              className="btn btn-primary btn-sm"
              onClick={() => addReservationDate()}
            >
              Simpan
            </div>
          }
        >
          <>
            <div className="form-group mb-3">
              <label htmlFor="name" className="fw-bold mb-2">
                Pilih tanggal <span className="text-danger">*</span>
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => {
                  console.log(globalVar.formatInputDate(date));
                  setSelectedDate(date);
                  setAddDates((prevDate) => [
                    ...prevDate,
                    globalVar.formatInputDate(date),
                  ]);
                }}
                excludeDates={availableDate}
                minDate={new Date()}
                className="form-control form-control-solid" // Bootstrap class for input
                wrapperClassName="input-group" // Bootstrap input group
                calendarClassName="shadow border" // Optional: Add Bootstrap shadow and border to the calendar
                placeholderText="dd/mm/yyyy"
              />
              {/* <input
                id="date"
                name="date"
                type="date"
                className="form-control form-control-solid"
                onChange={(e: any) => {
                  setAddDates((prevDate) => [...prevDate, e.target.value]);
                }}
              /> */}
            </div>
            <Gap height={24} />
            <div className="row row-cols-3">
              {addDates.map((dt, idx) => (
                <div key={idx.toString()} className="col">
                  <div className="border rounded p-4 d-flex justify-content-between">
                    <p className="pt-2 m-0">{dt}</p>
                    <div
                      role="button"
                      onClick={() => {
                        const filter = addDates.filter(
                          (choosen) => choosen !== dt
                        );
                        setAddDates(filter);
                      }}
                    >
                      <KTSVG
                        path="media/icons/duotune/arrows/arr061.svg"
                        className="svg-icon svg-icon-2x"
                      />
                    </div>
                  </div>
                  <Gap height={8} />
                </div>
              ))}
            </div>
          </>
        </ModalWrapper>
      </Content>
    </>
  );
};
