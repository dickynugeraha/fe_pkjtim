import { Stream } from "stream";

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

export async function streamToImageUrl(stream: any) {
  const reader = stream.getReader();
  const chunks = [];
  let result;

  while (!(result = await reader.read()).done) {
    chunks.push(result.value);
  }

  const blob = new Blob(chunks, { type: "image/png" });

  const imageUrl = URL.createObjectURL(blob);

  return imageUrl;
}

export default {
  BASE_URL,
  today,
  getThreeMonthsFromToday,
  rupiahFormat,
};
