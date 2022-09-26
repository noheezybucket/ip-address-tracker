const map = L.map("map").setView([14.7263, -17.48855], 15);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
}).addTo(map);

const marker = L.marker([14.7263, -17.48453]).addTo(map);

marker.bindPopup("Located Here").openPopup();

const popup = L.popup();

function onMapClick(e) {
  popup.setLatLng(e.latlng).setContent(e.latlng.toString()).openOn(map);
}

map.on("click", onMapClick);
