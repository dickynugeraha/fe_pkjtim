import React, { useState } from "react";
import { Content } from "../../../_metronic/layout/components/content";
import HeadPage from "../../modules/widgets/components/HeadPage";
import Gap from "../../../_metronic/layout/components/content/Gap";
import iconPlus from "../../../../public/media/icons/plus.png";
import iconMinus from "../../../../public/media/icons/minus.png";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";
import { Accordion } from "../../../_metronic/layout/components/content/Accordion";

const Breadcrumbs: Array<PageLink> = [
  {
    title: "FAQ",
    path: "/faq",
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

export const Faq = () => {
  const [itemPemesanan, setItemPemesanan] = useState({
    section1: false,
    section2: false,
    section3: false,
  });
  const [itemMasuk, setItemMasuk] = useState({
    section1: false,
    section2: false,
    section3: false,
  });

  return (
    <>
      <PageTitle icon="question-2" breadcrumbs={Breadcrumbs} description="FAQ">
        FAQ
      </PageTitle>
      <Content>
        {/* <HeadPage icon="question-2" pages="FAQ" title="FAQ" /> */}
        <div className="card">
          <div className="card-header d-flex align-items-center">
            <h4 className="m-0 p-0">Pertanyaan yang sering diajukan</h4>
          </div>
          {/* pemesanan tempat dan masuk */}
          <div className="p-8">
            <div className="row row-cols-1 row-cols-md-2">
              <div className="col">
                <h4>Pemesanan tempat</h4>
                {/* section 1 */}
                <Accordion
                  show={true}
                  id="faq-1"
                  title="Lihat tanggal kosong di Kalender Jadwal"
                  description="Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Nulla deleniti eos sapiente a debitis. Quasi similique
                        ducimus officiis minus commodi nisi cupiditate dolor
                        alias sint cumque recusandae magnam, dolores blanditiis."
                />
                <Accordion
                  show={false}
                  id="faq-2"
                  title="Pemesanan tempat pagelaran ada dua cara"
                  description="Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Nulla deleniti eos sapiente a debitis. Quasi similique
                        ducimus officiis minus commodi nisi cupiditate dolor
                        alias sint cumque recusandae magnam, dolores blanditiis."
                />
                <Accordion
                  show={false}
                  id="faq-3"
                  title="Apakah perlu login?"
                  description="Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Nulla deleniti eos sapiente a debitis. Quasi similique
                        ducimus officiis minus commodi nisi cupiditate dolor
                        alias sint cumque recusandae magnam, dolores blanditiis."
                />
              </div>
              {/* masuk */}
              <div className="col mt-5 mt-md-0">
                <h4>Masuk</h4>
                <Accordion
                  show={true}
                  id="faq-4"
                  title="Apakah masuk Ke Taman Ismail Marzuki perlu membayar?"
                  description="Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Nulla deleniti eos sapiente a debitis. Quasi similique
                        ducimus officiis minus commodi nisi cupiditate dolor
                        alias sint cumque recusandae magnam, dolores blanditiis."
                />
                <Accordion
                  show={false}
                  id="faq-5"
                  title="Bagaimana cara membeli tiket?"
                  description="Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Nulla deleniti eos sapiente a debitis. Quasi similique
                        ducimus officiis minus commodi nisi cupiditate dolor
                        alias sint cumque recusandae magnam, dolores blanditiis."
                />
                <Accordion
                  show={false}
                  id="faq-6"
                  title="Apakah menonton perlu bayar?"
                  description="Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Nulla deleniti eos sapiente a debitis. Quasi similique
                        ducimus officiis minus commodi nisi cupiditate dolor
                        alias sint cumque recusandae magnam, dolores blanditiis."
                />
              </div>
            </div>
          </div>
          {/* panduang kurasi */}
          <div className="p-8">
            <h4>Panduan kurasi</h4>
            <a
              target="_blank"
              href="https://dkj.or.id/wp-content/uploads/2022/06/Panduan-Kurasi-PKJ-TIM-DKJ-JUNI-2022.pdf"
              className="btn btn-sm btn-primary"
            >
              Lihat panduan kurasi
            </a>
          </div>
          {/* Video tutorial */}
          <Gap height={12} />
          <div className="ms-8 mb-3">
            <h4>Video Tutorial</h4>
          </div>
          <div className="row row-cols-2 row-cols-lg-3 ps-8 pb-8">
            <div className="col">
              <div className="card py-5 px-10 py-lg-20 px-lg-40 mb-5">
                Video
              </div>
              <p className="mb-1 fw-bold">Judul Video</p>
              <p>Deskripsi</p>
            </div>
          </div>
        </div>
      </Content>
    </>
  );
};
