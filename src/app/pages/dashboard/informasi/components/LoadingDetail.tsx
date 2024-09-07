import React from "react";
import { KTIcon } from "../../../../../_metronic/helpers";
import Skeleton from "react-loading-skeleton";
import Gap from "../../../../../_metronic/layout/components/content/Gap";

const LoadingDetail = () => {
  return (
    <>
      <div className="col-12 col-lg-8">
        <div className="p-8">
          <Skeleton height={16} width={180} />
          <div className="d-flex align-items-center mt-2">
            <Skeleton height={16} width={100} />
          </div>
        </div>
        <div className="p-8 pt-0 pe-lg-0">
          <Skeleton height={500} width={"100%"} />
          <Gap height={12} />
          <Skeleton height={16} width={"100%"} />
          <Skeleton height={16} width={"100%"} />
          <Skeleton height={16} width={"100%"} />
        </div>
      </div>
      <div className="col-12 col-lg-4">
        <div className="d-flex align-items-center px-8 p-lg-0 pt-lg-8">
          <Skeleton height={16} width={180} />
        </div>
        <div className="p-8 ps-lg-0">
          {[1, 1, 1, 1, 1].map((itm) => (
            <div className="row g-2 mb-4">
              <div className="col">
                <Skeleton height={100} width={"100%"} />
              </div>
              <div
                className="ms-4 col overflow-y-scroll"
                style={{ height: "100px" }}
              >
                <Skeleton height={16} width={80} />
                <Skeleton height={16} width={"100%"} />
                <Skeleton height={16} width={"100%"} />
                <Skeleton height={16} width={"100%"} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LoadingDetail;
