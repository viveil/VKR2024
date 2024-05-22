import { container } from "../constants.js";
import { user } from "../user.js";
import { state } from "./template.js";

export function descriptionRender(obj, arr){
    container.innerHTML = `
        <button class="close__button"></button>
        <div class='description__container'>
            <h3>Подсказка</h3>
            <img src="${obj.gif}"></img>
        </div>
        <div class='description__container'>
            <h3>Значение</h3>
            <p>${obj.value.join('; ')}</p>
        </div>
        <div class='description__container'>
            <h3>Кунъёми</h3>
            <p>${obj.KUN.join('; ')}</p>
        </div> 
        <div class='description__container'>
            <h3>Онъёми</h3>
            <p>${obj.ON.join('; ')}</p>
        </div> 
        <div class='description__container'>
            <h3>Радикал</h3>
            <p>${obj.radical.join('; ')}</p>
        </div> 
    `
     
    const closeButton = document.querySelector('.close__button');
    if (closeButton) {
    closeButton.addEventListener('click', () => {
        state.clearContainer();
        state.lesson(arr);
    });
    }
}
