import { lazy, FC, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { MasterLayout } from '../../_metronic/layout/MasterLayout';
import TopBarProgress from 'react-topbar-progress-indicator';
import { MenuTestPage } from '../pages/MenuTestPage';
import { getCSSVariableValue } from '../../_metronic/assets/ts/_utils';
import { WithChildren } from '../../_metronic/helpers';
// PKJTIM
import {
  Home,
  DetailInformasi,
  Faq,
  FormPesanTempat,
  FormPlanetarium,
  Informasi,
  KurasiPentas,
  PesanTempat,
  PesananMasuk,
  PesananPlanetarium,
  PesananSaya,
  Planetarium,
  ProfilSaya,
  SemuaInformasi,
  TentangKami,
} from '../pages';

import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper';
import {
  SekilasInfo,
  Pementasan,
  KoleksiSeni,
  Pengguna,
  Seniman,
  Tempat,
  TutupTempat,
} from '../pages/master-data';

const PenggunaRoutes = () => {
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'));
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'));
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'));
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'));
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'));
  const UsersPage = lazy(
    () => import('../modules/apps/user-management/UsersPage')
  );

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='dashboard' element={<Informasi />} />
        <Route path='dashboard/informasi' element={<Informasi />} />
        <Route path='dashboard/informasi/:list' element={<SemuaInformasi />} />
        <Route
          path='dashboard/informasi/:list/:id'
          element={<DetailInformasi />}
        />
        <Route path='dashboard/home' element={<Home />} />
        <Route path='pesan-tempat' element={<PesanTempat />} />
        <Route path='form-pesan-tempat/:id' element={<FormPesanTempat />} />
        <Route path='faq' element={<Faq />} />
        <Route path='builder' element={<BuilderPageWrapper />} />
        <Route path='menu-test' element={<MenuTestPage />} />
        <Route path='profil-saya' element={<ProfilSaya />} />
        <Route path='pesanan-saya' element={<PesananSaya />} />
        <Route path='tentang-kami' element={<TentangKami />} />
        <Route path='planetarium' element={<Planetarium />} />
        <Route path='form-planetarium/:id' element={<FormPlanetarium />} />
        <Route path='pesanan-masuk' element={<PesananMasuk />} />
        <Route path='pesanan-planet' element={<PesananPlanetarium />} />
        <Route path='kurasi-pentas' element={<KurasiPentas />} />
        {/* Pengelola */}
        <Route path='master-data/pengguna' element={<Pengguna />} />
        <Route path='master-data/sekilas-info' element={<SekilasInfo />} />
        <Route path='master-data/pementasan' element={<Pementasan />} />
        <Route path='master-data/seniman' element={<Seniman />} />
        <Route path='master-data/koleksi-seni' element={<KoleksiSeni />} />
        <Route path='master-data/tempat' element={<Tempat />} />
        <Route path='master-data/tutup-tempat' element={<TutupTempat />} />

        <Route
          path='crafted/pages/wizards/*'
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/widgets/*'
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/account/*'
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/chat/*'
          element={
            <SuspensedView>
              <ChatPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/user-management/*'
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  );
};

const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue('--bs-primary');
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  });
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

export { PenggunaRoutes };
