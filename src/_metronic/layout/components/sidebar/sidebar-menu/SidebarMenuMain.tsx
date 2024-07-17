import { useIntl } from "react-intl";
import { SidebarMenuItemWithSub } from "./SidebarMenuItemWithSub";
import { SidebarMenuItem } from "./SidebarMenuItem";
import SidebarModalKontak from "./SidebarModalKontak";
import { useState } from "react";
const SidebarMenuMain = () => {
  const [isShow, setIsShow] = useState(false);

  const intl = useIntl();

  const DashboardSideBar = () => {
    return (
      <>
        <SidebarMenuItemWithSub
          to="dashboard"
          icon="element-11"
          title="Dashboard"
          fontIcon="bi-app-indicator"
        >
          <SidebarMenuItem to="dashboard/home" title="Home" hasBullet={true} />
          <SidebarMenuItem
            to="dashboard/informasi"
            title="Informasi"
            hasBullet={true}
          />
        </SidebarMenuItemWithSub>
      </>
    );
  };

  const MasterDataSidebar = () => {
    return (
      <SidebarMenuItemWithSub
        to="master-data"
        icon="data"
        title="Master Data"
        fontIcon="bi-layers"
      >
        <SidebarMenuItem
          to="master-data/pengguna"
          title="Pengguna"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="master-data/sekilas-info"
          title="Sekilas Info"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="master-data/pementasan"
          title="Pementasan"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="master-data/seniman"
          title="Seniman"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="master-data/koleksi-seni"
          title="Koleksi Seni"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="master-data/tempat"
          title="Tempat"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="master-data/tutup-tempat"
          title="Tutup Tempat"
          hasBullet={true}
        />
      </SidebarMenuItemWithSub>
    );
  };

  return (
    <>
      <DashboardSideBar />
      <MasterDataSidebar />
      <SidebarMenuItem
        to="pesanan-masuk"
        icon="entrance-left"
        title="Pesanan Masuk"
        fontIcon="bi-layers"
      />
      <SidebarMenuItem
        to="pesanan-masuk-planetarium"
        icon="moon"
        title="Pesan Planetarium G2S"
        fontIcon="bi-layers"
      />
      <SidebarMenuItem
        to="pesan-tempat"
        icon="geolocation"
        title="Pesan Tempat"
        fontIcon="bi-layers"
      />
      <SidebarMenuItem
        to="planetarium"
        icon="moon"
        title="Planetarium G2S"
        fontIcon="bi-layers"
      />
      <SidebarMenuItem
        to="faq"
        icon="question-2"
        title="FAQ"
        fontIcon="bi-layers"
      />
      <SidebarMenuItem
        to="tentang-kami"
        icon="profile-user"
        title="Tentang Kami"
        fontIcon="bi-layers"
      />
    </>
  );
};

export { SidebarMenuMain };
