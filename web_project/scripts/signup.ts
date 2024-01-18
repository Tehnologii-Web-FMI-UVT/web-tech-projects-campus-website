interface IFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

type _FormField = keyof IFormData;

class RegisterFormController {
    formData: IFormData;
    static fields: _FormField[] = [
        "firstName",
        "lastName",
        "email",
        "password",
        "confirmPassword"
    ];

    constructor() {
        for (const field of RegisterFormController.fields) {
            this.bindElement(field);
        }
    }

    bindElement(field: _FormField) {
        document.getElementById(field)!.addEventListener("input", (event: any) => {
            this.formData = { ...this.formData, [field]: event.target.value };
            this.onDataChanged(field);
        });
    }

    onDataChanged = (field: _FormField) => {
        if (field === "firstName") {
            if (this.formData.firstName.length < 3) {
                this.setValidation("firstName", "Your name must have at least 2 characters.");
            } else {
                this.setValidation("firstName", "Looks good!");
            }
        }

        if (field === "lastName") {
            if (this.formData.lastName.length < 3) {
                this.setValidation("lastName", "Your name must have at least 2 characters.");
            } else {
                this.setValidation("lastName", "Looks good!");
            }
        }

        if (field === "email") {
            const regEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if (!regEmail.test(this.formData.email)) {
                this.setValidation("email", "The email address must valid.");
            } else {
                this.setValidation("email", "Looks good!");
            }
        }

        if (field === "password") {
            const regPass = new RegExp(
                /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/g);

            if (!regPass.test(this.formData.password) || this.formData.password.length < 8) {
                this.setValidation("password", "The password must have at least 8 characters, minimum 1 lowercase, 1 uppercase, 1 digit, and 1 special character !@#$%^?><;'\&*().");
            } else {
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
    }

    setValidation = (field: _FormField, message: string) => {
        document.getElementById(`${field}-validation`)!.innerHTML = message;
    }
};

const registerController = new RegisterFormController();