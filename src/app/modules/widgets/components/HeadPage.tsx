import { FC } from "react";
import { KTIcon } from "../../../../_metronic/helpers";

const HeadPage: FC<{ title: string; icon: string; pages: string }> = ({
  title,
  icon,
  pages,
}) => {
  return (
    <div className="my-5">
      <div className="d-flex align-items-center mb-3">
        <KTIcon iconName={icon} className="fs-1 me-3" />
        <h3 className="m-0">{title}</h3>
      </div>
      <p className="text-muted">{pages}</p>
    </div>
  );
};

export default HeadPage;
