import { Content } from "../../../_metronic/layout/components/content";
import PelayananImage from "../../../../public/media/images/tentang_kami_pelayanan.png";
import LokasiImage from "../../../../public/media/images/tentang_kami_lokasi.png";
import KontakPersonImage from "../../../../public/media/images/tentang_kami_kontak_person.png";
import Instagram from "../../../../public/media/images/tentang_kami_instagram.png";
import Youtube from "../../../../public/media/images/tentang_kami_youtube.png";
import Gap from "../../../_metronic/layout/components/content/Gap";
import { KTIcon } from "../../../_metronic/helpers";
import ImageAssets from "../../utils/image_assets";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";
import { Card } from "react-bootstrap";
import { useEffect } from "react";
import useContactPerson from "../../modules/hooks/master-data/contact-person";
import { motion } from "framer-motion";

const Breadcrumbs: Array<PageLink> = [
  {
    title: "Tentang Kami",
    path: "/tentang-kami",
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

export const TentangKami = () => {
  const { fetchAllContact, contact } = useContactPerson();
  useEffect(() => {
    fetchAllContact();
  }, []);

  const contactDashboard: any[] = [];
  contact.map((ctc, idx) => {
    if (ctc.forContent === "Dashboard") {
      contactDashboard.push(ctc);
    }
  });

  return (
    <>
      <PageTitle
        icon="profile-user"
        breadcrumbs={Breadcrumbs}
        description="Tentang Kami"
      >
        Tentang Kami
      </PageTitle>
      <Content>
        <motion.div
          initial={{ opacity: 0, y: "200px" }}
          animate={{ opacity: 1, y: "0px" }}
          transition={{
            type: "spring",
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          <div className="card">
            <div className="card-header d-flex align-items-center">
              <h4 className="m-0">Profil PKJ TIM</h4>
            </div>
            <Gap height={16} />
            <SejarahPkjtim />
          </div>
        </motion.div>
        <Gap height={24} />
        <div className="card">
          <div className="card-header d-flex align-items-center">
            <h4 className="m-0">Kontak</h4>
          </div>
          <div className="p-8">
            <div className="row rows-1 rows-lg-2">
              <div className="col">
                <JamPelayanan />
              </div>
              <div className="col mt-4 mt-md-0">
                <LokasiTerkini />
              </div>
            </div>
            <Gap height={30} />
            <div className="row rows-1 rows-lg-2 align-items-center">
              <div className="col">
                <SosialMedia />
              </div>
              <div className="col">
                <KontakPerson />
              </div>
            </div>
          </div>
        </div>
      </Content>
    </>
  );

  function SejarahPkjtim() {
    return (
      <div className="p-8">
        <img
          src={ImageAssets.GedungPkjtim}
          className="rounded-xl"
          style={{ width: "100%" }}
        />
        <div className="text-justify m-2 p-2">
          <p>
            <strong> Taman Ismail Marzuki (TIM)</strong>, terletak di jantung
            kota Jakarta, merupakan pusat kesenian dan budaya terkemuka di
            Indonesia. Diresmikan pada tahun 1968, TIM menjadi ikon budaya yang
            tak lekang oleh waktu, menawarkan berbagai pertunjukan seni,
            pameran, dan kegiatan edukasi bagi masyarakat luas.
          </p>
          <p className="my-4">
            Di kompleks TIM, terdapat berbagai fasilitas yang menunjang berbagai
            kegiatan seni, seperti:
          </p>

          <ul>
            <li>
              Teater Besar: Kapasitas 800 kursi, menjadi tempat pertunjukan
              teater, tari, musik, dan festival seni berskala besar.
            </li>
            <li>
              Teater Kecil: Kapasitas 350 kursi, cocok untuk pertunjukan teater,
              tari, dan konser intim.
            </li>
            <li>
              Planetarium: Menawarkan pertunjukan simulasi langit malam dan
              edukasi tentang astronomi.
            </li>
            <li>
              Galeri Seni: Ruang pamer untuk memamerkan karya seni rupa dari
              seniman lokal dan internasional.
            </li>
            <li>
              Bioskop: Menayangkan film-film Indonesia dan mancanegara.
              Perpustakaan: Koleksi buku-buku seni, budaya, dan sejarah yang
              lengkap.
            </li>
          </ul>
          <p className="my-4">
            Selain itu, TIM juga memiliki ruang publik yang luas dan asri,
            menjadi tempat yang ideal untuk bersantai, berkumpul bersama
            keluarga dan teman, atau menikmati pertunjukan seni jalanan.
          </p>
          <p className="mb-4">
            TIM merupakan wadah pembinaan dan pengembangan bagi para seniman dan
            budayawan Indonesia. Di sini, banyak seniman berbakat lahir dan
            berkembang, melahirkan karya-karya seni yang mendunia.
          </p>
          <p>
            Bagi pecinta seni dan budaya, TIM adalah destinasi wajib kunjung.
            Kunjungi TIM dan rasakan atmosfer seni dan budaya yang kental,
            nikmati berbagai pertunjukan yang menarik, dan temukan inspirasi
            kreatif di jantung kota Jakarta.
          </p>
        </div>
      </div>
    );
  }

  function JamPelayanan() {
    return (
      <div className="d-flex mb-3">
        <img src={PelayananImage} />
        <div className="ms-8">
          <h5>Jam Pelayanan</h5>
          <div className="d-flex">
            <KTIcon
              iconName="toggle-on-circle"
              className="fs-1 me-3 text-success"
            />
            <p className="m-0">Aktif - Pukul 08.00</p>
          </div>
          <div className="d-flex">
            <KTIcon
              iconName="toggle-off-circle"
              className="fs-1 me-3 text-danger"
            />
            <p className="m-0 mb-3">Sampai - Pukul 23.00</p>
          </div>
          <h5>Layanan Survei Lokasi</h5>
          <div className="d-flex">
            <KTIcon iconName="time" className="fs-1 me-3" />
            <p className="m-0">Pukul 08.00 - 16.00</p>
          </div>
        </div>
      </div>
    );
  }

  function LokasiTerkini() {
    return (
      <div className="d-flex mb-3">
        <a href={"https://goo.gl/maps/ZYVB1EV8VGAWkasi9"} target="_blank">
          <img src={LokasiImage} />
        </a>
        <div className="ms-8">
          <h5>Kantor Kami</h5>
          <div className="d-flex">
            <KTIcon iconName="geolocation" className="fs-1 me-3" />
            <p className="m-0">Jl. Cikini Raya No. 73, Jakarta Pusat</p>
          </div>
          <Gap height={10} />
          <div className="d-flex">
            <KTIcon iconName="messages" className="fs-1 me-3" />
            <p className="m-0">pkjtim@jakarta.go.id</p>
          </div>
          <Gap height={10} />
          <div className="d-flex">
            <KTIcon iconName="text-number" className="fs-1 me-3" />
            <p className="m-0">021 2305147</p>
          </div>
        </div>
      </div>
    );
  }

  function KontakPerson() {
    return (
      <Card>
        <Card.Body className="float-start">
          <div>
            <div className="row">
              <div className="col">
                <div className="d-flex align-items-center justify-content-center">
                  <img
                    src={KontakPersonImage}
                    style={{ height: "150px", width: "150px" }}
                    alt=""
                  />
                </div>
              </div>
              <Gap width={28} />
              <div className="col mt-8 mt-lg-0">
                <div className="d-flex align-items-center justify-content-center">
                  <div>
                    <h5 className="mb-0">Kontak person</h5>
                    <Gap height={10} />
                    {contactDashboard.map((ctc, idx) => (
                      <div key={idx.toString()}>
                        <div>
                          <div className="d-flex align-items-center">
                            <KTIcon
                              iconName="whatsapp"
                              className="text-success fs-1 me-4"
                            />
                            <div>
                              <p className="fw-bolder m-0">{ctc.name}</p>
                              <p className="m-0">wa.me/{ctc.phone}</p>
                            </div>
                          </div>
                        </div>
                        <Gap width={10} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  }

  function SosialMedia() {
    return (
      <div className="d-flex flex-column align-items-center align-items-lg-start">
        <h5>Sosial Media</h5>
        <Gap height={10} />
        <div className="d-flex">
          <a href="https://www.instagram.com/uppkjtim/" target="_blank">
            <img src={Instagram} height={50} width={50} className="mb-3" />
          </a>
          <Gap width={12} />
          <a href="https://www.youtube.com/@uppkjtim" target="_blank">
            <img src={Youtube} height={50} width={70} className="mb-3" />
          </a>
        </div>
      </div>
    );
  }
};
