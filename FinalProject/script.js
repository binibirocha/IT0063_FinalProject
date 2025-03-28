document.addEventListener("DOMContentLoaded", function () {
    const playerIDInput = document.getElementById("playerID");
    const emailInput = document.getElementById("email");
    const ignInput = document.getElementById("ign");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const passwordRequirements = document.getElementById("password-requirements");
    const passwordMatchMsg = document.getElementById("password-match-msg");
    const registerButton = document.querySelector("button[type='submit']"); // Fixed reference to the button

    function generatePlayerID() {
        return (
            Math.floor(1000 + Math.random() * 9000) + " " +
            Math.floor(1000 + Math.random() * 9000) + " " +
            Math.floor(1000 + Math.random() * 9000)
        );
    }

    if (playerIDInput) {
        playerIDInput.value = generatePlayerID();
    } else {
        console.error("Player ID input field not found!");
    }

    function togglePassword(inputID, iconID) {
        let input = document.getElementById(inputID);
        let icon = document.getElementById(iconID);

        if (input.type === "password") {
            input.type = "text";
            icon.classList.remove("fa-eye");
            icon.classList.add("fa-eye-slash");
        } else {
            input.type = "password";
            icon.classList.remove("fa-eye-slash");
            icon.classList.add("fa-eye");
        }
    }

    window.togglePassword = togglePassword;

    const reqLength = document.getElementById("req-length");
    const reqUppercase = document.getElementById("req-uppercase");
    const reqLowercase = document.getElementById("req-lowercase");
    const reqNumber = document.getElementById("req-number");
    const reqSpecial = document.getElementById("req-special");

    function checkPasswordRequirements() {
        const password = passwordInput.value;

        const lengthValid = password.length >= 8;
        const uppercaseValid = /[A-Z]/.test(password);
        const lowercaseValid = /[a-z]/.test(password);
        const numberValid = /\d/.test(password);
        const specialValid = /[@$!%*?&]/.test(password);

        reqLength.classList.toggle("valid", lengthValid);
        reqLength.innerHTML = lengthValid ? "✅ At least 8 characters" : "❌ At least 8 characters";

        reqUppercase.classList.toggle("valid", uppercaseValid);
        reqUppercase.innerHTML = uppercaseValid ? "✅ At least one uppercase letter" : "❌ At least one uppercase letter";

        reqLowercase.classList.toggle("valid", lowercaseValid);
        reqLowercase.innerHTML = lowercaseValid ? "✅ At least one lowercase letter" : "❌ At least one lowercase letter";

        reqNumber.classList.toggle("valid", numberValid);
        reqNumber.innerHTML = numberValid ? "✅ At least one number" : "❌ At least one number";

        reqSpecial.classList.toggle("valid", specialValid);
        reqSpecial.innerHTML = specialValid ? "✅ At least one special character (@, #, $, etc.)" : "❌ At least one special character (@, #, $, etc.)";

        // 🔹 Hide password requirements if all conditions are met
        passwordRequirements.style.display = (lengthValid && uppercaseValid && lowercaseValid && numberValid && specialValid) ? "none" : "block";

        validateForm(); // 🔹 Check if the form is valid
    }

    passwordInput.addEventListener("input", checkPasswordRequirements);

    confirmPasswordInput.addEventListener("input", function () {
        if (confirmPasswordInput.value === passwordInput.value && confirmPasswordInput.value !== "") {
            passwordMatchMsg.style.color = "green";
            passwordMatchMsg.innerHTML = "✅ Passwords match!";
            passwordMatchMsg.style.display = "block";
        } else {
            passwordMatchMsg.style.color = "red";
            passwordMatchMsg.innerHTML = "❌ Passwords do not match!";
            passwordMatchMsg.style.display = "block";
        }

        validateForm(); // 🔹 Call form validation check
    });

    confirmPasswordInput.addEventListener("blur", function () {
        passwordMatchMsg.style.display = "none";
    });

    function validateForm() {
        const passwordValid = reqLength.classList.contains("valid") &&
                              reqUppercase.classList.contains("valid") &&
                              reqLowercase.classList.contains("valid") &&
                              reqNumber.classList.contains("valid") &&
                              reqSpecial.classList.contains("valid");

        const passwordsMatch = confirmPasswordInput.value === passwordInput.value && confirmPasswordInput.value !== "";

        const emailValid = emailInput.value.trim() !== "";
        const ignValid = ignInput.value.trim() !== "";

        registerButton.disabled = !(passwordValid && passwordsMatch && emailValid && ignValid); // Enable/Disable button
    }

    emailInput.addEventListener("input", validateForm);
    ignInput.addEventListener("input", validateForm);
});
