import React, { useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import HeadPage from "../../modules/widgets/components/HeadPage";
import { Content } from "../../../_metronic/layout/components/content";
import GenerateQR from "../../../_metronic/layout/components/content/GenerateQR";
import {UsersListHeader} from '../../../_metronic/layout/components/table/header/UsersListHeader'
import {UsersTable} from '../../../_metronic/layout/components/table/UsersTable'
import {KTCard} from '../../../_metronic/helpers'

const PesananSaya = () => {
  return (
    <Content>
      <HeadPage icon="shop" title="Pesanan Saya" pages="Pesanan Saya" />
      <KTCard>
        <UsersListHeader />
        <UsersTable />
      </KTCard>
    </Content>
  );
};

export default PesananSaya;
