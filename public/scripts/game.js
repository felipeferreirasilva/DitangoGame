var url = 'http://localhost:3000/services/';

var questionTitle = document.querySelector('#questionTitle');
var questionImage = document.querySelector('#questionImage');
var questionText = document.querySelector('#questionText');
var questionContent = document.querySelector('#question');

var questionNumber = 2;

function getQuestions(callback){
    $.getJSON(url + 'getQuestions', function(data){
        callback(data);
    })
}

function setQuestion(questionNumber){
    getQuestions(function(questions){
        var newQuestionContent = "";
        questionTitle.textContent = questions[questionNumber].title;
        questions[questionNumber].options.forEach(function(question){
            questionImage.setAttribute('src', ('images/' + question.img));
            questionText.textContent = question.text;
            newQuestionContent += questionContent.innerHTML;
        });
        questionContent.innerHTML = newQuestionContent;
    })
}

setQuestion(questionNumber);