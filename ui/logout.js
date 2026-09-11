document.addEventListener("DOMContentLoaded", function () {

    const logoutButtons = document.querySelectorAll(".logout-btn");

    logoutButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            event.preventDefault();

            const confirmLogout = confirm(
                "Are you sure you want to logout?"
            );

            if (!confirmLogout) {
                return;
            }

            // Remove login information
            localStorage.removeItem("landsafe_logged_in");
            localStorage.removeItem("landsafe_account_type");
            localStorage.removeItem("landsafe_user_email");

            // Go back to login page
            window.location.href = "login.html";

        });

    });

});