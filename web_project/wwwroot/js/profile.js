document.getElementById("change").addEventListener("click", function () {
    var newPasswordFields = document.getElementById("newPasswordFields");
    if (newPasswordFields.style.display === "none") {
        newPasswordFields.style.display = "block";
    } else {
        newPasswordFields.style.display = "none";
    }
});

/*var loadFile = function (event) {
    var output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
        URL.revokeObjectURL(output.src);
    };
};*/

function redirectToHomePage() {
    window.location.href = '/Home/MainPage';
}