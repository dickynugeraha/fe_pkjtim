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

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const options: any = { day: "numeric", month: "short", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-GB", options);

  return formattedDate;
}

export default {
  BASE_URL,
  today,
  getThreeMonthsFromToday,
  rupiahFormat,
  formatDate,
};
