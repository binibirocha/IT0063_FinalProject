function changeAvatar() {
    alert("Feature coming soon! 🚀");
}

function changeName() {
    let newName = prompt("Enter your new Trainer Name:");
    if (newName) {
        document.querySelector(".trainer-name").textContent = newName;
    }
}
