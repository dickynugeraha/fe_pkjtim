import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { KTIcon, toAbsoluteUrl } from "../../../_metronic/helpers";
import { Content } from "../../../_metronic/layout/components/content";
import { Link } from "react-router-dom";
import axios from "axios";
import HeadPage from "../../modules/widgets/components/HeadPage";
import { arrData, dummyImage } from "./helper";
import Gap from "../../../_metronic/layout/components/content/Gap";

type Props = {
  title: string;
  link: string;
  data?: any;
};

const ListViewItem: FC<Props> = ({ title, link, data = [] }) => {
  return (
    <>
      <div>
        <div className="card-header d-flex mt-3 justify-content-between align-items-center">
          <h4 className="m-0">{title}</h4>
          <Link to={`${link}`}>Lihat lebih banyak</Link>
        </div>
        <Gap height={18} />
        <div className="p-8">
          <div className="row row-cols-2 row-cols-lg-3">
            {data.map((item: any) => (
              <div className="col">
                <img
                  src={item.image}
                  className="rounded mb-3"
                  style={{ width: "100%", objectFit: "cover" }}
                />
                <h4>{item.title}</h4>
                {/* <p>{item.description}</p> */}
                <p className="text-truncate">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Maiores eos sit ab et veritatis, culpa necessitatibus quisquam
                  temporibus officia sint? Pariatur facilis possimus ipsa
                  adipisci hic, voluptatem quaerat suscipit at!
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const ContentSekilasInfo: FC = () => {
  return (
    <div>
      <div className="card-header d-flex mt-3 justify-content-between align-items-center">
        <h4 className="m-0">Sekilas Info</h4>
        <Link to={"/dashboard/home/info"}>Lihat lebih banyak</Link>
      </div>
      <div className="p-8">
        <div className="row row-cols-1 row-cols-lg-2 g-2 g-lg-10">
          <div className="col">
            <img
              src={dummyImage}
              style={{ width: "100%" }}
              className="rounded mb-6"
            />
            <h4>Judul</h4>
            <p className="text-truncate">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde odio
              labore aut veniam voluptas ratione eaque expedita illum. Optio eum
              eveniet laboriosam tenetur minima itaque fugiat deleniti error
              nesciunt labore!
            </p>
          </div>
          <div className="col">
            <div className="mb-3">
              <h4>Judul</h4>
              <p className="text-truncate">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
                odio labore aut veniam voluptas ratione eaque expedita illum.
                Optio eum eveniet laboriosam tenetur minima itaque fugiat
                deleniti error nesciunt labore!
              </p>
            </div>
            <hr />
            <div className="mb-3">
              <h4>Judul</h4>
              <p className="text-truncate">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
                odio labore aut veniam voluptas ratione eaque expedita illum.
                Optio eum eveniet laboriosam tenetur minima itaque fugiat
                deleniti error nesciunt labore!
              </p>
            </div>
            <hr />
            <div className="mb-3">
              <h4>Judul</h4>
              <p className="text-truncate">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
                odio labore aut veniam voluptas ratione eaque expedita illum.
                Optio eum eveniet laboriosam tenetur minima itaque fugiat
                deleniti error nesciunt labore!
              </p>
            </div>
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardPage: FC = () => {
  return (
    <Content>
      <HeadPage icon="home" title="Home" pages="Dashboard - Home" />
      <div className="card">
        <ContentSekilasInfo />
        <ListViewItem
          title="Koleksi Seni UP PKJ TIM"
          link="/dashboard/home/seni"
          data={arrData}
        />
        <ListViewItem
          title="Daftar Pementasan"
          link="/dashboard/home/pementasan"
          data={arrData}
        />
        <ListViewItem
          title="Daftar Seniman"
          link="/dashboard/home/seniman"
          data={arrData}
        />
      </div>
    </Content>
  );
};

const DashboardWrapper: FC = () => {
  const intl = useIntl();
  const [dataDashboard, setDataDashboard] = useState({
    info: [],
    koleksiSeni: [],
    pementasan: [],
    seniman: [],
  });

  const getAllDataDashboard = async () => {
    const res = await axios.get("/api_get_all");
    if (res.data.meta.status === 200) {
      setDataDashboard({ ...dataDashboard, info: res.data.info });
      setDataDashboard({ ...dataDashboard, koleksiSeni: res.data.koleksiSeni });
      setDataDashboard({ ...dataDashboard, pementasan: res.data.pementasan });
      setDataDashboard({ ...dataDashboard, seniman: res.data.seniman });
    }
  };

  useEffect(() => {
    // get data sekilas info, dll
    // getAllDataDashboard();
  }, []);

  return (
    <>
      <DashboardPage />
    </>
  );
};

export { DashboardWrapper };
