// Function to toggle password visibility
function togglePassword(passwordFieldId, iconId) {
    let passwordField = document.getElementById(passwordFieldId);
    let icon = document.getElementById(iconId);

    if (passwordField.type === "password") {
        passwordField.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    } else {
        passwordField.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const ign = document.getElementById("ign").value.trim(); // Use IGN instead of email
        const password = document.getElementById("password").value;

        // Retrieve user data using IGN from localStorage
        const userData = localStorage.getItem(ign);

        if (!userData) {
            alert("❌ Invalid username or password.");
            return;
        }

        const { email, password: storedPassword } = JSON.parse(userData);

        if (password !== storedPassword) {
            alert("❌ Invalid username or password.");
            return;
        }

        alert(`✅ Login successful! Welcome back, ${ign}.`);
        window.location.href = "dashboard.html"; // Redirect to dashboard
    });
});
