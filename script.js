document.addEventListener("DOMContentLoaded", function () {

    // =================================
    // ELEMENT SELECTION
    // =================================

    const loginTab = document.getElementById("loginTab");
    const registerTab = document.getElementById("registerTab");

    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    // =================================
    // TAB SWITCHING
    // =================================

    function showLogin() {

        loginForm.classList.remove("hidden");
        registerForm.classList.add("hidden");

        loginTab.classList.add("active");
        registerTab.classList.remove("active");

        clearMessages();
    }

    function showRegister() {

        registerForm.classList.remove("hidden");
        loginForm.classList.add("hidden");

        registerTab.classList.add("active");
        loginTab.classList.remove("active");

        clearMessages();
    }

    loginTab.addEventListener("click", showLogin);
    registerTab.addEventListener("click", showRegister);


    // =================================
    // CLEAR ERROR MESSAGES
    // =================================

    function clearMessages() {

        document.querySelectorAll(".error-message").forEach(function (error) {
            error.textContent = "";
        });

        document.querySelectorAll(".form-message").forEach(function (message) {
            message.textContent = "";
            message.className = "form-message";
        });

        document.querySelectorAll(".input-group input").forEach(function (input) {
            input.classList.remove("invalid");
        });
    }


    // =================================
    // SHOW / HIDE PASSWORD
    // =================================

    const passwordToggles = document.querySelectorAll(".toggle-password");

    passwordToggles.forEach(function (button) {

        button.addEventListener("click", function () {

            const targetId = button.getAttribute("data-target");
            const passwordInput = document.getElementById(targetId);

            if (passwordInput.type === "password") {

                passwordInput.type = "text";
                button.textContent = "HIDE";

            } else {

                passwordInput.type = "password";
                button.textContent = "SHOW";

            }

        });

    });


    // =================================
    // PASSWORD STRENGTH
    // =================================

    const registerPassword = document.getElementById("registerPassword");

    const strengthBars = document.querySelectorAll(".strength-bars span");
    const strengthText = document.getElementById("strengthText");

    function checkPasswordStrength(password) {

        let strength = 0;

        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        return strength;
    }

    registerPassword.addEventListener("input", function () {

        const password = registerPassword.value;
        const strength = checkPasswordStrength(password);

        strengthBars.forEach(function (bar) {
            bar.style.background = "#29364a";
        });

        if (password.length === 0) {

            strengthText.textContent = "Password strength";

        } else if (strength <= 1) {

            strengthBars[0].style.background = "#ff647c";
            strengthText.textContent = "Weak password";

        } else if (strength <= 3) {

            for (let i = 0; i < strength; i++) {
                strengthBars[i].style.background = "#f5b942";
            }

            strengthText.textContent = "Medium password";

        } else {

            strengthBars.forEach(function (bar) {
                bar.style.background = "#42d99b";
            });

            strengthText.textContent = "Strong password";

        }

    });


    // =================================
    // VALIDATION HELPER
    // =================================

    function showError(inputId, errorId, message) {

        const input = document.getElementById(inputId);
        const error = document.getElementById(errorId);

        input.classList.add("invalid");
        error.textContent = message;

    }

    function clearFieldError(inputId, errorId) {

        document.getElementById(inputId).classList.remove("invalid");
        document.getElementById(errorId).textContent = "";

    }

    function validEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    }


    // =================================
    // LOGIN FORM VALIDATION
    // =================================

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        clearMessages();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;

        let valid = true;

        if (!email) {

            showError("loginEmail", "loginEmailError", "Email is required.");
            valid = false;

        } else if (!validEmail(email)) {

            showError("loginEmail", "loginEmailError", "Enter a valid email address.");
            valid = false;

        }

        if (!password) {

            showError("loginPassword", "loginPasswordError", "Password is required.");
            valid = false;

        }

        if (valid) {

            const message = document.getElementById("loginMessage");

            message.textContent = "Demo login validated successfully!";
            message.className = "form-message success";

            loginForm.reset();

        }

    });


    // =================================
    // REGISTRATION FORM VALIDATION
    // =================================

    registerForm.addEventListener("submit", function (event) {

        event.preventDefault();

        clearMessages();

        const name = document.getElementById("registerName").value.trim();
        const email = document.getElementById("registerEmail").value.trim();

        const password = registerPassword.value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        const acceptTerms = document.getElementById("acceptTerms").checked;

        let valid = true;

        // NAME VALIDATION

        if (name.length < 3) {

            showError(
                "registerName",
                "registerNameError",
                "Name must contain at least 3 characters."
            );

            valid = false;

        }

        // EMAIL VALIDATION

        if (!email) {

            showError(
                "registerEmail",
                "registerEmailError",
                "Email is required."
            );

            valid = false;

        } else if (!validEmail(email)) {

            showError(
                "registerEmail",
                "registerEmailError",
                "Enter a valid email address."
            );

            valid = false;

        }

        // PASSWORD VALIDATION

        if (password.length < 8) {

            showError(
                "registerPassword",
                "registerPasswordError",
                "Password must contain at least 8 characters."
            );

            valid = false;

        } else if (checkPasswordStrength(password) < 3) {

            showError(
                "registerPassword",
                "registerPasswordError",
                "Use uppercase, numbers and special characters."
            );

            valid = false;

        }

        // CONFIRM PASSWORD

        if (!confirmPassword) {

            showError(
                "confirmPassword",
                "confirmPasswordError",
                "Please confirm your password."
            );

            valid = false;

        } else if (password !== confirmPassword) {

            showError(
                "confirmPassword",
                "confirmPasswordError",
                "Passwords do not match."
            );

            valid = false;

        }

        // TERMS VALIDATION

        if (!acceptTerms) {

            document.getElementById("termsError").textContent =
                "Please accept the Terms and Conditions.";

            valid = false;

        }

        // SUCCESS MESSAGE

        if (valid) {

            const message = document.getElementById("registerMessage");

            message.textContent =
                "Registration form validated successfully! This is a frontend demo.";

            message.className = "form-message success";

            registerForm.reset();

            strengthBars.forEach(function (bar) {
                bar.style.background = "#29364a";
            });

            strengthText.textContent = "Password strength";

        }

    });


    // =================================
    // CLEAR FIELD ERRORS WHILE TYPING
    // =================================

    const fields = [
        ["loginEmail", "loginEmailError"],
        ["loginPassword", "loginPasswordError"],
        ["registerName", "registerNameError"],
        ["registerEmail", "registerEmailError"],
        ["registerPassword", "registerPasswordError"],
        ["confirmPassword", "confirmPasswordError"]
    ];

    fields.forEach(function (field) {

        const input = document.getElementById(field[0]);

        input.addEventListener("input", function () {
            clearFieldError(field[0], field[1]);
        });

    });

});