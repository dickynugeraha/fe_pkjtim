import { SidebarMenuItemWithSub } from "./SidebarMenuItemWithSub";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { useAuth } from "../../../../../app/modules/auth";
import { ROLE } from "../../../../../app/constants/ROLE";
const SidebarMenuMain = () => {
  const { currentUser } = useAuth();

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
        <SidebarMenuItem
          to="master-data/contact-person"
          title="Kontak Person"
          hasBullet={true}
        />
      </SidebarMenuItemWithSub>
    );
  };

  return (
    <>
      <DashboardSideBar />
      {(currentUser?.role === ROLE.PENGELOLA ||
        currentUser?.role === ROLE.SUPER_ADMIN) && <MasterDataSidebar />}
      {(currentUser?.role === ROLE.PENGELOLA ||
        currentUser?.role === ROLE.SUPER_ADMIN) && (
        <>
          <SidebarMenuItem
            to="pesanan-masuk"
            icon="entrance-left"
            title="Pesanan Masuk"
            fontIcon="bi-layers"
          />
          <SidebarMenuItem
            to="pesanan-planet"
            icon="entrance-left"
            title="Pesanan Planetarium"
            fontIcon="bi-layers"
          />
        </>
      )}
      {(currentUser?.role === ROLE.KURATOR ||
        currentUser?.role === ROLE.SUPER_ADMIN) && (
        <SidebarMenuItem
          to="kurasi-pentas"
          icon="book"
          title="Kurasi Pentas"
          fontIcon="bi-layers"
        />
      )}
      {(currentUser?.role === ROLE.USER ||
        currentUser?.role === ROLE.SUPER_ADMIN ||
        currentUser?.role === undefined) && (
        <>
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
        </>
      )}
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
