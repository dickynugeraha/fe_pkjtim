import React, { useState } from "react";
import { Content } from "../../../_metronic/layout/components/content";
import HeadPage from "../../modules/widgets/components/HeadPage";
import Gap from "../../../_metronic/layout/components/content/Gap";
import iconPlus from "../../../../public/media/icons/plus.png";
import iconMinus from "../../../../public/media/icons/minus.png";

const Faq = () => {
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
    <Content>
      <HeadPage icon="question-2" pages="FAQ" title="FAQ" />
      <h4>Pertanyaan yang sering diajukan</h4>
      <Gap height={30} />
      {/* pemesanan tempat dan masuk */}
      <div className="row cols-2">
        <div className="col">
          <h4>Pemesanan tempat</h4>
          <Gap height={10} />
          {/* section 1 */}
          <div className="d-flex">
            <img
              src={itemPemesanan.section1 ? iconMinus : iconPlus}
              style={{ height: 25, width: 25 }}
              onClick={() =>
                setItemPemesanan((prevState) => ({
                  ...prevState,
                  section1: !prevState.section1,
                }))
              }
            />
            <div className="ms-4">
              <p className="fw-bold m-0 mt-1">
                Lihat tanggal kosong di Kalender Jadwal
              </p>
              {itemPemesanan.section1 && (
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
                  deleniti eos sapiente a debitis. Quasi similique ducimus
                  officiis minus commodi nisi cupiditate dolor alias sint cumque
                  recusandae magnam, dolores blanditiis.
                </p>
              )}
            </div>
          </div>
          <Gap height={15} />
          {/* section 2 */}
          <div className="d-flex">
            <img
              src={itemPemesanan.section2 ? iconMinus : iconPlus}
              style={{ height: 25, width: 25 }}
              onClick={() =>
                setItemPemesanan((prevState) => ({
                  ...prevState,
                  section2: !prevState.section2,
                }))
              }
            />
            <div className="ms-4">
              <p className="fw-bold m-0 mt-1">
                Pemesanan tempat pagelaran ada dua cara
              </p>
              {itemPemesanan.section2 && (
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
                  deleniti eos sapiente a debitis. Quasi similique ducimus
                  officiis minus commodi nisi cupiditate dolor alias sint cumque
                  recusandae magnam, dolores blanditiis.
                </p>
              )}
            </div>
          </div>
          <Gap height={15} />
          {/* section 3 */}
          <div className="d-flex">
            <img
              src={itemPemesanan.section3 ? iconMinus : iconPlus}
              style={{ height: 25, width: 25 }}
              onClick={() =>
                setItemPemesanan((prevState) => ({
                  ...prevState,
                  section3: !prevState.section3,
                }))
              }
            />
            <div className="ms-4">
              <p className="fw-bold m-0 mt-1">Apakah perlu login?</p>
              {itemPemesanan.section3 && (
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
                  deleniti eos sapiente a debitis. Quasi similique ducimus
                  officiis minus commodi nisi cupiditate dolor alias sint cumque
                  recusandae magnam, dolores blanditiis.
                </p>
              )}
            </div>
          </div>
        </div>
        {/* masuk */}
        <div className="col">
          <h4>Masuk</h4>
          <Gap height={10} />
          {/* section 1 */}
          <div className="d-flex">
            <img
              src={itemMasuk.section1 ? iconMinus : iconPlus}
              style={{ height: 25, width: 25 }}
              onClick={() =>
                setItemMasuk((prevState) => ({
                  ...prevState,
                  section1: !prevState.section1,
                }))
              }
            />
            <div className="ms-4">
              <p className="fw-bold m-0 mt-1">
                Apakah masuk Ke Taman Ismail Marzuki perlu membayar?
              </p>
              {itemMasuk.section1 && (
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
                  deleniti eos sapiente a debitis. Quasi similique ducimus
                  officiis minus commodi nisi cupiditate dolor alias sint cumque
                  recusandae magnam, dolores blanditiis.
                </p>
              )}
            </div>
          </div>
          <Gap height={15} />
          {/* section 2 */}
          <div className="d-flex">
            <img
              src={itemMasuk.section2 ? iconMinus : iconPlus}
              style={{ height: 25, width: 25 }}
              onClick={() =>
                setItemMasuk((prevState) => ({
                  ...prevState,
                  section2: !prevState.section2,
                }))
              }
            />
            <div className="ms-4">
              <p className="fw-bold m-0 mt-1">Bagaimana cara membeli tiket?</p>
              {itemMasuk.section2 && (
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
                  deleniti eos sapiente a debitis. Quasi similique ducimus
                  officiis minus commodi nisi cupiditate dolor alias sint cumque
                  recusandae magnam, dolores blanditiis.
                </p>
              )}
            </div>
          </div>
          <Gap height={15} />
          {/* section 3 */}
          <div className="d-flex">
            <img
              src={itemMasuk.section3 ? iconMinus : iconPlus}
              style={{ height: 25, width: 25 }}
              onClick={() =>
                setItemMasuk((prevState) => ({
                  ...prevState,
                  section3: !prevState.section3,
                }))
              }
            />
            <div className="ms-4">
              <p className="fw-bold m-0 mt-1">Apakah menonton perlu bayar?</p>
              {itemMasuk.section3 && (
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
                  deleniti eos sapiente a debitis. Quasi similique ducimus
                  officiis minus commodi nisi cupiditate dolor alias sint cumque
                  recusandae magnam, dolores blanditiis.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Gap height={30} />
      {/* panduang kurasi */}
      <div className="row">
        <div className="col">
          <h4>Panduang kurasi</h4>
          <a
            target="_blank"
            href="https://dkj.or.id/wp-content/uploads/2022/06/Panduan-Kurasi-PKJ-TIM-DKJ-JUNI-2022.pdf"
            className="btn btn-primary"
          >
            Lihat panduang kurasi
          </a>
        </div>
      </div>
      <Gap height={30} />
      {/* Video tutorial */}
      <div className="d-flex flex-wrap">
        <div className="me-5">
          <div className="card py-10 px-20 mb-5">Video</div>
          <p className="mb-1 fw-bold">Judul Video</p>
          <p>Deskripsi</p>
        </div>
        <div className="me-5">
          <div className="card py-10 px-20 mb-5">Video</div>
          <p className="mb-1 fw-bold">Judul Video</p>
          <p>Deskripsi</p>
        </div>
        <div className="me-5">
          <div className="card py-10 px-20 mb-5">Video</div>
          <p className="mb-1 fw-bold">Judul Video</p>
          <p>Deskripsi</p>
        </div>
      </div>
    </Content>
  );
};

export default Faq;
