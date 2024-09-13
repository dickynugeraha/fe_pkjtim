import { FC, useEffect, useState } from "react";
import { Content } from "../../../../_metronic/layout/components/content";
import { useNavigate, useParams } from "react-router-dom";
import { convertRouteToTitle } from "../../../helper/helper";
import { PageLink, PageTitle } from "../../../../_metronic/layout/core";
import LoadingCard from "./components/LoadingCard";
import { ENDPOINTS } from "../../../constants/API";
import { getAll as getAllInfo } from "../../../modules/requests/master-data/info";
import { getAll as getAllSeniman } from "../../../modules/requests/master-data/seniman";
import { getAll as getAllSeni } from "../../../modules/requests/master-data/seni";
import { getAll as getAllPentas } from "../../../modules/requests/master-data/pentas";

const Breadcrumbs: Array<PageLink> = [
  {
    title: "Dashboard",
    path: "/dashboard/informasi",
    isSeparator: false,
    isActive: false,
  },
  {
    title: "",
    path: "",
    isSeparator: true,
    isActive: false,
  },
  {
    title: "Informasi",
    path: "/dashboard/informasi",
    isSeparator: false,
    isActive: false,
  },
  {
    title: "",
    path: "",
    isSeparator: true,
    isActive: false,
  },
];

export const SemuaInformasi: FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const params = useParams();

  const getAllData = async () => {
    let res, data;
    let newData: any[] = [];
    setLoading(true);
    switch (params.list) {
      case "info":
        res = await getAllInfo(1, -1, "");
        data = res.data.data.data;
        data.map((dt: any) => {
          if (dt.status === "PUBLISHED") {
            const imageUrl: any = `${ENDPOINTS.NEWS.NEWS_IMAGE}/${dt.id}/Image?isStream=true`;
            newData.push({
              id: dt.id,
              file: imageUrl,
              title: dt.title,
              desc: dt.content,
            });
          }
        });
        setData(newData);
        break;
      case "seniman":
        res = await getAllSeniman(1, -1, "");
        data = res.data.data.data;
        data.map((dt: any) => {
          const imageUrl: any = `${ENDPOINTS.SENIMAN.SENIMAN_IMAGE}/${dt.id}/Image?isStream=true`;
          newData.push({
            id: dt.id,
            file: imageUrl,
            title: dt.name,
            desc: dt.performanceDesc,
          });
        });
        setData(newData);
        break;
      case "seni":
        res = await getAllSeni(1, -1, "");
        data = res.data.data.data;
        data.map((dt: any) => {
          const imageUrl: any = `${ENDPOINTS.SENI.SENI_IMAGE}/${dt.id}/Image?isStream=true`;
          newData.push({
            id: dt.id,
            file: imageUrl,
            title: dt.title,
            desc: dt.desc,
          });
        });
        setData(newData);
        break;
      default:
        res = await getAllPentas(1, -1, "");
        data = res.data.data.data;
        data.map((dt: any) => {
          if (dt.status === "PUBLISHED") {
            const imageUrl: any = `${ENDPOINTS.PENTAS.PENTAS_IMAGE}/${dt.id}/Image?isStream=true`;
            newData.push({
              id: dt.id,
              file: imageUrl,
              title: dt.title,
              desc: dt.sinopsis,
            });
          }
        });
        setData(newData);
        break;
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    getAllData();
  }, []);

  type PropsListItem = {
    data: any[];
    loading: boolean;
  };

  const ListViewData: FC<PropsListItem> = ({ data, loading }) => {
    let content = <></>;

    if (loading) {
      content = <LoadingCard array={[1, 1, 1]} />;
    } else {
      content = (
        <>
          {data.map((item: any, index: number) => (
            <div
              role="button"
              onClick={() => navigate(`${item.id}`)}
              className="col"
            >
              <div className="card p-4">
                <img
                  src={item.file}
                  height={200}
                  loading="lazy"
                  className="rounded mb-3"
                  style={{ width: "100%", objectFit: "contain" }}
                />
                <h4>{item.title}</h4>
                <p className="text-truncate">{item.desc}</p>
              </div>
            </div>
          ))}
        </>
      );
      if (data.length === 0) {
        content = <p>Data tidak teredia</p>;
      }
    }

    return (
      <div>
        <div className="row row-cols-2 row-cols-lg-3 g-3">{content}</div>
      </div>
    );
  };

  return (
    <>
      <PageTitle
        icon="information"
        breadcrumbs={Breadcrumbs}
        description={`${convertRouteToTitle(params.list as string)}`}
      >{`${convertRouteToTitle(params.list as string)}`}</PageTitle>
      <Content>
        <ListViewData data={data} loading={loading} />
      </Content>
    </>
  );
};
