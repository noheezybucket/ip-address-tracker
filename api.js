const ipAddressInput = document.getElementById("ip-input");
const form = document.querySelector("form");

// creating the map
let lat = 14.7263;
let long = -17.48453;
const map = L.map("map").setView([lat, long], 4);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
}).addTo(map);

let marker;

// ip input
let ipAddress = "";
let domain = "";

// regx
const ipRegx =
  /(\b25[0-5]|\b2[0-4][0-9]|\b[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}/g;
const domainRegx =
  /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/g;

ipAddressInput.addEventListener("input", (e) => {
  if (ipRegx.test(e.target.value)) {
    ipAddress = e.target.value;
    error.textContent = "";
  }

  if (domainRegx.test(e.target.value)) {
    domain = e.target.value;
    error.textContent = "";
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (ipAddress === "" && domain === "") {
    error.textContent = "Invalid IP address or domain name.";
  } else {
    error.textContent = "";
    findIP();
  }

  ipAddress = "";
  domain = "";
});

const findIP = () => {
  fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_bOptt2oMUwYXfRHn4PvPyAxTBJ6Kc&ipAddress=${ipAddress}&domain=${domain}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      ip.textContent = data.ip;
      locate.textContent = `${data.location.city}, ${data.location.country}`;
      isp.textContent = data.isp;
      timezone.textContent = `UTC ${data.location.timezone}`;

      marker = L.marker([data.location.lat, data.location.lng]).addTo(map);
      marker.bindPopup(`${data.isp} - ${data.ip}`).openPopup();
    })
    .catch((err) => {
      // console.log(err);
      ip.textContent = "N/A";
      locate.textContent = "N/A";
      isp.textContent = "N/A";
      timezone.textContent = "N/A";
    });
};
