
interface News {
    title: string;
    content: string;
}

interface UserData {
    email: string;
}

type FormField = keyof UserData;

class UserDataController {
    userData: UserData;
    static fields: FormField[] = ['email'];

    constructor() {
        this.bindElement(UserDataController.fields[0]);
    }

    bindElement(field: FormField) {
        document.getElementById(field)!.addEventListener("input", (event: any) => {
            this.userData = { ...this.userData, [field]: event.target.value };
            this.onDataChanged(field);
        });
    }

    onDataChanged = (field: FormField) => {
        const submitButton = document.getElementById("submitButton")!;

        if (field === "email") {
            const regEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if (!regEmail.test(this.userData.email)) {
                submitButton?.setAttribute('disabled', '');
                this.setValidation("email", "The email address must valid.");
                submitButton.classList.remove("valid");
                submitButton.classList.add("invalid");
            } else {
                submitButton?.setAttribute('enabled', '');
                this.setValidation("email", "Looks good!");
                submitButton.classList.remove("invalid");
                submitButton.classList.add("valid");

                //de adaugat: mesajul ca inrolarea a fost facuta cu succes
                
                document.getElementById("submitButton").addEventListener("click", function () {
                    alert("You clicked me");
                });​
            }
        }
    }

    setValidation = (field: FormField, message: string) => {
        document.getElementById(`${field}-validation`)!.innerHTML = message;
    }
}

class NewsController {
    private _search: string = '';
    private _data: News[];

    constructor() {
        this.searchBarSetup();
    }

    searchBarSetup = () => {
        const searchBar = document.querySelector('.searchbar') as HTMLInputElement;

        if (searchBar) {
            searchBar.addEventListener('input', () => {
                this._search = searchBar.value;
                this.renderNews();
            });
        }
    };

    loadNews = () => {
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
    }

    renderNews = () => {
        const newsBody = document.getElementById('news-body');

        if (newsBody) {
            newsBody.innerHTML = '';
            this.tableData.forEach(news => {
                this.addRow(news);
            });
        }
    }

    get tableData(): News[] {
        let data = [...this._data].filter(news =>
            news.title.toLowerCase().includes(this._search.toLowerCase())
        );

        return data;
    }

    addRow = (news: News) => {
        if (!news) return;
        const element = document.createElement("li");
        element.innerHTML = `
            <p>${news.title}</p>
            <p>${news.content}</p>`;

        document.getElementById('news-body')!.appendChild(element);
    }
}

const newsController = new NewsController();
newsController.loadNews();

const userDataController = new UserDataController();