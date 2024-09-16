import { FC } from "react";
import LoadingInfo from "./LoadingInfo";
import { Link, useNavigate } from "react-router-dom";
import Gap from "../../../../../_metronic/layout/components/content/Gap";
import { KTIcon } from "../../../../../_metronic/helpers";
import globalVar from "../../../../helper/globalVar";

type PropsSekilasInfo = {
  data: any[];
  loading: boolean;
};
const ContentSekilasInfo: FC<PropsSekilasInfo> = ({ data, loading }) => {
  const navigate = useNavigate();
  const anotherData = data.slice(1);

  console.log("anotherData", anotherData);
  console.log("Data", data);

  let content = <></>;

  if (loading) {
    content = <LoadingInfo />;
  } else {
    content = (
      <div className="row row-cols-1 row-cols-lg-2 g-2 g-lg-10">
        <div className="col">
          <div className="d-flex flex-column justify-content-between pe-lg-6 mb-lg-0 mb-10">
            <img
              loading="lazy"
              src={data[0]?.file}
              style={{ width: "100%" }}
              height={400}
              className="rounded mb-6"
            />
            <div
              role="button"
              onClick={() =>
                navigate(`/dashboard/informasi/info/${data[0].id}`)
              }
              className="fs-2 text-gray-900 fw-bold text-hover-primary"
            >
              {data[0]?.title}
            </div>
            <div className="text-truncate-4 fw-semibold fs-5 mt-4 text-gray-600 text-gray-900 mb-4">
              {data[0]?.desc}
            </div>
            <div className="d-flex flex-stack flex-wrap">
              <div className="d-flex align-items-center pe-2">
                <KTIcon
                  className="fs-1 text-primary"
                  iconType="duotone"
                  iconName="calendar"
                />
                <div className="fs-5 fw-bold">
                  <span className="text-muted">
                    {"Terbit pada " +
                      globalVar.formatDate(data[0]?.publishedAt)}
                  </span>
                </div>
              </div>

              <span className="badge badge-light-success fw-bold my-2">
                Sekilas Info
              </span>
            </div>
          </div>
        </div>
        <div className="col justify-content-between d-flex flex-column">
          {anotherData.length === 0 ? (
            <p>Tidak ada info terkini lainnya</p>
          ) : (
            <>
              {anotherData.map((item, index) => (
                <div
                  className={
                    "d-flex flex-column justify-content-between pe-lg-6 mb-lg-0 " +
                    (index != anotherData.length - 1 ? "mb-10" : "")
                  }
                >
                  <div
                    role="button"
                    onClick={() =>
                      navigate(`/dashboard/informasi/info/${item.id}`)
                    }
                    className="fs-2 text-gray-900 fw-bold text-hover-primary"
                  >
                    {item.title}
                  </div>
                  <div className="text-truncate-4 fw-semibold fs-5 mt-4 text-gray-600 text-gray-900 mb-4">
                    {item.desc}
                  </div>
                  <div className="d-flex flex-stack flex-wrap">
                    <div className="d-flex align-items-center pe-2">
                      <KTIcon
                        className="fs-1 text-primary"
                        iconType="duotone"
                        iconName="calendar"
                      />
                      <div className="fs-5 fw-bold">
                        <span className="text-muted">
                          {"Terbit pada " +
                            globalVar.formatDate(data[0]?.publishedAt)}
                        </span>
                      </div>
                    </div>

                    <span className="badge badge-light-success fw-bold my-2">
                      Sekilas Info
                    </span>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    );
    if (data.length === 0) {
      content = <p>Data tidak tersedia</p>;
    }
  }
  return (
    <div>
      <div className="p-8">
        <div className="d-flex justify-content-between align-items-center pb-4">
          <h3 className="m-0">Sekilas Info</h3>
          <Link className="fs-5 fw-bold" to={"/dashboard/informasi/info"}>
            Lihat lebih banyak
          </Link>
        </div>
        <div className="separator separator-dashed mb-2"></div>
        <Gap height={18} />
        {content}
      </div>
    </div>
  );
};

export default ContentSekilasInfo;
