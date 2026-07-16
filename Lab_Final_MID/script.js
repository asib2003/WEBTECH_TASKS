const form = document.getElementById("myForm");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const showPassword = document.getElementById("showPassword");

let wrongAttempts = 0;
let isLocked = false;

showPassword.addEventListener("change", function () {
    if (showPassword.checked == true) {
        password.type = "text";
        confirmPassword.type = "text";
    } else {
        password.type = "password";
        confirmPassword.type = "password";
    }
});

form.addEventListener("submit", function (event) {
    event.preventDefault();
    clearErrors();

    document.getElementById("successMessage").innerHTML = "";

    if (isLocked == true) {
        document.getElementById("passwordError").innerHTML =
            "Password is locked. Try again after 1 minute.";
        return;
    }

    let firstName = document.getElementById("firstName");
    let lastName = document.getElementById("lastName");
    let email = document.getElementById("email");
    let department = document.getElementById("department");
    let healthDescription = document.getElementById("healthDescription");

    let gender = document.querySelector('input[name="gender"]:checked');
    let services = document.querySelectorAll('input[name="service"]:checked');

    let valid = true;

    if (firstName.value.trim() == "") {
        showError(firstName, "firstNameError", "First name is required.");
        valid = false;
    } else if (!/^[A-Za-z]+$/.test(firstName.value.trim())) {
        showError(firstName, "firstNameError", "Only alphabets are allowed.");
        valid = false;
    } else {
        showSuccess(firstName);
    }

    if (lastName.value.trim() == "") {
        showError(lastName, "lastNameError", "Last name is required.");
        valid = false;
    } else if (!/^[A-Za-z]+$/.test(lastName.value.trim())) {
        showError(lastName, "lastNameError", "Only alphabets are allowed.");
        valid = false;
    } else {
        showSuccess(lastName);
    }

    if (email.value.trim() == "") {
        showError(email, "emailError", "Email is required.");
        valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        showError(email, "emailError", "Enter a valid email address.");
        valid = false;
    } else {
        showSuccess(email);
    }

    if (password.value == "") {
        showError(password, "passwordError", "Password is required.");
        valid = false;
    } else if (password.value != "CSE123") {
        wrongAttempts++;

        showError(
            password,
            "passwordError",
            "Wrong password! Attempt " + wrongAttempts + " of 3."
        );

        valid = false;

        if (wrongAttempts >= 3) {
            isLocked = true;
            password.disabled = true;
            confirmPassword.disabled = true;

            document.getElementById("passwordError").innerHTML =
                "Too many wrong attempts. Password locked for 1 minute.";

            setTimeout(function () {
                isLocked = false;
                wrongAttempts = 0;
                password.disabled = false;
                confirmPassword.disabled = false;
                password.value = "";
                confirmPassword.value = "";

                document.getElementById("passwordError").innerHTML =
                    "Password unlocked. Try again.";
            }, 60000);
        }
    } else {
        wrongAttempts = 0;
        showSuccess(password);
    }

    if (confirmPassword.value == "") {
        showError(
            confirmPassword,
            "confirmPasswordError",
            "Confirm password is required."
        );

        valid = false;
    } else if (confirmPassword.value != password.value) {
        showError(
            confirmPassword,
            "confirmPasswordError",
            "Passwords do not match."
        );

        valid = false;
    } else {
        showSuccess(confirmPassword);
    }

    if (gender == null) {
        document.getElementById("genderError").innerHTML =
            "Please select one gender.";

        valid = false;
    }

    if (services.length == 0) {
        document.getElementById("serviceError").innerHTML =
            "Please select at least one service.";

        valid = false;
    }

    if (department.value == "") {
        showError(
            department,
            "departmentError",
            "Please select a doctor's department."
        );

        valid = false;
    } else {
        showSuccess(department);
    }

    if (healthDescription.value.trim() == "") {
        showError(
            healthDescription,
            "healthDescriptionError",
            "Health description is required."
        );

        valid = false;
    } else if (healthDescription.value.trim().length < 20) {
        showError(
            healthDescription,
            "healthDescriptionError",
            "Health description must be at least 20 characters."
        );

        valid = false;
    } else {
        showSuccess(healthDescription);
    }
    if (valid == true) {
        form.reset();
        clearErrors();

        password.type = "password";
        confirmPassword.type = "password";

        document.getElementById("successMessage").innerHTML =
            "Appointment Registration Completed Successfully!";
    }
});
function showError(input, errorId, message) {
    input.classList.add("errorBorder");
    input.classList.remove("successBorder");
    document.getElementById(errorId).innerHTML = message;
}

function showSuccess(input) {
    input.classList.remove("errorBorder");
    input.classList.add("successBorder");
}

function clearErrors() {
    let errors = document.querySelectorAll(".error");

    errors.forEach(function (item) {
        item.innerHTML = "";
    });

    let fields = document.querySelectorAll("input, select, textarea");

    fields.forEach(function (field) {
        field.classList.remove("errorBorder");
        field.classList.remove("successBorder");
    });
}