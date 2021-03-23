// Set the current time (in UTC)
const current_time = new Date()
    .toISOString()
    .slice(11, 19)
    .replace(/-/g, "/")
    .replace("T", " ");
document.getElementById("time").innerHTML = current_time;

// Send a GET request for the ISS's position
fetch("https://api.wheretheiss.at/v1/satellites/25544")
    .then((response) => {
        return response.json();
    })
    .then((response) => {
        console.log(response);

        var current_latitude = response.latitude;
        var current_longitude = response.longitude;

        // initialize Leaflet
        var map = L.map("map").setView({
                lon: current_longitude,
                lat: current_latitude,
            },
            3
        );

        // add the OpenStreetMap tiles
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
        }).addTo(map);

        // show the scale bar on the lower left corner
        L.control.scale().addTo(map);

        // show a marker on the map
        L.marker({
            lon: current_longitude,
            lat: current_latitude,
        }, {
            icon: new L.DivIcon({
                className: "",
                html: '<img class="iss-marker" src="img/international-space-station-icon.png"/>',
            }),
        }).addTo(map);

        // Update the latitude and longitude
        document.getElementById("lat").innerHTML = current_latitude;
        document.getElementById("lng").innerHTML = current_longitude;

        var html =
            '<span class="extra-info-expander p-2" onclick="expand_details()">Detailed Information<i class="fas fa-caret-right mx-2"></i></span>' +
            '<div class="extra-info-grid my-3"><div>Timestamp:</div><div><code>' + response.timestamp +
            '</code></div><div>Altitude:</div><div><code> ' +
            response.altitude +
            ' km</code></div><div>Day Number:</div><div><code>' +
            response.daynum +
            '</code></div><div>Velocity: </div><div><code>' + response.velocity + ' kmph</code></div>' +
            '<div>Visibility:</div><div><code>' + response.visibility + '</code></div>' +
            '<div>Footprint:</div><div><code>' + response.footprint + '</code></div>' +
            '<div>Solar Latitude:</div><div><code>' + response.solar_lat + '</code></div>' +
            '<div>Solar Latitude:</div><div><code>' + response.solar_lon + '</code></div></div>';
        document.getElementById("extra-info").innerHTML = html;
        document.getElementsByClassName("extra-info-grid")[0].classList.add("collapsed");

    });

function expand_details() {
    document.getElementsByClassName("extra-info-grid")[0].classList.toggle("expanded");
    document.getElementsByTagName("i")[0].classList.toggle("fa-caret-right");
    document.getElementsByTagName("i")[0].classList.toggle("fa-caret-down");
}