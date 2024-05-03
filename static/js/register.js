// get references to the password field and strength meter elements

const form = document.querySelector('form');
const passwordInput = document.getElementById('password');
const passwordStrengthMeter = document.querySelector('.password-strength-meter');
const repeatPasswordInput = document.getElementById('repeat-password');
const passwordStrengthMeterBar = passwordStrengthMeter.querySelector('.password-strength-meter-bar');
const passwordStrengthMeterLabel = passwordStrengthMeter.querySelector('.password-strength-meter-label');
const registerButton = document.querySelector('button[type="submit"]');


// set up an array of regex patterns to match different password strengths
const passwordStrengths = [
    {
        pattern: /[a-z]+/,
        label: 'Weak',
        color: 'red'
    },
    {
        pattern: /[A-Z]+/,
        label: 'Medium',
        color: 'orange'
    },
    {
        pattern: /[0-9]+/,
        label: 'Strong',
        color: 'green'
    },
    {
        pattern: /^(?=.[a-zA-Z0-9])(?!.[^a-zA-Z0-9]).{8,}$/,
        label: 'Very Strong',
        color: 'green'
    }
];

var strengthPercent = 0;
// define a function to check the strength of the password and update the meter
function updatePasswordStrengthMeter() {
    checkPasswordMatch();
    // get the password value and initialize the strength to zero
    const password = passwordInput.value;
    let strength = 0;

    // loop through the regex patterns and increment the strength for each match
    passwordStrengths.forEach(pattern => {
        if (password.match(pattern.pattern)) {
            strength++;
        }
    });

    // set the width of the meter bar based on the strength (out of four)
    strengthPercent = (strength / passwordStrengths.length) * 100;
    if (strengthPercent == 100 || strengthPercent == 0) {
        document.querySelector('#help-text').classList = 'hide';
        registerButton.disabled = false;
        if (checkPasswordMatch()) {
            registerButton.disabled = false;
        } else {
            registerButton.disabled = true;
        }
    } else {
        document.querySelector('#help-text').classList = 'show';
        registerButton.disabled = true;
    }
    if (strengthPercent == 0){
        passwordStrengthMeterLabel.textContent = '';
    }
    passwordStrengthMeterBar.style.width = `${strengthPercent}%`;

    passwordStrengthMeterBar.style.backgroundColor = passwordStrengths[strength - 1].color;

    // set the text label for the meter based on the strength
    passwordStrengthMeterLabel.textContent = passwordStrengths[strength - 1].label;
    passwordStrengthMeterLabel.style.color = passwordStrengths[strength - 1].color;

}

// add an event listener to the password field to update the meter on input
passwordInput.addEventListener('input', updatePasswordStrengthMeter);
repeatPasswordInput.addEventListener('input', checkPasswordMatchStatus);

function checkPasswordMatchStatus() {
    if (checkPasswordMatch()) {
        if (strengthPercent == 100) {
            registerButton.disabled = false;
        } else {
            registerButton.disabled = true;
        }
    } else {
        registerButton.disabled = true;
    }
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
        return true;
    } else {
        return false;
    }
}

// at the time of submit check if recaptcha-accessible-status textcontent is what we want
function onCaptchaSubmit() {
    if (checkPasswordMatch()) {
        if (strengthPercent == 100) {
            registerButton.disabled = false;
        } else {
            registerButton.disabled = true;
        }
    }
}

function onCaptchaExpired() {
    registerButton.disabled = true;
}
