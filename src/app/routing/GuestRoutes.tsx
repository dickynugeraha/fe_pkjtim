import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { MasterLayout } from "../../_metronic/layout/MasterLayout";
// PKJTIM
import {
  Home,
  DetailInformasi,
  Faq,
  Informasi,
  PesanTempat,
  Planetarium,
  SemuaInformasi,
  TentangKami,
} from "../pages";

const GuestRoutes = () => {
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path="dashboard" element={<Informasi />} />
        <Route path="dashboard/informasi" element={<Informasi />} />
        <Route path="dashboard/informasi/:list" element={<SemuaInformasi />} />
        <Route
          path="dashboard/informasi/:list/:id"
          element={<DetailInformasi />}
        />
        <Route path="dashboard/home" element={<Home />} />
        <Route path="pesan-tempat" element={<PesanTempat />} />
        <Route path="faq" element={<Faq />} />
        <Route path="planetarium" element={<Planetarium />} />
        <Route path="tentang-kami" element={<TentangKami />} />

        <Route path="*" element={<Navigate to="/error/404" />} />
      </Route>
    </Routes>
  );
};

export default GuestRoutes;
