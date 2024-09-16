import { FC } from "react";
import Gap from "../../../../../_metronic/layout/components/content/Gap";
import Skeleton from "react-loading-skeleton";

type Props = {
  array: any[];
};

const LoadingCard: FC<Props> = ({ array }) => {
  return (
    <>
      {array.map((item: any, index: number) => (
        <div className="col" key={index.toString()}>
          <Skeleton height={200} width={"100%"} />
          <Skeleton width={100} height={16} />
          <Skeleton width={"100%"} height={16} />
          <Skeleton width={"100%"} height={16} />
        </div>
      ))}
    </>
  );
};

export default LoadingCard;
