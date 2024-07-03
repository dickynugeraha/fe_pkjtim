import React from "react";
import { useIntl } from "react-intl";
import { Content } from "../../../_metronic/layout/components/content";
import HeadPage from "../../modules/widgets/components/HeadPage";
import PelayananImage from "../../../../public/media/images/tentang_kami_pelayanan.png";
import LokasiImage from "../../../../public/media/images/tentang_kami_lokasi.png";
import KontakPersonImage from "../../../../public/media/images/tentang_kami_kontak_person.png";
import Instagram from "../../../../public/media/images/tentang_kami_instagram.png";
import Youtube from "../../../../public/media/images/tentang_kami_youtube.png";
import Gap from "../../../_metronic/layout/components/content/Gap";
import { KTIcon } from "../../../_metronic/helpers";
import ImageAssets from "../../utils/image_assets";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";

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

const TentangKami = () => {
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
        {/* <HeadPage
          title="Tentang Kami"
          icon="profile-user"
          pages="Tentang Kami"
        /> */}
        <div className="card">
          <div className="card-header d-flex align-items-center">
            <h4 className="m-0">Profil PKJ TIM</h4>
          </div>
          <Gap height={16} />
          <SejarahPkjtim />
        </div>
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
              <div className="col">
                <SosialMedia />
              </div>
            </div>
            <Gap height={30} />
            <div className="row rows-1 rows-lg-2">
              <div className="col">
                <LokasiTerkini />
              </div>
              <div className="col">
                <div className="card p-2">
                  <KontakPerson />
                </div>
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
        <div className="text-justify m-2 p-2 fs-5 fw-semibold text-gray-600">
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
          <p className="m-0">Aktif - Pukul 08.00</p>
          <p className="m-0 mb-3">Sampai - Pukul 23.00</p>
          <h5>layanan Survei Lokasi</h5>
          <p className="m-0">Pukul 08.00 - 16.00</p>
        </div>
      </div>
    );
  }

  function LokasiTerkini() {
    return (
      <div className="d-flex mb-3">
        <img src={LokasiImage} />
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
      <div className="d-flex align-items-center">
        <img
          src={KontakPersonImage}
          style={{ height: "150px", width: "150px" }}
          alt=""
        />
        <Gap width={30} />
        <div>
          <h5>Kontak Person</h5>
          <Gap height={10} />
          <div className="row rows-1 rows-lg-3">
            <div className="col">
              <div className="d-flex align-items-center">
                <KTIcon
                  iconName="whatsapp"
                  className="text-success fs-1 me-4"
                />
                <div>
                  <p className="m-0">Bapak Didin</p>
                  <p className="m-0">wa.me/..</p>
                </div>
              </div>
            </div>
            <Gap width={10} />
            <div className="col">
              <div className="d-flex align-items-center">
                <KTIcon
                  iconName="whatsapp"
                  className="text-success fs-1 me-4"
                />
                <div>
                  <p className="m-0">Bapak Sularto</p>
                  <p className="m-0">wa.me/..</p>
                </div>
              </div>
            </div>
            <Gap width={20} />
            <div className="col">
              <div className="d-flex align-items-center">
                <KTIcon
                  iconName="whatsapp"
                  className="text-success fs-1 me-4"
                />
                <div>
                  <p className="m-0">Kantor UP PKJ TIM</p>
                  <p className="m-0">wa.me/..</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function SosialMedia() {
    return (
      <div>
        <h5>Sosial Media</h5>
        <Gap height={10} />
        <div className="d-flex">
          <div>
            <img src={Instagram} height={50} width={50} className="mb-3" />
          </div>
          <Gap width={12} />
          <div>
            <img src={Youtube} height={50} width={70} className="mb-3" />
          </div>
        </div>
      </div>
    );
  }
};

export default TentangKami;
