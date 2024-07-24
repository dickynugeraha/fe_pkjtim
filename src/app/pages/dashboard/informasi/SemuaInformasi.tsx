import React, { FC, useEffect, useState } from "react";
import { Content } from "../../../../_metronic/layout/components/content";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import HeadPage from "../../../modules/widgets/components/HeadPage";
import axios from "axios";
import { arrData, convertRouteToTitle } from "../../../helper/helper";
import { PageLink, PageTitle } from "../../../../_metronic/layout/core";

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
];

const SemuaInformasi: FC = () => {
  const navigate = useNavigate();

  const params = useParams();
  const [list, setList] = useState([]);

  const getAllData = async () => {
    // const res = await axios.get("/url");
    // setList(res.data.data);
  };

  useEffect(() => {
    getAllData();
  }, []);

  function ListViewData(data: any) {
    console.log(params.list);

    return (
      <div>
        <div className="row row-cols-2 row-cols-lg-3 g-3">
          {arrData.map((item: any, index: number) => (
            <div
              role="button"
              onClick={() => navigate(`${index}`)}
              className="col"
            >
              <div className="card p-4">
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
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <PageTitle
        icon="information"
        breadcrumbs={Breadcrumbs}
        description={`${convertRouteToTitle(params.list as string)}`}
      >{`${convertRouteToTitle(params.list as string)}`}</PageTitle>
      <Content>
        {/* <HeadPage
          pages={`Dashboard - Home - ${convertRouteToTitle(
            params.list as string
          )}`}
          title={convertRouteToTitle(params.list as string) as string}
          icon={"home"}
        /> */}
        <ListViewData data={list} />
      </Content>
    </>
  );
};

export default SemuaInformasi;
