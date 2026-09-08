const sirenButton = document.getElementById("sirenButton");
const emergencySirenButton = document.getElementById("emergencySirenButton");

const sirenStatus = document.getElementById("sirenStatus");
const monitoringSirenStatus = document.getElementById("monitoringSirenStatus");


// Create audio object

const sirenAudio = new Audio("siren.mp3");

sirenAudio.loop = true;


// ===============================
// ACTIVATE / STOP SIREN
// ===============================

function toggleSiren() {

    if (sirenAudio.paused) {

        sirenAudio.play()
            .then(() => {

                updateSirenUI(true);

            })
            .catch((error) => {

                console.log("Siren could not start:", error);

                alert(
                    "The siren could not start. Please make sure siren.mp3 exists in the project folder."
                );

            });

    } else {

        sirenAudio.pause();

        sirenAudio.currentTime = 0;

        updateSirenUI(false);

    }

}


// ===============================
// UPDATE UI
// ===============================

function updateSirenUI(isActive) {

    if (isActive) {

        sirenStatus.textContent = "Siren ON";

        sirenStatus.className =
            "badge text-bg-danger fs-6 mb-2";

        sirenButton.innerHTML =
            '<i class="bi bi-volume-mute-fill me-2"></i> Stop Siren';

        emergencySirenButton.innerHTML =
            '<i class="bi bi-volume-mute-fill me-2"></i> Stop Emergency Siren';

        emergencySirenButton.className =
            "btn btn-outline-danger";

        monitoringSirenStatus.textContent = "ON";

        monitoringSirenStatus.className =
            "badge text-bg-danger";

    } else {

        sirenStatus.textContent = "Siren OFF";

        sirenStatus.className =
            "badge text-bg-secondary fs-6 mb-2";

        sirenButton.innerHTML =
            '<i class="bi bi-volume-up-fill me-2"></i> Activate Siren';

        emergencySirenButton.innerHTML =
            '<i class="bi bi-megaphone-fill me-2"></i> Play Emergency Siren';

        emergencySirenButton.className =
            "btn btn-danger";

        monitoringSirenStatus.textContent = "OFF";

        monitoringSirenStatus.className =
            "badge text-bg-secondary";

    }

}


// ===============================
// BUTTON EVENTS
// ===============================

sirenButton.addEventListener("click", toggleSiren);

emergencySirenButton.addEventListener("click", toggleSiren);


// ===============================
// STOP SIREN WHEN PAGE CLOSES
// ===============================

window.addEventListener("beforeunload", () => {

    sirenAudio.pause();

    sirenAudio.currentTime = 0;

});