export function calcMinutesLeft(deliveryTimeStr) {
  const deliveryTime = new Date(deliveryTimeStr);
  const now = new Date();

  const diffMs = deliveryTime - now;

  const minutesLeft = Math.floor(diffMs / (1000 * 60));

  return minutesLeft;
}

export function formatDate(dateString) {
  const date = new Date(dateString);

  const month = date.toLocaleString("default", { month: "short" });

  const day = date.getDate();

  let hours = date.getHours();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const time = ` ${hours > 9 ? hours : `0${hours}`}.${minutes} ${ampm}`;

  return `${month} ${day} ,${time}}`;
}
export function formatCurrency(price) {
  return ` ${parseFloat(price)}$`;
}
