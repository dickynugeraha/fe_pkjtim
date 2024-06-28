import { useState } from "react";
import { Content } from "../../../_metronic/layout/components/content";
import HeadPage from "../../modules/widgets/components/HeadPage";
import Peraturan from "./components/Peraturan";
import { useNavigate } from "react-router-dom";
import Gap from "../../../_metronic/layout/components/content/Gap";
import ModalInformationCustom from "../../../_metronic/layout/components/content/ModalInformationCustom";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";

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
        description="Planetarium"
      >
        Planetarium
      </PageTitle>
      <Content>
        {/* <HeadPage icon="moon" pages="Planetarium" title="Planetarium" /> */}
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
        <Peraturan />
        <Gap height={18} />
        <Persetujuan />
        <Gap height={18} />
        {termIsCheck && <FormPlace />}
      </Content>
    </>
  );

  function Persetujuan() {
    return (
      <>
        <input
          type="checkbox"
          id="agree-terms"
          onClick={() => setTermIsCheck(!termIsCheck)}
          checked={termIsCheck}
        />
        <label className="ms-3" htmlFor="agree-terms">
          Saya sudah membaca dan menyetujui peraturan pemesanan tempat diatas
        </label>
      </>
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
                  style={{ width: "200px" }}
                />
                <p className="m-0 mx-5">Sampai</p>
                <input
                  type="date"
                  value={endBook}
                  className="form-control"
                  onChange={(e) => setEndBook(e.target.value)}
                  style={{ width: "200px" }}
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
