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

function toggleBox(boxId) {
    var boxDetails = document.getElementsByClassName('box-details');

    for (var i = 0; i < boxDetails.length; i++) {
        boxDetails[i].style.display = 'none';
    }

    var clickedBox = document.getElementById(boxId);
    clickedBox.style.display = 'block';
}

window.onload = function () {
    var boxDetails = document.getElementsByClassName('box-details');
    for (var i = 0; i < boxDetails.length; i++) {
        boxDetails[i].style.display = 'none';
    }
};

function toggleBox(boxId) {
    var boxDetails = document.getElementsByClassName('box-details');

    for (var i = 0; i < boxDetails.length; i++) {
        if (boxDetails[i].id !== boxId) {
            boxDetails[i].style.display = 'none';
            boxDetails[i].parentNode.style.backgroundColor = '';
        }
    }

    var clickedBox = document.getElementById(boxId);
    if (clickedBox.style.display === 'block') {
        clickedBox.style.display = 'none';
        clickedBox.parentNode.style.backgroundColor = '';
    } else {
        clickedBox.style.display = 'block';
        clickedBox.parentNode.style.backgroundColor = 'lightblue';
    }
}

/* document.querySelectorAll('.box').forEach(function(box) {
    box.addEventListener('click', function(event) {
        event.preventDefault();

        var boxId = this.id;
        var boxDetails = document.getElementsByClassName('box-details');

        for (var i = 0; i < boxDetails.length; i++) {
            if (boxDetails[i].id !== boxId) {
                boxDetails[i].classList.remove('active');
                boxDetails[i].parentNode.style.backgroundColor = '';
            }
        }

        var clickedBox = document.getElementById(boxId);
        if (clickedBox.classList.contains('active')) {
            clickedBox.classList.remove('active');
            clickedBox.parentNode.style.backgroundColor = '';
        } else {
            clickedBox.classList.add('active');
            clickedBox.parentNode.style.backgroundColor = 'lightblue';
        }
    });
}); */