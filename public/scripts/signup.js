const Email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const response = document.getElementById('response');
const signupBtn = document.getElementById('signupBtn');

//validate Email
const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

//validation
document.getElementById('signupBtn').addEventListener('click', (e) => {
    e.preventDefault();
    const email = Email.value
    const isValid = validateEmail(email);

    if (password.value == '' || confirmPassword.value == '' || email.value == '') {
        response.textContent = 'Fill all inputs!'
        setTimeout(() => {
            response.textContent = ''
        }, 5000)

        return;
    } else if (password.value !== confirmPassword.value) {
        response.textContent = 'Passwords don`t match!';
        setTimeout(() => {
            response.textContent = ''
        }, 5000)
    }
    else if (isValid) {
        window.location.href = '../index.html'
    } else {
        response.textContent = 'Use correct email format!';
        setTimeout(() => {
            response.textContent = ''
        }, 5000)

    }
})



