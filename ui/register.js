document.addEventListener("DOMContentLoaded", function () {

    const registerBtn =
        document.getElementById("registerBtn");


    registerBtn.addEventListener("click", function () {

        const fullName =
            document.getElementById("fullName").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const password =
            document.getElementById("password").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        const terms =
            document.getElementById("terms").checked;

        const accountType =
            document.querySelector(
                'input[name="accountType"]:checked'
            ).value;


        // Validation

        if (
            fullName === "" ||
            email === "" ||
            phone === "" ||
            password === "" ||
            confirmPassword === ""
        ) {

            alert("Please fill in all required fields.");

            return;
        }


        if (password.length < 6) {

            alert("Password must contain at least 6 characters.");

            return;
        }


        if (password !== confirmPassword) {

            alert("Passwords do not match.");

            return;
        }


        if (!terms) {

            alert("Please accept the terms and privacy policy.");

            return;
        }


        /*
            FRONTEND DEMO REGISTRATION

            Real account creation will be connected
            with Flask + database later.
        */

        const account = {

            fullName: fullName,
            email: email,
            phone: phone,
            accountType: accountType

        };


        localStorage.setItem(
            "landsafe_registered_account",
            JSON.stringify(account)
        );


        alert(
            "Account created successfully as " +
            accountType.toUpperCase() +
            "."
        );


        window.location.href = "login.html";

    });

});