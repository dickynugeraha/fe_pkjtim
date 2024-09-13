import { useState } from 'react';
import { getAll } from '../../../requests/master-data/info';
import { ENDPOINTS } from '../../../../constants/API';
import axiosConfig from '../../../../utils/services/axiosConfig';
import Swal from 'sweetalert2';

const [loading, setLoading] = useState(false);

const fetchInfo = async (page: number, limit: number, search: string) => {
  setLoading(true);
  try {
    const res = await getAll(page, limit, search);

    const data: any[] = [];
    for (let index = 0; index < res.data.data.data.length; index++) {
      const ell = res.data.data.data[index];
      const imageUrl: any = `${ENDPOINTS.NEWS.NEWS_IMAGE}/${ell.id}/Image?isStream=false`;
      const resBase64 = await axiosConfig.get(imageUrl);
      const base64 = `data:image/png;base64,${resBase64.data.data.fileContents}`;
      const dataWithStream = {
        ...ell,
        file: base64,
      };
      data.push(dataWithStream);
    }
    setLoading(false);
    return data;
  } catch (error: any) {
    Swal.fire({
      icon: 'error',
      title: 'Gagal get data info',
      text: error.message,
      showConfirmButton: false,
    });
    setLoading(false);
    return [];
  }
};

export default { fetchInfo, loading };
