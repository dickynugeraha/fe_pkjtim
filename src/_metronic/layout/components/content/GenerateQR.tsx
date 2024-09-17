import React, { FC } from "react";
import { QRCode } from "react-qrcode-logo";

interface Props {
  data: string;
}

const GenerateQR: FC<Props> = ({ data }) => {
  return (
    <div>
      <QRCode
        value={data}
        size={256}
        bgColor={"#ffffff"}
        fgColor={"#000000"}
        logoImage={
          "https://www.stupidmonkey.web.id/wp-content/uploads/2020/05/lambang-dki-jakarta.png"
        }
        logoWidth={75}
        logoHeight={75}
        logoOpacity={1}
        // logoBackgroundColor="transparent"
        logoPadding={2}
        qrStyle="squares"
      />
    </div>
  );
};

export default GenerateQR;
