import { renderLesson } from "./lesson.js"
import { container } from "../constants.js"
import { descriptionRender } from "./descriptionCard.js"
import { renderTest } from "./test.js"
import { renderHome } from "./home.js"
import { renderUserPage } from "./userPage.js"
import { renderInfo } from "./info.js"

export const state = {
    saveHistoryPage : (str, data) => {
        localStorage.setItem('page', JSON.stringify({str, data}))
    },
    getHistoryPage : () => {
        const page = JSON.parse(localStorage.getItem('page'))
        page ? state[page.str](page.data) : state.home()
    },
    
    description : (obj, arr) => {
        const page = JSON.parse(localStorage.getItem('page'));
        if (page && page.data) {
            state.saveHistoryPage('description', page.data); 
            descriptionRender(obj, page.data); 
        } else {
            state.saveHistoryPage('description', null); 
            descriptionRender(obj);
        }
    },
    lesson : (arr) => {
        state.saveHistoryPage('lesson', arr)
        renderLesson(arr)
    },
    test: (arr) => {
        state.saveHistoryPage('test', arr)
        renderTest(arr)
    },
    home: () => {
        state.saveHistoryPage('home')
        renderHome()
    },
    userPage: () => {
        state.saveHistoryPage('userPage')
        renderUserPage()
    },
    info: () => {
        state.saveHistoryPage('info')
        renderInfo()
    },


    clearContainer : () => container.innerHTML= ''
}