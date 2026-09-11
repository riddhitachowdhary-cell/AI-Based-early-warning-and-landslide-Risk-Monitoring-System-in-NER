const map = L.map("riskMap").setView(
    [26.1445, 91.7362],
    6
);


L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution: "&copy; OpenStreetMap contributors"
    }
).addTo(map);


/* =========================================================
   DEMO RISK LOCATIONS
========================================================= */

const riskLocations = [

    {
        name: "Guwahati",
        state: "Assam",
        lat: 26.1445,
        lng: 91.7362,
        risk: 78,
        hazard: "Flood",
        rainfall: "Demo: 82 mm",
        status: "High"
    },

    {
        name: "Shillong",
        state: "Meghalaya",
        lat: 25.5788,
        lng: 91.8933,
        risk: 72,
        hazard: "Landslide",
        rainfall: "Demo: 76 mm",
        status: "High"
    },

    {
        name: "Aizawl",
        state: "Mizoram",
        lat: 23.7271,
        lng: 92.7176,
        risk: 65,
        hazard: "Landslide",
        rainfall: "Demo: 68 mm",
        status: "High"
    },

    {
        name: "Gangtok",
        state: "Sikkim",
        lat: 27.3389,
        lng: 88.6065,
        risk: 55,
        hazard: "Landslide",
        rainfall: "Demo: 54 mm",
        status: "Moderate"
    },

    {
        name: "Agartala",
        state: "Tripura",
        lat: 23.8315,
        lng: 91.2868,
        risk: 48,
        hazard: "Flood",
        rainfall: "Demo: 48 mm",
        status: "Moderate"
    },

    {
        name: "Kohima",
        state: "Nagaland",
        lat: 25.6751,
        lng: 94.1086,
        risk: 35,
        hazard: "Landslide",
        rainfall: "Demo: 35 mm",
        status: "Moderate"
    },

    {
        name: "Itanagar",
        state: "Arunachal Pradesh",
        lat: 27.0844,
        lng: 93.6053,
        risk: 28,
        hazard: "Landslide",
        rainfall: "Demo: 25 mm",
        status: "Low"
    },

    {
        name: "Imphal",
        state: "Manipur",
        lat: 24.8170,
        lng: 93.9368,
        risk: 25,
        hazard: "Flood",
        rainfall: "Demo: 22 mm",
        status: "Low"
    }

];


/* =========================================================
   SHELTER DATA
========================================================= */

const shelters = [

    {
        id: "shelter1",
        name: "Guwahati Relief Shelter",
        type: "Emergency Relief Centre",
        lat: 26.1550,
        lng: 91.7500,
        capacity: 250,
        availability: "Available",
        hazardSafe: "Flood-safe elevated shelter",
        distance: "Demo: 2.4 km"
    },

    {
        id: "shelter2",
        name: "Shillong Higher Ground Shelter",
        type: "Higher Ground Shelter",
        lat: 25.5900,
        lng: 91.8800,
        capacity: 180,
        availability: "Available",
        hazardSafe: "Landslide-aware safe zone",
        distance: "Demo: 3.1 km"
    },

    {
        id: "shelter3",
        name: "Aizawl Community Relief Centre",
        type: "Relief Shelter",
        lat: 23.7350,
        lng: 92.7300,
        capacity: 150,
        availability: "Limited",
        hazardSafe: "Emergency relocation centre",
        distance: "Demo: 2.8 km"
    },

    {
        id: "shelter4",
        name: "Agartala Emergency Shelter",
        type: "Emergency Relief Centre",
        lat: 23.8400,
        lng: 91.3000,
        capacity: 220,
        availability: "Available",
        hazardSafe: "Flood evacuation shelter",
        distance: "Demo: 2.1 km"
    }

];


/* =========================================================
   RESCUE POINT DATA
========================================================= */

const rescuePoints = [

    {
        name: "Guwahati Rescue Point",
        lat: 26.1350,
        lng: 91.7250,
        service: "Emergency Rescue Team",
        status: "Demo Active"
    },

    {
        name: "Shillong Rescue Point",
        lat: 25.5700,
        lng: 91.9050,
        service: "Mountain Rescue Team",
        status: "Demo Active"
    },

    {
        name: "Aizawl Rescue Point",
        lat: 23.7150,
        lng: 92.7000,
        service: "Emergency Response Team",
        status: "Demo Active"
    }

];


/* =========================================================
   MAP LAYERS
========================================================= */

const riskLayer = L.layerGroup().addTo(map);

const shelterLayer = L.layerGroup().addTo(map);

const rescueLayer = L.layerGroup().addTo(map);


/* =========================================================
   RISK COLOR FUNCTION
========================================================= */

function getRiskColor(risk) {

    if (risk >= 81) {

        return "#212529";

    }

    if (risk >= 61) {

        return "#dc3545";

    }

    if (risk >= 31) {

        return "#ffc107";

    }

    return "#198754";
}


/* =========================================================
   RISK MARKERS
========================================================= */

riskLocations.forEach(location => {

    const color = getRiskColor(
        location.risk
    );


    const marker = L.circleMarker(

        [
            location.lat,
            location.lng
        ],

        {
            radius: 10,
            fillColor: color,
            color: "#ffffff",
            weight: 2,
            opacity: 1,
            fillOpacity: 0.85
        }

    );


    marker.bindPopup(`

        <div>

            <h6 class="fw-bold mb-2">

                ${location.name}

            </h6>


            <div>

                <strong>State:</strong>

                ${location.state}

            </div>


            <div>

                <strong>Hazard:</strong>

                ${location.hazard}

            </div>


            <div>

                <strong>Risk:</strong>

                ${location.risk}/100

            </div>


            <div>

                <strong>Status:</strong>

                ${location.status}

            </div>


            <div>

                <strong>Rainfall:</strong>

                ${location.rainfall}

            </div>


            <hr>


            <button
                class="btn btn-sm btn-danger w-100"
                onclick="showLocationDetails('${location.name}')"
            >

                View Risk Details

            </button>

        </div>

    `);


    marker.on(
        "click",
        function () {

            showLocationDetails(
                location.name
            );

        }
    );


    marker.addTo(riskLayer);

});


/* =========================================================
   SHELTER MARKERS
========================================================= */

shelters.forEach(shelter => {

    const marker = L.marker(

        [
            shelter.lat,
            shelter.lng
        ]

    );


    marker.bindPopup(`

        <div>

            <h6 class="fw-bold text-success">

                <i class="bi bi-house-check"></i>

                ${shelter.name}

            </h6>


            <div>

                <strong>Type:</strong>

                ${shelter.type}

            </div>


            <div>

                <strong>Capacity:</strong>

                ${shelter.capacity} people

            </div>


            <div>

                <strong>Status:</strong>

                ${shelter.availability}

            </div>


            <div>

                <strong>Safety:</strong>

                ${shelter.hazardSafe}

            </div>


            <div class="mt-2">

                <span class="badge text-bg-warning">

                    Demo Location

                </span>

            </div>

        </div>

    `);


    marker.addTo(shelterLayer);

});


/* =========================================================
   RESCUE MARKERS
========================================================= */

rescuePoints.forEach(point => {

    const marker = L.marker(

        [
            point.lat,
            point.lng
        ]

    );


    marker.bindPopup(`

        <div>

            <h6 class="fw-bold text-primary">

                <i class="bi bi-life-preserver"></i>

                ${point.name}

            </h6>


            <div>

                <strong>Service:</strong>

                ${point.service}

            </div>


            <div>

                <strong>Status:</strong>

                ${point.status}

            </div>


            <hr>


            <a
                href="report-issue.html"
                class="btn btn-sm btn-primary w-100"
            >

                Request Assistance

            </a>

        </div>

    `);


    marker.addTo(rescueLayer);

});


/* =========================================================
   SHELTER CARDS
========================================================= */

const shelterCards =
    document.getElementById(
        "shelterCards"
    );


const shelterSelect =
    document.getElementById(
        "shelterSelect"
    );


shelters.forEach(shelter => {


    shelterCards.innerHTML += `

        <div class="col-12 col-md-6 col-xl-3">

            <div class="card border h-100">

                <div class="card-body">


                    <div class="d-flex justify-content-between align-items-start gap-2">


                        <h6 class="fw-bold mb-2">

                            ${shelter.name}

                        </h6>


                        <span class="badge ${
                            shelter.availability === "Available"
                                ? "text-bg-success"
                                : "text-bg-warning"
                        }">

                            ${shelter.availability}

                        </span>


                    </div>


                    <div class="small text-secondary mb-2">

                        ${shelter.type}

                    </div>


                    <div class="small mb-1">

                        <i class="bi bi-people me-1"></i>

                        Capacity:
                        ${shelter.capacity}

                    </div>


                    <div class="small mb-1">

                        <i class="bi bi-signpost me-1"></i>

                        ${shelter.distance}

                    </div>


                    <div class="small mb-3">

                        <i class="bi bi-shield-check me-1"></i>

                        ${shelter.hazardSafe}

                    </div>


                    <button
                        class="btn btn-sm btn-outline-success w-100"
                        type="button"
                        onclick="focusShelter('${shelter.id}')"
                    >

                        <i class="bi bi-map me-1"></i>

                        View on Map

                    </button>


                </div>

            </div>

        </div>

    `;


    shelterSelect.innerHTML += `

        <option value="${shelter.id}">

            ${shelter.name}

        </option>

    `;

});


/* =========================================================
   SELECTED LOCATION DETAILS
========================================================= */

function showLocationDetails(name) {


    const location =
        riskLocations.find(
            item =>
                item.name === name
        );


    if (!location) {

        return;

    }


    const selected =
        document.getElementById(
            "selectedLocation"
        );


    selected.className =
        "alert alert-warning mb-0";


    selected.innerHTML = `

        <div class="row g-3">


            <div class="col-12 col-lg-7">


                <h5 class="fw-bold">

                    ${location.name}

                </h5>


                <div class="mb-1">

                    <strong>State:</strong>

                    ${location.state}

                </div>


                <div class="mb-1">

                    <strong>Primary Hazard:</strong>

                    ${location.hazard}

                </div>


                <div class="mb-1">

                    <strong>Risk Score:</strong>

                    ${location.risk}/100

                </div>


                <div>

                    <strong>Rainfall:</strong>

                    ${location.rainfall}

                </div>


            </div>


            <div class="col-12 col-lg-5">


                <div class="bg-white rounded p-3">


                    <div class="small text-secondary">

                        Current Risk Status

                    </div>


                    <h4 class="fw-bold text-danger">

                        ${location.status}

                    </h4>


                    <a
                        href="risk-alert.html"
                        class="btn btn-sm btn-danger"
                    >

                        View Risk Alert

                    </a>


                </div>


            </div>


        </div>

    `;

}


/* =========================================================
   FOCUS SHELTER
========================================================= */

function focusShelter(id) {


    const shelter =
        shelters.find(
            item =>
                item.id === id
        );


    if (!shelter) {

        return;

    }


    map.setView(

        [
            shelter.lat,
            shelter.lng
        ],

        13

    );


    document.getElementById(
        "routeResult"
    ).innerHTML = `

        <strong>

            ${shelter.name}

        </strong>

        selected as destination.


        <div class="small mt-1">

            Shelter information is currently
            demonstration data.

        </div>

    `;

}


/* =========================================================
   LAYER TOGGLE
========================================================= */

document
    .getElementById("riskToggle")
    .addEventListener(
        "click",
        function () {

            toggleLayer(
                riskLayer,
                this
            );

        }
    );


document
    .getElementById("shelterToggle")
    .addEventListener(
        "click",
        function () {

            toggleLayer(
                shelterLayer,
                this
            );

        }
    );


document
    .getElementById("rescueToggle")
    .addEventListener(
        "click",
        function () {

            toggleLayer(
                rescueLayer,
                this
            );

        }
    );


function toggleLayer(
    layer,
    button
) {


    if (map.hasLayer(layer)) {


        map.removeLayer(layer);


        button.classList.remove(
            "active"
        );


        button.classList.add(
            "opacity-50"
        );


    } else {


        layer.addTo(map);


        button.classList.add(
            "active"
        );


        button.classList.remove(
            "opacity-50"
        );

    }

}


/* =========================================================
   FIND MY LOCATION
========================================================= */

document
    .getElementById("locationButton")
    .addEventListener(
        "click",
        function () {


            if (!navigator.geolocation) {


                alert(
                    "Geolocation is not supported by your browser."
                );


                return;

            }


            const button = this;


            button.disabled = true;


            button.innerHTML = `

                <span
                    class="spinner-border spinner-border-sm me-1"
                ></span>

                Detecting...

            `;


            navigator.geolocation.getCurrentPosition(


                function (position) {


                    const lat =
                        position.coords.latitude;


                    const lng =
                        position.coords.longitude;


                    map.setView(

                        [
                            lat,
                            lng
                        ],

                        13

                    );


                    L.marker(

                        [
                            lat,
                            lng
                        ]

                    )

                    .addTo(map)

                    .bindPopup(
                        "<strong>Your Current Location</strong>"
                    )

                    .openPopup();


                    document.getElementById(
                        "currentLocation"
                    ).textContent =

                        `${lat.toFixed(4)}, ${lng.toFixed(4)}`;


                    document.getElementById(
                        "routeResult"
                    ).innerHTML = `

                        <strong>

                            Current location detected.

                        </strong>


                        <div class="small mt-1">

                            Select a shelter to preview a route.

                        </div>

                    `;


                    button.disabled = false;


                    button.innerHTML = `

                        <i class="bi bi-check-circle me-1"></i>

                        Location Found

                    `;

                },


                function () {


                    alert(
                        "Unable to access your location. Please allow location permission."
                    );


                    button.disabled = false;


                    button.innerHTML = `

                        <i class="bi bi-crosshair me-1"></i>

                        Find My Location

                    `;

                }

            );

        }
    );


/* =========================================================
   LOCATION SEARCH
========================================================= */

document
    .getElementById("searchButton")
    .addEventListener(
        "click",
        searchLocation
    );


document
    .getElementById("locationSearch")
    .addEventListener(
        "keypress",
        function (event) {


            if (event.key === "Enter") {

                searchLocation();

            }

        }
    );


function searchLocation() {


    const query =
        document
            .getElementById(
                "locationSearch"
            )
            .value
            .trim()
            .toLowerCase();


    if (!query) {


        alert(
            "Please enter a location."
        );


        return;

    }


    const location =
        riskLocations.find(

            item =>

                item.name
                    .toLowerCase()
                    .includes(query)

                ||

                item.state
                    .toLowerCase()
                    .includes(query)

        );


    if (!location) {


        alert(

            "Demo location not found. Try Guwahati, Shillong, Aizawl, Gangtok, Agartala, Kohima, Itanagar or Imphal."

        );


        return;

    }


    map.setView(

        [
            location.lat,
            location.lng
        ],

        12

    );


    showLocationDetails(
        location.name
    );

}


/* =========================================================
   ROUTE PREVIEW
========================================================= */

document
    .getElementById("routeButton")
    .addEventListener(
        "click",
        function () {


            const shelterId =
                document
                    .getElementById(
                        "shelterSelect"
                    )
                    .value;


            const result =
                document
                    .getElementById(
                        "routeResult"
                    );


            if (!shelterId) {


                result.className =
                    "alert alert-warning mt-3 mb-0";


                result.innerHTML = `

                    Please select a shelter first.

                `;


                return;

            }


            const shelter =
                shelters.find(

                    item =>
                        item.id === shelterId

                );


            result.className =
                "alert alert-info mt-3 mb-0";


            result.innerHTML = `

                <strong>

                    Recommended Route Preview

                </strong>


                <div class="mt-2">

                    Destination:

                    <strong>

                        ${shelter.name}

                    </strong>

                </div>


                <div class="small mt-2">

                    Route calculation is currently
                    a demonstration feature.

                    Actual risk-aware routing will
                    use live hazard zones, road
                    conditions, shelter availability
                    and routing APIs after backend
                    integration.

                </div>

            `;


            map.setView(

                [
                    shelter.lat,
                    shelter.lng
                ],

                13

            );

        }
    );


/* =========================================================
   INITIAL PAGE SETUP
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        document.getElementById(
            "shelterCount"
        ).textContent =
            shelters.length;


    }
);