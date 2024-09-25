// components/PDFPernyataanPersetujuan.tsx
import React from "react";
import { useParams } from "react-router-dom";
import { API_URL, ENDPOINTS } from "../../../../../app/constants/API";

const PDFPernyataanPersetujuan: React.FC = () => {
  const params = useParams();
  ("http://49.50.9.223:10029/api/v1/Planetarium/01J824MRNTPKHEH2JHA1GSW16S/Attachment/PernyataanPersetujuan");
  const pdfUrl =
    API_URL +
    "/" +
    ENDPOINTS.PLANETARIUM.LIST_UPDATE_ADD_DELETE_PLANETARIUM +
    "/" +
    params.id +
    "/Attachment/PernyataanPersetujuan"; // PDF file path

  console.log("pdf", pdfUrl);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <iframe
        src={pdfUrl}
        width="100%"
        height="100%"
        style={{ border: "none" }}
        title="PDF Viewer"
      />
    </div>
  );
};

export default PDFPernyataanPersetujuan;
