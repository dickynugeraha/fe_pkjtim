import { FC } from "react";
import { useIntl } from "react-intl";
import { Content } from "../../../../_metronic/layout/components/content";
import { Link, useNavigate } from "react-router-dom";
import { arrDataTempat } from "../../../helper/helper";
import Gap from "../../../../_metronic/layout/components/content/Gap";
import { PageLink, PageTitle } from "../../../../_metronic/layout/core";
import HeadCard from "../../../../_metronic/layout/components/content/HeadCard";
import useInfo from "../../../modules/hooks/master-data/info";
import useSeni from "../../../modules/hooks/master-data/seni";
import usePentas from "../../../modules/hooks/master-data/pentas";
import useSeniman from "../../../modules/hooks/master-data/seniman";
import useTempat from "../../../modules/hooks/master-data/tempat";
import LoadingInfo from "./components/LoadingInfo";
import ListViewItem from "./components/ListViewItem";
import ContentSekilasInfo from "./components/ContentSekilasInfo";

type PropsTempat = {
  data: any[];
};
const ContentTempat: FC<PropsTempat> = ({ data }) => {
  return (
    <div>
      <div className="p-8">
        <div>
          <div className="row row-cols-lg-4">
            {arrDataTempat.map((item: any, index: number) => (
              <div className="col" key={index.toString()}>
                <img
                  src={item.image}
                  className="rounded mb-3"
                  style={{ width: "100%", objectFit: "cover" }}
                />
                <h4>{item.title}</h4>
                {/* <p>{item.description}</p> */}
                <p className="text-truncate">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Maiores eos sit ab et veritatis, culpa necessitatibus quisquam
                  temporibus officia sint? Pariatur facilis possimus ipsa
                  adipisci hic, voluptatem quaerat suscipit at!
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardPage: FC = () => {
  const navigate = useNavigate();
  const { info, loading: loadingInfo } = useInfo();
  const { seni, loading: loadingSeni } = useSeni();
  const { pementasan, loading: loadingPementasan } = usePentas();
  const { seniman, loading: loadingSeniman } = useSeniman();
  const { tempat, loading: loadingTempat } = useTempat();

  const newInfo: any[] = [];
  info.map((sn) => {
    if (sn.status === "PUBLISHED") {
      newInfo.push({
        file: sn.file,
        title: sn.title,
        desc: sn.content,
      });
    }
  });
  const newSeni: any[] = [];
  seni.map((sn) => {
    newSeni.push({
      file: sn.file,
      title: sn.title,
      desc: sn.desc,
    });
  });
  const newPementasan: any[] = [];
  pementasan.map((pn) => {
    if (pn.status === "PUBLISHED") {
      newPementasan.push({
        file: pn.file,
        title: pn.title,
        desc: pn.sinopsis,
      });
    }
  });
  const newSeniman: any[] = [];
  seniman.map((pn) => {
    newSeniman.push({
      file: pn.file,
      title: pn.name,
      desc: pn.performanceDesc,
    });
  });

  console.log("seni", seni);
  console.log("pementasan", pementasan);
  console.log("info", info);
  console.log("seniman", seniman);

  return (
    <Content>
      <div className="card mb-9">
        <ContentSekilasInfo data={newInfo} loading={loadingInfo} />
        <ListViewItem
          title="Koleksi Seni UP PKJ TIM"
          data={newSeni}
          loading={loadingSeni}
          onClickLink={() =>
            navigate("/dashboard/informasi/seni", {
              state: {
                data: newSeni,
              },
            })
          }
        />
        <ListViewItem
          title="Daftar Pementasan"
          onClickLink={() =>
            navigate("/dashboard/informasi/pementasan", {
              state: {
                data: newPementasan,
              },
            })
          }
          data={newPementasan}
          loading={loadingPementasan}
        />
        <ListViewItem
          title="Daftar Seniman"
          onClickLink={() =>
            navigate("/dashboard/informasi/seniman", {
              state: {
                data: newSeniman,
              },
            })
          }
          data={newSeniman}
          loading={loadingSeniman}
        />
      </div>
      <div className="card">
        <HeadCard title="Jenis Tempat" />
        <ContentTempat data={tempat} />
      </div>
    </Content>
  );
};

export const Informasi: FC = () => {
  const intl = useIntl();

  const Breadcrumbs: Array<PageLink> = [
    {
      title: "Dashboard",
      path: "/dashboard/informasi",
      isSeparator: false,
      isActive: true,
    },
    {
      title: "",
      path: "",
      isSeparator: true,
      isActive: true,
    },
  ];

  return (
    <>
      <PageTitle
        icon="information"
        breadcrumbs={Breadcrumbs}
        description="Daftar pesanan saya"
      >
        Informasi
      </PageTitle>
      <DashboardPage />
    </>
  );
};
