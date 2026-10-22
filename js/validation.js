const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

const validationFields = {
    userName: {
        errorId: 'name-error',
        validate: function (value) {
            if (!value.trim()) return 'Please enter your name.';
            if (value.trim().length < 2) return 'Name must contain at least 2 characters.';
            return '';
        }
    },
    userEmail: {
        errorId: 'email-error',
        validate: function (value) {
            if (!value.trim()) return 'Please enter your email address.';
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email, for example name@example.com.';
            return '';
        }
    },
    userPassword: {
        errorId: 'password-error',
        validate: function (value) {
            if (!value) return 'Please create a password.';
            if (value.length < 8) return 'Password must contain at least 8 characters.';
            if (!/[A-Za-z]/.test(value) || !/\d/.test(value)) return 'Password must include a letter and a number.';
            return '';
        }
    },
    confirmPassword: {
        errorId: 'confirm-error',
        validate: function (value) {
            if (!value) return 'Please confirm your password.';
            if (value !== contactForm.elements.userPassword.value) return 'Passwords do not match.';
            return '';
        }
    },
    message: {
        errorId: 'message-error',
        validate: function (value) {
            if (!value.trim()) return 'Please enter a message.';
            if (value.trim().length < 10) return 'Message must contain at least 10 characters.';
            return '';
        }
    }
};

function showFieldError(field, errorId, message) {
    document.getElementById(errorId).textContent = message;
    field.classList.toggle('is-invalid', Boolean(message));
    field.setAttribute('aria-invalid', String(Boolean(message)));
}

function validateField(fieldName) {
    const field = contactForm.elements[fieldName];
    const rules = validationFields[fieldName];
    const message = rules.validate(field.value);
    showFieldError(field, rules.errorId, message);
    return !message;
}

if (contactForm) {
    Object.keys(validationFields).forEach(function (fieldName) {
        contactForm.elements[fieldName].addEventListener('input', function () {
            validateField(fieldName);
            if (fieldName === 'userPassword' && contactForm.elements.confirmPassword.value) {
                validateField('confirmPassword');
            }
            formSuccess.hidden = true;
        });
    });

    contactForm.elements.termsCheck.addEventListener('change', function () {
        document.getElementById('terms-error').textContent = '';
        contactForm.elements.termsCheck.classList.remove('is-invalid');
        formSuccess.hidden = true;
    });

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const fieldsAreValid = Object.keys(validationFields)
            .map(validateField)
            .every(Boolean);
        const termsAccepted = contactForm.elements.termsCheck.checked;

        document.getElementById('terms-error').textContent = termsAccepted
            ? ''
            : 'Please confirm that you understand this is a demo.';
        contactForm.elements.termsCheck.classList.toggle('is-invalid', !termsAccepted);

        formSuccess.hidden = !(fieldsAreValid && termsAccepted);
        if (!formSuccess.hidden) formSuccess.focus();
    });

    contactForm.addEventListener('reset', function () {
        setTimeout(function () {
            document.querySelectorAll('.field-error').forEach(function (error) {
                error.textContent = '';
            });
            contactForm.querySelectorAll('.is-invalid').forEach(function (field) {
                field.classList.remove('is-invalid');
                field.removeAttribute('aria-invalid');
            });
            formSuccess.hidden = true;
        });
    });
}
