import { useIntl } from "react-intl";
import { SidebarMenuItemWithSub } from "./SidebarMenuItemWithSub";
import { SidebarMenuItem } from "./SidebarMenuItem";
import SidebarModalKontak from "./SidebarModalKontak";
import { useState } from "react";
const SidebarMenuMain = () => {
  const [isShow, setIsShow] = useState(false);

  const intl = useIntl();

  return (
    <>
      <SidebarMenuItemWithSub
        to="/dashboard"
        icon="element-11"
        title={intl.formatMessage({ id: "MENU.DASHBOARD" })}
        fontIcon="bi-app-indicator"
      >
        <SidebarMenuItem to="/dashboard/home" title="Home" hasBullet={true} />
        <SidebarMenuItem
          to="/dashboard/kalender"
          title="Kalender"
          hasBullet={true}
        />
      </SidebarMenuItemWithSub>

      <SidebarMenuItem
        to="pesan-tempat"
        icon="home"
        title="Pesan Tempat"
        fontIcon="bi-layers"
      />
      <SidebarMenuItem
        to="#"
        icon="question-2"
        title="FAQ"
        fontIcon="bi-layers"
      />
      <div className="fw-bold" onClick={() => setIsShow(true)}>
        <SidebarMenuItem
          to="#"
          icon="user-square"
          title="Kontak"
          fontIcon="bi-layers"
        />
      </div>

      <SidebarModalKontak
        isShow={isShow}
        handleClose={() => setIsShow(false)}
      />
    </>
  );
};

export { SidebarMenuMain };
