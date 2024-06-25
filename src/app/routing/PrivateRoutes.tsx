import { lazy, FC, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { MasterLayout } from "../../_metronic/layout/MasterLayout";
import TopBarProgress from "react-topbar-progress-indicator";
import { DashboardWrapper } from "../pages/dashboard/DashboardWrapper";
import { DashboardKalender } from "../pages/dashboard/DashboardKalender";
import { MenuTestPage } from "../pages/MenuTestPage";
import { getCSSVariableValue } from "../../_metronic/assets/ts/_utils";
import { WithChildren } from "../../_metronic/helpers";
import BuilderPageWrapper from "../pages/layout-builder/BuilderPageWrapper";
import DashboardViewData from "../pages/dashboard/DashboardViewData";
import DashboardViewDataDetail from "../pages/dashboard/DashboardViewDataDetail";
import PesanTempat from "../pages/pesan-tempat/PesanTempat";
import FormPesanTempat from "../pages/pesan-tempat/FormPesanTempat";
import Faq from "../pages/faq/Faq";
import ProfilSaya from "../pages/profil/ProfilSaya";
import PesananSaya from "../pages/pesanan-saya/PesananSaya";
import TentangKami from "../pages/tentang-kami/TentangKami";
import Planetarium from "../pages/planetarium/Planetarium";
import FormPlanetarium from "../pages/planetarium/FormPlanetarium";

const PrivateRoutes = () => {
  const ProfilePage = lazy(() => import("../modules/profile/ProfilePage"));
  const WizardsPage = lazy(() => import("../modules/wizards/WizardsPage"));
  const AccountPage = lazy(() => import("../modules/accounts/AccountPage"));
  const WidgetsPage = lazy(() => import("../modules/widgets/WidgetsPage"));
  const ChatPage = lazy(() => import("../modules/apps/chat/ChatPage"));
  const UsersPage = lazy(
    () => import("../modules/apps/user-management/UsersPage")
  );

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path="auth/*" element={<Navigate to="/dashboard" />} />
        {/* Pages */}
        <Route path="dashboard" element={<DashboardWrapper />} />
        <Route path="dashboard/home" element={<DashboardWrapper />} />
        <Route path="dashboard/home/:list" element={<DashboardViewData />} />
        <Route
          path="dashboard/home/:list/:id"
          element={<DashboardViewDataDetail />}
        />
        <Route path="dashboard/kalender" element={<DashboardKalender />} />
        <Route path="pesan-tempat" element={<PesanTempat />} />
        <Route
          path="pesan-tempat/:jenis_tempat"
          element={<FormPesanTempat />}
        />
        <Route path="faq" element={<Faq />} />
        <Route path="builder" element={<BuilderPageWrapper />} />
        <Route path="menu-test" element={<MenuTestPage />} />
        <Route path="profil-saya" element={<ProfilSaya />} />
        <Route path="pesanan-saya" element={<PesananSaya />} />
        <Route path="tentang-kami" element={<TentangKami />} />
        <Route path="planetarium" element={<Planetarium />} />
        <Route path="form-planetarium" element={<FormPlanetarium />} />
        <Route
          path="crafted/pages/wizards/*"
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        />
        <Route
          path="crafted/widgets/*"
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />
        <Route
          path="crafted/account/*"
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        />
        <Route
          path="apps/chat/*"
          element={
            <SuspensedView>
              <ChatPage />
            </SuspensedView>
          }
        />
        <Route
          path="apps/user-management/*"
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path="*" element={<Navigate to="/error/404" />} />
      </Route>
    </Routes>
  );
};

const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue("--bs-primary");
  TopBarProgress.config({
    barColors: {
      "0": baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  });
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

export { PrivateRoutes };
