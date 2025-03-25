// js/app.js

// Initialisation de la carte centrée sur Bordeaux
const map = L.map("map").setView([44.8378, -0.5792], 9);

// Ajout de la couche de tuiles OpenStreetMap
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

// Données des lieux (vignobles et châteaux)
const locations = [
  {
    name: "La Cité du Vin",
    type: "cave",
    address: "134 Quai de la Garonne, 33300 Bordeaux",
    description: "Musée et centre d'interprétation entièrement dédié au vin",
    lat: 44.8641,
    lng: -0.5593,
    website: "https://www.laciteduvin.com/",
  },
  {
    name: "Château Lafite Rothschild",
    type: "chateau",
    address: "Pauillac, Médoc",
    description:
      "L'un des plus prestigieux châteaux du vignoble bordelais, Premier Cru Classé",
    lat: 45.1933,
    lng: -0.7486,
    website: "https://www.lafite.com/",
  },
  {
    name: "Château Margaux",
    type: "chateau",
    address: "Margaux, Médoc",
    description:
      "Premier Grand Cru Classé, symbole de l'excellence bordelaise",
    lat: 44.9497,
    lng: -0.6573,
    website: "https://www.chateau-margaux.com/",
  },
  {
    name: "Château Pétrus",
    type: "chateau",
    address: "Pomerol",
    description:
      "Vignoble légendaire produisant l'un des vins les plus recherchés au monde",
    lat: 44.9125,
    lng: -0.1392,
    website: "https://www.chateau-petrus.com/",
  },
];

// Ajout des marqueurs sur la carte pour chaque lieu
locations.forEach((location) => {
  const markerColor = location.type === "cave" ? "#2563eb" : "#dc2626";
  const customIcon = L.divIcon({
    className: `custom-div-icon ${
      location.type === "cave" ? "cave-icon" : "chateau-icon"
    }`,
    html: `<div style="background-color: ${markerColor}; width: 20px; height: 20px; border-radius: 50%;"></div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });

  const marker = L.marker([location.lat, location.lng], { icon: customIcon }).addTo(map);
  marker.bindPopup(`
    <div class="p-2">
      <h3 class="font-bold text-lg ${
        location.type === "cave" ? "text-blue-800" : "text-red-800"
      }">${location.name}</h3>
      <p class="text-sm">${location.address}</p>
      <p class="text-sm italic">${location.description}</p>
    </div>
  `);
});

// Fonction pour afficher tous les lieux sur la carte
function showAllLocations() {
  // Création d'un tableau de coordonnées pour chaque lieu
  const latlngs = locations.map((loc) => [loc.lat, loc.lng]);
  // Calcul des limites englobant toutes ces coordonnées
  const bounds = L.latLngBounds(latlngs);
  // Ajuster la vue pour que toutes les localisations soient visibles
  map.fitBounds(bounds, { padding: [50, 50] });
}

// Gestion du bouton "Afficher tous" (assure-toi d'avoir un bouton avec l'ID "show-all" dans ton HTML)
const showAllButton = document.getElementById("show-all");
if (showAllButton) {
  showAllButton.addEventListener("click", showAllLocations);
}

// Gestion des interactions sur la liste pour ouvrir le modal
document.getElementById("location-list").addEventListener("click", (e) => {
  const locationElement = e.target.closest("[data-lat][data-lng]");
  if (locationElement) {
    // Récupération des données depuis les attributs data-*
    const lat = parseFloat(locationElement.getAttribute("data-lat"));
    const lng = parseFloat(locationElement.getAttribute("data-lng"));
    const name = locationElement.querySelector("h2").textContent;
    const address = locationElement.getAttribute("data-address");
    const description = locationElement.querySelector("p.text-sm.text-gray-500").textContent;
    const website = locationElement.getAttribute("data-website");

    // Centrer la carte sur le lieu sélectionné
    map.setView([lat, lng], 12);

    // Remplir le contenu du modal
    document.getElementById("modal-title").textContent = name;
    document.getElementById("modal-address").textContent = address;
    document.getElementById("modal-description").textContent = description;
    document.getElementById("modal-website").setAttribute("href", website);

    // Afficher le modal
    document.getElementById("detail-modal").classList.remove("hidden");
  }
});

// Gestion du bouton de fermeture du modal
document.getElementById("modal-close").addEventListener("click", () => {
  document.getElementById("detail-modal").classList.add("hidden");
});
