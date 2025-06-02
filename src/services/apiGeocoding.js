export function getPosition() {
  return new Promise((resolve, rejected) =>
    navigator.geolocation.getCurrentPosition(resolve, rejected)
  );
}

export async function getAddress({ latitude, longitude }) {
  const res = await fetch(
    `https://us1.api-bdc.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
  );

  if (!res.ok) throw Error("User denied geolocation");
  const data = await res.json();

  return data;
}
