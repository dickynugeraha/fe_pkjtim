// components/PDFSuratPermohonanPengelola.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL, ENDPOINTS } from "../../../../../app/constants/API";
import { useAuth } from "../../../../../app/modules/auth";

const PDFSuratPermohonanPengelola: React.FC = () => {
  const { auth } = useAuth();
  const params = useParams();
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);

  const pdfUrl = `${API_URL}/${ENDPOINTS.PESAN_TEMPAT.LIST_UPDATE_ADD_DELETE_PESAN_TEMPAT}/${params.id}/Attachment/SuratPermohonanPengelola`;

  useEffect(() => {
    // Only fetch if we don't already have a PDF Blob URL and token is available
    if (!pdfBlobUrl && auth?.api_token) {
      const fetchPdf = async () => {
        try {
          const response = await fetch(pdfUrl, {
            headers: {
              Authorization: `Bearer ${auth.api_token}`,
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch PDF.");
          }

          const blob = await response.blob();
          const blobUrl = URL.createObjectURL(blob);
          setPdfBlobUrl(blobUrl);
        } catch (error) {
          console.error("Error fetching PDF:", error);
        }
      };

      fetchPdf();
    }

    // Clean up the object URL when the component unmounts
    return () => {
      if (pdfBlobUrl) {
        URL.revokeObjectURL(pdfBlobUrl);
      }
    };
  }, [pdfUrl, auth?.api_token]); // Removed pdfBlobUrl from dependencies to avoid re-fetching

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      {pdfBlobUrl ? (
        <iframe
          src={pdfBlobUrl}
          width="100%"
          height="100%"
          style={{ border: "none" }}
          title="PDF Viewer"
        />
      ) : (
        <p>Loading PDF...</p>
      )}
    </div>
  );
};

export default PDFSuratPermohonanPengelola;
