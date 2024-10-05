import { FC } from "react";
import LoadingCard from "./LoadingCard";
import Gap from "../../../../../_metronic/layout/components/content/Gap";
import { useNavigate } from "react-router-dom";
import globalVar from "../../../../helper/globalVar";

type PropsListItem = {
  title: string;
  fromContent: string;
  loading: boolean;
  data: any[];
  onClickLink: () => void;
};

const ListViewItem: FC<PropsListItem> = ({
  loading,
  title,
  data,
  fromContent,
  onClickLink,
}) => {
  const navigate = useNavigate();
  let content = <></>;

  if (loading || data.length === 0) {
    content = (
      <div className="row row-cols-lg-4">
        <LoadingCard array={[1, 1, 1, 1]} />
      </div>
    );
  } else {
    content = (
      <div className="row row-cols-1 row-cols-lg-4 g-10">
        {data.slice(0, 4).map((item: any, index: number) => (
          <div className="col" key={index.toString()}>
            <div className="card-xl-stretch">
              <img
                src={item.file}
                className="rounded mb-3"
                style={{ width: "100%", objectFit: "cover", height: 200 }}
              />
              <div
                role="button"
                onClick={() =>
                  navigate(`/dashboard/informasi/${fromContent}/${item.id}`)
                }
                className="fs-2 text-gray-900 fw-bold text-hover-primary"
              >
                {item.title}
              </div>
              <div className="text-truncate-3 fw-semibold fs-5 my-4 text-gray-600 text-gray-900">
                {item.desc}
              </div>
              <div className="fs-6 fw-bold">
                <span className="text-muted">
                  {"Terbit pada " + globalVar.formatDate(item.createdAt)}
                </span>
              </div>
            </div>
          </div>
        ))}
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
          <h3 className="m-0">{title}</h3>
          <p
            role="button"
            className="fs-5 fw-bold text-primary m-0"
            onClick={onClickLink}
          >
            Lihat lebih banyak
          </p>
        </div>
        <div className="separator separator-dashed mb-2"></div>
        <Gap height={18} />
        {content}
      </div>
    </div>
  );
};

export default ListViewItem;
