import React, { useState } from "react";
import { Content } from "../../../_metronic/layout/components/content";
import Gap from "../../../_metronic/layout/components/content/Gap";
import ReactPlayer from "react-player";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";
import { Accordion } from "../../../_metronic/layout/components/content/Accordion";
import { motion } from "framer-motion";

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
                <motion.div
                  initial={{ opacity: 0, y: "200px" }}
                  animate={{ opacity: 1, y: "0px" }}
                  transition={{
                    ease: "easeInOut",
                    delay: 0.4,
                  }}
                >
                  <Accordion
                    show={true}
                    id="faq-1"
                    title="Lihat tanggal kosong di Kalender Jadwal"
                    description="Anda dapat memastikan tanggal kosong pada menu dashboard untuk melanjutkan pesanan"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: "200px" }}
                  animate={{ opacity: 1, y: "0px" }}
                  transition={{
                    ease: "easeInOut",
                    delay: 0.6,
                  }}
                >
                  <Accordion
                    show={false}
                    id="faq-2"
                    title="Pemesanan tempat pagelaran ada dua cara"
                    description="Menghubungi nomor berikut 085777773040. Dan yang kedua dengan memesan melalui website www.pkjtim.com atau website ini"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: "200px" }}
                  animate={{ opacity: 1, y: "0px" }}
                  transition={{
                    ease: "easeInOut",
                    delay: 0.8,
                  }}
                >
                  <Accordion
                    show={false}
                    id="faq-3"
                    title="Apakah perlu login?"
                    description="Jika hanya ingin melihat pagelaran yang tersedia, anda tidak perlu melakukan pendaftaran akun. Jika anda ingin melakukan pemesanan tempat ke kami, anda dapat melanjutkan proses pendaftaran akun dengan mengikuti perintah yang tersedia."
                  />
                </motion.div>
              </div>
              {/* masuk */}
              <div className="col mt-5 mt-md-0">
                <h4>Masuk</h4>
                <motion.div
                  initial={{ opacity: 0, y: "200px" }}
                  animate={{ opacity: 1, y: "0px" }}
                  transition={{
                    ease: "easeInOut",
                    delay: 1,
                  }}
                >
                  <Accordion
                    show={true}
                    id="faq-4"
                    title="Apakah masuk Ke Taman Ismail Marzuki perlu membayar?"
                    description="kawasan Taman Ismail Marzuki merupakan kawasan publik yang dapat diakses oleh siapapun dengan gratis."
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: "200px" }}
                  animate={{ opacity: 1, y: "0px" }}
                  transition={{
                    ease: "easeInOut",
                    delay: 1.2,
                  }}
                >
                  <Accordion
                    show={false}
                    id="faq-5"
                    title="Bagaimana cara membeli tiket?"
                    description="Untuk membeli tiket diatur oleh masing-masing penyelenggara."
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: "200px" }}
                  animate={{ opacity: 1, y: "0px" }}
                  transition={{
                    ease: "easeInOut",
                    delay: 1.4,
                  }}
                >
                  <Accordion
                    show={false}
                    id="faq-6"
                    title="Apakah menonton perlu bayar?"
                    description="Untuk menonton pementasan bersifat opsional, ada yang gratis ada yang perlu membeli tiket."
                  />
                </motion.div>
              </div>
            </div>
          </div>
          {/* panduang kurasi */}
          <motion.div
            initial={{ opacity: 0, y: "200px" }}
            animate={{ opacity: 1, y: "0px" }}
            transition={{
              type: "spring",

              ease: "easeInOut",
              delay: 1.6,
            }}
          >
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
          </motion.div>
          {/* Video tutorial */}
          <Gap height={12} />
          <motion.div
            initial={{ opacity: 0, y: "200px" }}
            animate={{ opacity: 1, y: "0px" }}
            transition={{
              type: "spring",
              ease: "easeInOut",
              delay: 1.6,
            }}
          >
            <div className="ms-8 mb-3">
              <h4>Video Tutorial</h4>
            </div>
            <div className="row row-cols-2 row-cols-lg-3 ps-8 pb-8">
              <div className="col">
                <div className="card px-lg-40 mb-5">
                  <ReactPlayer
                    url="https://www.youtube.com/watch?v=ykmXHR8jFn4"
                    controls
                    width="100%"
                    height="250px"
                  />
                </div>
                <p className="mb-1 fw-bold"></p>
                <p>
                  Anda dapat melihat panduan cara pesan tempat pagelaran di sini
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </Content>
    </>
  );
};
