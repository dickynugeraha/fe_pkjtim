import React, { useState } from "react";

import { Col, Row, Table } from "react-bootstrap";
import HeadPage from "../../modules/widgets/components/HeadPage";
import { Content } from "../../../_metronic/layout/components/content";
import GenerateQR from "../../../_metronic/layout/components/content/GenerateQR";

const PesananSaya = () => {
  return (
    <Content>
      <HeadPage icon="shop" title="Pesanan Saya" pages="Pesanan Saya" />
      <div>
        <h1>Generate and Scan QR Code in React</h1>
        <div>
          <h4></h4>
        </div>
      </div>
    </Content>
  );
};

export default PesananSaya;
