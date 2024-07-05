import { FC } from "react";

interface Props {
  id: string;
  title: string;
  description: string;
  show: boolean;
}

const Accordion: FC<Props> = ({ id, title, description, show }) => {
  return (
    <div className="m-0">
      <div
        className={`d-flex align-items-center collapsible py-3 toggle mb-0 ${
          show ? "" : "collapsed"
        }`}
        data-bs-toggle="collapse"
        data-bs-target={"#" + id}
      >
        <div className="btn btn-sm btn-icon mw-20px btn-active-color-primary me-5">
          <i className="ki-duotone ki-minus-square toggle-on text-primary fs-1">
            <span className="path1"></span>
            <span className="path2"></span>
          </i>
          <i className="ki-duotone ki-plus-square toggle-off fs-1">
            <span className="path1"></span>
            <span className="path2"></span>
            <span className="path3"></span>
          </i>
        </div>
        <h4 className="text-gray-700 fw-bold cursor-pointer mb-0">{title}</h4>
      </div>
      <div id={id} className={`collapse ${show ? "show" : ""} fs-6 ms-1`}>
        <div className="mb-4 text-gray-600 fw-semibold fs-6 ps-10">
          {description}
        </div>
      </div>
      <div className="separator"></div>
    </div>
  );
};
export { Accordion };
