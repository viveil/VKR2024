import { container } from "../constants.js";
import { user } from "../user.js";
import { getMe } from "../api.js";
import { state } from "./template.js";

export function renderUserPage(){

    if(localStorage.getItem('token')) {
            getMe().then((data) => {
                    user.profile = data
                    user.isAuth = true
                    container.innerHTML = `
                        <div class="userPage__container">
                            <h3>Привет, ${data.name}</h3>
                            <p class="userEmail">Email пользователя: ${data.email}</p>
                            <div class="Progress">
                                <h3>Прогресс</h3>

                            </div>
                            <button class="action_user signOut">Выйти</button>
                        </div>`

                    const progressContainer = container.querySelector('.Progress')
                    data.JLPTLevels.forEach((item) => {
                        progressContainer.innerHTML += `
                            <div class="progress__item jlpt${item.level}">
                                <p>Уровень JLPT ${item.level}</p>
                                <p>Выполнено: ${item.lessonsCompleted.length}</p>
                            </div>`
                    })
                    const signOut = container.querySelector('.signOut')
                    signOut.addEventListener('click', () => {
                        user.isAuth = false
                        user.token = ''
                        localStorage.clear()
                        state.clearContainer()
                        state.userPage()
                    })
        }).catch((err) => console.log(err))
    } else {
        container.innerHTML = `
            <div class="userPage__container">
                    <button class="action_user signIn">Войти</button>
                    <button class="action_user SignUp">Зарегистрироваться</button>
            </div>`
    
        const signIn = container.querySelector('.signIn')
        const SignUp = container.querySelector('.SignUp')
    
        signIn.addEventListener('click', () =>{
            window.location.href = '../../pages/signin.html'
        })
        SignUp.addEventListener('click', () => {
            window.location.href = '../../pages/signup.html'
        })
    }
    
}