import { FC } from "react";
import LoadingCard from "./LoadingCard";
import Gap from "../../../../../_metronic/layout/components/content/Gap";

type PropsListItem = {
  title: string;
  loading: boolean;
  data: any[];
  onClickLink: () => void;
};

const ListViewItem: FC<PropsListItem> = ({
  loading,
  title,
  data,
  onClickLink,
}) => {
  let content = <></>;

  if (loading) {
    content = (
      <div className="row row-cols-lg-3">
        <LoadingCard array={[1, 1, 1]} />
      </div>
    );
  } else {
    content = (
      <div className="row row-cols-1 row-cols-lg-3">
        {data.slice(0, 3).map((item: any, index: number) => (
          <div className="col" key={index.toString()}>
            <img
              src={item.file}
              className="rounded mb-3"
              style={{ width: "100%", objectFit: "contain", height: 200 }}
            />
            <h4>{item.title}</h4>
            <p>{item.desc}</p>
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
          <h4 className="m-0">{title}</h4>
          <p role="button" className="m-0 text-primary" onClick={onClickLink}>
            Lihat lebih banyak
          </p>
        </div>
        <div className="separator mb-2"></div>
        <Gap height={18} />
        {content}
      </div>
    </div>
  );
};

export default ListViewItem;
