// Configuration et initialisation de la carte
const map = L.map("map").setView([44.8378, -0.5792], 9);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
}).addTo(map);

// Base de données des vignobles
const locations = [
    {
        name: "La Cité du Vin",
        type: "cave",
        address: "134 Quai de la Garonne, 33300 Bordeaux",
        description: "Musée et centre d'interprétation entièrement dédié au vin",
        lat: 44.8641,
        lng: -0.5593,
        website: "https://www.laciteduvin.com/",
        specialty: "Musée viticole interactif"
    },
    {
        name: "Château Lafite Rothschild",
        type: "chateau",
        address: "Pauillac, Médoc",
        description: "L'un des plus prestigieux châteaux du vignoble bordelais, Premier Cru Classé",
        lat: 45.1933,
        lng: -0.7486,
        website: "https://www.lafite.com/",
        specialty: "Vin rouge de prestige"
    },
    {
        name: "Château Margaux",
        type: "chateau",
        address: "Margaux, Médoc",
        description: "Premier Grand Cru Classé, symbole de l'excellence bordelaise",
        lat: 44.9497,
        lng: -0.6573,
        website: "https://www.chateau-margaux.com/",
        specialty: "Grand Cru Classé"
    },
    {
        name: "Château Pétrus",
        type: "chateau",
        address: "Pomerol",
        description: "Vignoble légendaire produisant l'un des vins les plus recherchés au monde",
        lat: 44.9125,
        lng: -0.1392,
        website: "https://www.chateau-petrus.com/",
        specialty: "Vin rouge d'exception"
    }
];

// Fonction pour générer les marqueurs
function createMarkers() {
    locations.forEach(location => {
        const markerColor = location.type === "cave" ? "#2563eb" : "#dc2626";
        const customIcon = L.divIcon({
            className: `custom-div-icon ${location.type}-icon`,
            html: `<div style="background-color: ${markerColor}; width: 20px; height: 20px; border-radius: 50%;"></div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });

        const marker = L.marker([location.lat, location.lng], { icon: customIcon }).addTo(map);
        marker.bindPopup(`
            <div class="p-2">
                <h3 class="font-bold text-lg ${location.type === "cave" ? "text-blue-800" : "text-red-800"}">${location.name}</h3>
                <p class="text-sm">${location.address}</p>
                <p class="text-sm italic">${location.description}</p>
            </div>
        `);
    });
}

// Fonction pour générer la liste des lieux
function generateLocationList() {
    const locationList = document.getElementById('location-list');
    locationList.innerHTML = locations.map(location => `
        <div class="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all cursor-pointer group"
             data-lat="${location.lat}" 
             data-lng="${location.lng}" 
             data-address="${location.address}"
             data-website="${location.website}">
            <h2 class="text-2xl font-semibold ${location.type === 'cave' ? 'text-blue-800' : 'text-red-800'} mb-3">
                ${location.name}
            </h2>
            <p class="text-gray-600 mb-2">${location.address}</p>
            <p class="text-sm text-gray-500">${location.description}</p>
            <span class="text-sm font-semibold text-green-700 mt-2">
                Spécialité : ${location.specialty}
            </span>
        </div>
    `).join('');
}

// Fonction pour afficher tous les lieux
function showAllLocations() {
    const latlngs = locations.map(loc => [loc.lat, loc.lng]);
    const bounds = L.latLngBounds(latlngs);
    map.fitBounds(bounds, { padding: [50, 50] });
}

// Gestion des événements
document.addEventListener('DOMContentLoaded', () => {
    createMarkers();
    generateLocationList();

    const showAllButton = document.getElementById('show-all');
    showAllButton.addEventListener('click', showAllLocations);

    document.getElementById('location-list').addEventListener('click', (e) => {
        const locationElement = e.target.closest('[data-lat][data-lng]');
        if (locationElement) {
            const lat = parseFloat(locationElement.getAttribute('data-lat'));
            const lng = parseFloat(locationElement.getAttribute('data-lng'));
            const name = locationElement.querySelector('h2').textContent;
            const address = locationElement.getAttribute('data-address');
            const description = locationElement.querySelector('p.text-sm.text-gray-500').textContent;
            const website = locationElement.getAttribute('data-website');

            map.setView([lat, lng], 12);

            document.getElementById('modal-title').textContent = name;
            document.getElementById('modal-address').textContent = address;
            document.getElementById('modal-description').textContent = description;
            document.getElementById('modal-website').setAttribute('href', website);
            document.getElementById('detail-modal').classList.remove('hidden');
        }
    });

    document.getElementById('modal-close').addEventListener('click', () => {
        document.getElementById('detail-modal').classList.add('hidden');
    });
});