// components/PDFSuratUndangan.tsx
import React from "react";
import { useParams } from "react-router-dom";
import { API_URL, ENDPOINTS } from "../../../../../app/constants/API";

const PDFSuratUndangan: React.FC = () => {
  const params = useParams();
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

export default PDFSuratUndangan;
