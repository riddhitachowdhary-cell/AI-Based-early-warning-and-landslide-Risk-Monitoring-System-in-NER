/* =========================================================
   LANDSAFE CONNECT
   REPORT ISSUE PAGE
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const reportForm = document.getElementById("reportForm");

const locationBtn = document.getElementById("locationBtn");

const locationInput = document.getElementById("location");

const locationStatus = document.getElementById("locationStatus");

const coordinatesBox = document.getElementById("coordinatesBox");

const coordinatesText = document.getElementById("coordinatesText");

const description = document.getElementById("description");

const characterCount = document.getElementById("characterCount");

const photoInput = document.getElementById("photo");

const photoPreviewContainer =
    document.getElementById("photoPreviewContainer");

const photoPreview =
    document.getElementById("photoPreview");

const removePhoto =
    document.getElementById("removePhoto");

const successMessage =
    document.getElementById("successMessage");

const reportReference =
    document.getElementById("reportReference");



/* =========================================================
   DEMO DATA
========================================================= */

let detectedCoordinates = null;



/* =========================================================
   DESCRIPTION CHARACTER COUNTER
========================================================= */

description.addEventListener("input", function () {

    const currentLength = description.value.length;

    characterCount.textContent =
        `${currentLength} / 500`;

});



/* =========================================================
   CURRENT LOCATION
========================================================= */

locationBtn.addEventListener("click", function () {

    if (!navigator.geolocation) {

        locationStatus.textContent =
            "Geolocation is not supported by this browser.";

        return;

    }


    locationBtn.disabled = true;

    locationBtn.innerHTML =
        '<span class="spinner-border spinner-border-sm me-1"></span> Detecting';


    locationStatus.textContent =
        "Requesting your location permission...";


    navigator.geolocation.getCurrentPosition(

        function (position) {

            const latitude =
                position.coords.latitude.toFixed(5);

            const longitude =
                position.coords.longitude.toFixed(5);


            detectedCoordinates = {

                latitude: latitude,

                longitude: longitude

            };


            locationInput.value =
                `Current location (${latitude}, ${longitude})`;


            coordinatesText.textContent =
                `Latitude: ${latitude} | Longitude: ${longitude}`;


            coordinatesBox.classList.remove("d-none");


            locationStatus.textContent =
                "Approximate coordinates detected successfully.";


            locationBtn.disabled = false;

            locationBtn.innerHTML =
                '<i class="bi bi-check-circle me-1"></i> Detected';

        },


        function (error) {

            detectedCoordinates = null;


            locationStatus.textContent =
                getLocationErrorMessage(error);


            locationBtn.disabled = false;

            locationBtn.innerHTML =
                '<i class="bi bi-geo-alt me-1"></i> Detect';

        },

        {

            enableHighAccuracy: false,

            timeout: 10000,

            maximumAge: 300000

        }

    );

});



/* =========================================================
   LOCATION ERROR
========================================================= */

function getLocationErrorMessage(error) {

    if (!error) {

        return "Unable to detect location.";

    }


    switch (error.code) {

        case error.PERMISSION_DENIED:

            return "Location permission was denied. Please enter the location manually.";

        case error.POSITION_UNAVAILABLE:

            return "Location information is unavailable. Please enter the location manually.";

        case error.TIMEOUT:

            return "Location detection timed out. Please try again.";

        default:

            return "Unable to detect location. Please enter it manually.";

    }

}



/* =========================================================
   PHOTO PREVIEW
========================================================= */

photoInput.addEventListener("change", function () {

    const file = photoInput.files[0];


    if (!file) {

        return;

    }


    if (!file.type.startsWith("image/")) {

        alert("Please select a valid image file.");

        photoInput.value = "";

        return;

    }


    const reader = new FileReader();


    reader.onload = function (event) {

        photoPreview.src =
            event.target.result;

        photoPreviewContainer.classList.remove("d-none");

    };


    reader.readAsDataURL(file);

});



/* =========================================================
   REMOVE PHOTO
========================================================= */

removePhoto.addEventListener("click", function () {

    photoInput.value = "";

    photoPreview.src = "";

    photoPreviewContainer.classList.add("d-none");

});



/* =========================================================
   FORM SUBMISSION
========================================================= */

reportForm.addEventListener("submit", function (event) {

    event.preventDefault();


    /* Validate */

    if (!reportForm.checkValidity()) {

        event.stopPropagation();

        reportForm.classList.add("was-validated");

        return;

    }


    reportForm.classList.add("was-validated");


    /* Collect form data */

    const issueType =
        document.getElementById("issueType").value;

    const severity =
        document.getElementById("severity").value;

    const location =
        document.getElementById("location").value.trim();

    const state =
        document.getElementById("state").value;

    const city =
        document.getElementById("city").value.trim();

    const issueDescription =
        description.value.trim();

    const emergency =
        document.getElementById("emergencyCheck").checked;


    /* Create demo report ID */

    const reportId =
        "LS-" +
        new Date().getFullYear() +
        "-" +
        Math.floor(10000 + Math.random() * 90000);


    /* Demo report object */

    const reportData = {

        reportId: reportId,

        issueType: issueType,

        severity: severity,

        location: location,

        state: state,

        city: city,

        description: issueDescription,

        emergency: emergency,

        coordinates: detectedCoordinates,

        createdAt: new Date().toISOString()

    };


    console.log(
        "LandSafe Demo Report:",
        reportData
    );


    /* Show success message */

    reportReference.textContent =
        `Report ID: ${reportId}`;


    successMessage.classList.remove("d-none");


    /* Scroll to success message */

    successMessage.scrollIntoView({

        behavior: "smooth",

        block: "center"

    });


    /* Change submit button */

    const submitButton =
        document.getElementById("submitReport");


    submitButton.disabled = true;

    submitButton.innerHTML =
        '<i class="bi bi-check-circle me-2"></i> Report Submitted';


    /* Demo delay */

    setTimeout(function () {

        submitButton.disabled = false;

        submitButton.innerHTML =
            '<i class="bi bi-send me-2"></i> Submit Report';

    }, 2500);

});



/* =========================================================
   CLEAR FORM
========================================================= */

document
    .getElementById("clearForm")
    .addEventListener("click", function () {

        setTimeout(function () {

            reportForm.classList.remove("was-validated");


            successMessage.classList.add("d-none");


            characterCount.textContent =
                "0 / 500";


            detectedCoordinates = null;


            coordinatesBox.classList.add("d-none");


            coordinatesText.textContent =
                "Coordinates detected.";


            locationStatus.textContent =
                "Allow location access to attach approximate coordinates.";


            locationBtn.disabled = false;

            locationBtn.innerHTML =
                '<i class="bi bi-geo-alt me-1"></i> Detect';


            photoPreview.src = "";

            photoPreviewContainer.classList.add("d-none");

        }, 50);

    });