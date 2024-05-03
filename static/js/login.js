

// Password Toggle
const passwordToggles = document.querySelectorAll('.password-toggle');

passwordToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        const passwordInput = toggle.parentElement.querySelector('input');
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggle.innerHTML = '<i class="fa fa-eye"></i>';
        } else {
            passwordInput.type = 'password';
            toggle.innerHTML = '<i class="fa fa-eye-slash"></i>';
        }
    });
});

// add an event listener to the form submit button to check the CAPTCHA before submitting
document.querySelector('#captcha').addEventListener('input', (event) => {
    if (!checkCaptcha()) {
        document.querySelector('button[type="submit"]').disabled = true;
    } else {
        document.querySelector('button[type="submit"]').disabled = false;
    }
});

function onCaptchaSubmit() {
    document.querySelector('button[type="submit"]').disabled = false;
}

function onCaptchaExpired() {
    document.querySelector('button[type="submit"]').disabled = true;
}