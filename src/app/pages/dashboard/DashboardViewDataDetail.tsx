import React from "react";
import { Content } from "../../../_metronic/layout/components/content";
import HeadPage from "../../modules/widgets/components/HeadPage";
import { useParams } from "react-router-dom";
import { convertRouteToTitle, dummyImage } from "./helper";

const DashboardViewDataDetail = () => {
  const params = useParams();
  const list = params.list;
  const detailId = params.id;
  const title = convertRouteToTitle(params.list as string);

  // const detailData = arrayList.find(item => item.id === detailId); // hasilnya object
  // const dataExcept = arrayList.filter(item => item.id !== detailId); // hasilnya array

  console.log(list, detailId);

  return (
    <Content>
      <HeadPage
        icon="home"
        title={`Detail ${title}`}
        pages={`Dashboard - Home - ${title} - Detail`}
      />
      <div className="card">
        <div className="row g-10">
          <div className="col-12 col-lg-8">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="m-0">Terkenalnya outfit skena</h4>
              <p className="m-0">19-19-2023</p>
            </div>
            <div className="p-8 pe-lg-0">
              <img
                src={dummyImage}
                style={{ width: "100%", borderRadius: "6px" }}
                className="mb-3"
              />
              <p style={{ textAlign: "justify" }}>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta
                impedit commodi minus beatae reiciendis non dignissimos expedita
                laboriosam, illo corporis excepturi nemo odit quod obcaecati
                recusandae. Ipsum, officia. Voluptate, earum. Lorem ipsum, dolor
                sit amet consectetur adipisicing elit. Vero architecto quasi rem
                amet obcaecati ut quos, corrupti magni saepe atque praesentium,
                quibusdam mollitia veniam, similique enim! Fugit, ab?
                Consequuntur, omnis. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Dolorem, aliquam architecto? Illo sequi iste
                iure inventore ut odit animi eos, quia nihil earum culpa
                deleniti et libero laudantium provident excepturi!
              </p>
            </div>
          </div>
          <div className="col-12 col-lg-4">
            <div className="card-header d-flex align-items-center p-lg-0">
              <h4 className="m-0">{title} terbaru</h4>
            </div>

            <div className="p-8 ps-lg-0">
              <div className="row g-2 mb-4">
                <div className="col">
                  <img
                    src={dummyImage}
                    style={{ width: "100%", borderRadius: "6px" }}
                  />
                </div>
                <div
                  className="ms-4 col overflow-y-scroll"
                  style={{ height: "100px" }}
                >
                  <h6>Judul judul</h6>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
                    est porro tempore culpa vitae fugiat voluptatum libero quam
                    reiciendis cupiditate ullam, optio modi cum laboriosam id
                    quasi praesentium provident facilis.
                  </p>
                </div>
              </div>
              <div className="row g-2 mb-4">
                <div className="col">
                  <img
                    src={dummyImage}
                    style={{ width: "100%", borderRadius: "6px" }}
                  />
                </div>
                <div
                  className="ms-4 col overflow-y-scroll"
                  style={{ height: "100px" }}
                >
                  <h6>Judul judul</h6>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
                    est porro tempore culpa vitae fugiat voluptatum libero quam
                    reiciendis cupiditate ullam, optio modi cum laboriosam id
                    quasi praesentium provident facilis.
                  </p>
                </div>
              </div>
              <div className="row g-2 mb-4">
                <div className="col">
                  <img
                    src={dummyImage}
                    style={{ width: "100%", borderRadius: "6px" }}
                  />
                </div>
                <div
                  className="ms-4 col overflow-y-scroll"
                  style={{ height: "100px" }}
                >
                  <h6>Judul judul</h6>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
                    est porro tempore culpa vitae fugiat voluptatum libero quam
                    reiciendis cupiditate ullam, optio modi cum laboriosam id
                    quasi praesentium provident facilis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Content>
  );
};

export default DashboardViewDataDetail;
