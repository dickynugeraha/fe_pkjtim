import { useEffect, useState } from "react";
import { getAll } from "../../../requests/master-data/info";

export const useInfo = () => {
  const [info, setInfo] = useState<unknown[]>([]);

  const fetchInfo = async () => {
    const response = await getAll();
    console.log("response info", response.data);

    setInfo(response.data);
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return { info };
};
