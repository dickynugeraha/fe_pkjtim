// components/PDFSuratJawaban.tsx
import React from "react";
import { useParams } from "react-router-dom";
import { API_URL, ENDPOINTS } from "../../../../../app/constants/API";

const PDFSuratJawaban: React.FC = () => {
  const params = useParams();
  const pdfUrl =
    API_URL +
    "/" +
    ENDPOINTS.PESAN_TEMPAT.LIST_UPDATE_ADD_DELETE_PESAN_TEMPAT +
    "/" +
    params.id +
    "/Letter/PemakaianGedung"; // PDF file path
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

export default PDFSuratJawaban;
