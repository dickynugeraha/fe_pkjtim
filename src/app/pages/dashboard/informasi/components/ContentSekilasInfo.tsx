import { FC } from "react";
import LoadingInfo from "./LoadingInfo";
import { Link } from "react-router-dom";
import Gap from "../../../../../_metronic/layout/components/content/Gap";

type PropsSekilasInfo = {
  data: any[];
  loading: boolean;
};
const ContentSekilasInfo: FC<PropsSekilasInfo> = ({ data, loading }) => {
  const anotherData = data.slice(1);

  let content = <></>;

  if (loading) {
    content = <LoadingInfo />;
  } else {
    content = (
      <div>
        <div>
          <div className="row row-cols-1 row-cols-lg-2 g-2 g-lg-10">
            <div className="col">
              <img
                loading="lazy"
                src={data[0]?.file}
                style={{ width: "100%" }}
                height={400}
                className="rounded mb-6"
              />
              <h4 className="m-0 mb-2">{data[0]?.title}</h4>
              <p className="text-truncate m-0">{data[0]?.desc}</p>
            </div>
            <div className="col">
              {anotherData.length === 0 ? (
                <p>Tidak ada info terkini lainnya</p>
              ) : (
                <>
                  {anotherData.map((item) => (
                    <>
                      <div className="mb-3">
                        <h4 className="m-0 mb-2">{item.title}</h4>
                        <p className="text-truncate m-0">{item.desc}</p>
                      </div>
                      <hr />
                    </>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
    if (data.length === 0) {
      content = <p>Data tidak ditemukan</p>;
    }
  }
  return (
    <div>
      <div className="p-8">
        <div className="d-flex justify-content-between align-items-center pb-4">
          <h4 className="m-0">Sekilas Info</h4>
          <Link to={"/dashboard/informasi/info"}>Lihat lebih banyak</Link>
        </div>
        <div className="separator mb-2"></div>
        <Gap height={18} />
        {content}
      </div>
    </div>
  );
};

export default ContentSekilasInfo;
