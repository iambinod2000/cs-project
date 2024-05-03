// get references to the password field and strength meter elements
const form = document.querySelector('form');
try {
}
catch {
}






// add an event listener to the password field to update the meter on input
try {

}
catch (err) {
    console.log(err);
}


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

function checkPasswordMatch() {
    if (passwordInput.value == repeatPasswordInput.value) {
        registerButton.disabled = false;
    } else {
        registerButton.disabled = true;
    }
}



// generate a random 6-character string for the CAPTCHA
function generateCaptcha() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
}

try {
    // update the CAPTCHA text in the HTML
    const captchaText = generateCaptcha();
    document.getElementById('captcha-text').textContent = captchaText;
    document.getElementById('captcha').value = '';

    // add an event listener to the form submit button to check the CAPTCHA before submitting
    document.querySelector('#captcha').addEventListener('input', (event) => {
        if (!checkCaptcha()) {
            document.querySelector('button[type="submit"]').disabled = true;
        } else {
            document.querySelector('button[type="submit"]').disabled = false;
        }
    });
}
catch (err) {
    console.log(err);
}
// add an event listener to the CAPTCHA text to regenerate it on click


// check if the user entered the correct CAPTCHA text
function checkCaptcha() {
    const captchaInput = document.getElementById('captcha').value;
    const captchaText = document.getElementById('captcha-text').textContent;
    if (captchaInput === captchaText) {
        // the CAPTCHA is correct
        return true;
    } else {
        // the CAPTCHA is incorrect
        // updateCaptchaText();
        return false;
    }
}


