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

// Login form submission (for now, just prevents default behavior)
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Login functionality coming soon!"); // Replace with actual login logic later
});
