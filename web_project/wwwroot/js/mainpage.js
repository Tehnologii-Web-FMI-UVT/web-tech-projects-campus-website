/*function toggleLogin() {
    var loginButton = document.querySelector('.loginButton');

    if (userLoggedIn) {
        console.log("logging out")
        loginButton.textContent = "Logout";
    }
    else { 
        console.log("logging in")
        loginButton.textContent = "Login";
    }

    if (loginButton.textContent == "Logout") {
        console.log("logging out")
        window.location.href = "/Home/Logout"
    }
    else {
        console.log("logging in")
        loginButton.textContent = "Logout";
        window.location.href = "/Home/Login"
    }
}*/

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

/*document.addEventListener("DOMContentLoaded", function () {
    document.querySelector('.loginButton').addEventListener('click', toggleLogin);
    document.querySelector('.signupButton').addEventListener('click', toggleSignup);
});*/

class UserDataController {
    constructor() {
        this.onDataChanged = (field) => {
            const submitButton = document.getElementById("submitButton");
            if (field === "email") {
                const regEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!regEmail.test(this.userData.email)) {
                    submitButton === null || submitButton === void 0 ? void 0 : submitButton.setAttribute('disabled', '');
                    this.setValidation("email", "The email address must valid.");
                    submitButton.classList.remove("valid");
                    submitButton.classList.add("invalid");
                }
                else {
                    submitButton === null || submitButton === void 0 ? void 0 : submitButton.setAttribute('enabled', '');
                    this.setValidation("email", "Looks good!");
                    submitButton.classList.remove("invalid");
                    submitButton.classList.add("valid");
                    //de adaugat: mesajul ca inrolarea a fost facuta cu succes
                    document.getElementById("submitButton").addEventListener("click", function () {
                        alert("You clicked me");
                    });
                }
            }
        };
        this.setValidation = (field, message) => {
            document.getElementById(`${field}-validation`).innerHTML = message;
        };
        this.bindElement(UserDataController.fields[0]);
    }
    bindElement(field) {
        document.getElementById(field).addEventListener("input", (event) => {
            this.userData = Object.assign(Object.assign({}, this.userData), { [field]: event.target.value });
            this.onDataChanged(field);
        });
    }
}
UserDataController.fields = ['email'];
class NewsController {
    constructor() {
        this._search = '';
        this.searchBarSetup = () => {
            const searchBar = document.querySelector('.searchbar');
            if (searchBar) {
                searchBar.addEventListener('input', () => {
                    this._search = searchBar.value;
                    this.renderNews();
                });
            }
        }; 
        this.loadNews = () => {
            this._data = [
                { title: 'News 1', content: 'content 1' },
                { title: 'News 2', content: 'content 2' },
                { title: 'News 3', content: 'content 3' },
                { title: 'News 4', content: 'content 4' },
                { title: 'News 5', content: 'content 5' },
                { title: 'News 6', content: 'content 6' },
                { title: 'News 7', content: 'content 7' },
                { title: 'News 77', content: 'content 77' },
                { title: 'News 707', content: 'content 707' },
            ];
            this.renderNews();
        };
        this.renderNews = () => {
            const newsBody = document.getElementById('news-body');
            if (newsBody) {
                newsBody.innerHTML = '';
                this.tableData.forEach(news => {
                    this.addRow(news);
                });
            }
        };
        this.addRow = (news) => {
            if (!news)
                return;
            const element = document.createElement("li");
            element.innerHTML = `
            <p>${news.title}</p>
            <p>${news.content}</p>`;
            document.getElementById('news-body').appendChild(element);
        };
        this.searchBarSetup();
    }
    get tableData() {
        let data = [...this._data].filter(news => news.title.toLowerCase().includes(this._search.toLowerCase()));
        return data;
    }
}
const newsController = new NewsController();
newsController.loadNews();
const userDataController = new UserDataController();
//# sourceMappingURL=mainpage.js.map