// Get the error elements
let errorPassword = document.getElementById("errorPassword");
let errorPhone = document.getElementById('errorPhone');  
let errorEmail = document.getElementById('errorEmail');  

const form = document.querySelector('.form');

// Exercise 9
function validate(event) {
    console.log(event)
    event.preventDefault();
        
    // Validate fields entered by the user: name, phone, password, and email
    Array.from(form.querySelectorAll('input')).map( input => {
        // General requirements
        if (input.value === '' || input.value.length < 3) {
            input.classList.add('incorrect-value');
            input.parentElement.querySelector('.empty-input').style.display = 'block';
        }
    })   

    // Name and surname validations
    let name = document.querySelector('.name');
    let surname = document.querySelector('.surname');

    // Applying regex patter to check if input value has numbers
    if (/\d/.test(name.value)) {
        name.classList.add('incorrect-value');
        name.parentElement.querySelector('.numeric-value').style.display = 'block';
    }
    if (/\d/.test(surname.value)) {
        surname.classList.add('incorrect-value');
        surname.parentElement.querySelector('.numeric-value').style.display = 'block';
    }

    // Phone number validation
    let phone = document.querySelector('.phone');
    // Cheking that all characters in string value are numbers
    if (!/^\d+$/.test(phone.value) && phone.value !== '') {
        errorPhone.classList.add('incorrect-value');
        errorPhone.style.display = 'block';
    }

    // Checking password has at least one letter, one number and length between 4 and 8
    let password = document.querySelector(".password");
    // Checking length of input and regex pattern for numbers and letters
    if ((password.value.length < 4 || password.value.length > 8 || 
        !(/\d/.test(password.value) && /[a-zA-Z]/.test(password.value))) && password.value !== '') {
            password.classList.add('incorrect-value');
        errorPassword.style.display = 'block';
    }

    // Email format validation
    let email = document.querySelector(".email");
    // Checking if has strcture xxx@xxx.xx
    if (!/\S+@\S+\.\S+/.test(email.value) && email.value !== '') {
        email.classList.add('incorrect-value');
        errorEmail.style.display = 'block';
    }
}
