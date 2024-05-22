import { container } from "../constants.js";
import { state } from "./template.js";
import { completeLesson } from "../api.js";
const arrResponce = []

export function renderTest(arr){
    let count = 0
    container.innerHTML = `
        <button class="close__button"></button>
        <h2 class="question"></h2>
        <div class="containerCard"></div>
    `


  
    const arrTests = arr.map(item => {
        const array = arr.slice()
        const arrCard = array.sort(() => .5 - Math.random()).splice(0, 4)
        const questions = arrCard[Math.floor(Math.random() * 4)].translate
        return {arrCard, questions}
    })


    renderElements(arrTests[count], count, arrTests)
    count++

    
   document.querySelector('.close__button').addEventListener('click', () => {
        state.clearContainer();
        state.lesson(arr);
    });
}

 function renderElements(obj,  count, arrTests, variable = true){
    const question = container.querySelector('.question')
    const containerCard = container.querySelector('.containerCard')
    containerCard.innerHTML = ''
    question.textContent = obj.questions
   
    // обход решения
    // const levelNumber = obj.arrCard[0].level
    // const lessonNumber = obj.arrCard[0].type.slice(4)
    // completeLesson({levelNumber, lessonNumber})
    //     .then(() => {
    //         state.clearContainer()
    //         state.home()
    //     }).catch(err => console.log(err))
    if(variable){
       renderElements2(obj, count, arrTests)
        return
    }

  

    obj.arrCard.forEach(item => {
        const card = document.createElement('div')
        card.classList.add('symbol')
        card.textContent = item.symbol
        containerCard.append(card) 
        card.addEventListener('click', () => {
            if(Array.from(containerCard.children).some(item => item.classList.length > 1)){
                return
            }
            const isCorrect = obj.questions === item.translate;
            arrResponce[count] = isCorrect;
            if (isCorrect) {
                card.classList.add('correct'); 
            } else {
                card.classList.add('incorrect'); 
            }
            console.log(arrResponce,);
            if (count < arrTests.length - 1 && arrTests[count + 1]) {
                setTimeout(() => {
                    count++;
                    renderElements(arrTests[count], count, arrTests);
                }, 1000); 
            } else {
                getResult(container, arrResponce, obj, count)
            }
        })
    })

}


function renderElements2(obj,  count, arrTests){
    const elem =  obj.arrCard.slice().sort(() => .5 - Math.random()).splice(0, 1)[0]
    const question = container.querySelector('.question')
    const containerCard = container.querySelector('.containerCard')
    question.textContent = elem.symbol
    containerCard.innerHTML = `
        <form class="form__test">
            <input class="form__input" type="text" name="answer" placeholder="Ваш ответ" required>
            <button class="form__submit" type="submit">Отправить</button>
        </form>
    `
    console.log(obj, elem);
    const form = container.querySelector('.form__test')
    form.addEventListener('submit', (event) => {
        event.preventDefault()
        const {answer} = event.target.elements
        const isCorrect = elem.translate === answer.value
        arrResponce[count] = isCorrect
        const variable =  Math.random() < 0.5
        count++
        console.log(answer.value, elem.translate);
        console.log(arrResponce);
        if(count < arrTests.length - 1 && arrTests[count + 1]){
            renderElements(obj, count, arrTests, variable)
        }else {
            getResult(container, arrResponce, obj, count)
        }
    })
    // question.textContent = 

}




function getResult (container, arrResponce, obj, count) {
    container.innerHTML = `
    <h2 class="question"></h2>
    <div class="containerCard"> 
        <h2 class="testEnd">Тест закончен!</h2>
        <h2 class="correctAnswers">Вы ответили правильно на ${arrResponce.filter(item => item).length} вопросов из ${arrResponce.length}</h2>
        <button class="homeBtn">Перейти на главную страницу</button>
        <button class="restartBtn">Пройти тест еще раз</button>
    </div>
    `

    const levelNumber = obj.arrCard[0].level
    const lessonNumber = obj.arrCard[0].type[obj.arrCard[0].type.length - 1]
    completeLesson({levelNumber, lessonNumber})
        .then(() => {
            setTimeout(() => {
                state.clearContainer()
                state.home()
            }, 3000)
        }).catch(err => console.log(err))
    count = 0
    arrResponce.splice(0, arrResponce.length)
    const homeBtn = document.querySelector('.homeBtn')
    const repeat = document.querySelector('.restartBtn')
    repeat.addEventListener('click', () =>{
        renderElements(arrTests[count], arrResponce, count, arrTests)
    })

    homeBtn.addEventListener('click', () => {
        state.clearContainer()
        state.home()
    })
}