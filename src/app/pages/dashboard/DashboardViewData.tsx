import React from "react";
import { Content } from "../../../_metronic/layout/components/content";
import { useParams } from "react-router-dom";
import HeadPage from "../../modules/widgets/components/HeadPage";

const DashboardViewData = () => {
  const params = useParams();
  console.log(params);
  let title = "";
  switch (params.viewData) {
    case "seni":
      title = "Koleksi Seni UP PKJ TIM";
      break;
    case "pementasan":
      title = "Daftar Pementasan";
      break;
    case "seniman":
      title = "Daftar Seniman";
      break;

    default:
      title = "Sekilas Info";
      break;
      break;
  }
  return (
    <Content>
      <HeadPage
        pages={`Dashboard > Home > ${title}`}
        title={title}
        icon={"home"}
      />
    </Content>
  );
};

export default DashboardViewData;
