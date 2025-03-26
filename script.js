document.addEventListener("DOMContentLoaded", function () {
    const playerIDInput = document.getElementById("playerID");

    // Function to generate a random Player ID in the format #### #### ####
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
    
    // Password validation UI
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const passwordRequirements = document.getElementById("password-requirements");
    const passwordMatchMsg = document.getElementById("password-match-msg");

    // Password requirement elements
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

        // Hide password requirements if all are met
        if (lengthValid && uppercaseValid && lowercaseValid && numberValid && specialValid) {
            passwordRequirements.style.display = "none";
        } else {
            passwordRequirements.style.display = "block";
        }
    }

    // Show password requirements only when typing
    passwordInput.addEventListener("input", checkPasswordRequirements);

    // Password match validation
    confirmPasswordInput.addEventListener("input", function () {
        if (confirmPasswordInput.value === passwordInput.value && confirmPasswordInput.value !== "") {
            passwordMatchMsg.style.color = "green";
            passwordMatchMsg.innerHTML = "✅ Passwords match!";
            setTimeout(() => { passwordMatchMsg.style.display = "none"; }, 1000); // Hide after 1 sec
        } else {
            passwordMatchMsg.style.color = "red";
            passwordMatchMsg.innerHTML = "❌ Passwords do not match!";
            passwordMatchMsg.style.display = "block";
        }
    });

    // Form submission event
    document.getElementById("registration-form").addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();
        const ign = document.getElementById("ign").value.trim();

        // Email validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Password validation
        const passwordIsValid = password.length >= 8 &&
                                /[A-Z]/.test(password) &&
                                /[a-z]/.test(password) &&
                                /\d/.test(password) &&
                                /[@$!%*?&]/.test(password);

        if (!passwordIsValid) {
            alert("Password does not meet the requirements.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        // IGN validation
        if (ign === "") {
            alert("Please enter your In-Game Name (IGN).");
            return;
        }

        // Store user data in local storage
        const userData = {
            email: email,
            password: password, // In real-world apps, never store passwords in plain text
            playerID: playerIDInput.value,
            ign: ign
        };

        localStorage.setItem("user", JSON.stringify(userData));
        alert("Registration successful!");
    });
});
