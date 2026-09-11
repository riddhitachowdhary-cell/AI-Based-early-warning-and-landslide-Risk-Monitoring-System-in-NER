document.addEventListener("DOMContentLoaded", function () {

    const loginBtn = document.getElementById("loginBtn");
    const passwordInput = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");


    // Show / Hide Password

    togglePassword.addEventListener("click", function () {

        if (passwordInput.type === "password") {

            passwordInput.type = "text";

            togglePassword.innerHTML =
                '<i class="bi bi-eye-slash"></i>';

        } else {

            passwordInput.type = "password";

            togglePassword.innerHTML =
                '<i class="bi bi-eye"></i>';
        }

    });


    // Login

    loginBtn.addEventListener("click", function () {

        const email =
            document.getElementById("email").value.trim();

        const password =
            passwordInput.value.trim();

        const accountType =
            document.querySelector(
                'input[name="accountType"]:checked'
            ).value;


        if (email === "" || password === "") {

            alert("Please enter email and password.");

            return;
        }


        /*
            FRONTEND DEMO LOGIN

            Backend authentication will be connected later
            using Flask.
        */

        localStorage.setItem(
            "landsafe_account_type",
            accountType
        );

        localStorage.setItem(
            "landsafe_logged_in",
            "true"
        );

        localStorage.setItem(
            "landsafe_user_email",
            email
        );


        if (accountType === "admin") {

            window.location.href = "admin.html";

        } else {

            window.location.href = "index.html";

        }

    });

});