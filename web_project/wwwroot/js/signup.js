class RegisterFormController {
    constructor() {
        this.onDataChanged = (field) => {
            if (field === "firstName") {
                if (this.formData.firstName.length < 3) {
                    this.setValidation("firstName", "Your name must have at least 2 characters.");
                }
                else {
                    this.setValidation("firstName", "Looks good!");
                }
            }
            if (field === "lastName") {
                if (this.formData.lastName.length < 3) {
                    this.setValidation("lastName", "Your name must have at least 2 characters.");
                }
                else {
                    this.setValidation("lastName", "Looks good!");
                }
            }
            if (field === "email") {
                const regEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!regEmail.test(this.formData.email)) {
                    this.setValidation("email", "The email address must valid.");
                }
                else {
                    this.setValidation("email", "Looks good!");
                }
            }
            if (field === "password") {
                const regPass = new RegExp(/(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/g);
                if (!regPass.test(this.formData.password) || this.formData.password.length < 8) {
                    this.setValidation("password", "The password must have at least 8 characters, minimum 1 lowercase, 1 uppercase, 1 digit, and 1 special character !@#$%^?><;'\&*().");
                }
                else {
                    this.setValidation("password", "Looks good!");
                }
            }
            if (field === "confirmPassword") {
                if (this.formData.password != this.formData.confirmPassword) {
                    this.setValidation("confirmPassword", "Passwords do not match.");
                }
                else {
                    this.setValidation("confirmPassword", "Looks good");
                }
            }
        };
        this.setValidation = (field, message) => {
            document.getElementById(`${field}-validation`).innerHTML = message;
        };
        for (const field of RegisterFormController.fields) {
            this.bindElement(field);
        }
    }
    bindElement(field) {
        document.getElementById(field).addEventListener("input", (event) => {
            this.formData = Object.assign(Object.assign({}, this.formData), { [field]: event.target.value });
            this.onDataChanged(field);
        });
    }
}
RegisterFormController.fields = [
    "firstName",
    "lastName",
    "email",
    "password",
    "confirmPassword"
];
;
const registerController = new RegisterFormController();
//# sourceMappingURL=signup.js.map