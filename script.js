// Initialize Map
let map;
let userMarker;
let markers = [];

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 12.9716, lng: 77.5946 }, // Default to Bangalore
        zoom: 12,
    });

    // Get User Location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let userPos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                map.setCenter(userPos);

                userMarker = new google.maps.Marker({
                    position: userPos,
                    map: map,
                    icon: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                });

                fetchRecommendations(userPos.lat, userPos.lng);
            },
            () => {
                console.log("Geolocation failed.");
            }
        );
    }
}

// Fetch Shop Recommendations
function fetchRecommendations(lat, lng) {
    let recommendations = [
        { name: "Mega Mall", lat: lat + 0.01, lng: lng + 0.01, rating: 4.5, category: "Shopping" },
        { name: "Best Cafe", lat: lat - 0.01, lng: lng - 0.01, rating: 4.2, category: "Food" },
        { name: "Pharmacy Hub", lat: lat + 0.02, lng: lng - 0.02, rating: 4.8, category: "Medicine" },
        { name: "Grand Theater", lat: lat - 0.02, lng: lng + 0.02, rating: 4.6, category: "Theater" },
    ];

    displayRecommendations(recommendations);
}

// Display Recommendations on Map
function displayRecommendations(shops) {
    clearMarkers();

    let listContainer = document.getElementById("recommendation-list");
    listContainer.innerHTML = "";

    shops.forEach((shop, index) => {
        let marker = new google.maps.Marker({
            position: { lat: shop.lat, lng: shop.lng },
            map: map,
            title: shop.name,
        });
        markers.push(marker);

        let listItem = document.createElement("li");
        listItem.className = "list-group-item";
        listItem.innerHTML = `<strong>${shop.name}</strong> - ${shop.category} (⭐ ${shop.rating})`;
        listItem.onclick = () => map.setCenter({ lat: shop.lat, lng: shop.lng });
        listContainer.appendChild(listItem);
    });
}

// Clear Markers
function clearMarkers() {
    markers.forEach(marker => marker.setMap(null));
    markers = [];
}

// Toggle Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

// Event Listeners
document.getElementById("dark-mode-btn").addEventListener("click", toggleDarkMode);

// Load Map on Window Load
window.onload = initMap;
