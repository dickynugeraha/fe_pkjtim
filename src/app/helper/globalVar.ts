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

export default {
  today,
  getThreeMonthsFromToday,
  rupiahFormat,
};
