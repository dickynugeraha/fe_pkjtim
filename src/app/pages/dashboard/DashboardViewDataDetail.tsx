import React from "react";
import { Content } from "../../../_metronic/layout/components/content";
import HeadPage from "../../modules/widgets/components/HeadPage";
import { useParams } from "react-router-dom";
import { convertRouteToTitle, dummyImage } from "./helper";

const DashboardViewDataDetail = () => {
  const params = useParams();
  const list = params.list;
  const detailId = params.id;

  // const detailData = arrayList.find(item => item.id === detailId); // hasilnya object
  // const dataExcept = arrayList.filter(item => item.id !== detailId); // hasilnya array

  console.log(list, detailId);

  return (
    <Content>
      <HeadPage
        icon="home"
        title={`Detail ${convertRouteToTitle(params.list as string)}`}
        pages={`Dashboard > Home > ${convertRouteToTitle(
          params.list as string
        )} > Detail`}
      />
      <div className="card p-8">
        <div className="row g-10">
          <div className="col-8">
            <div className="d-flex justify-content-between">
              <h6>Terkenalnya outfit skena</h6>
              <h6>19-19-2023</h6>
            </div>
            <div className="my-6">
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
          <div className="col-4">
            <h6 className="mb-8">Sekilas info terbaru</h6>
            <div>
              <div className="row g-2 mb-4">
                <div className="col">
                  <img
                    src={dummyImage}
                    style={{ width: "100%", borderRadius: "6px" }}
                  />
                </div>
                <div
                  className="ms-4 col overflow-scroll"
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
                  className="ms-4 col overflow-scroll"
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
                  className="ms-4 col overflow-scroll"
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
