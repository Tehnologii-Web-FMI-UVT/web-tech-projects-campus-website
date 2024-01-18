interface IFormData {
    email: string;
    password: string;
}

type Form_Field = keyof IFormData;

class LoginFormController {
    formData: IFormData;
    static fields: Form_Field[] = [
        "email",
        "password",
    ];

    constructor() {
        for (const field of LoginFormController.fields) {
            this.bindElement(field);
        }
    }

    bindElement(field: Form_Field) {
        document.getElementById(field)!.addEventListener("input", (event: any) => {
            this.formData = { ...this.formData, [field]: event.target.value };
            this.onDataChanged(field);
        });
    }

    onDataChanged = (field: Form_Field) => {
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
    }

    setValidation = (field: Form_Field, message: string) => {
        document.getElementById(`${field}-validation`)!.innerHTML = message;
    }
};

const loginController = new LoginFormController();