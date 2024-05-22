import { container } from "../constants.js"
import { state } from "./template.js"
import { user } from "../user.js"
import { getMe, getKanji } from "../api.js"

export function renderHome() {
    if(!localStorage.getItem('token')) {
        container.innerHTML = 'Пожалуйста, авторизуйтесь!'
        return
    }else {
        Promise.all([getMe(), getKanji()])
            .then(([userData, kanjis]) => {
                user.isAuth = true
                user.profile = userData
                renderKanjis(kanjis)
            }).catch(err => {
                localStorage.clear()
                console.log(err);
            })
    }

    container.innerHTML = `
        <div class="container__block">
            <div class="containerCard"></div>
        </div>
    `
    const containerCard = document.querySelector('.containerCard')
    function renderKanjis(kanjis) {
        for(let i = 5; i > 0; i--){
            const userLevel = user.profile.JLPTLevels[i - 1]
            const levelKanji = kanjis.filter(item => item.level === i)
            const lessonKanji = [...new Set(levelKanji.map(item => item.type))]
            containerCard.innerHTML += `
                <div class="container__elem jlpt${i}"><span>Уровень JLPT N${i}</span><span>  </span></div>
                <div class="container__view no-view"></div>
            `
            const containerView = containerCard.querySelector('.container__view:last-child')
            lessonKanji.forEach((kanji, index) => {
                const card = document.createElement('div')
                card.classList.add('container__base')
                if(userLevel.lessonsCompleted.includes(index + 1 + '')) card.classList.add('completed')
                card.textContent = `Урок ${index + 1}`
                card.setAttribute('data-base', kanji)
                card.setAttribute('data-level',  i)
                containerView.append(card)
            })
        }
        const containerBlocks = document.querySelectorAll('.container__elem')
    
        const cards = document.querySelectorAll('.container__base')
    
        cards.forEach(card => card.addEventListener('click', () => {
            const type = card.getAttribute('data-base')
            const level = card.getAttribute('data-level')
            state.clearContainer()  
            const arrKanji = kanjis.filter(item => item.type == type && item.level == level)
            state.lesson(arrKanji)
        }))
    
        containerBlocks.forEach(elem => {
           elem.addEventListener('click', () => toggleContainer(elem))
        })
    }

 

}

function toggleContainer(elem){
    const containerView = elem.nextElementSibling
    containerView.classList.toggle('no-view')
}




