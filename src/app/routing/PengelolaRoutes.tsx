import { Route, Routes } from "react-router-dom";
import { MasterLayout } from "../../_metronic/layout/MasterLayout";

import {
  SekilasInfo,
  Pementasan,
  KoleksiSeni,
  Pengguna,
  Seniman,
  Tempat,
  TutupTempat,
} from "../pages/master-data";

const PengelolaRoutes = () => {
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path="pengguna" element={<Pengguna />} />
        <Route path="sekilas-info" element={<SekilasInfo />} />
        <Route path="pementasan" element={<Pementasan />} />
        <Route path="seniman" element={<Seniman />} />
        <Route path="koleksi-seni" element={<KoleksiSeni />} />
        <Route path="tempat" element={<Tempat />} />
        <Route path="tutup-tempat" element={<TutupTempat />} />
      </Route>
    </Routes>
  );
};

export { PengelolaRoutes };
