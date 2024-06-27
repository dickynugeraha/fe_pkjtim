import HeadPage from "../../modules/widgets/components/HeadPage";
import { Content } from "../../../_metronic/layout/components/content";
import GenerateQR from "../../../_metronic/layout/components/content/GenerateQR";

import TableCustom from "../../../_metronic/layout/components/content/TableCustom";

const PesananSaya = () => {
  return (
    <Content>
      <HeadPage icon="shop" title="Pesanan Saya" pages="Pesanan Saya" />

      <TableCustom />
    </Content>
  );
};

export default PesananSaya;
