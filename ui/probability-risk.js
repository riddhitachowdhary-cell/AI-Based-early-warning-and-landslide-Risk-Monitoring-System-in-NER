/* =========================================================
   LANDSAFE CONNECT
   PROBABILITY RISK PAGE
   JAVASCRIPT
========================================================= */


/* =========================================================
   DEMO DATA
========================================================= */

const probabilityData = {

    location: "Guwahati, Assam",

    overall: 78,

    landslide: 82,

    flood: 58,

    factors: {

        rainfall: 72,

        soil: 84,

        terrain: 61,

        water: 55

    },

    trend: {

        labels: [
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sun"
        ],

        values: [
            42,
            48,
            51,
            57,
            64,
            71,
            78
        ]

    }

};


/* =========================================================
   GET ELEMENT
========================================================= */

function getElement(id) {

    return document.getElementById(id);

}


/* =========================================================
   RISK LEVEL
========================================================= */

function getRiskLevel(value) {

    if (value >= 81) {

        return {
            label: "Critical",
            badge: "bg-dark"
        };

    }

    if (value >= 61) {

        return {
            label: "High",
            badge: "bg-danger"
        };

    }

    if (value >= 31) {

        return {
            label: "Moderate",
            badge: "bg-warning text-dark"
        };

    }

    return {
        label: "Low",
        badge: "bg-success"
    };

}


/* =========================================================
   UPDATE TEXT
========================================================= */

function updateText(id, value) {

    const element = getElement(id);

    if (!element) {
        return;
    }

    element.textContent = value;

}


/* =========================================================
   UPDATE PROGRESS BAR
========================================================= */

function updateProgress(id, value) {

    const element = getElement(id);

    if (!element) {
        return;
    }

    element.style.width = `${value}%`;

    element.setAttribute(
        "aria-valuenow",
        value
    );

}


/* =========================================================
   UPDATE RISK STATUS
========================================================= */

function updateRiskStatus(
    id,
    value,
    includeRiskText = false
) {

    const element = getElement(id);

    if (!element) {
        return;
    }

    const risk = getRiskLevel(value);

    element.textContent =
        includeRiskText
            ? `${risk.label.toUpperCase()} RISK`
            : risk.label;

    if (includeRiskText) {

        element.className =
            `badge rounded-pill px-3 py-2 mb-2 ${risk.badge}`;

    } else {

        element.className =
            `badge ${risk.badge}`;

    }

}


/* =========================================================
   UPDATE OVERALL PROBABILITY
========================================================= */

function updateOverallRisk() {

    const value =
        probabilityData.overall;

    updateText(
        "overallProbability",
        `${value}%`
    );

    updateProgress(
        "overallProgress",
        value
    );

    updateRiskStatus(
        "overallStatus",
        value,
        true
    );

}


/* =========================================================
   UPDATE LANDSLIDE
========================================================= */

function updateLandslideRisk() {

    const value =
        probabilityData.landslide;

    updateText(
        "landslideProbability",
        `${value}%`
    );

    updateProgress(
        "landslideProgress",
        value
    );

    updateRiskStatus(
        "landslideStatus",
        value
    );

}


/* =========================================================
   UPDATE FLOOD
========================================================= */

function updateFloodRisk() {

    const value =
        probabilityData.flood;

    updateText(
        "floodProbability",
        `${value}%`
    );

    updateProgress(
        "floodProgress",
        value
    );

    updateRiskStatus(
        "floodStatus",
        value
    );

}


/* =========================================================
   UPDATE RISK FACTORS
========================================================= */

function updateRiskFactors() {

    const factors =
        probabilityData.factors;


    /* Rainfall */

    updateText(
        "rainfallValue",
        `${factors.rainfall}%`
    );

    updateProgress(
        "rainfallProgress",
        factors.rainfall
    );


    /* Soil */

    updateText(
        "soilValue",
        `${factors.soil}%`
    );

    updateProgress(
        "soilProgress",
        factors.soil
    );


    /* Terrain */

    updateText(
        "terrainValue",
        `${factors.terrain}%`
    );

    updateProgress(
        "terrainProgress",
        factors.terrain
    );


    /* Water */

    updateText(
        "waterValue",
        `${factors.water}%`
    );

    updateProgress(
        "waterProgress",
        factors.water
    );

}


/* =========================================================
   UPDATE LOCATION
========================================================= */

function updateLocation() {

    updateText(
        "locationName",
        probabilityData.location
    );

}


/* =========================================================
   CREATE PROBABILITY CHART
========================================================= */

function createProbabilityChart() {

    const canvas =
        getElement("probabilityChart");

    if (!canvas) {
        return;
    }


    new Chart(
        canvas,
        {

            type: "line",

            data: {

                labels:
                    probabilityData.trend.labels,

                datasets: [

                    {

                        label:
                            "Risk Probability",

                        data:
                            probabilityData.trend.values,

                        tension: 0.35,

                        fill: true,

                        pointRadius: 3,

                        pointHoverRadius: 5

                    }

                ]

            },


            options: {

                responsive: true,

                maintainAspectRatio: true,

                aspectRatio: 2.5,


                plugins: {

                    legend: {

                        display: false

                    },

                    tooltip: {

                        callbacks: {

                            label:
                                function(context) {

                                    return `Risk Probability: ${context.raw}%`;

                                }

                        }

                    }

                },


                scales: {

                    y: {

                        beginAtZero: true,

                        max: 100,

                        ticks: {

                            callback:
                                function(value) {

                                    return `${value}%`;

                                }

                        }

                    },


                    x: {

                        grid: {

                            display: false

                        }

                    }

                }

            }

        }
    );

}


/* =========================================================
   NOTIFICATION
========================================================= */

function setupNotifications() {

    const button =
        getElement("notificationButton");

    if (!button) {
        return;
    }


    button.addEventListener(
        "click",
        function() {

            alert(
                "You have 3 demo alerts. Live notifications will be connected after backend integration."
            );

        }
    );

}


/* =========================================================
   INITIALIZE PAGE
========================================================= */

function initializeProbabilityPage() {

    updateLocation();

    updateOverallRisk();

    updateLandslideRisk();

    updateFloodRisk();

    updateRiskFactors();

    createProbabilityChart();

    setupNotifications();

}


/* =========================================================
   START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeProbabilityPage
);