import { signUp, signIn } from "../scripts/api.js"
import { user } from "../scripts/user.js"
import { state } from "../scripts/template/template.js"

const errMessage = document.querySelector('.errMessage')
const formSignUp = document.querySelector('.form-signUp')
const formSignIn = document.querySelector('.form-signIn')

if(formSignUp){
    formSignUp.addEventListener('submit', (event) => {
        event.preventDefault()
        const {email, password, name } = event.target.elements
        const obj = {
            name: name.value,
            email: email.value,
            password: password.value
        }
        signUp(obj)
            .then( async res => {
                console.log(res);
                if(res.err){
                    errMessage.innerHTML = res.message + ': ' + Object.keys(res.err.keyValue)
                } else {
                    window.location.href = 'signin.html'
                }
            }).catch(err => console.log(err))
    })
}

if(formSignIn){
    formSignIn.addEventListener('submit', (event) => {
        event.preventDefault()
        const {email, password} = event.target.elements
        const obj = {
            email: email.value,
            password: password.value
        }
        signIn(obj)
            .then(res => {
                localStorage.setItem('token', JSON.stringify(res.token))
                user.token = res
                user.isAuth = true
                window.location.href = '/index.html'
                // state.clearContainer()
                // state.home()
            }).catch(err => console.log(err))
    })
}



const objValidation = {
    form: '.form',
    input: '.form__input',
    submit: '.form__submit',
    errClassInput: 'form__input--error',
    errMsgSelector : '.form__msg-error',
    repeatPassWord: 'input[name="repeatPassWord"]'
}


function enableValidation(obj) {
    document.querySelectorAll('.form__input').forEach((input) => {
        input.addEventListener('input', (event) => {
            if (!input.validity.valid) {
                input.classList.add(obj.errClassInput);
                const msgError = input.nextElementSibling;
                msgError.textContent = input.validationMessage;
                msgError.classList.add('active');
            } else {
                input.classList.remove(obj.errClassInput);
                const msgError = input.nextElementSibling;
                msgError.classList.remove('active');
            }
        })
})
}

enableValidation(objValidation)