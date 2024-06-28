import React, { FC } from "react";

type Props = {
  title: string;
};

const HeadCard: FC<Props> = ({ title }) => {
  return (
    <div className="card-header d-flex justify-content-between align-items-center px-5">
      <h4 className="m-0">{title}</h4>
    </div>
  );
};

export default HeadCard;
