let startButton = document.querySelector('.start-btn')
let nextButton = document.querySelector('.next-btn')
let submitButton = document.querySelector('.submit-btn')
let HTMLQuestion = document.querySelector('.question')
let questionNumber = document.querySelector('.question-number')
let answerGrid = document.querySelector('.answer-grid')
let countDown = document.querySelector('.timer')
let timeCount

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    ++currentQuestionIndex, ++questionCount;
    clearInterval(timeCount)
    setQuestion();
})

submitButton.addEventListener('click', displayScore);

let randomizeQuestion, currentQuestionIndex,score, questionCount
let counter = 10;

let questions = [
    {
        'question': "What's the value of not-a-number in JavaScript ?",
        options: [
            {'option': 'NaN', iscorrect: true},
            {'option': 'null', iscorrect: false},
            {'option': 'undefined', iscorrect: false},
            {'option': 'nan', iscorrect: false}
        ]
    },
    {
        'question': "Which of these is not a falsy value ?",
        options: [
            {'option': 'null', iscorrect: false},
            {'option': 'NaN', iscorrect: false},
            {'option': '0', iscorrect: false},
            {'option': "'false'", iscorrect: true},
        ]
    },
    /*{
        'question': "Which is not a distruptive statement ?",
        options: [
            {'option': 'break', iscorrect: false},
            {'option': 'return', iscorrect: false},
            {'option': 'throw', iscorrect: false},
            {'option': 'for', iscorrect: true},
        ]
    },
    {
        'question': 'Which is a global variable ?',
        options: [
            {'option': 'let', iscorrect: false},
            {'option': 'var', iscorrect: true},
            {'option': 'const', iscorrect: false},
            {'option': 'String', iscorrect: false}
        ]
    },
    {
        'question': 'Which is the odd ?',
        options: [
        {'option': 'encapsulation', iscorrect: false},
        {'option': 'polymorphism', iscorrect: false},
        {'option': 'abstraction', iscorrect: false},
        {'option': 'orthogonality', iscorrect: true},
        ]
    },
    {
        'question': '!!(NaN === NaN)',
        options: [
            {'option': 'false', iscorrect: true},
            {'option': 'true', iscorrect: false}
        ]
    },
    {
        'question': '"There are two language, those people use and those people complain about", who said this ?',
        options: [
            {'option': 'Dennis Ritchie', iscorrect: false},
            {'option': 'Bjarne Stroustrop', iscorrect: true},
            {'option': 'Bill joy', iscorrect: false},
            {'option': 'Richard Stallman', iscorrect: false},
        ]
    },
    {
        'question': 'What array method create a new array with values from a predicate function ?',
        options: [
            {'option': 'Array.map()', iscorrect: false},
            {'option': 'Array.reduce()', iscorrect: false},
            {'option': 'Array.filter()', iscorrect: false},
            {'option': 'Array.flat()', iscorrect: true},
        ]
    },
    {
        'question': 'What symbol is used to determine match at end of a string ?',
        options: [
            {'option': '^', iscorrect: false},
            {'option': '*', iscorrect: false},
            {'option': '$', iscorrect: true},
            {'option': '@', iscorrect: false},
        ]
    },
    {
        'question': 'Which is not a javaScript standard library ?',
        options: [
            {'option': 'Intl.NumberFormat', iscorrect: false},
            {'option': 'Intl.collate', iscorrect: false},
            {'option': 'Intl.Map', iscorrect: true},
            {'option': 'Intl.DateTimeFormat', iscorrect: false},
        ]
    }*/
]

function startGame() {
    countDown.classList.remove('hide')
    questionNumber.classList.remove('hide')
    let showScore = document.querySelector('.showScore')
    if(showScore){
        showScore.remove()
    }

    randomizeQuestion = questions.sort(()=> Math.random() - .5)
    currentQuestionIndex = score = 0;
    questionCount = 1;
    setQuestion()
}

function displayScore(){
    //Create score paragraph
    const scoreParagraph = document.createElement('p')
    scoreParagraph.append(`${score} / ${questions.length}`)
    scoreParagraph.classList.add('showScore')
    HTMLQuestion.textContent = `YOU SCORED...`

    if(score > (questions.length * 0.5)) {
        setStatusState(document.body, true) // Make background-color green 
    }else{
        setStatusState(document.body, false) // Make background-color red
    }
    HTMLQuestion.after(scoreParagraph)
    submitButton.classList.add('hide')
    startButton.textContent = 'RESTART'
    countDown.textContent = ''
    startButton.classList.remove('hide')
}

function initiateTimer() {
    counter = 10
    timeCount= setInterval(timer, 1000)

    function timer() {
        if(counter === 10) {   
            countDown.textContent = counter--
        }else if(counter < 10){
            countDown.textContent = "0" + counter--
        }

        if(counter < 0){
            countDown.textContent = '0'
            nextButton.classList.add('hide')
            ++currentQuestionIndex
            ++questionCount
            clearInterval(timeCount)
            setQuestion()
        }
    }
}


function setQuestion(){
    nextButton.classList.add('hide')
  //  countDown.classList.remove('hide')
    clearStatusState(document.body)

    if(questions.length < currentQuestionIndex + 1) {
        countDown.classList.add('hide')
        questionNumber.classList.add('hide')
        HTMLQuestion.textContent = ''
        resetState()
        submitButton.classList.remove('hide')
        nextButton.classList.add('hide')
    }else{
        initiateTimer()
        displayQuestion(randomizeQuestion[currentQuestionIndex])
    }
}

function displayQuestion(question){
    resetState()
    startButton.classList.add('hide') // Start Button disappear
    HTMLQuestion.classList.remove('hide')
    questionNumber.classList.remove('hide')

    questionNumber.textContent = `${questionCount} / ${questions.length}`
    HTMLQuestion.textContent = question.question
    /* Create new button elements and append to the answer-grid */
    question.options.forEach((options) => { 
        const button = document.createElement('button')
        button.classList.add('btn')
        if(options.iscorrect){
            button.dataset.correct = true   // Create a data- attribute with true value
        }
        button.textContent = options.option
        button.addEventListener('click', verifyAnswerPicked, {once: true}) // Create Event listener for each option
        answerGrid.append(button)
    })
}

function resetState() {
    while(answerGrid.firstChild){
        answerGrid.removeChild(answerGrid.firstChild);
    }
}

function clearStatusState(element){
    element.classList.remove('wrong')
    element.classList.remove('correct')
}

function verifyAnswerPicked(e) {
    nextButton.classList.remove('hide')
    
    clearInterval(timeCount) //Stop the countdown
    let optionClicked = e.target
    let checkCorrect = optionClicked.dataset.correct
    storeScore(checkCorrect)
    setStatusState(document.body, checkCorrect)
    //Assign red class for wrong option and green class for correct option
    Array.from(answerGrid.children).forEach((button) => {
        setStatusState(button, button.dataset.correct)
    })
}

function storeScore(correct) {
    if(correct){
        ++score;
    }
}

function setStatusState(element, correct){
    if(correct){
        element.classList.add('correct')
    }else{
        element.classList.add('wrong')
    }
}

