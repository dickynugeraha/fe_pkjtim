import React from "react";

const TarifSewa = () => {
  return (
    <div className="col-12 col-lg-6">
      <div className=" p-8 card">
        <h4 className="mb-5">Tarif Sewa</h4>
        <table style={{ width: "65%", marginBottom: "8px" }}>
          <tr>
            <td>Teater Jakarta</td>
            <td>Rp. 50 jt/ hari</td>
          </tr>
          <tr>
            <td>Teater kecil</td>
            <td>Rp. 12 jt/ hari</td>
          </tr>
          <tr>
            <td>Plaza teater Jakarta</td>
            <td>Rp. 1.5 jt/ hari</td>
          </tr>
          <tr>
            <td>Ruang latihan</td>
            <td>Rp. 1 jt/ hari</td>
          </tr>
          <tr>
            <td>Shooting/ Photo profesional</td>
            <td>Rp. 2.7 jt/ hari</td>
          </tr>
          <tr>
            <td>Persiapan/gladi</td>
            <td>50% dari tarif</td>
          </tr>
        </table>
        <p className="text-danger">
          *) Berdasarkan Retribusi Sesuai Perda No. 1 Tahun 2024
        </p>
      </div>
    </div>
  );
};

export default TarifSewa;
