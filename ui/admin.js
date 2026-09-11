const adminDashboardData = {
    highRiskLocations: 12,
    openReports: 27,
    activeAlerts: 6,
    emergencyRequests: 4,

    overallRisk: 68,
    landslideRisk: 72,
    floodRisk: 54,

    rainfall: 72,
    soil: 84,
    slope: 61,
    water: 55
};


function setText(id, value) {

    const element = document.getElementById(id);

    if (element) {
        element.textContent = value;
    }

}


function setProgress(id, value) {

    const element = document.getElementById(id);

    if (!element) {
        return;
    }

    element.style.width = `${value}%`;

    element.setAttribute("aria-valuenow", value);

}


function loadDashboardData() {

    setText(
        "highRiskLocations",
        adminDashboardData.highRiskLocations
    );

    setText(
        "openReports",
        adminDashboardData.openReports
    );

    setText(
        "activeAlerts",
        adminDashboardData.activeAlerts
    );

    setText(
        "emergencyRequests",
        adminDashboardData.emergencyRequests
    );


    setText(
        "overallRisk",
        adminDashboardData.overallRisk
    );

    setText(
        "landslideRisk",
        `${adminDashboardData.landslideRisk}%`
    );

    setText(
        "floodRisk",
        `${adminDashboardData.floodRisk}%`
    );


    setProgress(
        "overallRiskBar",
        adminDashboardData.overallRisk
    );

    setProgress(
        "rainfallBar",
        adminDashboardData.rainfall
    );

    setProgress(
        "soilBar",
        adminDashboardData.soil
    );

    setProgress(
        "slopeBar",
        adminDashboardData.slope
    );

    setProgress(
        "waterBar",
        adminDashboardData.water
    );

}


function setupOnlineStatus() {

    window.addEventListener("online", () => {

        console.log("LandSafe system is online.");

    });


    window.addEventListener("offline", () => {

        console.log("LandSafe system is offline.");

    });

}


document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadDashboardData();

        setupOnlineStatus();

    }
);