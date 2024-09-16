import React from "react";
import Skeleton from "react-loading-skeleton";
import Gap from "../../../../../_metronic/layout/components/content/Gap";

const LoadingInfo = () => {
  return (
    <div>
      <div>
        <div className="row row-cols-1 row-cols-lg-2 g-2 g-lg-10">
          <div className="col">
            <>
              <Skeleton height={400} width={"100%"} />
              <Gap height={12} />
              <Skeleton width={100} height={16} />
              <Gap height={6} />
              <Skeleton width={"100%"} height={16} />
            </>
          </div>
          <div className="col">
            {[1, 1, 1, 1, 1].map((item, idx) => (
              <div key={idx.toString()}>
                <div className="mb-3">
                  <Skeleton width={"50%"} height={20} />
                  <Gap height={12} />
                  <Skeleton width={"100%"} height={16} />
                  <Skeleton width={"100%"} height={16} />
                  <Skeleton width={"100%"} height={16} />
                  <Gap height={12} />
                  <Skeleton width={"25%"} height={16} />
                </div>
                <Gap height={25} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingInfo;
