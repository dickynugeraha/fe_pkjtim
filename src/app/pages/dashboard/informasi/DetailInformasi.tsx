import React, { useEffect, useState } from "react";
import { Content } from "../../../../_metronic/layout/components/content";

import { useParams } from "react-router-dom";
import { convertRouteToTitle, dummyImage } from "../../../helper/helper";
import { getAll as getAllInfo } from "../../../modules/requests/master-data/info";
import { getAll as getAllSeniman } from "../../../modules/requests/master-data/seniman";
import { getAll as getAllSeni } from "../../../modules/requests/master-data/seni";
import { getAll as getAllPentas } from "../../../modules/requests/master-data/pentas";
import { PageLink, PageTitle } from "../../../../_metronic/layout/core";
import { KTIcon } from "../../../../_metronic/helpers";
import { ENDPOINTS } from "../../../constants/API";
import LoadingDetail from "./components/LoadingDetail";
import globalVar from "../../../helper/globalVar";

export const DetailInformasi = () => {
  const params = useParams();
  const list = params.list;
  const detailId = params.id;
  const title = convertRouteToTitle(params.list as string);

  const Breadcrumbs: Array<PageLink> = [
    {
      title: "Dashboard",
      path: "/dashboard",
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
    {
      title: title,
      path: `/dashboard/informasi/${list}`,
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

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
              createdAt: dt.createdAt,
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
            createdAt: dt.createdAt,
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
            createdAt: dt.createdAt,
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
              createdAt: dt.createdAt,
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

  console.log("dataaa", data);
  console.log("loading", loading);

  let content = <></>;

  const mainData = data.find((item) => item.id == params.id);
  const anotherData = data.filter((item) => item.id != params.id);

  if (loading) {
    content = <LoadingDetail />;
  } else {
    if (data.length === 0) {
      content = <p>Data tidak tersedia</p>;
    } else {
      content = (
        <>
          <div className="col-12 col-lg-8">
            <div className="p-8">
              <h4 className="m-0 fs-2">{mainData.title}</h4>
              <div className="d-flex align-items-center mt-2">
                <KTIcon className="fs-1 text-primary" iconName="calendar" />
                <p className="m-0 ms-2 text-muted fw-bold">
                  {globalVar.formatDate(mainData.createdAt)}
                </p>
              </div>
            </div>
            <div className="p-8 pt-0 pe-lg-0">
              <img
                src={mainData.file}
                style={{ width: "100%", borderRadius: "6px" }}
                height={500}
                className="mb-3"
              />
              <p style={{ textAlign: "justify" }}>{mainData.desc}</p>
            </div>
          </div>
          <div className="col-12 col-lg-4">
            <div className="d-flex align-items-center px-8 p-lg-0 pt-lg-8">
              <h4 className="m-0">{title} terbaru</h4>
            </div>

            <div className="p-8 ps-lg-0">
              {anotherData.map((itm) => (
                <div className="row g-2 mb-4">
                  <div className="col">
                    <img
                      src={itm.file}
                      height={100}
                      style={{ width: "100%", borderRadius: "6px" }}
                    />
                  </div>
                  <div
                    className="ms-4 col overflow-y-scroll"
                    style={{ height: "100px" }}
                  >
                    <h6>{itm.title}</h6>
                    <p>{itm.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      );
    }
  }

  return (
    <Content>
      <PageTitle
        icon="information"
        breadcrumbs={Breadcrumbs}
        description="Daftar pesanan saya"
      >
        Daftar Pesanan Saya
      </PageTitle>

      <div className="card">
        <div className="row g-10">{content}</div>
      </div>
    </Content>
  );
};
