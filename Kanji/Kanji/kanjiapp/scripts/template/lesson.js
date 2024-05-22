import { container } from "../constants.js";
import { state } from "./template.js";



export function renderLesson(arr) {
    console.log(arr);
    arr.forEach(obj => {
        const card = document.createElement('div'); 
        card.classList.add('card');
        card.innerHTML = `
            <h2 class='card__symbol'>${obj.symbol}</h2>
            <p class='card__translate'>${obj.translate}</p>
        `;
        container.appendChild(card); 

        card.addEventListener('click', () => {
            state.clearContainer();
            state.description(obj);
        });
    });
    const startTest = document.createElement('div')
    startTest.classList.add('start')
    startTest.textContent = 'Начать тестирование'
    container.append(startTest)

    startTest.addEventListener('click', () => {
        state.clearContainer()
        state.test(arr)
    })
}


