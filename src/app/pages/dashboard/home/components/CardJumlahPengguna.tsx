type Props = {
  className: string;
  description: string;
  color: string;
  img: string;
  dataStatus: any;
};

const CardJumlahPengguna = ({
  className,
  description,
  color,
  img,
  dataStatus,
}: Props) => {
  return (
    <div
      className={`card card-flush bgi-no-repeat bgi-size-contain bgi-position-x-end ${className}`}
      style={{
        backgroundColor: color,
        backgroundImage: `url('${img}')`,
      }}
    >
      <div className="card-header pt-5 mb-5">
        <div className="card-title d-flex flex-column">
          <div className="fs-2hx fw-bold text-white me-2 lh-1 ls-n2">
            {dataStatus?.totalActive}
          </div>

          <div className="text-white opacity-75 pt-1 fw-semibold fs-6">
            {description}
          </div>
        </div>
      </div>
      <div className="card-body d-flex align-items-end pt-0">
        <div className="d-flex align-items-center flex-column mt-7 w-100">
          <div className="d-flex justify-content-between fw-bold fs-6 text-white opacity-75 w-100 mt-auto">
            <span>{dataStatus?.total} Total Pengguna</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { CardJumlahPengguna };
