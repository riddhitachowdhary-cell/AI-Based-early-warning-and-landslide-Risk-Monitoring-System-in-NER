// =========================================
// LANDSAFE CONNECT
// SYSTEM SETTINGS
// Demo Frontend Logic
// =========================================

const defaultSettings = {
    riskAlerts: "enabled",
    highRiskNotification: "enabled",
    criticalRiskNotification: "enabled",
    refreshInterval: "10",

    emergencyRequests: "enabled",
    teamAssignment: "enabled",
    emergencyHelpline: "112",
    gpsSupport: "enabled",

    userReports: "enabled",
    adminVerification: "enabled",
    imageUploads: "enabled",
    descriptionLength: "500",

    offlineMode: "enabled",
    offlineQueue: "enabled"
};


// =========================================
// GET ELEMENT
// =========================================

function getElement(id) {
    return document.getElementById(id);
}


// =========================================
// LOAD SETTINGS
// =========================================

function loadSettings() {

    const savedSettings = localStorage.getItem("landsafe_system_settings");

    if (!savedSettings) {
        applySettings(defaultSettings);
        return;
    }

    try {

        const settings = JSON.parse(savedSettings);

        applySettings({
            ...defaultSettings,
            ...settings
        });

    } catch (error) {

        console.error("Unable to load settings:", error);

        applySettings(defaultSettings);
    }
}


// =========================================
// APPLY SETTINGS
// =========================================

function applySettings(settings) {

    Object.keys(settings).forEach(function (key) {

        const element = getElement(key);

        if (!element) {
            return;
        }

        element.value = settings[key];
    });
}


// =========================================
// COLLECT SETTINGS
// =========================================

function collectSettings() {

    const settings = {};

    Object.keys(defaultSettings).forEach(function (key) {

        const element = getElement(key);

        if (!element) {
            return;
        }

        settings[key] = element.value;
    });

    return settings;
}


// =========================================
// SAVE SETTINGS
// =========================================

function saveSettings() {

    const settings = collectSettings();

    localStorage.setItem(
        "landsafe_system_settings",
        JSON.stringify(settings)
    );

    showMessage(
        "success",
        "System settings saved successfully in demo mode."
    );
}


// =========================================
// RESET SETTINGS
// =========================================

function resetSettings() {

    const confirmed = window.confirm(
        "Reset all system settings to their default values?"
    );

    if (!confirmed) {
        return;
    }

    applySettings(defaultSettings);

    localStorage.removeItem("landsafe_system_settings");

    showMessage(
        "info",
        "System settings have been reset."
    );
}


// =========================================
// SHOW MESSAGE
// =========================================

function showMessage(type, message) {

    const messageBox = getElement("settingsMessage");

    if (!messageBox) {
        return;
    }

    messageBox.className = `alert alert-${type} mt-3 mb-0`;

    messageBox.textContent = message;

    setTimeout(function () {

        messageBox.classList.add("d-none");

    }, 3000);
}


// =========================================
// SAVE BUTTON
// =========================================

function setupButtons() {

    const saveButton = getElement("saveSettingsBtn");

    const resetButton = getElement("resetSettingsBtn");


    if (saveButton) {

        saveButton.addEventListener("click", function () {

            saveSettings();

        });

    }


    if (resetButton) {

        resetButton.addEventListener("click", function () {

            resetSettings();

        });

    }
}


// =========================================
// INITIALIZE
// =========================================

function initializeSystemSettings() {

    loadSettings();

    setupButtons();

}


// =========================================
// PAGE LOAD
// =========================================

document.addEventListener(
    "DOMContentLoaded",
    initializeSystemSettings
);