import React, { FC, useState } from "react";
import ModalWrapper from "../../../../../_metronic/layout/components/content/ModalWrapper";
import Gap from "../../../../../_metronic/layout/components/content/Gap";

type PropsModalAddEditSekilasInfo = {
  fromAdd: boolean;
  isRoleKurator: boolean;
  data: any;
  show: boolean;
  isLockedCheck: boolean;
  handleIsCheckLocked: (e: any) => void;
  handleChange: (e: any) => void;
  handleClose: () => void;
  handleSubmit: (data: any) => void;
};

const ModalAddEditPengguna: FC<PropsModalAddEditSekilasInfo> = ({
  fromAdd,
  show,
  isLockedCheck,
  isRoleKurator,
  handleIsCheckLocked,
  handleChange,
  handleClose,
  handleSubmit,
  data,
}) => {
  const valueSelectOption = [
    { value: "komite_seni_rupa", text: "Komite Seni Rupa" },
    { value: "komite_tari", text: "Komite Tari" },
    { value: "komite_musik", text: "Komite Musik" },
    { value: "komite_sastra", text: "Komite Sastra" },
    { value: "komite_film", text: "Komite Film" },
    { value: "komite_teater", text: "Komite Teater" },
    { value: "lintas_komite", text: "Lintas Komite (komite bersama)" },
    { value: "komisi_filantropi", text: "Komisi Filantropi dan Simpul Seni" },
    { value: "komisi_arsip", text: "Komisi Arsip dan Riset" },
  ];

  return (
    <ModalWrapper
      title={fromAdd ? "Tambah Tutup Tempat" : "Ubah Tutup Tempat"}
      className="modal-md"
      attribute={{ centered: true }}
      show={show}
      handleClose={handleClose}
      footerCustom={
        <button
          type="submit"
          className="btn btn-sm btn-primary"
          onClick={() => handleSubmit("data")}
        >
          Simpan
        </button>
      }
    >
      <form>
        <div className="form-group mb-3">
          <label htmlFor="fullName" className="fw-bold">
            Nama Lengkap
          </label>
          <Gap height={10} />
          <input
            type="text"
            name="fullName"
            id="fullName"
            value={data.fullName}
            className="form-control form-control-solid"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="email" className="fw-bold">
            Email
          </label>
          <Gap height={10} />
          <input
            type="email"
            name="email"
            id="email"
            value={data.email}
            className="form-control form-control-solid"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="phoneNumber" className="fw-bold">
            Nomor Handphone
          </label>
          <Gap height={10} />
          <input
            type="number"
            name="phoneNumber"
            id="phoneNumber"
            value={data.phoneNumber}
            onChange={(e) => handleChange(e)}
            className="form-control form-control-solid"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password" className="fw-bold">
            Password Baru
          </label>
          <Gap height={10} />
          <input
            type="password"
            name="password"
            id="password"
            value={data.password}
            onChange={(e) => handleChange(e)}
            className="form-control form-control-solid"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="status" className="fw-bold">
            Status
          </label>
          <Gap height={10} />
          <select
            name="status"
            id="status"
            className="form-select"
            onChange={(e) => handleChange(e)}
          >
            <option>-- Pilih satu --</option>
            <option value="ACTIVE" selected={data.status === "ACTIVE"}>
              Aktif
            </option>
            <option value="REQUEST" selected={data.status === "REQUEST"}>
              Requested
            </option>
          </select>
        </div>
        <div className="form-group my-6">
          <div className="d-flex">
            <label htmlFor="status" className="fw-bold me-3">
              Kunci pengguna
            </label>
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
          </div>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="role" className="fw-bold">
            Role
          </label>
          <Gap height={10} />
          <select
            name="role"
            id="role"
            className="form-select"
            onChange={(e) => handleChange(e)}
          >
            <option>-- Pilih satu --</option>
            <option value="User">User</option>
            <option value="Pengelola">Pengelola</option>
            <option value="Kurator">Kurator</option>
          </select>
        </div>

        {!fromAdd && isRoleKurator && (
          <div className="form-group mb-3">
            <label htmlFor="komite" className="fw-bold">
              Komite
            </label>
            <Gap height={10} />
            <select name="komite" id="komite" className="form-select">
              {valueSelectOption.map((data) => (
                <option value={data.value}>{data.text}</option>
              ))}
            </select>
          </div>
        )}
      </form>
    </ModalWrapper>
  );
};

export default ModalAddEditPengguna;
