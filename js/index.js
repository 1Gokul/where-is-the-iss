// Set the current time (in UTC)
const current_time = (new Date()).toISOString().slice(11, 19).replace(/-/g, "/").replace("T", " ");
document.getElementById('time').innerHTML = current_time;

// Send a GET request for the ISS's position
fetch('https://api.wheretheiss.at/v1/satellites/25544')
    .then((response) => {
        return response.json();
    })
    .then((response) => {
        var current_latitude = response.latitude;
        var current_longitude = response.longitude;

        // initialize Leaflet
        var map = L.map('map').setView({
            lon: current_longitude,
            lat: current_latitude
        }, 3);

        // add the OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(map);

        // show the scale bar on the lower left corner
        L.control.scale().addTo(map);

        // show a marker on the map
        L.marker({
            lon: current_longitude,
            lat: current_latitude
        }, {
            icon: new L.DivIcon({
                className: '',
                html: '<img class="iss-marker" src="img/international-space-station-icon.png"/>'
            })
        }).addTo(map);

        // Update the latitude and longitude
        document.getElementById('lat').innerHTML = current_latitude;
        document.getElementById('lng').innerHTML = current_longitude;

    });