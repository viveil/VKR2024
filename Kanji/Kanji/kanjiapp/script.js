import { state } from "./scripts/template/template.js";

state.getHistoryPage()

const infoButton = document.querySelector('.info');
const homeButton = document.querySelector('.home');
const userPageButton = document.querySelector('.profile');

infoButton.addEventListener('click', () => {
    state.clearContainer();
    state.info()
});

homeButton.addEventListener('click', () => {
    state.clearContainer();
    state.home()
});

userPageButton.addEventListener('click', () => {
    state.clearContainer();
    state.userPage();
})