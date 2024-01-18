function toggleLogin() {
    var loginButton = document.querySelector('.loginButton');

    loginButton.textContent = (loginButton.textContent === 'Login') ? 'Log out' : 'Login';

    if (loginButton.textContent === 'Log out') {
        window.location.href = "/Home/Login";
    }
    else {
        window.location.href = "/Home/Logout";
    }
}

function toggleSignup() {
    var signupButton = document.querySelector('.signupButton');

    if (signupButton.textContent === 'Signup') {
        window.location.href = "/Home/Signup";
        signupButton.style.display = 'none';
    }
}

document.getElementById('location').addEventListener('change', updateImage);
document.getElementById('destination').addEventListener('change', updateImage);

function updateImage() {
    var location = document.getElementById('location').value;
    var destination = document.getElementById('destination').value;

    if (location && destination && location !== destination) {
        var sortedValues = [location, destination].sort();

        var imageSrc = `/pictures/${sortedValues[0]}-${sortedValues[1]}.jpg`;

        document.querySelector('.image-container img').src = imageSrc;
    }

    var locationOptions = document.getElementById('location').options;
    var destinationOptions = document.getElementById('destination').options;

    for (var i = 0; i < locationOptions.length; i++) {
        if (locationOptions[i].value === destination) {
            locationOptions[i].style.display = 'none';
        } else {
            locationOptions[i].style.display = 'block';
        }
    }

    for (var j = 0; j < destinationOptions.length; j++) {
        if (destinationOptions[j].value === location) {
            destinationOptions[j].style.display = 'none';
        } else {
            destinationOptions[j].style.display = 'block';
        }
    }
}