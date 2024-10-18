import axiosConfig from "../utils/services/axiosConfig";
import CryptoJS from "crypto-js";

const BASE_URL = "";
const today = Date.now();
function getThreeMonthsFromToday() {
  let today = new Date();
  let threeMonthsLater = new Date(today.setMonth(today.getMonth() + 3));
  return threeMonthsLater.toISOString().split("T")[0];
}

function formatRupiah(number: number) {
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
  const date = new Date(dateStr);

  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

  const formatted = new Date(dateStr).toISOString().split("T")[0];
  return formattedDate;
}

function formatInputDateFromDB(dateStr: any) {
  const dateObj = new Date(dateStr);

  const formattedDate = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${dateObj.getDate().toString().padStart(2, "0")}`;

  return formattedDate;
}

function createCodeBooking(
  placeReserve: string,
  bookingNow: string,
  startDate: any,
  endDate: any,
  idBook: string
) {
  const getInitials = (name: any) => {
    const initial = name.match(/(\b\S)?/g).join("");
    return initial;
  };

  const initial = getInitials(placeReserve);
  let [year, month, day] = bookingNow.split("-");
  const booking = day + month + year.slice(-2);

  const start: any = new Date(startDate);
  const end: any = new Date(endDate);
  const timeDifference = end - start;

  const daysDifference = timeDifference / (1000 * 60 * 60 * 24) + 1;
  const threeCharId = idBook.slice(-3);

  return `${initial}${booking}0${daysDifference}${threeCharId}`;
}

export const convertRouteToTitle = (route: string) => {
  let title = "";
  switch (route) {
    case "seni":
      title = "Koleksi Seni UP PKJ TIM";
      break;
    case "pementasan":
      title = "Daftar Pementasan";
      break;
    case "seniman":
      title = "Daftar Seniman";
      break;
    default:
      title = "Sekilas Info";
      break;
  }

  return title;
};

const exportStatusPesanTempatToTitle = (status: string) => {
  let statusClass = "";
  let statusDesc = "";
  switch (status) {
    case "WAITING_ANSWER_LETTER":
      statusClass = "badge badge-light-success fs-6";
      statusDesc = "Menunggu surat jawaban";
      break;
    case "PROSES":
      statusClass = "badge badge-light-info fs-6";
      statusDesc = "Pesanan baru perlu diproses";
      break;
    case "KURASI":
      statusClass = "badge badge-light-warning fs-6";
      statusDesc = "Kurasi";
      break;
    case "DONE":
      statusClass = "badge badge-light-success fs-6";
      statusDesc = "Selesai";
      break;
    case "PENDING":
      statusDesc = "Pesanan tertunda";
      statusClass = "badge badge-light-warning fs-6";
      break;
    case "REJECT":
      statusDesc = "Ditolak";
      statusClass = "badge badge-light-danger fs-6";
      break;
    case "REQUEST":
      statusDesc = "Menunggu persetujuan admin";
      statusClass = "badge badge-light-info fs-6";
      break;
    case "EXPIRED":
      statusDesc = "Kadaluarsa";
      statusClass = "badge badge-light-danger fs-6";
      break;
    case "REVISE":
      statusDesc = "Revisi";
      statusClass = "badge badge-light-danger fs-6";
      break;
  }

  return {
    statusDesc,
    statusClass,
  };
};

function differenceInDays(startDate: any, endDate: any) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const diffTime = end.getTime() - start.getTime();

  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays + 1;
}

const generateRandomId = (): string => {
  return Math.random().toString(36).substr(2, 9); // Generate a random string with 9 characters
};

const checkUrlAccessible = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok; // Returns true if the status is in the 200 range
  } catch (error) {
    return false; // Returns false if there was an error (e.g., network issues)
  }
};

function htmlToText(htmlString: string) {
  const tempElement = document.createElement("div");
  tempElement.innerHTML = htmlString;

  return tempElement.textContent || tempElement.innerText || "";
}

function htmlToTextWithTags(htmlString: any) {
  // Create a temporary DOM element to parse the HTML string
  const tempElement = document.createElement("div");
  tempElement.innerHTML = htmlString;

  // Define the tags you want to preserve
  const allowedTags = ["strong", "em", "b", "i"];

  // Recursively process child nodes and remove unwanted tags
  function processNode(node: any): any {
    // If it's a text node, return the text
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent;
    }
    // If it's an element and its tag is allowed, keep the tag and process children
    if (
      node.nodeType === Node.ELEMENT_NODE &&
      allowedTags.includes(node.tagName.toLowerCase())
    ) {
      const tagName = node.tagName.toLowerCase();
      return `<${tagName}>${Array.from(node.childNodes)
        .map(processNode)
        .join("")}</${tagName}>`;
    }
    // Otherwise, just process its children (strip the tag)
    return Array.from(node.childNodes).map(processNode).join("");
  }

  // Process the DOM and return the result as a string
  return processNode(tempElement);
}

const getCurrentTimeStampForHeader = () => {
  const currentTime = new Date();
  currentTime.setSeconds(currentTime.getSeconds() + 3600);
  const currentTimeStamp: string = currentTime.toISOString();

  const textForEncrypt = `${currentTimeStamp}`;
  const secretKey = "PkjTaman1sma1lMarzuk1@15270622##";
  const iv = CryptoJS.enc.Hex.parse("0000000000000000");
  const signatureKey = CryptoJS.AES.encrypt(
    textForEncrypt,
    CryptoJS.enc.Utf8.parse(secretKey),
    {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  ).toString();
  return signatureKey;
};

export default {
  BASE_URL,
  today,
  createCodeBooking,
  getThreeMonthsFromToday,
  formatInputDateFromDB,
  differenceInDays,
  formatRupiah,
  formatDate,
  formatInputDate,
  convertRouteToTitle,
  exportStatusPesanTempatToTitle,
  generateRandomId,
  checkUrlAccessible,
  htmlToText,
  htmlToTextWithTags,
  getCurrentTimeStampForHeader,
};
