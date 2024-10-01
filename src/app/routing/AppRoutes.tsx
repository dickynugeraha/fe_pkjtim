/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import { FC } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { MainRoutes } from "./MainRoutes";
import { ErrorsPage } from "../modules/errors/ErrorsPage";
import { Logout, AuthPage, useAuth } from "../modules/auth";
import { App } from "../App";
import GuestRoutes from "./GuestRoutes";

import {
  SekilasInfo,
  Pementasan,
  KoleksiSeni,
  Pengguna,
  Seniman,
  Tempat,
  TutupTempat,
} from "../pages/master-data";
import {
  Home,
  DetailInformasi,
  Faq,
  Informasi,
  PesanTempat,
  Planetarium,
  SemuaInformasi,
  TentangKami,
  ProfilSaya,
  PesananSaya,
  FormPesanTempat,
  FormPlanetarium,
  KurasiPentas,
} from "../pages";

import { PesananMasuk, PesananPlanetarium } from "../pages";
import { MasterLayout } from "../../_metronic/layout/MasterLayout";
import { ContactPerson } from "../pages/master-data/contact-person/ContactPerson";
import { ROLE } from "../constants/ROLE";
import PDFPernyataanPersetujuan from "../../_metronic/layout/components/content/Pdf/PDFPernyataanPersetujuan";
import PDFSuratUndangan from "../../_metronic/layout/components/content/Pdf/PDFSuratUndangan";
import PDFSuratProposal from "../../_metronic/layout/components/content/Pdf/PDFSuratProposal";
import PDFSuratPermohonan from "../../_metronic/layout/components/content/Pdf/PDFSuratPermohonan";
import VerifyNewAccount from "../pages/others/VerifyNewAccount";
import VerifyChangeEmail from "../pages/others/VerifyChangeEmail";
import PDFSuratHasilKurasi from "../../_metronic/layout/components/content/Pdf/PDFSuratHasilKurasi";
import PDFSuratJawaban from "../../_metronic/layout/components/content/Pdf/PDFSuratJawaban";

/**
 * Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */
const { BASE_URL } = import.meta.env;

const AppRoutes: FC = () => {
  const { currentUser } = useAuth();

  return (
    <BrowserRouter basename={BASE_URL}>
      <Routes>
        <Route element={<App />}>
          <Route path="error/*" element={<ErrorsPage />} />
          <Route
            path="verify/:userid/email/:newemail/:token"
            element={<VerifyChangeEmail />}
          />
          <Route
            path="verify/email/:userid/:token"
            element={<VerifyNewAccount />}
          />
          <Route path="logout" element={<Logout />} />
          <Route element={<MasterLayout />}>
            <Route path="dashboard" element={<Home />} />
            <Route path="dashboard/informasi" element={<Informasi />} />
            <Route
              path="dashboard/informasi/:list"
              element={<SemuaInformasi />}
            />
            <Route
              path="dashboard/informasi/:list/:id"
              element={<DetailInformasi />}
            />
            <Route path="dashboard/home" element={<Home />} />
            <Route path="pesan-tempat" element={<PesanTempat />} />
            <Route path="faq" element={<Faq />} />
            <Route path="planetarium" element={<Planetarium />} />
            <Route path="tentang-kami" element={<TentangKami />} />
          </Route>

          {/* fake route pdf */}
          <Route
            path="Pdf/File/PernyataanPersetujuan/:id"
            element={<PDFPernyataanPersetujuan />}
          />
          <Route
            path="Pdf/File/SuratUndangan/:id"
            element={<PDFSuratUndangan />}
          />
          <Route path="Pdf/File/Proposal/:id" element={<PDFSuratProposal />} />
          <Route
            path="Pdf/File/SuratPermohonan/:id"
            element={<PDFSuratPermohonan />}
          />
          <Route
            path="Pdf/File/SuratHasilKurasi/:id"
            element={<PDFSuratHasilKurasi />}
          />
          <Route
            path="Pdf/File/SuratJawaban/:id"
            element={<PDFSuratJawaban />}
          />

          {/* Pengelola */}
          {currentUser?.role === ROLE.PENGELOLA ||
          currentUser?.role === ROLE.SUPER_ADMIN ? (
            <>
              <Route element={<MasterLayout />}>
                <Route path="pesanan-masuk" element={<PesananMasuk />} />
                <Route path="pesanan-planet" element={<PesananPlanetarium />} />
                <Route path="master-data/pengguna" element={<Pengguna />} />
                <Route path="profil-saya" element={<ProfilSaya />} />
                <Route
                  path="master-data/sekilas-info"
                  element={<SekilasInfo />}
                />
                <Route path="master-data/pementasan" element={<Pementasan />} />
                <Route path="master-data/seniman" element={<Seniman />} />
                <Route
                  path="master-data/koleksi-seni"
                  element={<KoleksiSeni />}
                />
                <Route path="master-data/tempat" element={<Tempat />} />
                <Route
                  path="master-data/tutup-tempat"
                  element={<TutupTempat />}
                />
                <Route
                  path="master-data/contact-person"
                  element={<ContactPerson />}
                />
              </Route>
            </>
          ) : (
            <>
              <Route path="auth/*" element={<AuthPage />} />
              <Route path="*" element={<Navigate to="/dashboard/home" />} />
            </>
          )}

          {/* Kurator */}
          {currentUser?.role === ROLE.KURATOR ||
          currentUser?.role === ROLE.SUPER_ADMIN ? (
            <Route element={<MasterLayout />}>
              <Route path="profil-saya" element={<ProfilSaya />} />
              <Route path="kurasi-pentas" element={<KurasiPentas />} />
            </Route>
          ) : (
            <>
              <Route path="auth/*" element={<AuthPage />} />
              <Route path="*" element={<Navigate to="/dashboard/home" />} />
            </>
          )}

          {currentUser?.role === ROLE.USER ||
          currentUser?.role === ROLE.SUPER_ADMIN ? (
            <>
              <Route element={<MasterLayout />}>
                <Route path="profil-saya" element={<ProfilSaya />} />
                <Route path="error/*" element={<ErrorsPage />} />
                <Route path="pesanan-saya" element={<PesananSaya />} />
                <Route
                  path="form-pesan-tempat/:id"
                  element={<FormPesanTempat />}
                />
                <Route
                  path="form-planetarium/:id"
                  element={<FormPlanetarium />}
                />
              </Route>
              <Route path="/*" element={<MainRoutes />} />
              <Route index element={<Navigate to="/dashboard" />} />
            </>
          ) : (
            <>
              <Route path="auth/*" element={<AuthPage />} />
              <Route path="*" element={<Navigate to="/dashboard/home" />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export { AppRoutes };
