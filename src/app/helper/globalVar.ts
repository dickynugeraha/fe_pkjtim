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

function formatInputDate(dateStr: any) {
  const formatted = new Date(dateStr).toISOString().split("T")[0];
  return formatted;
}

function formatInputDateFromDB(dateStr: any) {
  const dateObj = new Date(dateStr);

  const formattedDate = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${dateObj.getDate().toString().padStart(2, "0")}`;

  return formattedDate;
}

function createCodeBooking(
  bookingNow: string,
  startDate: any,
  endDate: any,
  idBook: string
) {
  const initial = "TB";
  let [year, month, day] = bookingNow.split("-");
  const booking = day + month + year.slice(-2);

  const start: any = new Date(startDate);
  const end: any = new Date(endDate);
  const timeDifference = end - start;

  const daysDifference = timeDifference / (1000 * 60 * 60 * 24) + 1;
  const threeCharId = idBook.slice(-3);

  return `${initial}${booking}0${daysDifference}${threeCharId}`;
}

export default {
  BASE_URL,
  today,
  createCodeBooking,
  getThreeMonthsFromToday,
  formatInputDateFromDB,
  rupiahFormat,
  formatDate,
  formatInputDate,
};
