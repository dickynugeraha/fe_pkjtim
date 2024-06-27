import { UsersListHeader } from "../../../_metronic/layout/components/table/header/UsersListHeader";
import { UsersTable } from "../../../_metronic/layout/components/table/UsersTable";
import { KTCard } from "../../../_metronic/helpers";
import HeadPage from "../../modules/widgets/components/HeadPage";
import { Content } from "../../../_metronic/layout/components/content";
import GenerateQR from "../../../_metronic/layout/components/content/GenerateQR";
import Gap from "../../../_metronic/layout/components/content/Gap";
import TableCustom from "../../../_metronic/layout/components/content/TableCustom";

const PesananSaya = () => {
  return (
    <Content>
      <HeadPage icon="shop" title="Pesanan Saya" pages="Pesanan Saya" />
      <KTCard>
        <UsersListHeader />
        <UsersTable />
      </KTCard>
      <Gap height={100} />

      <TableCustom />
    </Content>
  );
};

export default PesananSaya;
