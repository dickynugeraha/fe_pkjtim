import axiosConfig from "../utils/services/axiosConfig";

const BASE_URL = "";
const today = Date.now();
function getThreeMonthsFromToday() {
  let today = new Date();
  let threeMonthsLater = new Date(today.setMonth(today.getMonth() + 3));
  return threeMonthsLater.toISOString().split("T")[0];
}

function rupiahFormat(number: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
}

export async function requestImageUseToken(url: string) {
  const response = await axiosConfig.getImage(url);

  const result = URL.createObjectURL(response.data);
  console.log("image response", result);

  return result;
}

export default {
  BASE_URL,
  today,
  getThreeMonthsFromToday,
  rupiahFormat,
  requestImageUseToken,
};
