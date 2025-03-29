// Function to show custom alert with OK and Cancel options dynamically
function showAlert(message, onConfirm = null, showCancel = false) {
    const alertBox = document.getElementById("customAlert");
    const alertMessage = document.getElementById("alertMessage");
    const alertOverlay = document.getElementById("alertOverlay");
    const alertOkButton = document.getElementById("alertOkButton");
    const alertCancelButton = document.getElementById("alertCancelButton");

    alertMessage.textContent = message;
    alertBox.style.display = "block";
    alertOverlay.style.display = "block";

    // Show OK button and set its action
    alertOkButton.style.display = "inline-block";
    alertOkButton.onclick = function () {
        alertBox.style.display = "none";
        alertOverlay.style.display = "none";
        if (onConfirm) onConfirm(); // Execute confirmation function if provided
    };

    // Show or hide the Cancel button based on action type
    if (showCancel) {
        alertCancelButton.style.display = "inline-block";
        alertCancelButton.onclick = function () {
            alertBox.style.display = "none";
            alertOverlay.style.display = "none";
        };
    } else {
        alertCancelButton.style.display = "none";
    }
}

// Function to log out the user
function logout() {
    showAlert("Are you sure you want to log out?", function () {
        localStorage.removeItem("loggedIn"); // Remove login status
        localStorage.removeItem("loggedInIGN"); // Remove IGN reference
        window.location.href = "login.html"; // Redirect to login page
    }, true); // Show Cancel button
}

// Function to delete user account
function deleteAccount() {
    showAlert("⚠️ Are you sure you want to delete your account? This action cannot be undone.", function () {
        const ign = localStorage.getItem("loggedInIGN"); // Get logged-in IGN
        if (ign) {
            localStorage.removeItem(ign); // Remove user data
        }
        localStorage.removeItem("loggedIn"); // Remove login session
        localStorage.removeItem("loggedInIGN"); // Remove IGN reference

        showAlert("❌ Your account has been deleted.", function () {
            window.location.href = "login.html"; // Redirect to login page
        });
    }, true); // Show Cancel button
}

// Attach event listeners
document.addEventListener("DOMContentLoaded", function () {
    const logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
        logoutButton.addEventListener("click", logout);
    }

    const deleteAccountButton = document.getElementById("deleteAccountButton");
    if (deleteAccountButton) {
        deleteAccountButton.addEventListener("click", deleteAccount);
    }
});
