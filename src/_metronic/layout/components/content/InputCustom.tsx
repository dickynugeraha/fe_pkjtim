import { FC } from "react";
import Gap from "./Gap";
import clsx from "clsx";

type Props = {
  label: string;
  formikIdName: string;
  error: any;
  formikProps: any;
  touched: any;
  typed: string;
};

const InputCustom: FC<Props> = ({
  label,
  formikIdName,
  error,
  formikProps,
  touched,
  typed = "text",
}) => {
  return (
    <div className="fv-row mb-5">
      <label htmlFor={formikIdName} className="fw-bold">
        {label}
      </label>
      <Gap height={10} />
      <input
        id={formikIdName}
        {...formikProps}
        className={clsx(
          "form-control form-control-solid",
          {
            "is-invalid": touched && error,
          },
          {
            "is-valid": touched && !error,
          }
        )}
        type={typed}
        name={formikIdName}
        autoComplete="off"
      />
      {touched && error && (
        <div className="fv-plugins-message-container">
          <span role="alert" className="text-danger">
            {error}
          </span>
        </div>
      )}
    </div>
  );
};

export default InputCustom;
