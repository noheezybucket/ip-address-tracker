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
ipAddressInput.addEventListener("input", (e) => {
  ipAddress = e.target.value;
  domain = e.target.value;
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  findIP();
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
    .catch((err) => console.log(err));
};

console.log(ipAddress, domain);
