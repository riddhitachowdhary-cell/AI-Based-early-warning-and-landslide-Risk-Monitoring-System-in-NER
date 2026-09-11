/* =========================================================
   LANDSAFE CONNECT
   RISK ALERT PAGE
   JAVASCRIPT
========================================================= */


/* =========================================================
   DEMO RISK DATA
========================================================= */

const riskData = {

    location: {
        name: "Guwahati, Assam",
        latitude: 26.1445,
        longitude: 91.7362
    },


    overall: 72,

    flood: 76,

    landslide: 68,


    factors: {

        rainfall: 82,

        terrain: 64,

        water: 76

    }

};


/* =========================================================
   GET ELEMENTS
========================================================= */

const overallRisk =
    document.getElementById(
        "overallRisk"
    );


const overallRiskStatus =
    document.getElementById(
        "overallRiskStatus"
    );


const floodRisk =
    document.getElementById(
        "floodRisk"
    );


const landslideRisk =
    document.getElementById(
        "landslideRisk"
    );


const floodProgress =
    document.getElementById(
        "floodProgress"
    );


const landslideProgress =
    document.getElementById(
        "landslideProgress"
    );


const rainfallProgress =
    document.getElementById(
        "rainfallProgress"
    );


const terrainProgress =
    document.getElementById(
        "terrainProgress"
    );


const waterProgress =
    document.getElementById(
        "waterProgress"
    );


const locationName =
    document.getElementById(
        "locationName"
    );


const latitude =
    document.getElementById(
        "latitude"
    );


const longitude =
    document.getElementById(
        "longitude"
    );


const rainfallStatus =
    document.getElementById(
        "rainfallStatus"
    );


const terrainStatus =
    document.getElementById(
        "terrainStatus"
    );


const waterStatus =
    document.getElementById(
        "waterStatus"
    );


const lastUpdated =
    document.getElementById(
        "lastUpdated"
    );


/* =========================================================
   RISK STATUS FUNCTION
========================================================= */

function getRiskStatus(score) {

    if (score >= 81) {

        return {
            label: "CRITICAL",
            color: "dark"
        };

    }


    if (score >= 61) {

        return {
            label: "HIGH",
            color: "warning"
        };

    }


    if (score >= 31) {

        return {
            label: "MODERATE",
            color: "warning"
        };

    }


    return {
        label: "LOW",
        color: "success"
    };

}


/* =========================================================
   FACTOR STATUS FUNCTION
========================================================= */

function getFactorStatus(value) {

    if (value >= 75) {

        return "High";

    }


    if (value >= 50) {

        return "Moderate";

    }


    return "Low";

}


/* =========================================================
   UPDATE PROGRESS BAR
========================================================= */

function updateProgress(
    element,
    value
) {

    element.style.width =
        `${value}%`;

    element.setAttribute(
        "aria-valuenow",
        value
    );

}


/* =========================================================
   UPDATE RISK DATA
========================================================= */

function updateRiskPage() {


    /* Overall */

    overallRisk.textContent =
        riskData.overall;


    const overallStatus =
        getRiskStatus(
            riskData.overall
        );


    overallRiskStatus.textContent =
        overallStatus.label;


    overallRiskStatus.className =
        `badge bg-${overallStatus.color}`;


    if (
        overallStatus.color ===
        "warning"
    ) {

        overallRiskStatus.classList.add(
            "text-dark"
        );

    }


    /* Flood */

    floodRisk.textContent =
        `${riskData.flood}%`;


    updateProgress(
        floodProgress,
        riskData.flood
    );


    /* Landslide */

    landslideRisk.textContent =
        `${riskData.landslide}%`;


    updateProgress(
        landslideProgress,
        riskData.landslide
    );


    /* Location */

    locationName.textContent =
        riskData.location.name;


    latitude.textContent =
        riskData.location.latitude;


    longitude.textContent =
        riskData.location.longitude;


    /* Factors */

    updateProgress(
        rainfallProgress,
        riskData.factors.rainfall
    );


    updateProgress(
        terrainProgress,
        riskData.factors.terrain
    );


    updateProgress(
        waterProgress,
        riskData.factors.water
    );


    rainfallStatus.textContent =
        getFactorStatus(
            riskData.factors.rainfall
        );


    terrainStatus.textContent =
        getFactorStatus(
            riskData.factors.terrain
        );


    waterStatus.textContent =
        getFactorStatus(
            riskData.factors.water
        );


    /* Last updated */

    const now =
        new Date();


    lastUpdated.textContent =
        now.toLocaleTimeString(
            [],
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );

}


/* =========================================================
   NOTIFICATION BUTTON
========================================================= */

const notificationButton =
    document.getElementById(
        "notificationButton"
    );


if (notificationButton) {

    notificationButton.addEventListener(
        "click",
        function () {

            alert(
                "You have 3 demo alerts. The notification system will be connected to live alerts later."
            );

        }
    );

}


/* =========================================================
   INITIALIZE PAGE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateRiskPage();

    }
);