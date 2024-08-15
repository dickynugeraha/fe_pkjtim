import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { KTIcon, toAbsoluteUrl } from "../../../../_metronic/helpers";
import { Content } from "../../../../_metronic/layout/components/content";
import { Link } from "react-router-dom";
import axios from "axios";
import HeadPage from "../../../modules/widgets/components/HeadPage";
import { arrData, arrDataTempat, dummyImage } from "../../../helper/helper";
import Gap from "../../../../_metronic/layout/components/content/Gap";
import { PageLink, PageTitle } from "../../../../_metronic/layout/core";
import HeadCard from "../../../../_metronic/layout/components/content/HeadCard";

type Props = {
  title: string;
  link: string;
  data?: any;
};

const ListViewItem: FC<Props> = ({ title, link, data = [] }) => {
  return (
    <>
      <div>
        <div className="p-8">
          <div className="d-flex justify-content-between align-items-center pb-4">
            <h4 className="m-0">{title}</h4>
            <Link to={`${link}`}>Lihat lebih banyak</Link>
          </div>
          <div className="separator mb-2"></div>
          <Gap height={18} />
          <div className="row row-cols-lg-3">
            {data.map((item: any, index: number) => (
              <div className="col" key={index.toString()}>
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
      <div className="p-8">
        <div className="d-flex justify-content-between align-items-center pb-4">
          <h4 className="m-0">Sekilas Info</h4>
          <Link to={"/dashboard/informasi/info"}>Lihat lebih banyak</Link>
        </div>
        <div className="separator mb-2"></div>
        <Gap height={18} />
        <div>
          <div className="row row-cols-1 row-cols-lg-2 g-2 g-lg-10">
            <div className="col">
              <img
                src={dummyImage}
                style={{ width: "100%" }}
                className="rounded mb-6"
              />
              <h4>Judul</h4>
              <p className="text-truncate">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
                odio labore aut veniam voluptas ratione eaque expedita illum.
                Optio eum eveniet laboriosam tenetur minima itaque fugiat
                deleniti error nesciunt labore!
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
    </div>
  );
};
const ContentTempat: FC = () => {
  return (
    <div>
      <div className="p-8">
        <div>
          <div className="row row-cols-lg-4">
            {arrDataTempat.map((item: any, index: number) => (
              <div className="col" key={index.toString()}>
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
    </div>
  );
};

const DashboardPage: FC = () => {
  return (
    <Content>
      <div className="card mb-9">
        <ContentSekilasInfo />
        <ListViewItem
          title="Koleksi Seni UP PKJ TIM"
          link="/dashboard/informasi/seni"
          data={arrData}
        />
        <ListViewItem
          title="Daftar Pementasan"
          link="/dashboard/informasi/pementasan"
          data={arrData}
        />
        <ListViewItem
          title="Daftar Seniman"
          link="/dashboard/informasi/seniman"
          data={arrData}
        />
      </div>
      <div className="card">
        <HeadCard title="Jenis Tempat" />
        <ContentTempat />
      </div>
    </Content>
  );
};

export const Informasi: FC = () => {
  const intl = useIntl();

  const Breadcrumbs: Array<PageLink> = [
    {
      title: "Dashboard",
      path: "/dashboard/informasi",
      isSeparator: false,
      isActive: true,
    },
    {
      title: "",
      path: "",
      isSeparator: true,
      isActive: true,
    },
  ];

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
      <PageTitle
        icon="information"
        breadcrumbs={Breadcrumbs}
        description="Daftar pesanan saya"
      >
        Informasi
      </PageTitle>
      <DashboardPage />
    </>
  );
};
