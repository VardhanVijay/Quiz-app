import { quizQuestions } from "./questions.js"

const progressBar = document.querySelector('.Progress-bar');
const quesContainer = document.querySelector('.question-container');
const total = document.querySelector('.total-questions');
const quizApp = document.querySelector('.quiz-app');
const remQues = document.querySelector('.rem-question');
const timerContainer = document.querySelector('.timer-sec')


// const option=document.createElement('button');
// option.classList.add('options')

let timer = 5;
let currTimer = timer;
let currQuesIndex = 0;
let questions = randomValue(5);
let totalQuestionCount = questions.length;
let progressVal = 100 / timer;
let currProgressVal = 0;

let quesOptionAnswer = [];

for(let i=0;i<questions.length;i++){
    quesOptionAnswer[i]=false;
}

function randomValue(numberOfQuestions) {
    let newQuestions = [];
    for (let i = 0; i < numberOfQuestions; i++) {
        const randomIndex = Math.floor(Math.random() * quizQuestions.length);
        newQuestions.push(quizQuestions[randomIndex]);
    }
    return newQuestions;
};
generateQuestion();
let timerInterval = setInterval(updateTimer, 1000);

function updateTimer() {

    currTimer--;
    timerContainer.innerText = currTimer + 's';
    currProgressVal = progressVal * currTimer;
    progressBar.style.width = `${currProgressVal}%`

    if (currTimer <= 0) {
        currTimer = timer;
        timerContainer.innerText=currTimer + 's';
        currProgressVal = 0;
        generateQuestion();
    }
}

function generateQuestion() {
    let ansVal = "";
    if (currQuesIndex >= questions.length) {
        clearInterval(timerInterval);
        afterOver();
        return;
    }
    // updateTimer();

    let element = questions[currQuesIndex];
    quesContainer.innerHTML = "";

    const newQuestion = document.createElement('h2');
    const quesNo = document.createElement('span');
    let val = currQuesIndex + 1 + ". ";
    quesNo.innerText = val;
    newQuestion.append(quesNo);
    newQuestion.append(element.question);
    newQuestion.classList.add('question');

    const options = document.createElement('div');
    options.classList.add('quiz-options');

    let btns = [];
    element.options.forEach((ele) => {
        const btn = document.createElement('btn');
        btn.classList.add('options');
        const optionTxt = document.createElement('div');
        optionTxt.classList.add('options-text');
        const optionImage = document.createElement('div');
        optionImage.classList.add('option-image');

        optionTxt.innerText = ele;
        if (ele === element.answer) {
            ansVal = btn;
        }

        btn.append(optionTxt, optionImage);
        btns.push(btn);
        options.append(btn);
    })
    quesContainer.append(newQuestion, options);
    checkCorrectAnswer(btns, ansVal, newQuestion);

   if(quesOptionAnswer[currQuesIndex]===false){
        quesOptionAnswer[currQuesIndex]={newQuestion,ansVal};
   }
    foot();
    currQuesIndex++;
};
// quesInterval=setInterval(generateQuestion,3000);


function checkCorrectAnswer(btns, ansVal, newQuestion) {
    let clicked = false;

    let optionChoose = null;
    btns.forEach((elem) => {
        elem.addEventListener('click', () => {

            if (clicked == true) return;

            optionChoose = elem;

            if (elem === ansVal) {
                elem.classList.add('correct');
            }
            else {
                elem.classList.add('incorrect');
            }

            ansVal.classList.add('correct');
            currTimer = 3;
            clicked = true;
            quesOptionAnswer[currQuesIndex-1]={ansVal, newQuestion, optionChoose };
        })
    })

};


function foot() {
    remQues.innerHTML = "";
    const currQues = document.createElement('span');
    currQues.classList.add('curr-ques');
    currQues.innerText = currQuesIndex + 1;

    const totalQues = document.createElement('span');
    totalQues.classList.add('total-questions');
    totalQues.innerText = totalQuestionCount;

    remQues.append(currQues, " of ", totalQues, " Questions");
};

function afterOver() {

    let correctques=0;
    const showAnswer = document.querySelector('.showAnswers');
    quesContainer.style.display = 'none';
    showAnswer.style.visibility = 'visible';
    quesOptionAnswer.forEach(ele => {
        if(!ele.optionChoose || ele.ansVal===ele.optionChoose) {
            ele.ansVal.classList.add('correct');
            showAnswer.append(ele.newQuestion,ele.ansVal);
            if(ele.ansVal===ele.optionChoose) correctques++;
        } 
        else {
            showAnswer.append(ele.newQuestion, ele.optionChoose, ele.ansVal);
        }
        
    })
    showAnswer.append(`${correctques} out of ${questions.length} Correct`);
}





