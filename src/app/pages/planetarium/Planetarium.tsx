import { useState } from "react";
import { Content } from "../../../_metronic/layout/components/content";
import { useNavigate } from "react-router-dom";
import Gap from "../../../_metronic/layout/components/content/Gap";
import ModalInformationCustom from "../../../_metronic/layout/components/content/ModalInformationCustom";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";
import Peraturan from "./components/Peraturan";

const Breadcrumbs: Array<PageLink> = [
  {
    title: "Planetarium",
    path: "/planetarium",
    isSeparator: false,
    isActive: false,
  },
  {
    title: "",
    path: "",
    isSeparator: true,
    isActive: false,
  },
];

const Planetarium = () => {
  const navigate = useNavigate();
  const [startBook, setStartBook] = useState("");
  const [endBook, setEndBook] = useState("");
  const [termIsCheck, setTermIsCheck] = useState(false);
  const [showFailedNext, setShowFailedNext] = useState({
    isShow: false,
    title: "",
    desc: "",
    variant: "failed",
  });

  const nextButtonSubmit = () => {
    if (!startBook || !endBook) {
      setShowFailedNext({
        isShow: true,
        title: "Gagal Melakukan Pesanan",
        desc: "Silahkan isi form booking",
        variant: "failed",
      });
      return;
    }

    navigate(`/form-planetarium`, {
      state: { startBook: startBook, endBook: endBook },
    });
  };

  return (
    <>
      <PageTitle
        icon="moon"
        breadcrumbs={Breadcrumbs}
        description="Planetarium Goes To School"
      >
        Planetarium Goes To School
      </PageTitle>
      <Content>
        <ModalInformationCustom
          title={showFailedNext.title}
          desc={showFailedNext.desc}
          show={showFailedNext.isShow}
          onHide={() => {
            setShowFailedNext((prevState) => ({
              ...prevState,
              isShow: false,
            }));
          }}
          variant={showFailedNext.variant}
        />
        <Gap height={18} />
        <Peraturan />
        <Gap height={24} />
        <Persetujuan />
        <Gap height={24} />
        {termIsCheck && <FormPlace />}
      </Content>
    </>
  );

  function Persetujuan() {
    return (
      <div className="form-check">
        <input
          type="checkbox"
          id="agree-terms-planetarium"
          className="form-check-input"
          onClick={() => setTermIsCheck(!termIsCheck)}
          checked={termIsCheck}
        />
        <label className="form-check-label" htmlFor="agree-terms-planetarium">
          Saya sudah membaca dan menyetujui peraturan pemesanan tempat diatas
        </label>
      </div>
    );
  }
  function FormPlace() {
    return (
      <div className="row">
        <div className="col-12 col-lg-6">
          <div className="card p-8">
            <div className="mb-4">
              <p className="mb-1 fw-bold">Pilih tanggal</p>
              <div className="d-flex align-items-center">
                <input
                  type="date"
                  className="form-control"
                  value={startBook}
                  onChange={(e) => setStartBook(e.target.value)}
                />
                <p className="m-0 mx-5">Sampai</p>
                <input
                  type="date"
                  value={endBook}
                  className="form-control"
                  onChange={(e) => setEndBook(e.target.value)}
                />
              </div>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              style={{ width: "150px" }}
              onClick={nextButtonSubmit}
            >
              Selanjutnya
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default Planetarium;
