document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const ageInput = document.getElementById('age');
    const submitBtn = document.getElementById('submitBtn');
    const resetBtn = document.getElementById('resetBtn');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const ageError = document.getElementById('ageError');

    const inputs = [nameInput, emailInput, passwordInput, confirmPasswordInput, ageInput];

    // Funciones de validación
    const validateName = () => {
        const name = nameInput.value.trim();
        if (name.length < 3) {
            displayError(nameInput, nameError, 'El nombre debe tener al menos 3 caracteres.');
            return false;
        }
        clearError(nameInput, nameError);
        return true;
    };

    const validateEmail = () => {
        const email = emailInput.value.trim();
        // Expresión regular para validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            displayError(emailInput, emailError, 'Ingresa un correo electrónico válido.');
            return false;
        }
        clearError(emailInput, emailError);
        return true;
    };

    const validatePassword = () => {
        const password = passwordInput.value;
        // Mínimo 8 caracteres, al menos un número y un carácter especial
        const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
        if (!passwordRegex.test(password)) {
            displayError(passwordInput, passwordError, 'La contraseña debe tener al menos 8 caracteres, un número y un carácter especial.');
            return false;
        }
        clearError(passwordInput, passwordError);
        return true;
    };

    const validateConfirmPassword = () => {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        if (password !== confirmPassword || confirmPassword === '') {
            displayError(confirmPasswordInput, confirmPasswordError, 'Las contraseñas no coinciden.');
            return false;
        }
        clearError(confirmPasswordInput, confirmPasswordError);
        return true;
    };

    const validateAge = () => {
        const age = parseInt(ageInput.value, 10);
        if (isNaN(age) || age < 18) {
            displayError(ageInput, ageError, 'Debes ser mayor o igual a 18 años.');
            return false;
        }
        clearError(ageInput, ageError);
        return true;
    };

    // Funciones de utilidad para mostrar/ocultar errores
    const displayError = (inputElement, errorElement, message) => {
        inputElement.classList.add('invalid');
        inputElement.classList.remove('valid');
        errorElement.textContent = message;
    };

    const clearError = (inputElement, errorElement) => {
        inputElement.classList.remove('invalid');
        inputElement.classList.add('valid');
        errorElement.textContent = '';
    };

    // Función para verificar el estado general del formulario
    const checkFormValidity = () => {
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        const isAgeValid = validateAge();

        // Para evitar que las validaciones se muestren al cargar la página si el campo está vacío
        // Solo valida si el campo tiene contenido o si es el último paso para habilitar el botón
        const allInputsFilled = inputs.every(input => input.value.trim() !== '');

        if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isAgeValid && allInputsFilled) {
            submitBtn.disabled = false;
        } else {
            submitBtn.disabled = true;
        }
    };

    // Event Listeners para cada campo
    nameInput.addEventListener('input', () => {
        validateName();
        checkFormValidity();
    });
    emailInput.addEventListener('input', () => {
        validateEmail();
        checkFormValidity();
    });
    passwordInput.addEventListener('input', () => {
        validatePassword();
        validateConfirmPassword(); // Re-validar confirmación de contraseña
        checkFormValidity();
    });
    confirmPasswordInput.addEventListener('input', () => {
        validateConfirmPassword();
        checkFormValidity();
    });
    ageInput.addEventListener('input', () => {
        validateAge();
        checkFormValidity();
    });

    // Event Listener para el botón de envío
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita el envío por defecto del formulario

        // Una última verificación antes de enviar
        if (checkFormValidity()) { // Asegúrate de que esta función realmente devuelva true si todo es válido
            alert('¡Formulario enviado con éxito!');
            form.reset(); // Opcional: Reiniciar el formulario después del envío exitoso
            // Opcional: Deshabilitar el botón de envío nuevamente después del reinicio
            submitBtn.disabled = true;
            // Limpiar estilos y mensajes de error después del envío/reinicio
            inputs.forEach(input => {
                input.classList.remove('valid', 'invalid');
            });
            [nameError, emailError, passwordError, confirmPasswordError, ageError].forEach(error => {
                error.textContent = '';
            });
        } else {
            alert('Por favor, corrige los errores en el formulario antes de enviar.');
        }
    });

    // Event Listener para el botón de reiniciar
    resetBtn.addEventListener('click', () => {
        form.reset();
        submitBtn.disabled = true; // Deshabilitar el botón de envío
        // Limpiar estilos y mensajes de error
        inputs.forEach(input => {
            input.classList.remove('valid', 'invalid');
        });
        [nameError, emailError, passwordError, confirmPasswordError, ageError].forEach(error => {
            error.textContent = '';
        });
    });

    // Llamada inicial para establecer el estado del botón de envío al cargar la página
    checkFormValidity();
});