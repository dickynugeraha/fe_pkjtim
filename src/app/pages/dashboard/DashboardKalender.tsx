import { FC } from "react";
import { Content } from "../../../_metronic/layout/components/content";
import HeadPage from "../../modules/widgets/components/HeadPage";

const DashboardKalender: FC = () => {
  return (
    <Content>
      <HeadPage
        icon="calendar-2"
        title="Kalender"
        pages="Dashboard > Kalender"
      />
    </Content>
  );
};

export { DashboardKalender };
