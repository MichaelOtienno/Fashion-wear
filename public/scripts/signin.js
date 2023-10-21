const Email = document.getElementById('email');
const password = document.getElementById('password');
const response = document.getElementById('response');
const signinBtn = document.getElementById('signinBtn');

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

//validation
document.getElementById('signinBtn').addEventListener('click', (e) => {
    e.preventDefault();
    const email = Email.value
    const isValid = validateEmail(email);

    if (password.value == '' ||  email.value == '') {
        response.textContent = 'Fill all inputs!'
        setTimeout(()=>{
            response.textContent = ''
        },5000)
        return;
    } else if (isValid) {
        window.location.href = '../index.html'
    } else {
        response.textContent = 'Use correct email format!'
        setTimeout(()=>{
            response.textContent = ''
        },5000)

    }
})



